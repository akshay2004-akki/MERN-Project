import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v4/ai/getTasks", { withCredentials: true });
        const { tasks, lastGenerated } = response.data.data;

        if (!tasks || tasks.length === 0) {
          await regenerateTasks();
        } else {
          const lastGeneratedDate = new Date(lastGenerated);
          const today = new Date();
          const diffDays = Math.floor((today - lastGeneratedDate) / (1000 * 60 * 60 * 24));

          if (diffDays >= 20) {
            await regenerateTasks();
          } else {
            setTasks(tasks);
          }
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    const regenerateTasks = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v4/ai/generate-task", {}, { withCredentials: true });
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error generating tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCompletion = async (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);

    try {
      await axios.put("http://localhost:8000/api/v4/ai/update-task", { tasksCompleted: updatedTasks }, { withCredentials: true });
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tasks-container" style={{transform:"translateY(90px)", height:"80vh", overflow:"scroll"}}>
      <h2>Your Tasks</h2>
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompletion(index)}
              className="task-checkbox"
            />
            <span className="task-text">{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;

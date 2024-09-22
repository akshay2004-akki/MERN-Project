import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const [step, setStep] = useState(0);
  const [res, setRes] = useState("");
  const [formData, setFormData] = useState({
    energyUsageDescription: [],
    energySourceDescription: [],
    vehicleTypeDescription: [],
    transportationHabits: [],
    flightHabits: [],
    dietDescription: [],
    wasteManagementDescription: [],
    heatingUsageDescription: [],
    coolingUsageDescription: [],
  });
  const [predictionExists, setPredictionExists] = useState(false);
  const route = useNavigate();

  useEffect(() => {
    // Check if a prediction exists for the user
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v4/ai/getPrediction`, { withCredentials: true })
      .then((response) => {
        if (response.data.data) {
          setPredictionExists(true); // If prediction exists, set state
        }
      })
      .catch((error) => {
        console.error("Error checking prediction:", error);
      });
  }, []);

  // Handle checkbox changes
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    let updatedField = [...formData[field]];

    if (checked) {
      // If the checkbox is checked, add the value to the array
      updatedField.push(value);
    } else {
      // If the checkbox is unchecked, remove the value from the array
      updatedField = updatedField.filter(item => item !== value);
    }

    setFormData({ ...formData, [field]: updatedField });
  };

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v4/ai/predict-carbon-footprint`, formData, { withCredentials: true })
      .then((response) => {
        setRes(response.data.data.message);
        localStorage.setItem('surveyCompleted', true); // Mark the survey as completed
        route('/'); // Redirect to home or another page
      })
      .catch((error) => {
        setRes(error.response.data);
      });
    console.log(formData);
    
  };

  const labels = [
    'Energy Usage Description',
    'Energy Source Description',
    'Vehicle Type Description',
    'Transportation Habits',
    'Flight Habits',
    'Diet Description',
    'Waste Management Description',
    'Heating Usage Description',
    'Cooling Usage Description',
  ];

  const options = {
    energyUsageDescription: [
      'Low (below average usage)',
      'Moderate (average usage)',
      'High (above average usage)',
    ],
    energySourceDescription: [
      'Grid electricity',
      'Solar energy',
      'Wind energy',
      'Mixed sources',
    ],
    vehicleTypeDescription: [
      'No vehicle',
      'Electric vehicle',
      'Hybrid vehicle',
      'Gasoline vehicle',
    ],
    transportationHabits: [
      'Walking/Cycling',
      'Public transport',
      'Personal vehicle',
      'Ride-sharing',
    ],
    flightHabits: [
      'Never',
      '1-2 times a year',
      '3-5 times a year',
      'More than 5 times a year',
    ],
    dietDescription: [
      'Vegetarian',
      'Vegan',
      'Omnivore',
      'Pescatarian',
    ],
    wasteManagementDescription: [
      'Recycle regularly',
      'Compost regularly',
      'Minimal waste management',
      'No specific waste management',
    ],
    heatingUsageDescription: [
      'No heating',
      'Low heating usage',
      'Moderate heating usage',
      'High heating usage',
    ],
    coolingUsageDescription: [
      'No cooling',
      'Low cooling usage',
      'Moderate cooling usage',
      'High cooling usage',
    ],
  };

  const fields = [
    'energyUsageDescription',
    'energySourceDescription',
    'vehicleTypeDescription',
    'transportationHabits',
    'flightHabits',
    'dietDescription',
    'wasteManagementDescription',
    'heatingUsageDescription',
    'coolingUsageDescription',
  ];

  if (predictionExists) {
    // If prediction exists, navigate to home page
    route("/");
  }

  return (
    <div style={{ backgroundImage: `
      radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
      radial-gradient(circle at bottom center, rgba(138, 43, 226, 0.4), transparent 50%)
    `, backgroundColor: '#121212', height: "100vh" }}>
      <div className="form-container3" style={{ backgroundColor: "transparent" }}>
        <form className='form3' onSubmit={handleSubmit}>
          <div className="form-step">
            <label style={{ color: "aquamarine" }}>{labels[step]}</label>
            <div className="checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#fff' }}>
              {options[fields[step]].map((option, index) => (
                <label key={index} style={{ display: 'flex', alignItems: 'center',  color:"#fff" }}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData[fields[step]].includes(option)}
                    onChange={(e) => handleCheckboxChange(e, fields[step])}
                    style={{ marginRight: '8px' }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="form-navigation">
            {step > 0 && (
              <button type="button" className="prev-button" onClick={handlePrevious}>
                Previous
              </button>
            )}
            {step < 8 ? (
              <button type="button" className="next-button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Survey;

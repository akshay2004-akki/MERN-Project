import axios from 'axios';
// import { error } from 'highcharts';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const [step, setStep] = useState(0);
  const [res, setRes] = useState("");
  const [formData, setFormData] = useState({
    energyUsageDescription: '',
    energySourceDescription: '',
    vehicleTypeDescription: '',
    transportationHabits: '',
    flightHabits: '',
    dietDescription: '',
    wasteManagementDescription: '',
    heatingUsageDescription: '',
    coolingUsageDescription: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const route = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v4/ai/predict-carbon-footprint", formData, {withCredentials:true})
      .then((response)=>{
        setRes(response.data.data.message)
        localStorage.setItem('surveyCompleted', true); // Mark the survey as completed
        route('/'); // Redirect to home or another page
      })
      .catch((error)=>{
        setRes(error.response.data);
        
      })
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

  const placeholders = [
    'Describe your typical energy usage at home (like electricity, solar, grid ?).',
    'What is your primary source of energy (solar, grid, etc.)?',
    'Describe the type of vehicle you use.',
    'What are your usual transportation habits?',
    'How often do you take flights?',
    'Describe your diet (e.g., vegetarian, omnivore).',
    'How do you manage your waste (e.g., recycling, composting)?',
    'How do you use heating in your home?',
    'How do you use cooling in your home?',
  ];

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

  return (
    <div className="form-container3">
      <form className='form3' onSubmit={handleSubmit}>
        <div className="form-step">
          <label htmlFor={fields[step]}>{labels[step]}</label>
          <textarea
            id={fields[step]}
            name={fields[step]}
            placeholder={placeholders[step]}  // Added placeholder here
            value={formData[fields[step]]}
            onChange={handleChange}
            required
          />
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
  );
};

export default Survey;

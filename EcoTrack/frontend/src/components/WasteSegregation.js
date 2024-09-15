import React, { useState } from 'react';
// import './WasteManagement.css'; // Apply the above CSS

function WasteSegregation() {
  const [waste, setWaste] = useState({
    organic: '',
    recyclable: '',
    hazardous: '',
    eWaste: '',
  });

  const handleChange = (e) => {
    setWaste({ ...waste, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Waste Segregation Data: ', waste);
    alert('Waste data submitted successfully!');
  };

  return (
    <div style={{backgroundImage: `
        radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
        radial-gradient(circle at bottom center, rgba(138, 43, 226, 0.4), transparent 50%)
      `,backgroundColor: '#121212', height:"100vh"}}>
        <div className="container5" style={{transform:"translateY(90px)", backgroundColor:"transparent"}}>
      <h2 style={{color:"#fff"}}>Waste Segregation Log</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group8">
          <label htmlFor="organic" style={{color:"#fff"}}>Organic Waste (kg):</label>
          <input
            type="number"
            name="organic"
            value={waste.organic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group8" >
          <label htmlFor="recyclable" style={{color:"#fff"}}>Recyclable Waste (kg):</label>
          <input
            type="number"
            name="recyclable"
            value={waste.recyclable}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group8">
          <label htmlFor="hazardous" style={{color:"#fff"}}>Hazardous Waste (kg):</label>
          <input
            type="number"
            name="hazardous"
            value={waste.hazardous}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group8">
          <label htmlFor="eWaste" style={{color:"#fff"}}>E-Waste (kg):</label>
          <input
            type="number"
            name="eWaste"
            value={waste.eWaste}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default WasteSegregation;

import React from 'react';
// import './WasteManagement.css'; // Apply the above CSS

function SanitizationAwareness() {
  return (
    <div style={{backgroundImage: `
        radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
        radial-gradient(circle at bottom center, rgba(138, 43, 226, 0.4), transparent 50%)
      `,backgroundColor: '#121212', height:"100vh"}}>
        <div className="container5" style={{transform:"translateY(90px)"}}>
      <h2>Sanitization Practices</h2>
      <p>
        Proper waste segregation and sanitization help maintain hygiene and reduce disease spread. Follow these practices:
      </p>
      <ul className="awareness-list">
        <li>Use separate bins for organic, recyclable, hazardous, and e-waste.</li>
        <li>Wash your hands after handling waste materials.</li>
        <li>Dispose of hazardous waste like chemicals at certified centers.</li>
        <li>Regularly clean and sanitize waste bins to prevent bacteria.</li>
      </ul>
    </div>
    </div>
  );
}

export default SanitizationAwareness;

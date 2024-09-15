import React, { useEffect, useState } from 'react';
// import './WasteManagement.css'; // Apply the above CSS

function WasteDisposal() {
  const [disposalCenters, setDisposalCenters] = useState([]);

  useEffect(() => {
    // Simulate fetch for nearby disposal centers
    setDisposalCenters([
      { name: 'Lovely Traders', address: 'D-57, industrial area, phase-5, mohali · 093161 01510', distance: 5.2 },
      { name: 'Garbage Landfill', address: ' PM5M+HGQ, Phase 8B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 140308', distance: 5.23 },
      { name: 'Scrapbuk - Best Online Scrap Buyer / Dealer/ Recycler In Chandigarh, Mohali, Panchkula', address: '2nd, Near, Municipal Corporation Office, World Tech 67, Plot No ITC -10, Sector-67, Sahibzada Ajit Singh Nagar, Chandigarh, Punjab 160062', distance: 9 },
      { name: 'Attero Recyclers', address: 'plot no. 9 Industrial Area, near PNB Bank, Phase 2, Sector 13, Chandigarh, 160002', distance: 22 },
      { name: 'Dumping Ground', address: 'QJ2F+9PX, Cluster_kharar 3, Darpan City, Punjab 140301', distance: 7.2 },
    ]);
  }, []);

  return (
    <div style={{backgroundImage: `
        radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
        radial-gradient(circle at bottom center, rgba(138, 43, 226, 0.4), transparent 50%)
      `,backgroundColor: '#121212', height:"100vh"}}>
        <div className="container5" style={{transform:"translateY(140px)"}}>
      <h2>Nearby Waste Disposal Centers</h2>
      {disposalCenters.length > 0 ? (
        <ul>
          {disposalCenters.map((center, index) => (
            <li key={index}>
              <strong>{center.name}</strong>
              <span>{center.address} (Distance: {center.distance} km)</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="loading">Loading disposal centers...</div>
      )}
    </div>
    </div>
  );
}

export default WasteDisposal;

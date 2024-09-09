import React, { useState } from 'react';
import axios from 'axios';
import image from '../Images/contact.webp';

function Webinar() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: ''
    });

    const [message, setMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v4/webinar/register', formData, {
                withCredentials: true,
            });
            setMessage(response.data.message || 'Webinar registered successfully!');
            // Clear form after submission
            setFormData({
                name: '',
                email: '',
                date: ''
            });
        } catch (error) {
            console.log(error);
            setMessage('Error: ' + error.response.data || error.message);
        }
    };

    return (
        <div style={{
            backgroundImage: `url`, // Replace with your background image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '50px 0',
            minHeight: '100vh',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Ubuntu, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '40px',
                borderRadius: '8px',
                width: '400px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}>
                <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '30px' }}>Register for Webinar</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Preferred Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            required 
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}>
                        Submit
                    </button>
                </form>
                {message && <p style={{ marginTop: '20px', textAlign: 'center', color: '#333' }}>{message}</p>}
            </div>
        </div>
    );
}

export default Webinar;

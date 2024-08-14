import React, { useState } from 'react';
import axios from 'axios';

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
        <div style={{maxWidth: '400px', margin: '0 auto', transform:"translateY(90px)"}}>
            <h2>Register for Webinar</h2>
            <form className='form4' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="date">Preferred Date:</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Webinar;

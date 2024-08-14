import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Individual');
  const [avatar, setAvatar] = useState(null);
  const route = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('avatar', avatar);

    await axios.post('http://localhost:8000/api/v4/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        alert('Sign-up successful');
        route('/login');  // Redirect to login page after successful sign-up
      })
      .catch((error) => {
        console.error('Error during sign-up:', error);
        alert('Sign-up failed');
      });
  };

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", transform:"translateY(90px)"}}>
        <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="input-group2">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-group2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength="8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Individual">Individual</option>
            <option value="Organisation">Organisation</option>
          </select>
        </div>
        <div className="input-group2">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            required
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
}

export default SignUp;
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/AddAdmin.css';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:4000/auth/check-session', {
            method: 'GET',
            credentials: 'include',
          });
  
          if (!response.ok) {
            navigate('/admin/loginForm');
          }
          // else
          //   navigate("/admin/adminDashboard")
        } catch (err) {
          alert('Failed');
          navigate('/admin/loginForm');
        }
      };
  
      fetchUserData();
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const newAdmin = { username, email, password };

    try {
      const response = await axios.post('http://localhost:4000/admin/addAdmin', newAdmin, {
        withCredentials: true,
      });
      alert(response.data.message);
    } catch (error) {
      setError('Failed to add admin');
    }
  };

  return (
    <div className="add-admin-form-container" style={{ padding: '20px', textAlign: 'center' }}>
  <h1>Add Admin</h1>
  <form onSubmit={handleSubmit} id="addAdminForm" className='add-admin-form'>
    <div className="input-fields">
      <div>
        <label className='add-admin-label' htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          className="add-admin-form-input add-admin-input" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label className='add-admin-label' htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          className="add-admin-form-input add-admin-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label className='add-admin-label' htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          className="add-admin-form-input add-admin-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label className='add-admin-label' htmlFor="confirmPassword">Confirm Password:</label>
        <input 
          type="password" 
          id="confirmPassword" 
          className="add-admin-form-input add-admin-input" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
      </div>
    </div>
    
    <p id="errorMessage" className="add-admin-error-text">{error}</p>
    <button type="submit" className="add-admin-button">Add Admin</button>
  </form>
</div>

  );
};

export default AddAdmin;

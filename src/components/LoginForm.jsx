import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";
import '../assets/styles/login.css';

function LoginForm() {
  const navigate = useNavigate();
  const [publicUser, setPublicUser] = useState({ username: "", password: "" });

const handlePublicInputChange = (e) => {
  const { name, value } = e.target;
  setPublicUser({ ...publicUser, [name]: value });
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publicUser),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/admin/adminDashboard");
      } else {
        const error = await response.json();
        alert("Login failed: " + error.message);
      }
    } catch (err) {
      alert("Login error: " + err.message);
    }
  };

  const handleForgotPassword = () => {
    navigate("/admin/forgotPassword");
  };

  return (
    <div className='login-main'>
    <form onSubmit={handleSubmit} className="login-form-container" id="loginForm">
  <h2 className="login-form-title">Login</h2>

  <div className="login-form-group">
    <label className='login-lable' htmlFor="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      className="login-input"
      placeholder="Enter Username"
      required
      value={publicUser.username}
      onChange={handlePublicInputChange}
    />
    <span className="error-message" id="usernameError"></span>
  </div>

  <div className="form-group">
    <label className='login-lable' htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      className="login-input"
      placeholder="Enter Password"
      required
      value={publicUser.password}
      onChange={handlePublicInputChange}
    />
    <span className="login-error-message" id="passwordError"></span>
  </div>

  <button type="submit" className="login-submit-button">Login</button>

  <p className="login-forgot-password">
    <button id="forgotPasswordLink" onClick={handleForgotPassword}>Forgot Password?</button>
  </p>
</form>
</div>
  );
}

export default LoginForm;

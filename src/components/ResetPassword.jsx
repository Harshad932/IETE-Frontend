import React, { useState } from "react";
import axios from "axios";
import '../assets/styles/reset.css';
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (url) => {
    const params = new URLSearchParams(url);
    return params.get('token');
  }

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const token = getQueryParams(location.search);

    try {
      const response = await axios.post(
        "http://localhost:4000/admin/reset-password",
        { token, newPassword }
      );

      if (response.data.message === "Password has been reset successfully.") {
        setSuccess("Your password has been successfully reset!");
        setTimeout(() => navigate("/admin/loginForm"), 2000);  // Redirect after 2 seconds
      }
    } catch (err) {
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="reset-body">
    <div className="reset-form-container">
  <h2 className="reset-form-title">Reset Your Password</h2>
  {error && <div className="reset-error-message">{error}</div>}
  {success && <div className="success-message">{success}</div>}
  
  <form onSubmit={resetPasswordHandler}>
    <div className="reset-form-group">
      <label className="reset-label" htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        className="reset-input"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <span className="error-message" id="newPasswordError"></span>
    </div>

    <div className="form-group">
      <label htmlFor="confirmPassword" className="reset-label">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        className="reset-input"
        placeholder="Enter confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <span className="error-message" id="confirmPasswordError"></span>
    </div>

    <button type="submit" className="reset-submit-button">Reset Password</button>
  </form>
</div>
</div>

  );
};

export default ResetPassword;

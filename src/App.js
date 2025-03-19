import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import AddEvent from './components/AddEvent';
import EventDetails from './components/EventDetails';
import UpdateEvent from './components/UpdateEvent';
import AddAnnouncement from './components/AddAnnouncement';
import ShowAnnouncement from './components/ShowAnnouncement';
import AddMember from './components/AddMember';
import ShowMembers from './components/showMembers';
import AddAdmin from './components/AddAdmin';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} />
          <Route path="/admin/loginForm" element={<LoginForm />} />
          <Route path="/admin/forgotPassword" element={<ForgotPassword />} />
          <Route path="/admin/resetpassword" element={<ResetPassword />} />
          <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/addEvent" element={<AddEvent />} />
          <Route path="/admin/eventDetails" element={<EventDetails />} />
          <Route path="/admin/updateEvent" element={<UpdateEvent/>} />
          <Route path="/admin/addAnnouncement" element={<AddAnnouncement/>} />
          <Route path="/admin/showAnnouncement" element={<ShowAnnouncement/>} />
          <Route path="/admin/addMember" element={<AddMember/>} />
          <Route path="/admin/showMembers" element={<ShowMembers/>} />
          <Route path="/admin/addAdmin" element={<AddAdmin/>} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;


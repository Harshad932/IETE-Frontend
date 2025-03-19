import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/EventDetail.css';
import axios from 'axios';

const EventDetails = () => {
  const location = useLocation();
  const { event } = location.state;
  const navigate = useNavigate();

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
         } catch (err) {
           alert('Failed');
           navigate('/admin/loginForm');
         }
       };
   
       fetchUserData();
     }, [navigate]);

  const handleOpenPdf = (pdfId) => {
    window.open(`http://localhost:4000/file/${pdfId}`, '_blank'); // Use full URL to request the PDF file from backend
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event? This action cannot be undone.");
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/admin/deleteEvent/${event._id}`);
        alert('Event deleted successfully');
        navigate('/admin/adminDashboard');
      } catch (error) {
        alert('Error deleting event');
      }
    } else {
      // User canceled the delete action
      alert('Event deletion canceled.');
    }
  };
  

  const handleUpdate = () => {
    navigate('/admin/updateEvent', { state: { event } });
  };

  return (
    <div className="event-detail-body">
    <div id="eventDetails" className="event-detail-container" style={{ padding: '20px', textAlign: 'center' }}>
  <h1 className='event-detail-h1'>{event.eventName}</h1>
  <p>{event.eventAbout}</p>
  <h3 id="eventWinner" className='event-detail-h3'>Winner: {event.eventWinner}</h3>
  <h3 id="eventRunnerUp" className='event-detail-h3'>Runner Up: {event.eventRunnerUp}</h3>

  <div className="images-section" style={{ margin: '20px 0' }}>
    {event.guestImages.length > 0 && (
      <>
        <h2 className='event-detail-h2'>Guest Images</h2>
        <div className="event-detail-image-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {event.guestImages.map((imageId) => (
            <img
              key={imageId}
              src={`http://localhost:4000/file/${imageId}`}
              alt="Guest"
              className="event-image"
              style={{ width: '200px', height: 'auto', margin: '10px' }}
            />
          ))}
        </div>
      </>
    )}
  </div>

  <div className="images-section" style={{ margin: '20px 0' }}>
    {event.winnerImages.length > 0 && (
      <>
        <h2 className='event-detail-h2'>Winner & Runner-Up Images</h2>
        <div className="event-detail-image-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {event.winnerImages.map((imageId) => (
            <img
              key={imageId}
              src={`http://localhost:4000/file/${imageId}`}
              alt="Winner or Runner-Up"
              className="event-image"
              style={{ width: '200px', height: 'auto', margin: '10px' }}
            />
          ))}
        </div>
      </>
    )}
  </div>

  <div className="images-section" style={{ margin: '20px 0' }}>
    {event.randomImages.length > 0 && (
      <>
        <h2 className='event-detail-h2'>Event Images</h2>
        <div className="event-detail-image-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {event.randomImages.map((imageId) => (
            <img
              key={imageId}
              src={`http://localhost:4000/file/${imageId}`}
              alt="Event"
              className="event-image"
              style={{ width: '200px', height: 'auto', margin: '10px' }}
            />
          ))}
        </div>
      </>
    )}
  </div>

  {event.pdfFile && (
    <button id="pdfButton" className="pdf-button event-detail-button" onClick={() => handleOpenPdf(event.pdfFile)} style={{ margin: '20px', padding: '10px 20px' }}>
      Open PDF
    </button>
  )}

  <div className="list-section" style={{ margin: '20px 0' }}>
    {event.guests.length > 0 && (
      <>
        <h2 className='event-detail-h2'>Guests</h2>
        <ul id="guestList" className="event-list event-detail-ul">
          {event.guests.map((guest, index) => (
            <li key={index} className="event-item event-detail-li">{guest}</li>
          ))}
        </ul>
      </>
    )}
  </div>

  <div className="list-section" style={{ margin: '20px 0' }}>
    {event.organizers.length > 0 && (
      <>
        <h2 className='event-detail-h2'>Organizers</h2>
        <ul id="organizerList" className="event-list event-detail-ul">
          {event.organizers.map((organizer, index) => (
            <li key={index} className="event-item event-detail-li">{organizer}</li>
          ))}
        </ul>
      </>
    )}
  </div>

  <div className="button-section" style={{ marginTop: '30px' }}>
    <button id="updateButton" className="update-button event-detail-button" onClick={handleUpdate} style={{ marginRight: '10px', padding: '10px 20px' }}>
      Update
    </button>
    <button id="deleteButton" className="delete-button event-detail-button" onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white' }}>
      Delete
    </button>
  </div>
</div>
</div>
  );
};

export default EventDetails;

import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './RegistrationConfirmation.css';

const RegistrationConfirmation = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    selectedBooth, 
    selectedDate, 
    selectedArena,
    venueDetails 
  } = location.state || {};
  
  // If no data is available, redirect to dashboard
  if (!selectedBooth || !selectedDate) {
    setTimeout(() => navigate('/student/dashboard'), 0);
    return null;
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handlePrintConfirmation = () => {
    window.print();
  };
  
  const handleBackToDashboard = () => {
    navigate('/student/dashboard');
  };
  
  return (
    <div className="registration-confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <h2>Registration Confirmed!</h2>
          <div className="success-icon">✓</div>
        </div>
        
        <div className="confirmation-details">
          <h3>InventiCon Event Registration Details</h3>
          
          <div className="detail-section">
            <h4>Event Information</h4>
            <p><strong>Event:</strong> InventiCon Innovation Expo 2023</p>
            <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
            <p><strong>Time:</strong> {venueDetails.timings}</p>
            <p><strong>Venue:</strong> {venueDetails.name}, {venueDetails.address}</p>
          </div>
          
          <div className="detail-section">
            <h4>Your Booth Information</h4>
            <p><strong>Booth Number:</strong> {selectedBooth.number}</p>
            <p><strong>Location:</strong> {selectedBooth.location}</p>
            <p><strong>Arena Type:</strong> {selectedArena === 'arena1' ? 'Standard Setup' : 'Extended Setup'}</p>
          </div>
          
          <div className="detail-section">
            <h4>What's Included in Your Arena</h4>
            {selectedArena === 'arena1' ? (
              <ul>
                <li>3m x 3m space</li>
                <li>Sofa for team members</li>
                <li>Presentation desk</li>
                <li>Power support (2 outlets)</li>
              </ul>
            ) : (
              <ul>
                <li>4m x 4m space</li>
                <li>Sofa for team members</li>
                <li>Presentation desk</li>
                <li>Additional workspace</li>
                <li>Task lamp</li>
                <li>Power support (4 outlets)</li>
              </ul>
            )}
          </div>
          
          <div className="detail-section">
            <h4>Participant Information</h4>
            <p><strong>Name:</strong> {user?.name || 'Student User'}</p>
            <p><strong>Institution:</strong> {user?.institution || 'IIT Bombay'}</p>
            <p><strong>Registration ID:</strong> INV-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </div>
        
        <div className="important-notes">
          <h4>Important Notes:</h4>
          <ul>
            <li>Please bring your ID proof and this confirmation when attending the event.</li>
            <li>Setup time for your booth will be available from 7:00 AM on your selected date.</li>
            <li>Technical support will be available at the venue.</li>
            <li>For any changes to your registration, please contact support at least 48 hours before the event.</li>
          </ul>
        </div>
        
        <div className="confirmation-actions">
          <button 
            className="secondary-btn" 
            onClick={handlePrintConfirmation}
          >
            Print Confirmation
          </button>
          <button 
            className="primary-btn" 
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
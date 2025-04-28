import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './EventRegistration.css';

const EventRegistration = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedArena } = location.state || { selectedArena: null };
  
  const [isLoading, setIsLoading] = useState(true);
  const [booths, setBooths] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2023-09-15');
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false); // NEW STATE

  const eventDates = [
    { value: '2023-09-15', label: 'September 15, 2023' },
    { value: '2023-09-16', label: 'September 16, 2023' },
    { value: '2023-09-17', label: 'September 17, 2023' }
  ];
  
  const venueDetails = {
    name: 'India International Convention Centre',
    address: 'Dwarka, New Delhi',
    timings: '9:00 AM - 6:00 PM'
  };
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockBooths = generateMockBooths(selectedArena, 24);
      setBooths(mockBooths);
      setIsLoading(false);
    }, 1000);
  }, [selectedDate, selectedArena]);
  
  const generateMockBooths = (arenaType, count) => {
    const booths = [];
    for (let i = 1; i <= count; i++) {
      const isAvailable = Math.random() > 0.3;
      booths.push({
        id: `booth-${i}`,
        number: i,
        location: i <= 12 ? 'West Wing' : 'East Wing',
        type: arenaType || (i % 2 === 0 ? 'arena1' : 'arena2'),
        status: isAvailable ? 'available' : 'booked'
      });
    }
    return booths;
  };
  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedBooth(null);
  };
  
  const handleBoothSelect = (boothId) => {
    const booth = booths.find(b => b.id === boothId);
    if (booth && booth.status === 'available') {
      setSelectedBooth(booth);
    }
  };
  
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedBooth) {
      alert('Please select an available booth');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      const updatedBooths = booths.map(booth => {
        if (booth.id === selectedBooth.id) {
          return { ...booth, status: 'booked' };
        }
        return booth;
      });

      setBooths(updatedBooths);
      setIsSubmitting(false);
      setRegistrationCompleted(true); // SET COMPLETED TRUE
    }, 1500);
  };

  // If registration is completed, show the final message
  if (registrationCompleted) {
    return (
      <div className="event-registration">
        <h2>Registration Successful 🎉</h2>
        <p style={{ fontSize: '1.5rem', marginTop: '20px', color: '#2ecc71', fontWeight: '600' }}>
          Alright Future India, be ready with your innovations and creations to amaze this world!
        </p>
      </div>
    );
  }
  
  return (
    <div className="event-registration">
      <h2>InventiCon Event Registration</h2>
      <p className="subtitle">Select your booth location for the upcoming InventiCon event</p>
      
      <div className="venue-details">
        <h3>Event Venue</h3>
        <div className="venue-info">
          <h4>{venueDetails.name}</h4>
          <p>{venueDetails.address}</p>
          <p>Event Timings: {venueDetails.timings}</p>
        </div>
      </div>
      
      <div className="date-selection">
        <h3>Select Event Date</h3>
        <select 
          value={selectedDate} 
          onChange={handleDateChange}
          className="date-selector"
        >
          {eventDates.map(date => (
            <option key={date.value} value={date.value}>
              {date.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="booth-selection">
        <h3>Booth Selection</h3>
        <p>Selected Arena: {selectedArena === 'arena1' ? 'Standard Setup' : 'Extended Setup'}</p>
        
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading booth availability...</p>
          </div>
        ) : (
          <>
            <div className="booth-map">
              <div className="legend">
                <div className="legend-item">
                  <span className="status-indicator available"></span>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <span className="status-indicator booked"></span>
                  <span>Booked</span>
                </div>
                <div className="legend-item">
                  <span className="status-indicator selected"></span>
                  <span>Selected</span>
                </div>
              </div>
              
              <div className="map-container">
                <div className="wing west-wing">
                  <h4>West Wing</h4>
                  <div className="booths">
                    {booths.filter(booth => booth.location === 'West Wing').map(booth => (
                      <div 
                        key={booth.id}
                        className={`booth ${booth.status} ${selectedBooth?.id === booth.id ? 'selected' : ''}`}
                        onClick={() => handleBoothSelect(booth.id)}
                      >
                        <span>{booth.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="center-area">
                  <div className="stage">Main Stage</div>
                </div>
                
                <div className="wing east-wing">
                  <h4>East Wing</h4>
                  <div className="booths">
                    {booths.filter(booth => booth.location === 'East Wing').map(booth => (
                      <div 
                        key={booth.id}
                        className={`booth ${booth.status} ${selectedBooth?.id === booth.id ? 'selected' : ''}`}
                        onClick={() => handleBoothSelect(booth.id)}
                      >
                        <span>{booth.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {selectedBooth && (
              <div className="selected-booth-info">
                <h4>Selected Booth Information</h4>
                <p><strong>Booth Number:</strong> {selectedBooth.number}</p>
                <p><strong>Location:</strong> {selectedBooth.location}</p>
                <p><strong>Arena Type:</strong> {selectedBooth.type === 'arena1' ? 'Standard Setup' : 'Extended Setup'}</p>
              </div>
            )}
          </>
        )}
      </div>
      
      <form onSubmit={handleRegistrationSubmit}>
        <div className="registration-confirmation">
          <label>
            <input type="checkbox" required />
            I confirm that I will attend the InventiCon event on the selected date and occupy the selected booth.
          </label>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/student/expo-preparation')}
            className="secondary-btn"
          >
            Back to Expo Preparation
          </button>
          
          <button
            type="submit"
            disabled={!selectedBooth || isSubmitting}
            className="primary-btn"
          >
            {isSubmitting ? 'Processing...' : 'Complete Registration'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistration;

import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './EventRegistration.css'; 

const CompanyDashboard = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [booths, setBooths] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2023-09-15');

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
      const mockBooths = generateMockBooths(24);
      setBooths(mockBooths);
      setIsLoading(false);
    }, 1000);
  }, [selectedDate]);

  const generateMockBooths = (count) => {
    const booths = [];
    for (let i = 1; i <= count; i++) {
      const isAvailable = Math.random() > 0.3;
      booths.push({
        id: `booth-${i}`,
        number: i,
        location: i <= 12 ? 'West Wing' : 'East Wing',
        status: isAvailable ? 'available' : 'booked'
      });
    }
    return booths;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="dashboard-container event-registration">
      <h2>Welcome, {user?.companyName || 'Company Representative'}!</h2>
      <p>Browse event details and booth availability for InventiCon.</p>

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
        <h3>Booth Availability</h3>
        
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading booth availability...</p>
          </div>
        ) : (
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
            </div>

            <div className="map-container">
              <div className="wing west-wing">
                <h4>West Wing</h4>
                <div className="booths">
                  {booths.filter(booth => booth.location === 'West Wing').map(booth => (
                    <div 
                      key={booth.id}
                      className={`booth ${booth.status}`}
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
                      className={`booth ${booth.status}`}
                    >
                      <span>{booth.number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;

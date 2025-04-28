import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './ExpoPreparation.css';

const ExpoPreparation = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [selectedArena, setSelectedArena] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleArenaSelect = (arenaId) => {
    setSelectedArena(arenaId);
  };
  
  const handleProceed = () => {
    if (!selectedArena) {
      alert('Please select an arena to continue');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/student/event-registration', { state: { selectedArena } });
    }, 1000);
  };
  
  return (
    <div className="expo-preparation">
      <h2>Final Expo Preparation</h2>
      <p className="subtitle">
        Choose your presentation arena for the InventiCon event
      </p>
      
      <div className="arena-selection">
        <h3>Select Your Display Arena</h3>
        <p>
          Choose the arena that best suits your innovation's display requirements.
          Your selection will determine your booth setup at the event.
        </p>
        
        <div className="arenas">
          <div 
            className={`arena ${selectedArena === 'arena1' ? 'selected' : ''}`}
            onClick={() => handleArenaSelect('arena1')}
          >
            <div className="arena-image">
              {/* Using a placeholder for demonstration - would be actual image in production */}
              <img src="/arena1.jpg" alt="Arena 1" />
            </div>
            <div className="arena-info">
              <h4>Arena 1: Standard Setup</h4>
              <ul>
                <li>Compact 3m x 3m space</li>
                <li>Includes sofa and presentation desk</li>
                <li>Power support (2 outlets)</li>
                <li>Perfect for digital or small physical innovations</li>
              </ul>
              <div className="arena-dimensions">
                <span>Coverage Area: 9 sq. meters</span>
              </div>
            </div>
          </div>
          
          <div 
            className={`arena ${selectedArena === 'arena2' ? 'selected' : ''}`}
            onClick={() => handleArenaSelect('arena2')}
          >
            <div className="arena-image">
              {/* Using a placeholder for demonstration - would be actual image in production */}
              <img src="/arena2.jpg" alt="Arena 2" />
            </div>
            <div className="arena-info">
              <h4>Arena 2: Extended Setup</h4>
              <ul>
                <li>Spacious 4m x 4m area</li>
                <li>Includes sofa, presentation desk, lamp and workspace</li>
                <li>Enhanced power support (4 outlets)</li>
                <li>Ideal for larger demonstrations or interactive displays</li>
              </ul>
              <div className="arena-dimensions">
                <span>Coverage Area: 16 sq. meters</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="arena-features-comparison">
          <h4>Arena Comparison</h4>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Arena 1</th>
                <th>Arena 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Size</td>
                <td>3m x 3m</td>
                <td>4m x 4m</td>
              </tr>
              <tr>
                <td>Seating</td>
                <td>Sofa for 2 people</td>
                <td>Sofa for 3 people</td>
              </tr>
              <tr>
                <td>Work Area</td>
                <td>Presentation desk</td>
                <td>Presentation desk + workspace</td>
              </tr>
              <tr>
                <td>Lighting</td>
                <td>Standard</td>
                <td>Standard + additional lamp</td>
              </tr>
              <tr>
                <td>Power Outlets</td>
                <td>2</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="note-box">
        <h4>Important Note:</h4>
        <p>
          Your arena selection will be confirmed based on availability. The selection 
          made here will be used for the event registration in the next step.
        </p>
      </div>
      
      <div className="form-actions">
        <button 
          className="primary-btn" 
          onClick={handleProceed}
          disabled={!selectedArena || isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Proceed to Event Registration'}
        </button>
      </div>
    </div>
  );
};

export default ExpoPreparation;
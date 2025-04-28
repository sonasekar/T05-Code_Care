import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './RoleSelection.css';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const roles = [
    { id: 'student', label: 'Student Innovator', icon: '🎓' },
    { id: 'admin', label: 'Admin/Judge', icon: '👨‍⚖️' },
    { id: 'company', label: 'Company Representative', icon: '🏢' },
    { id: 'investor', label: 'Investor', icon: '💰' },
    { id: 'landowner', label: 'Landowner / Vendor', icon: '🏠' },
    { id: 'results', label: 'Results Publisher', icon: '🏆' }


  ];

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/signup?role=${selectedRole}`);
    }
  };

  return (
    <div className="role-selection-container">
      <h1>Welcome to InventiCon</h1>
      <h2>India's Premier Student Innovation Expo</h2>
      
      <div className="role-cards">
        {roles.map((role) => (
          <div 
            key={role.id}
            className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
            onClick={() => setSelectedRole(role.id)}
          >
            <span className="role-icon">{role.icon}</span>
            <h3>{role.label}</h3>
          </div>
        ))}
      </div>
      
      <button 
        className="continue-btn"
        onClick={handleContinue}
        disabled={!selectedRole}
      >
        Continue to {selectedRole ? `${roles.find(r => r.id === selectedRole).label} Registration` : '...'}
      </button>
      
      <p className="login-prompt">
        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default RoleSelection;
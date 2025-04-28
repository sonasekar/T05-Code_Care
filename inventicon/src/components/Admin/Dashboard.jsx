// Dashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [patentData, setPatentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }

    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockTeam = {
          name: "TechInnovators",
          members: [
            { name: "Rahul Sharma", role: "Team Lead" },
            { name: "Priya Patel", role: "Technical Lead" },
            { name: "Amit Kumar", role: "Research Specialist" }
          ],
          institution: "IIT Bombay"
        };

        const mockPatent = {
          id: "pat1",
          title: "AI-Powered Waste Management System",
          submittedDate: "2023-05-18",
          status: localStorage.getItem('patentStatus') || "pending",
          reviewComments: localStorage.getItem('patentStatus') === 'granted' ? 
            "Your patent demonstrates excellent innovation and meets all criteria." : ""
        };

        setTeamData(mockTeam);
        setPatentData(mockPatent);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isAdmin) {
    return <AdminDashboard navigate={navigate} />;
  }

  const handleViewPatentDetails = () => {
    navigate(`/student/patent-review/${patentData.id}`);
  };

  const handleUploadPatent = () => {
    navigate('/student/patent-upload');
  };

  const handleTeamDetails = () => {
    navigate('/student/team-details');
  };

  const handleExpoPreparation = () => {
    navigate('/student/expo-preparation');
  };

  if (isLoading) {
    return (
      <div className="dashboard-container loading">
        <div className="spinner"></div>
        <h3>Loading dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>

      {/* Team Info */}
      <div className="dashboard-card">
        <h3>Team Information</h3>
        {teamData ? (
          <div>
            <h4>{teamData.name}</h4>
            <p><strong>Institution:</strong> {teamData.institution}</p>
            <ul>
              {teamData.members.map((member, index) => (
                <li key={index}>{member.name} - <em>{member.role}</em></li>
              ))}
            </ul>
            <button className="secondary-btn" onClick={handleTeamDetails}>
              Edit Team Details
            </button>
          </div>
        ) : (
          <div>
            <p>No team information available.</p>
            <button className="primary-btn" onClick={handleTeamDetails}>
              Set Up Team
            </button>
          </div>
        )}
      </div>

      {/* Patent Status */}
      <div className="dashboard-card">
        <h3>Patent Status</h3>
        {patentData ? (
          <div>
            <h4>{patentData.title}</h4>
            <p><strong>Submitted:</strong> {patentData.submittedDate}</p>
            <div className={`status-badge ${patentData.status}`}>
              {patentData.status === 'pending' ? 'Under Review' : 
               patentData.status === 'granted' ? 'Approved' : 
               patentData.status === 'rejected' ? 'Not Approved' : 'Unknown Status'}
            </div>

            {patentData.status === 'granted' && (
              <div className="review-feedback">
                <p><strong>Review Feedback:</strong> {patentData.reviewComments}</p>
                <button className="primary-btn" onClick={handleExpoPreparation}>
                  Proceed to Expo Preparation
                </button>
              </div>
            )}
            
            {patentData.status === 'pending' && (
              <div className="pending-info">
                <p>Your patent is under review. Estimated time: 2-3 business days.</p>
              </div>
            )}
            
            {patentData.status === 'rejected' && (
              <div className="rejected-info">
                <p>Your patent didn't meet all criteria.</p>
                <button className="primary-btn" onClick={handleUploadPatent}>
                  Submit Revised Application
                </button>
              </div>
            )}

            <button className="secondary-btn" onClick={handleViewPatentDetails}>
              View Full Details
            </button>
          </div>
        ) : (
          <div>
            <p>No patent found.</p>
            <button className="primary-btn" onClick={handleUploadPatent}>
              Submit Patent Application
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-card quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          {!patentData && <button onClick={handleUploadPatent}>Apply for Patent</button>}
          {patentData?.status === 'granted' && <button onClick={handleExpoPreparation}>Prepare for Expo</button>}
          <button onClick={handleTeamDetails}>Manage Team</button>
          <button onClick={() => navigate('/student/resources')}>Learning Resources</button>
        </div>
      </div>

      {/* Events */}
      <div className="dashboard-card">
        <h3>Upcoming Events</h3>
        <ul>
          <li><strong>May 15, 2023:</strong> Patent Application Deadline</li>
          <li><strong>June 10, 2023:</strong> InventiCon 2023 - Exhibition</li>
          <li><strong>June 12, 2023:</strong> Award Ceremony</li>
        </ul>
      </div>
    </div>
  );
};

const AdminDashboard = ({ navigate }) => {
  const [stats, setStats] = useState({
    totalPatents: 0,
    pendingReview: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalPatents: 45,
        pendingReview: 12,
        approved: 28,
        rejected: 5
      });
    }, 1000);
  }, []);

  return (
    <div className="dashboard-container admin-dashboard">
      <h2>Admin Panel</h2>

      <div className="admin-stats">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
            <p className="stat-value">{value}</p>
          </div>
        ))}
      </div>

      <div className="admin-actions">
        <button className="primary-btn" onClick={() => navigate('/admin/review')}>
          Review Applications
        </button>
        <button className="secondary-btn" onClick={() => navigate('/admin/teams')}>
          Manage Teams
        </button>
        <button className="secondary-btn" onClick={() => navigate('/admin/expo')}>
          Manage Expo
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

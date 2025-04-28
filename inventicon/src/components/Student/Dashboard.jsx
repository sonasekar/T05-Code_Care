import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [team, setTeam] = useState(null);
  const [abstract, setAbstract] = useState(null);
  const [patentStatus, setPatentStatus] = useState('not_started');
  const [showPatentGuidelines, setShowPatentGuidelines] = useState(false);
  
  useEffect(() => {
    // Check if patent status was updated from the patent upload page
    const savedPatentStatus = localStorage.getItem('patentStatus');
    if (savedPatentStatus === 'granted') {
      setPatentStatus('granted');
    }
    
    setTimeout(() => {
      setTeam({
        name: 'Tech Innovators',
        members: [
          { name: 'You', role: 'Team Lead', email: 'you@example.com' },
          { name: 'Member 2', role: 'Developer', email: 'member2@example.com' },
          { name: 'Member 3', role: 'Designer', email: 'member3@example.com' }
        ],
        projectTitle: 'AI-Powered Waste Management System'
      });

      setAbstract({
        title: 'AI-Powered Waste Management System',
        description: 'An innovative solution using computer vision to sort waste automatically...',
        submittedDate: '2023-05-15',
        status: 'under_review',
        feedback: ''
      });
    }, 500);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'team') navigate('/student/team');
    if (tab === 'abstract') navigate('/student/abstract');
    if (tab === 'patent') navigate('/student/patent');
  };

  const checkAIValidation = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isApproved = Math.random() > 0.3;
        resolve(isApproved);
      }, 2000);
    });
  };

  const handleAbstractSubmit = async () => {
    const isApproved = await checkAIValidation();
    if (isApproved) {
      setAbstract(prev => ({ ...prev, status: 'approved' }));
      setShowPatentGuidelines(true);
    } else {
      setAbstract(prev => ({ ...prev, status: 'rejected', feedback: 'AI validation failed: Idea lacks novelty or feasibility' }));
    }
  };

  const renderPatentTimeline = () => (
    <div className="timeline">
      <div className={`timeline-item ${patentStatus !== 'not_started' ? 'active' : ''}`}>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h4>Patent Submitted</h4>
          <p>Your patent application has been received</p>
        </div>
      </div>

      <div className={`timeline-item ${patentStatus === 'granted' ? 'active' : ''}`}>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h4>Patent Approved</h4>
          <p>Your patent meets all requirements</p>
          {patentStatus === 'granted' && (
            <button 
              className="action-btn"
              onClick={() => navigate('/student/expo-preparation')}
            >
              Start Expo Preparation
            </button>
          )}
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h4>Expo Preparation</h4>
          <p>Prepare your presentation for InventiCon</p>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="dashboard-overview">
      {/* Team Status */}
      <div className="status-card">
        <h3>Team Status</h3>
        {team ? (
          <div className="team-info">
            <p><strong>Team Name:</strong> {team.name}</p>
            <p><strong>Project Title:</strong> {team.projectTitle}</p>
            <p><strong>Members:</strong> {team.members.length}/5</p>
            <button className="action-btn" onClick={() => navigate('/student/team')}>
              {team.members.length === 1 ? 'Add Team Members' : 'Manage Team'}
            </button>
          </div>
        ) : (
          <>
            <p>No team formed yet</p>
            <button className="action-btn" onClick={() => navigate('/student/team')}>
              Create Team
            </button>
          </>
        )}
      </div>

      {/* Abstract Status */}
      <div className="status-card">
        <h3>Abstract Status</h3>
        {abstract ? (
          <div className="abstract-info">
            <p><strong>Title:</strong> {abstract.title}</p>
            <p><strong>Status:</strong> 
              <span className={`status-badge ${abstract.status}`}>
                {abstract.status === 'under_review' ? 'Under Review' : abstract.status === 'approved' ? 'Approved' : 'Rejected'}
              </span>
            </p>
            {abstract.feedback && <p><strong>Feedback:</strong> {abstract.feedback}</p>}
            {abstract.status === 'under_review' && (
              <button className="action-btn" onClick={handleAbstractSubmit}>
                Submit for AI Review
              </button>
            )}
          </div>
        ) : (
          <>
            <p>No abstract submitted yet</p>
            <button className="action-btn" onClick={() => navigate('/student/abstract')}>
              Submit Abstract
            </button>
          </>
        )}
      </div>

      {/* Patent Status */}
      <div className="status-card">
        <h3>Patent Status</h3>
        {showPatentGuidelines || patentStatus !== 'not_started' ? (
          <>
            <p><strong>Current Status:</strong> 
              <span className={`status-badge ${patentStatus === 'granted' ? 'approved' : patentStatus}`}>
                {patentStatus === 'not_started' ? 'Not Started' : patentStatus === 'in_progress' ? 'In Progress' : 'Granted'}
              </span>
            </p>
            {patentStatus === 'not_started' && (
              <div className="patent-options">
                <h4>Choose Patent Option:</h4>
                <button className="action-btn" onClick={() => {
                  setPatentStatus('in_progress');
                  navigate('/student/patent');
                }}>
                  File New Provisional Patent
                </button>
                <button className="action-btn secondary" onClick={() => {
                  setPatentStatus('in_progress');
                  navigate('/student/patent?existing=true');
                }}>
                  Upload Existing Patent
                </button>
              </div>
            )}
            {patentStatus === 'granted' && (
              <>
                <p className="success-message">
                  Your patent has been verified! You're eligible for the finals.
                </p>
                <button className="action-btn" onClick={() => navigate('/student/expo-preparation')}>
                  Proceed to Expo Preparation
                </button>
              </>
            )}
          </>
        ) : (
          <p>Patent guidance will appear after abstract approval</p>
        )}
      </div>

      {/* InventiCon Timeline */}
      <div className="timeline">
        <h3>InventiCon Timeline</h3>
        <ul>
          <li className={team ? "completed" : "current"}>Form Team</li>
          <li className={abstract ? "completed" : team ? "current" : ""}>Submit Abstract</li>
          <li className={abstract?.status === 'approved' ? "completed" : abstract ? "current" : ""}>AI Review</li>
          <li className={patentStatus === 'granted' ? "completed" : patentStatus !== 'not_started' ? "current" : ""}>Patent Process</li>
          <li className={patentStatus === 'granted' ? "current" : ""}>Final Expo Preparation</li>
          <li>InventiCon Event</li>
        </ul>
      </div>

      {/* Separate Patent Timeline */}
      {renderPatentTimeline()}

      {/* Patent Guidance */}
      {showPatentGuidelines && (
        <div className="guidelines-card">
          <h3>Patent Guidance</h3>
          <p>Your abstract has been approved! To participate in the finals, you need to complete the patent process.</p>
          <div className="patent-criteria">
            <h4>Your invention must meet 3 key criteria:</h4>
            <ul>
              <li><strong>Novelty:</strong> Your invention must be new and not previously known</li>
              <li><strong>Inventive Step:</strong> It must not be obvious to someone skilled in the field</li>
              <li><strong>Industrial Applicability:</strong> It must be capable of being made or used in industry</li>
            </ul>
          </div>
          <div className="patent-options">
            <button className="action-btn" onClick={() => {
              setPatentStatus('in_progress');
              navigate('/student/patent');
            }}>
              Start New Patent Application
            </button>
            <button className="action-btn secondary" onClick={() => {
              setPatentStatus('in_progress');
              navigate('/student/patent?existing=true');
            }}>
              I Already Have a Patent
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Your InventiCon Dashboard</h2>
        <p>Track your progress towards the national innovation expo</p>
      </div>

      <div className="dashboard-tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabChange('overview')}>Overview</button>
        <button className={activeTab === 'team' ? 'active' : ''} onClick={() => handleTabChange('team')}>Team Details</button>
        <button className={activeTab === 'abstract' ? 'active' : ''} onClick={() => handleTabChange('abstract')}>Abstract Submission</button>
        {(showPatentGuidelines || patentStatus !== 'not_started') && (
          <button className={activeTab === 'patent' ? 'active' : ''} onClick={() => handleTabChange('patent')}>Patent Process</button>
        )}
        {patentStatus === 'granted' && (
          <button className={activeTab === 'expo' ? 'active' : ''} onClick={() => navigate('/student/expo-preparation')}>Expo Preparation</button>
        )}
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
      </div>
    </div>
  );
};

export default StudentDashboard;
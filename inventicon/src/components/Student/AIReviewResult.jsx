import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './AIReviewResult.css';

const AIReviewResult = () => {
  const { user } = useContext(AuthContext);
  const { patentId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [patent, setPatent] = useState(null);
  const [reviewResults, setReviewResults] = useState(null);
  
  useEffect(() => {
    // Simulate API call to fetch patent and review results
    setTimeout(() => {
      // Mock data - in real app this would come from an API
      const mockPatent = {
        id: patentId || 'pat1',
        title: 'AI-Powered Waste Management System',
        student: 'Rahul Sharma',
        institution: 'IIT Bombay',
        submittedDate: '2023-05-18',
        status: 'approved',
        type: 'new',
        verificationResults: {
          novelty: true,
          inventiveStep: true,
          industrialApplicability: true
        }
      };
      
      setPatent(mockPatent);
      setReviewResults(mockPatent.verificationResults);
      setIsLoading(false);
    }, 1500);
  }, [patentId]);
  
  const handleProceedToExpo = () => {
    navigate('/student/expo-preparation');
  };
  
  if (isLoading) {
    return (
      <div className="ai-review-result loading">
        <div className="spinner"></div>
        <h3>Loading review results...</h3>
      </div>
    );
  }
  
  return (
    <div className="ai-review-result">
      <h2>Patent Review Results</h2>
      <div className="status-banner approved">
        <h3>Congratulations! Your patent has been approved for InventiCon</h3>
        <p>You can now proceed to the next stage - Final Expo Preparation</p>
      </div>
      
      <div className="patent-details">
        <h3>{patent.title}</h3>
        <p><strong>Submitted:</strong> {patent.submittedDate}</p>
        <p><strong>Type:</strong> {patent.type === 'new' ? 'New Filing' : 'Existing Patent'}</p>
      </div>
      
      <div className="review-results">
        <h3>AI Review Results</h3>
        
        <div className={`criteria ${reviewResults.novelty ? 'passed' : 'failed'}`}>
          <strong>Novelty:</strong> 
          {reviewResults.novelty ? '✅ Passed' : '❌ Failed'}
          {reviewResults.novelty && (
            <p className="feedback positive">
              Your invention demonstrates significant novelty in its approach.
            </p>
          )}
        </div>
        
        <div className={`criteria ${reviewResults.inventiveStep ? 'passed' : 'failed'}`}>
          <strong>Inventive Step:</strong> 
          {reviewResults.inventiveStep ? '✅ Passed' : '❌ Failed'}
          {reviewResults.inventiveStep && (
            <p className="feedback positive">
              The innovation demonstrates non-obvious solution to a technical problem.
            </p>
          )}
        </div>
        
        <div className={`criteria ${reviewResults.industrialApplicability ? 'passed' : 'failed'}`}>
          <strong>Industrial Applicability:</strong> 
          {reviewResults.industrialApplicability ? '✅ Passed' : '❌ Failed'}
          {reviewResults.industrialApplicability && (
            <p className="feedback positive">
              Your invention has clear practical applications in industry.
            </p>
          )}
        </div>
      </div>
      
      <div className="expert-feedback">
        <h3>Expert Feedback</h3>
        <div className="feedback-message">
          <p>"This patent demonstrates a novel approach to waste management using AI. The inventive step is clear in how it combines sensor technology with predictive algorithms. The industrial applications are well-defined and address a significant environmental challenge."</p>
          <div className="reviewer">
            <span>- Dr. Patel, Patent Reviewer</span>
          </div>
        </div>
      </div>
      
      <div className="next-steps">
        <h3>Next Steps</h3>
        <ol>
          <li>Select your expo preparation preferences</li>
          <li>Choose your presentation arena</li>
          <li>Register for the InventiCon event</li>
        </ol>
        
        <button className="primary-btn" onClick={handleProceedToExpo}>
          Proceed to Expo Preparation
        </button>
      </div>
    </div>
  );
};

export default AIReviewResult;
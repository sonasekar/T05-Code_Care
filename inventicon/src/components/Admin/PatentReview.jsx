import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './PatentReview.css';

const PatentReview = () => {
  const { user } = useContext(AuthContext);
  const [patents, setPatents] = useState([]);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [decision, setDecision] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock data - in real app this would come from API
    const mockPatents = [
      {
        id: 'pat1',
        title: 'AI-Powered Waste Management System',
        student: 'Rahul Sharma',
        institution: 'IIT Bombay',
        submittedDate: '2023-05-18',
        status: 'pending',
        type: 'new',
        verificationResults: {
          novelty: true,
          inventiveStep: true,
          industrialApplicability: true
        },
        documentUrl: '#'
      },
      {
        id: 'pat2',
        title: 'Smart Water Purification Device',
        student: 'Priya Patel',
        institution: 'NIT Surat',
        submittedDate: '2023-05-20',
        status: 'pending',
        type: 'existing',
        verificationResults: {
          novelty: true,
          inventiveStep: false,
          industrialApplicability: true
        },
        documentUrl: '#'
      }
    ];
    setPatents(mockPatents);
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedPatents = patents.map(pat => {
        if (pat.id === selectedPatent.id) {
          return { ...pat, status: decision, feedback };
        }
        return pat;
      });
      
      setPatents(updatedPatents);
      setSelectedPatent(null);
      setDecision('');
      setFeedback('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="patent-review">
      <h2>Patent Review Panel</h2>
      <p className="subtitle">
        Review and verify student patent applications for InventiCon finals
      </p>
      
      <div className="review-container">
        <div className="patents-list">
          <h3>Pending Reviews ({patents.filter(p => p.status === 'pending').length})</h3>
          <div className="list-header">
            <span>Title</span>
            <span>Type</span>
            <span>Submitted</span>
            <span>Action</span>
          </div>
          
          {patents.filter(p => p.status === 'pending').map(patent => (
            <div 
              key={patent.id} 
              className={`patent-item ${selectedPatent?.id === patent.id ? 'selected' : ''}`}
              onClick={() => setSelectedPatent(patent)}
            >
              <span className="title">{patent.title}</span>
              <span className="type">
                {patent.type === 'new' ? 'New Filing' : 'Existing Patent'}
              </span>
              <span className="date">{patent.submittedDate}</span>
              <button 
                className="review-btn"
                onClick={() => setSelectedPatent(patent)}
              >
                Review
              </button>
            </div>
          ))}
          
          <h3>Reviewed Patents</h3>
          {patents.filter(p => p.status !== 'pending').map(patent => (
            <div key={patent.id} className="patent-item reviewed">
              <span className="title">{patent.title}</span>
              <span className={`status ${patent.status}`}>
                {patent.status === 'approved' ? 'Approved' : 'Rejected'}
              </span>
              <span className="date">{patent.submittedDate}</span>
            </div>
          ))}
        </div>
        
        {selectedPatent && (
          <div className="review-panel">
            <h3>Review: {selectedPatent.title}</h3>
            <div className="patent-meta">
              <p><strong>Student:</strong> {selectedPatent.student}</p>
              <p><strong>Institution:</strong> {selectedPatent.institution}</p>
              <p><strong>Type:</strong> {selectedPatent.type === 'new' ? 'New Filing' : 'Existing Patent'}</p>
              <p><strong>Submitted:</strong> {selectedPatent.submittedDate}</p>
            </div>
            
            <div className="verification-results">
              <h4>AI Verification Results:</h4>
              <div className={`criteria ${selectedPatent.verificationResults.novelty ? 'passed' : 'failed'}`}>
                <strong>Novelty:</strong> 
                {selectedPatent.verificationResults.novelty ? '✅ Passed' : '❌ Failed'}
              </div>
              
              <div className={`criteria ${selectedPatent.verificationResults.inventiveStep ? 'passed' : 'failed'}`}>
                <strong>Inventive Step:</strong> 
                {selectedPatent.verificationResults.inventiveStep ? '✅ Passed' : '❌ Failed'}
              </div>
              
              <div className={`criteria ${selectedPatent.verificationResults.industrialApplicability ? 'passed' : 'failed'}`}>
                <strong>Industrial Applicability:</strong> 
                {selectedPatent.verificationResults.industrialApplicability ? '✅ Passed' : '❌ Failed'}
              </div>
            </div>
            
            <div className="document-preview">
              <h4>Patent Document</h4>
              <iframe 
                src={selectedPatent.documentUrl} 
                title="Patent document"
                width="100%" 
                height="400px"
              />
              <a href={selectedPatent.documentUrl} download className="download-btn">
                Download Document
              </a>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                <label>Decision*</label>
                <div className="decision-options">
                  <label>
                    <input
                      type="radio"
                      name="decision"
                      value="approved"
                      checked={decision === 'approved'}
                      onChange={() => setDecision('approved')}
                      required
                    />
                    Approve for Finals
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="decision"
                      value="rejected"
                      checked={decision === 'rejected'}
                      onChange={() => setDecision('rejected')}
                    />
                    Request Revisions
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Feedback*</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide detailed feedback..."
                  rows="5"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPatent(null);
                    setDecision('');
                    setFeedback('');
                  }}
                  className="secondary-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="primary-btn"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatentReview;
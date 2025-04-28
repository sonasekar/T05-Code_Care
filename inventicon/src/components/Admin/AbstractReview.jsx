import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
//import './AbstractReview.css';

const AbstractReview = () => {
  //const { user } = useContext(AuthContext);
  const [abstracts, setAbstracts] = useState([]);
  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [decision, setDecision] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockAbstracts = [
      {
        id: 'abs1',
        title: 'AI-Powered Waste Management',
        student: 'Rahul Sharma',
        institution: 'IIT Bombay',
        submittedDate: '2023-05-10',
        status: 'pending',
        documentUrl: '#',
        category: 'Artificial Intelligence'
      },
      {
        id: 'abs2',
        title: 'Low-Cost Water Purification',
        student: 'Priya Patel',
        institution: 'NIT Surat',
        submittedDate: '2023-05-12',
        status: 'pending',
        documentUrl: '#',
        category: 'Sustainable Technology'
      }
    ];
    setAbstracts(mockAbstracts);
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedAbstracts = abstracts.map(abs => {
        if (abs.id === selectedAbstract.id) {
          return { ...abs, status: decision, feedback };
        }
        return abs;
      });
      
      setAbstracts(updatedAbstracts);
      setSelectedAbstract(null);
      setFeedback('');
      setDecision('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="abstract-review">
      <h2>Abstract Review Panel</h2>
      <p className="subtitle">
        Review and approve student project abstracts for InventiCon participation
      </p>
      
      <div className="review-container">
        <div className="abstracts-list">
          <h3>Pending Reviews ({abstracts.filter(a => a.status === 'pending').length})</h3>
          <div className="list-header">
            <span>Title</span>
            <span>Category</span>
            <span>Submitted</span>
            <span>Action</span>
          </div>
          
          {abstracts.filter(a => a.status === 'pending').map(abstract => (
            <div 
              key={abstract.id} 
              className={`abstract-item ${selectedAbstract?.id === abstract.id ? 'selected' : ''}`}
              onClick={() => setSelectedAbstract(abstract)}
            >
              <span className="title">{abstract.title}</span>
              <span className="category">{abstract.category}</span>
              <span className="date">{abstract.submittedDate}</span>
              <button 
                className="review-btn"
                onClick={() => setSelectedAbstract(abstract)}
              >
                Review
              </button>
            </div>
          ))}
          
          <h3>Reviewed Abstracts</h3>
          {abstracts.filter(a => a.status !== 'pending').map(abstract => (
            <div key={abstract.id} className="abstract-item reviewed">
              <span className="title">{abstract.title}</span>
              <span className={`status ${abstract.status}`}>
                {abstract.status === 'approved' ? 'Approved' : 'Rejected'}
              </span>
              <span className="date">{abstract.submittedDate}</span>
            </div>
          ))}
        </div>
        
        {selectedAbstract && (
          <div className="review-panel">
            <h3>Review: {selectedAbstract.title}</h3>
            <div className="abstract-meta">
              <p><strong>Student:</strong> {selectedAbstract.student}</p>
              <p><strong>Institution:</strong> {selectedAbstract.institution}</p>
              <p><strong>Category:</strong> {selectedAbstract.category}</p>
              <p><strong>Submitted:</strong> {selectedAbstract.submittedDate}</p>
            </div>
            
            <div className="document-preview">
              <h4>Abstract Document</h4>
              <iframe 
                src={selectedAbstract.documentUrl} 
                title="Abstract document"
                width="100%" 
                height="400px"
              />
              <a href={selectedAbstract.documentUrl} download className="download-btn">
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
                    Approve for InventiCon
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
                  placeholder="Provide constructive feedback..."
                  rows="5"
                  required
                />
                <small>
                  For approved projects, include next steps. For rejections, explain 
                  what improvements are needed.
                </small>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAbstract(null);
                    setFeedback('');
                    setDecision('');
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

export default AbstractReview;
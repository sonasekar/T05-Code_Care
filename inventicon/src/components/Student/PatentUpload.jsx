import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './PatentUpload.css';

const PatentUpload = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isExisting = queryParams.get('existing') === 'true';
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    inventors: user ? `${user.name}` : '',
    description: '',
    documents: null,
    paymentProof: null,
    existingPatent: null
  });
  
  const [verificationResults, setVerificationResults] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkPatentCriteria = () => {
    // Simulate AI verification - set to always pass for demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          novelty: true,
          inventiveStep: true,
          industrialApplicability: true
        });
      }, 3000);
    });
  };

  const verifyPatent = async () => {
    setIsVerifying(true);
    const results = await checkPatentCriteria();
    setVerificationResults(results);
    setIsVerifying(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, file) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.inventors) newErrors.inventors = 'Inventor names are required';
      if (!formData.description) newErrors.description = 'Description is required';
    }
    
    if (currentStep === 2) {
      if (isExisting && !formData.existingPatent) {
        newErrors.existingPatent = 'Patent document is required';
      }
      if (!isExisting && !formData.documents) {
        newErrors.documents = 'Patent documents are required';
      }
    }
    
    if (currentStep === 3 && !formData.paymentProof) {
      newErrors.paymentProof = 'Payment proof is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      if (step === 2 && isExisting) {
        verifyPatent();
      }
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Patent submitted:', formData);
        // Set patent status to granted in local storage
        localStorage.setItem('patentStatus', 'granted');
        setIsSubmitting(false);
        navigate('/student/dashboard');
      }, 2000);
    }
  };

  const handleProceedToExpo = () => {
    // Update patent status to granted in local storage
    localStorage.setItem('patentStatus', 'granted');
    // Navigate to expo preparation
    navigate('/student/expo-preparation');
  };

  const renderStep1 = () => (
    <div className="patent-step">
      <h3>Step 1: Patent Information</h3>
      <div className="form-group">
        <label>Patent Title*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label>Inventors*</label>
        <input
          type="text"
          name="inventors"
          value={formData.inventors}
          onChange={handleChange}
          placeholder="Full names separated by commas"
          className={errors.inventors ? 'error' : ''}
        />
        {errors.inventors && <span className="error-message">{errors.inventors}</span>}
      </div>
      
      <div className="form-group">
        <label>Detailed Description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="6"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => {
    if (isExisting) {
      return (
        <div className="patent-step">
          <h3>Step 2: Upload Existing Patent</h3>
          <div className="form-group">
            <label>Existing Patent Document*</label>
            <div className="file-upload">
              <input
                type="file"
                id="existing-patent"
                accept=".pdf"
                onChange={(e) => handleFileChange('existingPatent', e.target.files[0])}
                className={errors.existingPatent ? 'error' : ''}
              />
              <label htmlFor="existing-patent">
                {formData.existingPatent ? formData.existingPatent.name : 'Choose file (PDF only)'}
              </label>
              {errors.existingPatent && <span className="error-message">{errors.existingPatent}</span>}
            </div>
            <small>
              Upload your existing provisional patent document (PDF format)
            </small>
          </div>
        </div>
      );
    }
    
    return (
      <div className="patent-step">
        <h3>Step 2: Upload Documents</h3>
        <div className="form-group">
          <label>Patent Specification Document*</label>
          <div className="file-upload">
            <input
              type="file"
              id="patent-docs"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange('documents', e.target.files[0])}
              className={errors.documents ? 'error' : ''}
            />
            <label htmlFor="patent-docs">
              {formData.documents ? formData.documents.name : 'Choose file (PDF or Word)'}
            </label>
            {errors.documents && <span className="error-message">{errors.documents}</span>}
          </div>
          <small>
            Should include: Abstract, claims, drawings, and detailed description.
            <a href="/patent-template.pdf" download> Download template</a>
          </small>
        </div>
        
        <div className="guidelines">
          <h4>Indian Patent Office Requirements:</h4>
          <ul>
            <li>Form 1 - Application for grant of patent</li>
            <li>Form 2 - Provisional/Complete specification</li>
            <li>Form 3 - Statement of undertaking</li>
            <li>Form 5 - Declaration of inventorship</li>
            <li>Form 26 - Authorization of patent agent (if applicable)</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    if (isExisting && step === 2) {
      return (
        <div className="patent-step">
          <h3>Step 3: Patent Verification</h3>
          {isVerifying ? (
            <div className="verification-loading">
              <div className="spinner"></div>
              <p>Verifying your patent against InventiCon criteria...</p>
            </div>
          ) : verificationResults ? (
            <div className="verification-results">
              <h4>Verification Results:</h4>
              
              <div className={`criteria ${verificationResults.novelty ? 'passed' : 'failed'}`}>
                <strong>Novelty:</strong> 
                {verificationResults.novelty ? '✅ Passed' : '❌ Failed'}
              </div>
              
              <div className={`criteria ${verificationResults.inventiveStep ? 'passed' : 'failed'}`}>
                <strong>Inventive Step:</strong> 
                {verificationResults.inventiveStep ? '✅ Passed' : '❌ Failed'}
              </div>
              
              <div className={`criteria ${verificationResults.industrialApplicability ? 'passed' : 'failed'}`}>
                <strong>Industrial Applicability:</strong> 
                {verificationResults.industrialApplicability ? '✅ Passed' : '❌ Failed'}
              </div>
              
              {verificationResults.novelty && verificationResults.inventiveStep && verificationResults.industrialApplicability ? (
                <div className="verification-success">
                  <div className="status-banner approved">
                    <h3>Congratulations! Your patent has been approved</h3>
                    <p>You can now proceed to the Final Expo Preparation</p>
                  </div>
                  <div className="next-steps">
                    <h4>Next Steps:</h4>
                    <ol>
                      <li>Complete your profile details</li>
                      <li>Prepare your presentation materials</li>
                      <li>Select your expo arena</li>
                    </ol>
                    <button 
                      className="primary-btn"
                      onClick={handleProceedToExpo}
                    >
                      Proceed to Expo Preparation
                    </button>
                  </div>
                </div>
              ) : (
                <div className="warning-message">
                  <p>Your patent doesn't meet all criteria. You can still submit for admin review.</p>
                  <button 
                    className="secondary-btn"
                    onClick={() => setStep(4)}
                  >
                    Continue with Submission
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      );
    }
    
    return (
      <div className="patent-step">
        <h3>Step {isExisting ? 4 : 3}: Payment & Submission</h3>
        <div className="form-group">
          <label>Upload Payment Proof*</label>
          <div className="file-upload">
            <input
              type="file"
              id="payment-proof"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange('paymentProof', e.target.files[0])}
              className={errors.paymentProof ? 'error' : ''}
            />
            <label htmlFor="payment-proof">
              {formData.paymentProof ? formData.paymentProof.name : 'Choose file (PDF or image)'}
            </label>
            {errors.paymentProof && <span className="error-message">{errors.paymentProof}</span>}
          </div>
          <small>
            Payment of ₹1,600 for individuals/startups or ₹4,000 for large entities.
            <a href="https://ipindia.gov.in" target="_blank" rel="noopener noreferrer">
              Official fee structure
            </a>
          </small>
        </div>
        
        <div className="terms-check">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I confirm that all information provided is accurate and I understand that
            this is a provisional patent application.
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="patent-upload">
      <h2>{isExisting ? 'Existing Patent Submission' : 'Provisional Patent Application'}</h2>
      <p className="subtitle">
        {isExisting 
          ? 'Verify your existing patent for InventiCon participation'
          : 'File a new provisional patent with the Indian Patent Office'}
      </p>
      
      <div className="progress-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Information</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. {isExisting ? 'Upload' : 'Documents'}</div>
        {isExisting && <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Verification</div>}
        <div className={`step ${step >= (isExisting ? 4 : 3) ? 'active' : ''}`}>
          {isExisting ? 4 : 3}. {isExisting ? 'Payment' : 'Submission'}
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {isExisting && step === 3 && renderStep3()}
        {(step === (isExisting ? 4 : 3)) && renderStep3()}
        
        {!(isExisting && step === 2 && verificationResults?.novelty && verificationResults?.inventiveStep && verificationResults?.industrialApplicability) && (
          <div className="form-actions">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="secondary-btn">
                Back
              </button>
            )}
            
            {step < (isExisting ? 4 : 3) ? (
              <button type="button" onClick={handleNext} className="primary-btn">
                Next Step
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="primary-btn">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        )}
      </form>
      
      <div className="patent-info">
        <h3>Why File a Provisional Patent?</h3>
        <ul>
          <li>Secures "Patent Pending" status for your invention</li>
          <li>Gives you 12 months to file complete specification</li>
          <li>Lower cost than full patent application</li>
          <li>Establishes priority date for your invention</li>
        </ul>
        
        <h3>InventiCon Support</h3>
        <p>
          Our team will review your documents before submission and provide feedback
          to ensure your application meets all requirements.
        </p>
      </div>
    </div>
  );
};

export default PatentUpload;
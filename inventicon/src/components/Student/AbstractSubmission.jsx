import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const AbstractSubmission = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Abstract Submitted:', { title, abstract, file });
    setSubmitted(true);
    // Submit to backend here
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main>
        <h2>Abstract Submission</h2>
        <p className="subtitle">Upload your abstract to participate in InventiCon.</p>

        {submitted ? (
          <p className="success-message">Your abstract has been submitted successfully!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Abstract Description</label>
              <textarea
                rows="6"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group file-upload">
              <label htmlFor="file-upload">Upload Abstract (PDF only)</label>
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              {file && <p>Selected file: {file.name}</p>}
            </div>

            <button type="submit">Submit Abstract</button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AbstractSubmission;
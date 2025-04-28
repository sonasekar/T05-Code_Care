import React, { useState, useEffect } from 'react';
import './ResultDashboard.css';


const ResultsDashboard = () => {
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newResult, setNewResult] = useState({
    participantName: '',
    projectTitle: '',
    score: '',
    grade: '',
    evaluatorName: '',
    comments: ''
  });

  useEffect(() => {
    // Initial mock results
    const mockResults = [
      {
        participantName: 'John Doe',
        projectTitle: 'Solar-Powered Car',
        score: '92%',
        grade: 'A',
        evaluatorName: 'Dr. Smith',
        comments: 'Excellent innovation!'
      },
      {
        participantName: 'Sophia Liu',
        projectTitle: 'AI Medical Assistant',
        score: '88%',
        grade: 'B',
        evaluatorName: 'Dr. Allen',
        comments: 'Great application of AI!'
      }
    ];
    setResults(mockResults);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResult(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setResults(prev => [...prev, newResult]);
    setNewResult({
      participantName: '',
      projectTitle: '',
      score: '',
      grade: '',
      evaluatorName: '',
      comments: ''
    });
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Results Dashboard</h2>
      <p>Publish results and project evaluations for students/participants.</p>

      <button className="primary-btn" onClick={() => setShowForm(true)}>
        I Want to Publish a Result
      </button>

      {showForm && (
        <div className="investor-form">
          <h3>Enter Result Details</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="participantName"
              placeholder="Participant/Student Name"
              value={newResult.participantName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="projectTitle"
              placeholder="Project Title"
              value={newResult.projectTitle}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="score"
              placeholder="Score (%)"
              value={newResult.score}
              onChange={handleInputChange}
              required
            />
            <select
              name="grade"
              value={newResult.grade}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
            <input
              type="text"
              name="evaluatorName"
              placeholder="Evaluator/Judge Name"
              value={newResult.evaluatorName}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="comments"
              placeholder="Comments/Feedback"
              value={newResult.comments}
              onChange={handleInputChange}
              rows="3"
              required
            ></textarea>

            <div className="form-actions">
              <button type="submit" className="primary-btn">Submit</button>
              <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="investor-table">
        <h3>Published Results</h3>
        <table>
          <thead>
            <tr>
              <th>Participant Name</th>
              <th>Project Title</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Evaluator</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.participantName}</td>
                <td>{result.projectTitle}</td>
                <td>{result.score}</td>
                <td>{result.grade}</td>
                <td>{result.evaluatorName}</td>
                <td>{result.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsDashboard;

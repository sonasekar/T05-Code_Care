import React, { useState, useEffect } from 'react';
import './InvestorDashboard.css';

const InvestorDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newInvestor, setNewInvestor] = useState({
    name: '',
    locality: '',
    email: '',
    amount: '',
    type: 'Individual'
  });

  useEffect(() => {
    const mockInvestors = [
      {
        name: 'John Doe',
        locality: 'New York, USA',
        email: 'john.doe@example.com',
        amount: '50,000 USD',
        type: 'Individual'
      },
      {
        name: 'Arun Mehta',
        locality: 'Mumbai, India',
        email: 'arun.mehta@example.com',
        amount: '30,00,000 INR',
        type: 'Group Investors'
      },
      {
        name: 'TechVenture Capital',
        locality: 'San Francisco, USA',
        email: 'contact@techventure.com',
        amount: '2,00,000 USD',
        type: 'Company'
      },
      {
        name: 'Sophia Liu',
        locality: 'Shanghai, China',
        email: 'sophia.liu@example.cn',
        amount: '1,00,000 USD',
        type: 'Individual'
      }
    ];

    setInvestors(mockInvestors);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInvestors(prev => [...prev, newInvestor]);
    setNewInvestor({
      name: '',
      locality: '',
      email: '',
      amount: '',
      type: 'Individual'
    });
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Investor Access</h2>
      <p>Review high-potential student projects and express investment interest.</p>

      <button className="primary-btn" onClick={() => setShowForm(true)}>
        I Wish to Invest
      </button>

      {showForm && (
        <div className="investor-form">
          <h3>Enter Your Investment Details</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newInvestor.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="locality"
              placeholder="Locality"
              value={newInvestor.locality}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newInvestor.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="amount"
              placeholder="Investment Amount (INR/USD)"
              value={newInvestor.amount}
              onChange={handleInputChange}
              required
            />
            <select
              name="type"
              value={newInvestor.type}
              onChange={handleInputChange}
            >
              <option value="Individual">Individual</option>
              <option value="Group Investors">Group Investors</option>
              <option value="Company">Company</option>
            </select>

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
        <h3>Registered Investors</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Locality</th>
              <th>Email</th>
              <th>Investment Amount</th>
              <th>Investor Type</th>
            </tr>
          </thead>
          <tbody>
            {investors.map((investor, index) => (
              <tr key={index}>
                <td>{investor.name}</td>
                <td>{investor.locality}</td>
                <td>{investor.email}</td>
                <td>{investor.amount}</td>
                <td>{investor.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorDashboard;

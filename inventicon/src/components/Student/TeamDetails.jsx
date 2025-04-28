import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const TeamDetails = () => {
  const [team, setTeam] = useState([{ name: '', email: '', role: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...team];
    updated[index][field] = value;
    setTeam(updated);
  };

  const addMember = () => {
    setTeam([...team, { name: '', email: '', role: '' }]);
  };

  const removeMember = (index) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Team Submitted:', team);
    // Submit to backend here
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main>
        <h2>Team Details</h2>
        <form onSubmit={handleSubmit}>
          {team.map((member, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) => handleChange(index, 'email', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                required
              />
              {team.length > 1 && (
                <button type="button" onClick={() => removeMember(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addMember}>Add Member</button>
          <button type="submit">Save Team</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default TeamDetails;

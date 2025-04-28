import React, { useState, useEffect } from 'react';
import './InvestorDashboard.css'; // reuse styles if needed

const LandownerDashboard = () => {
  const [lands, setLands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLand, setNewLand] = useState({
    name: '',
    area: '',
    rentalRate: '',
    email: '',
    mobile: '',
    photo: ''
  });

  useEffect(() => {
    // Initial mock lands with sample photos
    const mockLands = [
      {
        name: 'Green Valley Farms',
        area: '2.5 km²',
        rentalRate: '5,000 INR / day',
        email: 'greenvalley@example.com',
        mobile: '+91 9876543210',
        photo: 'https://media.istockphoto.com/id/1131058356/photo/empty-lot.jpg?s=612x612&w=0&k=20&c=4Xh5-m6Q1pgeEl51bKTOqfC5vtlrszcnO_gVZWDUPTQ='
      },
      {
        name: 'Sunrise Gardens',
        area: '5000 m²',
        rentalRate: '800 USD / day',
        email: 'sunrise@example.com',
        mobile: '+1 234 567 8910',
        photo: 'https://media.dreamstime.com/b/landscape-empty-lot-illustration-blue-sky-222413145.jpg'
      }
    ];
    setLands(mockLands);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewLand(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setNewLand(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLands(prev => [...prev, newLand]);
    setNewLand({
      name: '',
      area: '',
      rentalRate: '',
      email: '',
      mobile: '',
      photo: ''
    });
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Landowner / Vendor Access</h2>
      <p>List your available land for event hosting and rentals.</p>

      <button className="primary-btn" onClick={() => setShowForm(true)}>
        I Wish to Add My Land
      </button>

      {showForm && (
        <div className="investor-form">
          <h3>Enter Land Details</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Land Name"
              value={newLand.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="area"
              placeholder="Overall Area Coverage (m²/km²)"
              value={newLand.area}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="rentalRate"
              placeholder="Rental Rate per Day (INR/USD)"
              value={newLand.rentalRate}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newLand.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={newLand.mobile}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
              required
            />

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
        <h3>Available Lands</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Rental Rate</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land, index) => (
              <tr key={index}>
                <td>{land.name}</td>
                <td>{land.area}</td>
                <td>{land.rentalRate}</td>
                <td>{land.email}</td>
                <td>{land.mobile}</td>
                <td>
                  {land.photo ? (
                    <img src={land.photo} alt="Land" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                  ) : (
                    'No Image'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandownerDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createDonation, getMyDonations } from "../api/donation.api";
import "./Dashboard.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    expiryDate: "",
    photoUrl: "",
    location: "",
    status: "Available"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setIsLoading(true);
        const response = await getMyDonations();
        setDonations(response.data.donations);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await createDonation(formData);
      console.log("This is form data :" ,formData)
      console.log("Donation created:", response);
      
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        title: "",
        quantity: "",
        expiryDate: "",
        photoUrl: "",
        location: "",
        status: "Available"
      });
    } catch (err) {
      console.error("Donation creation error:", err);
      setError(err.response?.data?.message || "Failed to create donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          setFormData({
            ...formData,
            location: coords
          });
        },
        (err) => {
          setError("Unable to retrieve your location. Please enter manually.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'status-available';
      case 'Claimed': return 'status-claimed';
      case 'Picked': return 'status-picked';
      case 'Pending': return 'status-pending';
      case 'Expired': return 'status-expired';
      default: return '';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        <div className="donation-form-container">
          <h2>Create New Donation</h2>
          
          {success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Donation Created Successfully!</h3>
              <p>Your donation has been listed and is now available for NGOs to claim.</p>
              <div className="button-group">
                <button 
                  className="primary-button"
                  onClick={() => setSuccess(false)}
                >
                  Create Another Donation
                </button>
                <button 
                  className="secondary-button"
                  onClick={() => navigate({to:"/dashboard/donor"})}
                >
                  View My Donations
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Food Title</label>
                <input 
                  type="text" 
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter food title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="quantity">Quantity (servings)</label>
                <input 
                  type="number" 
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Number of servings"
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input 
                  type="date" 
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="photoUrl">Photo URL</label>
                <input 
                  type="url" 
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL of the food"
                />
                <small>Provide a URL to an image of the food (optional)</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <div className="location-input-group">
                  <input 
                    type="text" 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    required
                  />
                  <button 
                    type="button" 
                    className="location-button"
                    onClick={handleGetLocation}
                  >
                    Get Current Location
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Claimed">Claimed</option>
                  <option value="Picked">Picked</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Creating Donation..." : "Create Donation"}
              </button>
            </form>
          )}
        </div>

        <div className="my-donations-container">
          <h2>My Donations</h2>
          
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : donations && donations.length > 0 ? (
            <div className="donations-grid">
              {donations.map((donation, index) => (
                <div className="donation-card" key={donation._id || index}>
                  {donation.photoUrl ? (
                    <div className="donation-image">
                      <img src={donation.photoUrl} alt={donation.title} />
                    </div>
                  ) : (
                    <div className="donation-image donation-image-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                  
                  <div className="donation-content">
                    <h3 className="donation-title">{donation.title}</h3>
                    
                    <div className="donation-details">
                      <div className="donation-detail">
                        <span className="detail-label">Quantity:</span>
                        <span className="detail-value">{donation.quantity} servings</span>
                      </div>
                      
                      <div className="donation-detail">
                        <span className="detail-label">Expires:</span>
                        <span className="detail-value">
                          {donation.expiryDate ? formatDate(donation.expiryDate) : 'Not specified'}
                        </span>
                      </div>
                      
                      <div className="donation-detail">
                        <span className="detail-label">Status:</span>
                        <span className={`detail-value status-badge ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-donations">
              <p>You haven't made any donations yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

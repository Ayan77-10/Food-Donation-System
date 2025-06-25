import React, { useState, useEffect } from "react";
import {getAvailableDonations, requestDonation, getClaimedDonations } from  "../api/receive.api";
import "./DashboardNgo.css";

const DashBoardNgo = () => {
  const [donations, setDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingClaimed, setIsLoadingClaimed] = useState(true);
  const [error, setError] = useState("");
  const [claimedError, setClaimedError] = useState("");
  const [claimingDonation, setClaimingDonation] = useState(false);
  const [claimError, setClaimError] = useState("");
  const [pendingDonations, setPendingDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setIsLoading(true);
        const response = await getAvailableDonations();
        setDonations(response.data.donations);
        setPendingDonations(response.data.donations);
      } catch (err) {
        setError(err.message || "Failed to load donations");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchClaimedDonations = async () => {
      try {
        setIsLoadingClaimed(true);
        const response = await getClaimedDonations();
        console.log(response.data.donations);
        setClaimedDonations(response.data.donations);
      } catch (err) {
        setClaimedError(err.message || "Failed to load claimed donations");
      } finally {
        setIsLoadingClaimed(false);
      }
    };
    // cons reverseGeocode = (lat, lng) => {
    //   const apiKey = "AIzaSyC1111111111111111111111111111111"; // Replace with your actual API key
    //   const url= `http://api.openweathermap.org/geo/1.0/reverse?lat={}&lon={}&limit=5&appid={LOC_API_key}`


    fetchDonations();
    fetchClaimedDonations();
  }, []);

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

  // Format location for display
  const formatLocation = (location) => {
    if (!location) return 'Not specified';
    
    try {
      // If location is an object with coordinates
      if (typeof location === 'object' && location.coordinates && Array.isArray(location.coordinates)) {
        // Coordinates are stored as [longitude, latitude]
        // Display as "latitude, longitude" for better readability
        return `${location.coordinates[1].toFixed(6)}, ${location.coordinates[0].toFixed(6)}`;
      }
      
      // If it's a string or something else that can be converted to string
      return String(location);
    } catch (error) {
      console.error("Error formatting location:", error);
      return 'Location format error';
    }
  };

  const handleClaimDonation = async (donationId) => {
    try {
      setClaimingDonation(true);
      setClaimError("");
      
      const response = await requestDonation(donationId);
      console.log("requested Donation :", response.data);
      
      // // Add the claimed donation to the claimed donations list
      // setClaimedDonations(prevClaimed => [response.data.donation, ...prevClaimed]);
      
      // // Remove the claimed donation from the available donations list
      // setDonations(prevDonations => 
      //   prevDonations.filter(donation => donation._id !== donationId)
      // );
      
      // Show success message
      // alert("Donation claimed successfully!");
    } catch (error) {
      console.error("Error claiming donation:", error);
      setClaimError(error.response?.data?.message || "Failed to claim donation");
    } finally {
      // setClaimingDonation(false);
    }
  };

  // Function to render a donation card
  const renderDonationCard = (donation, isClaimed = false) => (
    <div className="donation-card" key={donation._id}>
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
            <span className="detail-label">Location:</span>
            <span className="detail-value location-value">
              {formatLocation(donation.location)}
            </span>
          </div>
          
          <div className="donation-detail">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-badge ${getStatusColor(donation.status)}`}>
              {donation.status}
            </span>
          </div>
          
          {isClaimed && (
            <div className="donation-detail">
              <span className="detail-label">Claimed On:</span>
              <span className="detail-value">
                {formatDate(donation.updatedAt || donation.createdAt)}
              </span>
            </div>
          )}
        </div>
        {
          donation.status === 'Pending' && (
            <div className="donation-detail">
              <span className="detail-label">Requested On:</span>
              <span className="detail-value">
                {formatDate(donation.updatedAt || donation.createdAt)}
              </span>
            </div>
          )
        }
        {!isClaimed && donation.status === 'Available' && (
          <button 
            className="claim-button"
            onClick={() => handleClaimDonation(donation._id)}
            disabled={claimingDonation}
          >
            {claimingDonation ? "Processing..." : "Claim Donation"}
          </button>
        )}
        
        {isClaimed && (
          <button className="pickup-button">
            Mark as Picked Up
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-ngo-container">
      <div className="available-donations-container">
        <h2>Available Donations</h2>
        
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading available donations...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : donations.length > 0 ? (
          <div className="donations-grid">
            {donations.map(donation => renderDonationCard(donation))}
          </div>
        ) : (
          <div className="no-donations">
            <div className="no-donations-icon">🍽️</div>
            <h3>No Donations Available</h3>
            <p>There are currently no available food donations. Please check back later.</p>
          </div>
        )}
        
        {claimError && <div className="error-message">{claimError}</div>}
      </div>
      
      <div className="claimed-donations-container">
        <h2>My Claimed Donations</h2>
        
        {isLoadingClaimed ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading claimed donations...</p>
          </div>
        ) : claimedError ? (
          <div className="error-message">{claimedError}</div>
        ) : claimedDonations.length > 0 ? (
          <div className="donations-grid">
            {claimedDonations.map(donation => renderDonationCard(donation, true))}
          </div>
        ) : (
          <div className="no-donations">
            <div className="no-donations-icon">📋</div>
            <h3>No Claimed Donations</h3>
            <p>You haven't claimed any donations yet. Available donations will appear here after you claim them.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardNgo;

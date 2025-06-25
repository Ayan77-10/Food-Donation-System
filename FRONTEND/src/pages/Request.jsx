import React, { useState, useEffect } from "react";
import { getMyRequests, acceptRequest } from "../api/request.api";
import "./Request.css";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const response = await getMyRequests();
        setRequests(response.data.requests);
      } catch (err) {
        setError("You are not authorized to view this page.Kindly login ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = async (id) => {
    try {
      const response = await acceptRequest(id);
      console.log(response.data);
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      setError("Failed to accept request. Please try again.");
    }
  };

  // const handleRejectRequest = async (id) => {
  //     try {
  //         const response = await rejectRequest(id);
  //         console.log(response.data);
  //         setRequests(requests.filter(request => request._id !== id));
  //     } catch (error) {
  //         setError('Failed to reject request. Please try again.');
  //     }
  // };

  return (
    <div className="requests-page">
      <div className="requests-container">
        <div className="requests-header">
          <h2>Donation Requests</h2>
        </div>

        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading requests...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && requests.length === 0 && (
          <div className="no-requests">
            <div className="no-requests-icon">📭</div>
            <h3>No Donation Requests</h3>
            <p>You don't have any donation requests at the moment.</p>
          </div>
        )}

        {!isLoading && !error && requests.length > 0 && (
          <div className="requests-grid">
            {requests.map((request) => (
              <div className="request-card" key={request._id}>
                <div className="request-card-header">
                  <h3 className="request-card-title">{request.title}</h3>
                  <div className="request-card-subtitle">
                    <span className="request-from">
                      From: {request.from?.name || "Anonymous"}
                    </span>
                    <span className="request-date">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="request-card-content">
                  <div className="request-details">
                    <div className="request-detail">
                      <span className="detail-label">Status:</span>
                      <span
                        className={`status-badge status-${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>
                    </div>

                    {request.description && (
                      <div className="request-detail">
                        <span className="detail-label">Description:</span>
                        <span className="detail-value">
                          {request.description}
                        </span>
                      </div>
                    )}

                    {request.quantity && (
                      <div className="request-detail">
                        <span className="detail-label">Quantity:</span>
                        <span className="detail-value">{request.quantity}</span>
                      </div>
                    )}

                    {request.location && (
                      <div className="request-detail">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">
                          {request.location.coordinates
                            ? `${request.location.coordinates[1]}, ${request.location.coordinates[0]}`
                            : "Not specified"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="request-card-footer">
                  <div className="request-actions">
                    <button
                      className="action-button accept-button"
                      onClick={() => handleAcceptRequest(request._id)}
                    >
                      Accept (Volunteer Arrived)
                    </button>
                    <button
                      className="action-button reject-button"
                      onClick={() => handleRejectRequest(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;

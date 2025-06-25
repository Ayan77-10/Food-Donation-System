import React, { useEffect, useState } from "react";
import { getAllDonations, getAvailableDonations } from "../api/receive.api";
import "./Counter.css";
import 'animate.css'

const Counter = () => {
  const [donations, setDonations] = useState([]);
  const [allAvailableDonations, setAllAvailableDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchDonations = async () => {
      setIsLoading(true);
      try {
        const response = await getAllDonations();
        setDonations(response.data); // Assuming API sends data as an array
        const availableDonations = await getAvailableDonations();
        setAllAvailableDonations(availableDonations.data.donations); // Assuming API sends data as an array
      } catch (err) {
        setError(err.message || "Failed to load donations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, []);
  return (
    <section className="counter-section">
      <div className="counter-container">
        <div className="counter-item">
          <div className="counter-value">
            {isLoading ? (
              <div className="counter-loading"></div>
            ) : (
              <span className="counter-number animate__animated animate__fadeIn">{donations}</span>
            )}
          </div>
          <div className="counter-label">Total Donations</div>
        </div>
        
        <div className="counter-item">
          <div className="counter-value">
            {isLoading ? (
              <div className="counter-loading"></div>
            ) : (
              <span className="counter-number animate__animated animate__fadeIn">{Math.floor(donations * 3.5)}</span>
            )}
          </div>
          <div className="counter-label">People Fed</div>
        </div>
        
        <div className="counter-item">
          <div className="counter-value">
            {isLoading ? (
              <div className="counter-loading"></div>
            ) : (
              <span className="counter-number animate__animated animate__fadeIn">{allAvailableDonations.length}</span>
            )}
          </div>
          <div className="counter-label">Available Donations</div>
        </div>
      </div>
      
      {error && <div className="counter-error">{error}</div>}
    </section>
  );
};

export default Counter;

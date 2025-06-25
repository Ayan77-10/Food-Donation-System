import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Food Donation</h3>
          <p>Connecting surplus food with those in need.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/About">About Us</a>
            </li>
            <li>
              <a href="/dashbord">Dashboard</a>
            </li>
            <li>
              <a href="/auth">Login/Register</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4> <p>Email: info@fooddonation.org</p>{" "}
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Food Donation. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Hero.css';
import { Link } from "@tanstack/react-router";
import 'animate.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className='animate__animated animate__lightSpeedInLeft'>Help the Needy</h1>
        <p>Join us in making a difference through food donation</p>
        <button className="cta-button">
          <Link className="button-link" to="/auth">Donate Now</Link>
        </button>
      </div>
    </section>
  )
}

export default Hero

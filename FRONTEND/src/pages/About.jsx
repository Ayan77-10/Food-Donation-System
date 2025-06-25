import React, { useEffect, useRef } from 'react';
import 'animate.css';
import './About.css';
import Footer from '../components/Footer';

const About = () => {
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const impactRef = useRef(null);

  useEffect(() => {
    // Simple scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = [missionRef, valuesRef, teamRef, impactRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup
    return () => {
      sections.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="floating-element">🌱</div>
          <h1 className="animate__animated animate__fadeInDown">About Our Mission</h1>
          <p className="animate__animated animate__fadeInUp animate__delay-1s">
            Transforming surplus food into hope, one meal at a time
          </p>
          <div className="hero-decoration">
            <div className="floating-element">🤝</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section fade-in-section" ref={missionRef}>
        <div className="container">
          <div className="mission-card">
            <div className="mission-icon">
             
            </div>
            <h2>Our Mission</h2>
            <p>
              We bridge the gap between food surplus and food insecurity by creating
              a seamless platform that connects generous donors with organizations
              dedicated to feeding those in need. Every meal shared is a step towards
              ending hunger in our communities.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">
   
            </div>
            <h2>Our Vision</h2>
            <p>
              A world where no food goes to waste while people go hungry. We envision
              communities where sharing surplus food is as natural as breathing,
              creating a sustainable cycle of giving that nourishes both body and soul.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section fade-in-section" ref={valuesRef}>
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Compassion</h3>
              <p>We believe in the power of human kindness and the importance of caring for one another.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sustainability</h3>
              <p>Reducing food waste while feeding communities creates a more sustainable future for all.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>Together we are stronger. Building connections between donors and recipients strengthens our community.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Impact</h3>
              <p>Every action matters. We measure our success by the positive change we create in people's lives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="team-section fade-in-section" ref={teamRef}>
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <span className="avatar-placeholder">👨‍💼</span>
              </div>
              <h3>John Smith</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                Passionate about social impact and sustainable solutions to food insecurity.
              </p>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <span className="avatar-placeholder">👩‍💻</span>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Technology Director</p>
              <p className="member-bio">
                Building innovative platforms that connect communities and create positive change.
              </p>
            </div>

            <div className="team-member">
              <div className="member-avatar">
                <span className="avatar-placeholder">👨‍🤝‍👨</span>
              </div>
              <h3>Michael Chen</h3>
              <p className="member-role">Community Outreach</p>
              <p className="member-bio">
                Dedicated to building strong partnerships with NGOs and community organizations.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Impact Section */}
      {/* <section className="impact-section fade-in-section" ref={impactRef}>
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Meals Donated</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Donors</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner NGOs</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">25</div>
              <div className="stat-label">Cities Served</div>
            </div>
          </div>

          <div className="impact-story">
            <h3>Making a Difference Together</h3>
            <p>
              Since our inception, we've facilitated the donation of thousands of meals,
              preventing food waste while ensuring that nutritious food reaches those who
              need it most. Our platform has created a network of compassionate individuals
              and organizations working together to build stronger, more resilient communities.
            </p>
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>
              Be part of the solution. Whether you're a donor with surplus food or
              an organization serving those in need, together we can make a difference.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                <span>Start Donating</span>
              </button>
              <button className="cta-btn secondary">
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
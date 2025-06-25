import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import "./Home.css";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import {gsap}  from"gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);  // saying gsap to use this plugin

const Home = () => {
  const missionRef = useRef(null);

  useEffect(() => {
    gsap.from(".mission-content", {
      scrollTrigger: {
        trigger: ".mission-content",
        start: "top 80%", // when top of element hits 80% of viewport
        toggleActions: "play none none reverse"
      },
      y: 30,
      scale: 0.95,
      // opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (missionRef.current) {
      observer.observe(missionRef.current);
    }

    return () => {
      if (missionRef.current) {
        observer.unobserve(missionRef.current);
      }
    };
  }, []);

  return (
    <>
      <Hero />
      <section className="mission" ref={missionRef}>
        <div className="mission-content">
          <h4>About Our Program</h4>
          <h2>Our Mission</h2>
          <h3>Your leftover can end someone's hunger.</h3>
          <h4>Every meal shared is a little step towards ending world hunger</h4>
          <p>
            At our organization, we are dedicated to addressing the pressing
            issue of food waste and hunger. We believe that every morsel of food
            has the potential to nourish someone in need, and it is our mission to
            bridge the gap between surplus food and those who lack access to
            nutritious meals.
          </p>
        </div>

        <div className="mission-image">
          <img 
            src='../assets/heroImage.jpg' 
            alt="People sharing food with those in need" 
          />
        </div>
      </section>
      <Counter />
      <Footer />
    </>
  );
};

export default Home;

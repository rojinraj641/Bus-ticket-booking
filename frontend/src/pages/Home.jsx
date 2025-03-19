import React, { useState } from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import '../styles/Home.css';

const Home = () => {
  
  return (
    <div className="app-container">
      <Header />

      <section className="routes-section">
        <h2>Top Travelled Bus Routes</h2>

        <div className="routes-grid">
          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Kochi to Bangalore</span>
            </div>
          </div>

          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Kochi to Coimbatore</span>
            </div>
          </div>

          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Trivandrum to Kochi</span>
            </div>
          </div>

          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Kollam to Kannur</span>
            </div>
          </div>
        </div>
        <div className='routes-grid'>
          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Kochi to Palakkad</span>
            </div>
          </div>

          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Chennai to Hyderabad</span>
            </div>
          </div>

          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Chennai to Hyderabad</span>
            </div>
          </div>

          <div className="route-card">
            <div className="route-img"></div>
            <div className="route-info">
              <span className="route-label">Buses From</span>
              <span className="route-name">Chennai to Hyderabad</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;


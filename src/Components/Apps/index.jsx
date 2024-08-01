import React from 'react';
import { appData } from '../../sources';
import './Apps.css';

const Apps = () => {
  return (
    <section className="integration-section">
      <div className="container">
      <div className="filter-buttons">
        <button className="filter-button">All</button>
        <button className="filter-button">Gmail</button>
        <button className="filter-button">Slack</button>
        <button className="filter-button">Shopify</button>
        <button className="filter-button">Twitter</button>
      </div>


        <div className="grid">
          {appData.map((app) => (
            <div key={app.id} className="card">
              <div className="card-content">
                <div className="card-header">
                  <img className="card-img" src={app.imgSrc} alt={app.title} />
                  <div className="card-info">
                    <p className="card-title">{app.title}</p>
                    <p className="card-description">{app.description}</p>
                  </div>
                  <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <p className="card-text">{app.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="link">Check all 1,593 applications</a>
        </div>
      </div>
    </section>
  );
};

export default Apps;

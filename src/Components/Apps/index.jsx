import React, { useState } from 'react';
import { appData } from '../../sources';
import './Apps.css';

const Apps = () => {
  const removeDuplicates = (arr) => {
    const uniqueCategories = new Set();
    uniqueCategories.add("All");
    arr.forEach((item) => {
      uniqueCategories.add(item.category.trim());
    });
    return Array.from(uniqueCategories);
  };
  
  const uniqueData = removeDuplicates(appData);
  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter appData based on selectedCategory
  const filteredApps = appData.filter(app => 
    selectedCategory === 'All' || app.category === selectedCategory
  );

  return (
    <section className="integration-section">
      <div className="container">
        <div className="filter-buttons">
          {
            uniqueData.map((category, index)=>(
              <button 
                key={index}
                className="filter-button" 
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))
          }
        </div>


        <div className="grid">
          {filteredApps.map((app, index) => (
            <div key={app.id} className="card" >
              <div className="card-content" data-aos="fade-right" data-aos-delay="200">
                <div className="card-header">
                  <img className="card-img" src={app.imgSrc} alt={app.title} ata-aos="fade-left" data-aos-delay="100"/>
                  <div className="card-info">
                    <p className="card-title">{app.title}</p>
                    <p className="card-description">{app.description}</p>
                  </div>
                  <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <p className="card-text">{app.details}</p>
                <a href={app.link} key={index} target='_blank' className="add-btn">Download</a>
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

import React, { useState } from 'react';
import './PDF.css';
import { pdfData } from '../../sources';

const PDF = () => {
  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter pdfData based on selectedCategory
  const filteredItems = pdfData.filter(item => 
    selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="wrapper">
      <div className="category-filter">
        <div className="container">
          <div className="filter-selection">
            <label htmlFor="filter-select" className="filter-label">Filter by:</label>
            <select 
              id="filter-select" 
              className="filter-select" 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="productivity">Productivity</option>
              <option value="new">New</option>
            </select>
          </div>

          <div className="filter-items">
            {filteredItems.map((item) => (
              <div className="filter-item" data-aos="fade-right" key={item.id}>
                <div className="item-img">
                  <img src={item.imgSrc} alt={item.altText} />
                  <span className="discount">{item.category}</span>
                </div>
                <div className="item-info">
                  <p>{item.itemName}</p>
                  <div id='details-price'>
                    <span className="old-price">{item.oldPrice}</span>
                    <span className="new-price">{item.newPrice}</span>
                  </div>
                  <a href={item.downloadLink} target='_blank' className="add-btn">Preview</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDF;

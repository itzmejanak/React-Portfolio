import React from 'react';
import './PDF.css';
import { pdfData } from '../../sources';

const PDF = () => {
  return (
    <div className="wrapper">
      <div className="category-filter">
        <div className="container">
          <div className="filter-selection">
            <label htmlFor="filter-select" className="filter-label">Filter by:</label>
            <select id="filter-select" className="filter-select">
              <option value="all">Java</option>
              <option value="new">Python</option>
              <option value="best-sellers">Productivity</option>
              <option value="specials">New</option>
            </select>
          </div>

          <div className="filter-items">
            {pdfData.map((item, index) => (
              <div className="filter-item" data-aos="fade-right" key={index}>
                <div className="item-img">
                  <img src={item.imgSrc} alt={item.altText} />
                  <span className="discount">{item.discount}</span>
                </div>
                <div className="item-info">
                  <p>{item.itemName}</p>
                  <div id='details-price'>
                    <span className="old-price">{item.oldPrice}</span>
                    <span className="new-price">{item.newPrice}</span>
                  </div>
                  <a href={item.downloadLink} className="add-btn">Download</a>
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

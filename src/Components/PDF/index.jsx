import React, { useState } from 'react';
import './PDF.css';
import { pdfData } from '../../sources';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

const PDF = () => {
  // Get unique categories from pdfData
  const categories = Array.from(new Set(pdfData.map(item => item.category)));
  categories.unshift('All'); // Add 'All' to the beginning of the array

  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState('All');
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pdfData based on selectedCategory and searchQuery
  const filteredItems = pdfData.filter(item =>
    (selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.altText.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="wrapper">
      <div className="category-filter">
        <div className="container">
          <div className="filter-search-container">
            <div className="filter-selection">
              <select 
                id="filter-select" 
                className="filter-select" 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
              {
                categories.map((category, index) => (
                  <option value={category} key={index}>{category}</option>
                ))
              }
              </select>
            </div>

            <form className="search-form">
              <input
                type="search"
                placeholder="Search here ..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">
                <FaSearch />
              </span>
            </form>
          </div>

          <div className="filter-items">
            {filteredItems.map((item) => (
              <div className="filter-item" data-aos="fade-right" data-aos-delay="500" key={item.id}>
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

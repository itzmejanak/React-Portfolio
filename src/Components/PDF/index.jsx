import React, { useState } from 'react';
import './PDF.css';
import { usePortfolioData } from '../../sources';
import { FaSearch } from 'react-icons/fa';
import Loading from '../Loading';

const PDF = () => {
  const { data: pdfData, loading, error } = usePortfolioData('pdfData');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories from pdfData
  const getCategories = () => {
    if (!pdfData || pdfData.length === 0) return ['All'];
    
    const categories = Array.from(new Set(pdfData.map(item => item.category)));
    categories.unshift('All');
    return categories;
  };

  // Filter pdfData based on selectedCategory and searchQuery
  const filteredItems = pdfData ? pdfData.filter(item =>
    (selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    (item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.altText.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  if (loading) {
    return (
      <div className="wrapper">
        <div className="category-filter">
          <div className="container">
            <Loading size="large" text="Loading PDF resources..." />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="category-filter">
          <div className="container">
            <div className="flex-center" style={{ minHeight: '300px', flexDirection: 'column', gap: '15px' }}>
              <div style={{ color: 'var(--destructive)', fontSize: '18px' }}>⚠️ Unable to load PDF resources</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                getCategories().map((category, index) => (
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
            {filteredItems.map((item, index) => (
              <div className="filter-item" data-aos="fade-right" data-aos-delay="500" key={item.id || index}>
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
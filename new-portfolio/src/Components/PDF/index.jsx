import React from 'react';
import './PDF.css'
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
            <div className="filter-item" data-aos="fade-right">
              <div className="item-img">
                <img 
                  src="https://imgs.search.brave.com/_u3IAyII-_4Wu1R_qlfVzKkxFzyGxTvCWDAMZTzvyWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODE3WlJhM3p4Qkwu/anBn" 
                  alt="Item image" 
                />
                <span className="discount">JavaScript</span>
              </div>
              <div className="item-info">
                <p>Cool Item Name</p>
                <div id='details-price'>
                  <span className="old-price">$20.50</span>
                  <span className="new-price">Free</span>
                </div>
                <a href="#" className="add-btn">Download</a>
              </div>
            </div>

            <div className="filter-item" data-aos="fade-right">
              <div className="item-img">
                <img 
                  src="https://imgs.search.brave.com/_u3IAyII-_4Wu1R_qlfVzKkxFzyGxTvCWDAMZTzvyWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODE3WlJhM3p4Qkwu/anBn" 
                  alt="Item image" 
                />
                <span className="discount">JavaScript</span>
              </div>
              <div className="item-info">
                <p>Cool Item Name</p>
                <div id='details-price'>
                  <span className="old-price">$20.50</span>
                  <span className="new-price">Free</span>
                </div>
                <a href="#" className="add-btn">Download</a>
              </div>
            </div>

            <div className="filter-item" data-aos="fade-right">
              <div className="item-img">
                <img 
                  src="https://imgs.search.brave.com/_u3IAyII-_4Wu1R_qlfVzKkxFzyGxTvCWDAMZTzvyWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODE3WlJhM3p4Qkwu/anBn" 
                  alt="Item image" 
                />
                <span className="discount">JavaScript</span>
              </div>
              <div className="item-info">
                <p>Cool Item Name</p>
                <div id='details-price'>
                  <span className="old-price">$20.50</span>
                  <span className="new-price">Free</span>
                </div>
                <a href="#" className="add-btn">Download</a>
              </div>
            </div>

            <div className="filter-item" data-aos="fade-right">
              <div className="item-img">
                <img 
                  src="https://imgs.search.brave.com/_u3IAyII-_4Wu1R_qlfVzKkxFzyGxTvCWDAMZTzvyWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODE3WlJhM3p4Qkwu/anBn" 
                  alt="Item image" 
                />
                <span className="discount">JavaScript</span>
              </div>
              <div className="item-info">
                <p>Cool Item Name</p>
                <div id='details-price'>
                  <span className="old-price">$20.50</span>
                  <span className="new-price">Free</span>
                </div>
                <a href="#" className="add-btn">Download</a>
              </div>
            </div>

            <div className="filter-item" data-aos="fade-right">
              <div className="item-img">
                <img 
                  src="https://imgs.search.brave.com/_u3IAyII-_4Wu1R_qlfVzKkxFzyGxTvCWDAMZTzvyWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODE3WlJhM3p4Qkwu/anBn" 
                  alt="Item image" 
                />
                <span className="discount">JavaScript</span>
              </div>
              <div className="item-info">
                <p>Cool Item Name</p>
                <div id='details-price'>
                  <span className="old-price">$20.50</span>
                  <span className="new-price">Free</span>
                </div>
                <a href="#" className="add-btn">Download</a>
              </div>
            </div>

            <div className="filter-item" data-aos="fade-right">
              <div className="item-img">
                <img 
                  src="https://imgs.search.brave.com/_u3IAyII-_4Wu1R_qlfVzKkxFzyGxTvCWDAMZTzvyWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODE3WlJhM3p4Qkwu/anBn" 
                  alt="Item image" 
                />
                <span className="discount">JavaScript</span>
              </div>
              <div className="item-info">
                <p>Cool Item Name</p>
                <div id='details-price'>
                  <span className="old-price">$20.50</span>
                  <span className="new-price">Free</span>
                </div>
                <a href="#" className="add-btn">Download</a>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default PDF;

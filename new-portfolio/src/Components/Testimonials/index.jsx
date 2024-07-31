import React, { useRef } from 'react';
import './Testimonials.css';
import Slider from 'react-slick';
import { clients } from '../../sources';
import { FaStar } from 'react-icons/fa6';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

const Testimonials = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    pauseOnHover: true,
    autoplay: true,
    arrows: false, // Disable default arrows
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id='testimonials'>
      <div className="wrapper" data-aos="fade-left">
        <div className="section-header">
          <h1 className="heading-1" data-aos="fade-left">
            <span className="gradient-text">Testimonials</span>
          </h1>
          <h4 className="sub-title" data-aos="fade-left" data-aos-delay="400">What my clients are saying</h4>
        </div>
        <Slider {...settings} className='testimonials-container' ref={sliderRef}>
          {clients.map((list, index) => (
            <div className='flex' key={index}>
              <div className='profile'>
                <img src={list.image} alt={list.name} />
              </div>
              <div className="details">
                <h3 className="name">{list.name}</h3>
                <small className="muted">CEO of microBank</small>
              </div>
              <p className="muted content">{list.review}</p>
              <div className="stars-container">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex-center buttons-container" data-aos="fade-right">
          <button className="flex-center btn" onClick={() => sliderRef.current.slickPrev()}>
            <FaLongArrowAltLeft />
          </button>
          <button className="flex-center btn" onClick={() => sliderRef.current.slickNext()}>
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

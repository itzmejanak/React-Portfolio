import React from 'react'
import './Hero.css'
import { Link } from 'react-scroll'
import me from '../../assets/me1.png'
import Achivement from '../../Commons/Achivement'

const Hero = () => {
  return (
    <section id='hero'>
      <div className="wrapper info-container">
        <div className="column">
          <h3 className='sub-title' data-aos="fade-right">
            Hi, I'am <span className='primary'>Janak Devkota</span>
          </h3>
          <h1 className="heading-1" data-aos="fade-up">
            A <span className="gradient-text">Fullstack</span> Web Developer
          </h1>
          <p className="muted" data-aos="fade-up" data-aos-duration = '200'>
          I'm Janak Devkota, a software and web developer, 
          currently studying at London Metropolitan University. 
          Coding is my passion, and I thrive on problem-solving. 
          I'm highly responsive and dedicated to innovation. With a 
          quick-thinking mindset, I'm poised to make a mark in the 
          software and web development field.
          </p>
          <div className="flex-center buttons-wrapper">
            <Link to='services' smooth = {true} className='btn primary' data-aos="fade-left" data-aos-delay = "1200" data-aos-offset = '50'>Learn more</Link>
            <Link to='contact' smooth = {true} className='btn' data-aos="fade-left" data-aos-delay = "1700" data-aos-offset = '50'>Get started</Link>
          </div>
        </div>
        <div className="column hero-image" data-aos="fade-left" data-aos-delay = "200">
          <img src={me} alt="" />
        </div>
      </div>
      <div className="achivement-cluster">
        <div className="wrapper">
          <Achivement/>
        </div>
      </div>
    </section>
  )
}

export default Hero
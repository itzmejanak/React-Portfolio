import React from 'react'
import './About.css'
import { whyChooseMe } from '../../sources'
const About = () => {
  return (
    <section id='about'>
      <div className="wrapper">
        <div className="section-header">
          <h1 className="heading-1" data-aos="fade-left">
            <span className="gradient-text">About Us</span>
          </h1>
          <h4 className="sub-title muted" data-aos="fade-left">
          I’m Janak Devkota, a coding enthusiast at London Metropolitan University. Passionate about solving problems, I excel in responsiveness and collaboration, driven by a sharp, innovative mindset.
          </h4>
        </div>
        <div className="group">
        {whyChooseMe.map((list, index) => (
          <div key={index} className="flex-center group-item" data-aos="fade-right">
            <div className="flex-center icon-wrapper">
              {list.icon}
            </div>
            <h4 className="title">{list.title}</h4>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default About
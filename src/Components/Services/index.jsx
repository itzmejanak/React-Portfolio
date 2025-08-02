import React from 'react'
import './Services.css'
import { usePortfolioData } from '../../sources'
import { Link } from 'react-scroll'
import Loading from '../Loading'

const Services = () => {
  const { data: services, loading, error } = usePortfolioData('services');

  if (loading) {
    return (
      <section id='services'>
        <div className="wrapper">
          <div className="section-header">
            <h1 className="heading-1" data-aos="fade-right">
              <span className="gradient-text">Services</span>
            </h1>
          </div>
          <Loading size="medium" text="Loading services..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id='services'>
        <div className="wrapper">
          <div className="section-header">
            <h1 className="heading-1" data-aos="fade-right">
              <span className="gradient-text">Services</span>
            </h1>
          </div>
          <div className="flex-center" style={{ minHeight: '200px', flexDirection: 'column', gap: '10px' }}>
            <div style={{ color: 'var(--destructive)', fontSize: '16px' }}>⚠️ Unable to load services</div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='services'>
        <div className="wrapper">
          <div className="section-header">
            <h1 className="heading-1" data-aos="fade-right">
              <span className="gradient-text">Services</span>
            </h1>
            <h4 className="sub-title muted" data-aos="fade-left">
            I transform your ideas, ans consequently your desires, into a 
            distinctive web project that both inspires you and captivate your customers.
            </h4>
          </div>

          <div className="services-container">
            {
              services.map((service, index)=>(
                <div className="service" key={index} data-aos="fade-left">
                  <div className="flex-center icon-wrapper">
                    {service.icon}
                  </div>
                  <div className="details">
                    <h3 className="name gradient-text">{service.name}</h3>
                    <p className="muted">{service.description}</p>
                  </div>
                  <div className="flex buttons-wrapper">
                    <button className="btn">Read More</button>
                    <Link to='contact' smooth= {true} className='btn'>Get started</Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </section>
  )
}

export default Services
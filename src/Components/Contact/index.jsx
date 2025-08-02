import React from 'react'
import './Contact.css'
import { usePortfolioData } from '../../sources'
import Loading from '../Loading'

const Contact = () => {
  const { data: contactOptions, loading, error } = usePortfolioData('contactOptions');

  if (loading) {
    return (
      <section id='contact' data-aos="fade-zoom-in">
        <div className="wrapper">
          <Loading size="medium" text="Loading contact information..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id='contact' data-aos="fade-zoom-in">
        <div className="wrapper">
          <div className="flex-center" style={{ minHeight: '200px', flexDirection: 'column', gap: '10px' }}>
            <div style={{ color: 'var(--destructive)', fontSize: '16px' }}>⚠️ Unable to load contact information</div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='contact' data-aos="fade-zoom-in">
      <div className="wrapper">
        <div className="contact-options">
          {
            contactOptions.map((option, index)=>(
              <div className="flex-center option" data-aos="fade-right" key={index}>
                <div className="flex-center icon-wrapper">
                  {option.icon}
                </div>
                <h4 className="muted">{option.title}</h4>
                <h3 className="value">{option.value}</h3>
              </div>
            ))
          }
        </div>
        <div className="contact-form" data-aos="fade-left">
          <div className="top">
            <h1 className="title">
              <span className="gradient-text">Join forces with me!</span>
            </h1>
            <p className="muted">
            I build with precision and passion, 
            creating web projects that stands out. 
            It's as straightforward as that!
            </p>
          </div>
          <div className="middle">
            <div className="flex row">
              <input type="text" placeholder='First Name' name='firstname' className='control' />
              <input type="text" placeholder='Last Name' name='lastname' className='control' />
            </div>
            <div className="flex row">
              <input type="email" placeholder='Email address' name='email' className='control' />
              <input type="tel" placeholder='Phone Number' name='phone' className='control' />
            </div>
            <textarea name="message" cols={30} rows={10} placeholder='Message' className='control'></textarea>
          </div>
          <div className="flex-center buttom">
            <button className="btn primary">Send Now</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
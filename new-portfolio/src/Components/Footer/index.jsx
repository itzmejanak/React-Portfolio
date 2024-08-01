import React from 'react'
import './Footer.css'
import Logo from '../../Commons/Logo'
import SocialHandles from '../../Commons/SocialHandles'
import { footer } from '../../sources'
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <section id='footer'>
      <div className="wrapper">
        <div className="column" data-aos="fade-right">
        <RouterLink to="/"><Logo/></RouterLink>
          <SocialHandles/>
        </div>
        {
          footer.map((list, index) => (
            <div className="column" data-aos="fade-right" key={index}>
              <h3 className="muted title">{list.title}</h3>
              {list.routes.map((route, routeIndex) => {
                // Conditionally choose the Link component
                const LinkComponent = list.title === "Explore" ? RouterLink : ScrollLink;

                return (
                  <LinkComponent 
                    to={route.id || ""} 
                    smooth={true} 
                    className='route' 
                    key={routeIndex}
                  >
                    {route.name}
                  </LinkComponent>
                );
              })}
            </div>
          ))
        }
      </div>
      <div className="copyright flex-center" data-aos="fade-left">
        <h4>Copyright &copy; All rights reserved - 2024</h4>
        <p className="muted">Built with love 💚 by Janak Devkota</p>
      </div>
    </section>
  )
}

export default Footer

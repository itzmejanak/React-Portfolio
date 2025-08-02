import React, {useState} from 'react'
import "./Navbar.css"
import { usePortfolioData } from '../../sources'
import {Link} from 'react-scroll'
import Logo from '../../Commons/Logo'
import { HiMenu } from 'react-icons/hi'
import { FaTimes } from 'react-icons/fa'
import SocialHandles from '../../Commons/SocialHandles'
import Loading from '../Loading'

const Navbar = () => {
  const { data: tabs, loading, error } = usePortfolioData('tabs');
  const [openSidebar, setOpenSide] = useState(false);

  // Use fallback tabs if loading or error
  const fallbackTabs = [
    {name:"About Me",id:'about'},
    {name:"Skill",id:'skill'},
    {name:"Services",id:'services'},
    {name:"Projects",id:'projects'},
    {name:"Testimonials",id:'testimonials'},
  ];

  const navigationTabs = loading || error ? fallbackTabs : tabs;

  return (
    <nav className='navbar flex'>
      {openSidebar ? <div className='overlay' onClick={()=>setOpenSide(!openSidebar)}/>:''}
      <a href="/"><Logo/></a>
      <div className={`box flex-center tabs-group sidebar ${openSidebar ? 'visible':''}`}>
        <div className="flex-center icon-wrapper cancel-btn" onClick={()=>setOpenSide(!openSidebar)}>
          <FaTimes/>
        </div>
        {loading ? (
          <div style={{ padding: '20px' }}>
            <Loading minimal={true} />
          </div>
        ) : (
          navigationTabs.map((tab, index)=>(
            <Link 
            to={tab.id} 
            smooth = {true} 
            spy = {true} 
            className='tab' 
            activeClass='active' 
            key={index} 
            onClick={()=>setOpenSide(false)}>
            {tab.name}
            </Link>
          ))
        )}
      </div>
      <SocialHandles/>
      <div className="box flex-center buttons">
        <Link to='contact' smooth = {true} className='btn primary contact-btn'>Hire me</Link>
        <Link to='services' smooth = {true} className='btn services-btn'>Services</Link>
        <div className="flex-center icon-wrapper menu-btn"
        onClick={()=>setOpenSide(!openSidebar)}
        >
          <HiMenu/>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { usePortfolioData } from '../../sources'
import './SocialHandles.css'
import Loading from '../../Components/Loading'

const SocialHandles = () => {
  const { data: socialHandles, loading, error } = usePortfolioData('socialHandles');

  if (loading) {
    return (
      <div className='handles-container'>
        <Loading minimal={true} />
      </div>
    );
  }

  if (error || !socialHandles || socialHandles.length === 0) {
    return (
      <div className='handles-container'>
        {/* Fallback - you can add default social links here if needed */}
      </div>
    );
  }

  return (
    <div className='handles-container'>
        {
            socialHandles.map((handle, index)=>(
                <a href={handle.link} key={index} target='_blank' className='flex-center icon-wrapper'>
                    {handle.icon}
                </a>
            ))
        }
    </div>
  )
}

export default SocialHandles
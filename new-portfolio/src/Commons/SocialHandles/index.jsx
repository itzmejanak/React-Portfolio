import React from 'react'
import {socialHandles} from '../../sources'
import './SocialHandles.css'

const SocialHandles = () => {
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
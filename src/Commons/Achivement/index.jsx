import React, { useState, useEffect } from 'react'
import './Achivement.css'
import Odometer from 'react-odometerjs'

const Achivement = () => {
    const [exprience, setExprience] = useState(0)
    const [clients, setClients] = useState(0)
    const [projects, setProjects] = useState(0)

    useEffect(()=>{
        const timeOutId =setTimeout(() => {
            setClients(471)
            setExprience(6)
            setProjects(1.2)

            return () => clearTimeout(timeOutId);
        }, 3000);
    }, [])

  return (
    <div className='achivement-container'>

        <div className="card">
            <div className="flex-center">
                <Odometer value={exprience} className='title'/>
                <h1 className="title">+</h1>
            </div>
            <p className="muted name">
                Years of Exprience
            </p>
        </div>

        <div className="card">
            <div className="flex-center">
                <Odometer value={clients} className='title'/>
                <h1 className="title">+</h1>
            </div>
            <p className="muted name">
                Clients Wroldwide
            </p>
        </div>


        <div className="card">
            <div className="flex-center">
                <Odometer value={projects} className='title'/>
                <h1 className="title">k+</h1>
            </div>
            <p className="muted name">
                Completed Projects
            </p>
        </div>



    </div>
  )
}

export default Achivement
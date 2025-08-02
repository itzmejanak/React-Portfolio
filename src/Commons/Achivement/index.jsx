import React, { useState, useEffect } from 'react'
import './Achivement.css'
import Odometer from 'react-odometerjs'
import { usePortfolioData } from '../../sources'
import Loading from '../../Components/Loading'

const Achivement = () => {
    const { data: achievements, loading, error } = usePortfolioData('achievements');
    const [animatedValues, setAnimatedValues] = useState({});

    useEffect(() => {
        if (achievements && achievements.length > 0) {
            // Initialize all values to 0
            const initialValues = {};
            achievements.forEach((achievement, index) => {
                initialValues[index] = 0;
            });
            setAnimatedValues(initialValues);

            // Animate to actual values after 3 seconds
            const timeOutId = setTimeout(() => {
                const finalValues = {};
                achievements.forEach((achievement, index) => {
                    finalValues[index] = achievement.value;
                });
                setAnimatedValues(finalValues);
            }, 3000);

            return () => clearTimeout(timeOutId);
        }
    }, [achievements]);

    if (loading) {
        return (
            <div className='achivement-container'>
                <Loading size="small" text="Loading achievements..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className='achivement-container'>
                <div style={{ color: 'var(--destructive)', fontSize: '14px', textAlign: 'center' }}>
                    ⚠️ Unable to load achievements
                </div>
            </div>
        );
    }

    return (
        <div className='achivement-container'>
            {achievements.map((achievement, index) => (
                <div className="card" key={achievement.id || index}>
                    <div className="flex-center">
                        <Odometer value={animatedValues[index] || 0} className='title'/>
                        <h1 className="title">{achievement.suffix}</h1>
                    </div>
                    <p className="muted name">
                        {achievement.title}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Achivement
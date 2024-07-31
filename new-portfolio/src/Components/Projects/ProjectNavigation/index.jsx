import React, { useRef, useState, useEffect } from 'react';
import './ProjectNavigation.css';
import Aos from 'aos';

const ProjectNavigation = ({ tabs, onChange }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [offset, setOffset] = useState(0);
    const [indicatorWidth, setIndicatorWidth] = useState(0);
    const itemsEls = useRef([]);

    const sumArray = (arr) => arr.reduce((sum, item) => sum + item, 0);

    useEffect(() => {
        Aos.refreshHard();
        const prevElWidths = itemsEls.current
            .filter((_, index) => index < activeIndex)
            .map(item => item.offsetWidth);
        
        setOffset(sumArray(prevElWidths));
        setIndicatorWidth(itemsEls.current[activeIndex]?.offsetWidth || 0);
    }, [activeIndex]);

    return (
        <nav className='project-navigation'>
            {tabs.map((tab, index) => (
                <button
                    ref={(el) => itemsEls.current[index] = el}
                    onClick={() => {
                        setActiveIndex(index);
                        onChange(tab);
                        Aos.refreshHard();
                    }}
                    key={index}
                >
                    {tab}
                </button>
            ))}
            <span 
                className="indicator"
                style={{
                    left: `${offset}px`,
                    width: `${indicatorWidth}px`,
                }}
            />
        </nav>
    );
};

export default ProjectNavigation;

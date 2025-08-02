import React from 'react'
import './Skill.css'
import { usePortfolioData } from '../../sources'
import SkillCard from './SkillCard'
import Loading from '../Loading'

const Skill = () => {
  const { data: skills, loading, error } = usePortfolioData('skills');

  if (loading) {
    return (
      <section id='skill'>
        <div className="wrapper">
          <div className="section-header">
            <h1 className="heading-1" data-aos="fade-left">
              <span className="gradient-text">My Skills</span>
            </h1>
          </div>
          <Loading size="medium" text="Loading skills..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id='skill'>
        <div className="wrapper">
          <div className="section-header">
            <h1 className="heading-1" data-aos="fade-left">
              <span className="gradient-text">My Skills</span>
            </h1>
          </div>
          <div className="flex-center" style={{ minHeight: '200px', flexDirection: 'column', gap: '10px' }}>
            <div style={{ color: 'var(--destructive)', fontSize: '16px' }}>⚠️ Unable to load skills</div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='skill'>
      <div className="wrapper">
        <div className="section-header">
          <h1 className="heading-1" data-aos="fade-left">
            <span className="gradient-text">My Skills</span>
          </h1>
        </div>
        <div className="skills-container">
          {
            skills.map((list, index) => (
              <SkillCard
                key={index}
                data={list.data}
                title={list.title}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Skill
import React, { useEffect, useState } from 'react';
import './Projects.css';
import { projects } from '../../sources';
import ProjectsCard from './ProjectsCard';
import ProjectNavigation from './ProjectNavigation';

const Projects = () => {
  const [activeProjects, setActiveProjects] = useState(projects);
  const [load, setLoad] = useState(false)

  useEffect(()=>{
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    }, 600);
  }, [activeProjects])

  const getTabs = () => {
    const tabs = ['All'];
    projects.forEach((item) => {
      if (!tabs.includes(item.category)) {
        tabs.push(item.category);
      }
    });
    return tabs;
  };

  const handleTabChange = (tab) => {
    if (tab === 'All') {
      setActiveProjects(projects);
    } else {
      setActiveProjects(projects.filter(project => project.category === tab));
    }
  };

  return (
    <section id='projects' data-aos="fade-right">
      <div className="wrapper">
        <div className="section-header">
          <h1 className="heading-1">
            <span className="gradient-text">Projects</span>
          </h1>
        </div>
        <ProjectNavigation tabs={getTabs()} onChange={handleTabChange} />
        <div className="projects-container">
          {activeProjects.map((project, index) => (
            <ProjectsCard
              {...project}
              className={load?'zoom':''}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
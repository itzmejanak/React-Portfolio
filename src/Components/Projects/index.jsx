import React, { useEffect, useState } from 'react';
import './Projects.css';
import { usePortfolioData } from '../../sources';
import ProjectsCard from './ProjectsCard';
import ProjectNavigation from './ProjectNavigation';
import Loading from '../Loading';
import ErrorBoundary from '../ErrorBoundary';

const Projects = () => {
  const { data: projects, loading, error } = usePortfolioData('projects');
  const [activeProjects, setActiveProjects] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setActiveProjects(projects);
    }
  }, [projects]);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 600);
  }, [activeProjects]);

  const getTabs = () => {
    if (!projects || projects.length === 0) return ['All'];
    
    const tabs = ['All'];
    projects.forEach((item) => {
      if (!tabs.includes(item.category)) {
        tabs.push(item.category);
      }
    });
    return tabs;
  };

  const handleTabChange = (tab) => {
    if (!projects) return;
    
    if (tab === 'All') {
      setActiveProjects(projects);
    } else {
      setActiveProjects(projects.filter(project => project.category === tab));
    }
  };

  if (loading) {
    return (
      <section id='projects' data-aos="fade-right">
        <div className="wrapper">
          <div className="section-header">
            <h1 className="heading-1">
              <span className="gradient-text">Projects</span>
            </h1>
          </div>
          <Loading size="medium" text="Loading projects..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id='projects' data-aos="fade-right">
        <div className="wrapper">
          <div className="section-header">
            <h1 className="heading-1">
              <span className="gradient-text">Projects</span>
            </h1>
          </div>
          <div className="flex-center" style={{ minHeight: '200px', flexDirection: 'column', gap: '10px' }}>
            <div style={{ color: 'var(--destructive)', fontSize: '16px' }}>⚠️ Unable to load projects</div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>{error}</div>
          </div>
        </div>
      </section>
    );
  }

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
            <ErrorBoundary key={index} fallbackMessage="Failed to load this project">
              <ProjectsCard
                {...project}
                className={load ? 'zoom' : ''}
                key={`project-${project.id || index}`}
              />
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
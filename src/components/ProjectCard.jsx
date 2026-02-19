import { useState } from 'react';

export function ProjectCard({ project, calculateProgress }) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 3; // cuántos módulos se ven a la vez

  const progress = calculateProgress(project.modules);
  const isCompleted = progress === 100;
  const hasGithub = project.github && project.github.trim() !== '';
  const modules = project.modules || [];

  const canPrev = scrollIndex > 0;
  const canNext = scrollIndex + visibleCount < modules.length;

  const visibleModules = modules.slice(scrollIndex, scrollIndex + visibleCount);

  return (
    <div className="project-card">
      <div className="img-container">
        <img src={project.image} alt={project.name} />
        <div className="progress-overlay">
          {isCompleted ? 'TERMINADO' : `${progress}%`}
        </div>
      </div>
      <div className="card-info">
        <div className="card-top">
          <h2>{project.name}</h2>
          {hasGithub ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="gh-link">GITHUB</a>
          ) : (
            <span className="gh-link disabled">GITHUB</span>
          )}
        </div>
        <p>{project.description}</p>
        {modules.length > 0 ? (
          <div className="module-row-wrapper">
            <button
              className="module-arrow"
              onClick={() => setScrollIndex(i => i - 1)}
              disabled={!canPrev}
            >‹</button>
            <div className="module-row">
              {visibleModules.map((m, i) => (
                <span key={i} className={`dot ${m.completed ? 'active' : ''}`}>
                  {m.name}
                </span>
              ))}
            </div>
            <button
              className="module-arrow"
              onClick={() => setScrollIndex(i => i + 1)}
              disabled={!canNext}
            >›</button>
          </div>
        ) : (
          <div className="module-row-wrapper">
            <div className="module-row">
              <span className="dot active">PROYECTO TERMINADO</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
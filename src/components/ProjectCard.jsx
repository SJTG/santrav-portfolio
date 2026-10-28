import { useState } from 'react';
import './ProjectCard.css';

export function ProjectCard({ project, calculateProgress, onSelectProject }) {
  const [showModules, setShowModules] = useState(false);
  const progress = calculateProgress(project.modules);
  const isCompleted = progress === 100;
  const hasGithub = project.github && project.github.trim() !== '';
  const modules = project.modules || [];

  return (
    <article className="paper-card project-card-paper">
      <div className="card-media-paper">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.name} 
            className="card-img-paper"
            loading="lazy"
          />
        ) : (
          <div className="card-img-placeholder">
            <span>{project.name}</span>
          </div>
        )}

        <div className="card-badges-paper">
          <span className={`card-progress-pill ${isCompleted ? 'is-done' : 'is-wip'}`}>
            {isCompleted ? 'Completado' : `${progress}%`}
          </span>
        </div>
      </div>

      <div className="card-content-paper">
        <h3 className="card-title-paper">{project.name}</h3>
        <p className="card-desc-paper">{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className="card-tags-paper">
            {project.tags.map((t, idx) => (
              <span key={idx} className="tag-paper">{t}</span>
            ))}
          </div>
        )}

        {/* Modules Accordion */}
        {modules.length > 0 && (
          <div className="card-modules-paper">
            <button 
              type="button" 
              className="modules-toggle-paper"
              onClick={() => setShowModules(!showModules)}
            >
              <span>Módulos ({modules.filter(m => m.completed).length}/{modules.length})</span>
              <span className="toggle-symbol">{showModules ? '−' : '+'}</span>
            </button>

            {showModules && (
              <div className="modules-dropdown-paper">
                {modules.map((m, i) => (
                  <div key={i} className={`module-line-paper ${m.completed ? 'done' : 'wip'}`}>
                    <span className="mod-check">{m.completed ? '✓' : '—'}</span>
                    <span className="mod-name-text">{m.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Links */}
        <div className="card-footer-paper">
          {hasGithub ? (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="paper-btn-link"
            >
              <span>GitHub</span>
              <span className="link-arrow">↗</span>
            </a>
          ) : (
            <span className="paper-btn-link disabled">Repositorio Privado</span>
          )}

          {onSelectProject && (
            <button 
              type="button" 
              className="paper-btn-details"
              onClick={() => onSelectProject(project)}
            >
              Ver Ficha Técnica
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
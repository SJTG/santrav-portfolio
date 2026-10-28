import React from 'react';
import './ProjectModal.css';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const modules = project.modules || [];
  const completedCount = modules.filter(m => m.completed).length;

  return (
    <div className="modal-backdrop-paper" onClick={onClose}>
      <div className="modal-container-paper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-paper">
          <div>
            <span className="section-eyebrow">Ficha técnica del proyecto</span>
            <h2 className="modal-title-paper">{project.name}</h2>
          </div>
          <button className="modal-close-paper" onClick={onClose} aria-label="Cerrar modal">✕</button>
        </div>

        <div className="modal-content-paper">
          {project.image && (
            <div className="modal-banner-paper">
              <img src={project.image} alt={project.name} className="modal-img-paper" />
            </div>
          )}

          <div className="modal-grid-paper">
            <div className="modal-main-paper">
              <h3>Resumen del Proyecto</h3>
              <p className="modal-desc-paper">{project.description}</p>

              {project.details && (
                <div className="modal-notes-paper">
                  <h4>Detalles Técnicos & Arquitectura</h4>
                  <p>{project.details}</p>
                </div>
              )}

              {modules.length > 0 && (
                <div className="modal-modules-paper">
                  <div className="modal-modules-title-row">
                    <h4>Módulos y Componentes ({completedCount}/{modules.length})</h4>
                    <span className="modules-percent-paper">
                      {Math.round((completedCount / modules.length) * 100)}% Completado
                    </span>
                  </div>

                  <div className="modal-modules-list-paper">
                    {modules.map((mod, i) => (
                      <div key={i} className={`modal-module-item-paper ${mod.completed ? 'done' : 'pending'}`}>
                        <span className="item-icon">{mod.completed ? '✓' : '—'}</span>
                        <span className="item-name">{mod.name}</span>
                        <span className="item-status">{mod.completed ? 'Completado' : 'En desarrollo'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="modal-sidebar-paper">
              <div className="sidebar-box-paper">
                <h4>Stack Tecnológico</h4>
                <div className="sidebar-tags-paper">
                  {project.tags?.map((t, idx) => (
                    <span key={idx} className="sidebar-tag-paper">{t}</span>
                  ))}
                </div>
              </div>

              <div className="sidebar-box-paper">
                <h4>Enlaces</h4>
                {project.github ? (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="sidebar-btn-primary-paper"
                  >
                    <span>Ver Código en GitHub</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <p className="sidebar-note-paper">Repositorio privado o en desarrollo institucional.</p>
                )}

                <button 
                  type="button" 
                  className="sidebar-btn-secondary-paper"
                  onClick={onClose}
                >
                  Cerrar Ficha
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

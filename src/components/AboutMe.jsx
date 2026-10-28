import React from 'react';
import './AboutMe.css';

export function AboutMe({ id }) {
  return (
    <section id={id} className="about-section-paper">
      <div className="paper-card about-card-paper">
        <div className="about-grid-paper">
          <div className="about-author-column">
            <div className="author-photo-frame">
              <img 
                src={`${import.meta.env.BASE_URL}profile.png`} 
                alt="Santino Joaquin Travasso Garnier" 
                className="author-photo"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            <div className="author-status-paper">
              <span className="author-location-dot"></span>
              <span>Buenos Aires, Argentina</span>
            </div>

            <div className="author-meta-tags">
              <span className="author-meta-pill">Lic. en Gestión de TI</span>
              <span className="author-meta-pill">Desarrollador de Software</span>
              <span className="author-meta-pill">Godot & 3D</span>
            </div>
          </div>

          <div className="about-text-column">
            <span className="section-eyebrow">Sobre Mí & Enfoque</span>
            <h2 className="about-heading-paper">Santino Joaquin Travasso Garnier</h2>
            <p className="about-subtitle-paper">Licenciatura en Gestión de Tecnologías de la Información</p>

            <div className="about-narrative">
              <p>
                Comencé por la fascinación de construir cosas desde cero con una computadora. Con el tiempo y la formación académica entendí algo que guía cada línea que escribo: <strong className="paper-emphasis">el código no es el fin, sino el medio</strong> para diseñar soluciones concretas que aporten valor tangible a personas y proyectos.
              </p>
              <p>
                Mi formación en <strong className="paper-emphasis">Gestión de TI</strong> me da un marco de trabajo ordenado: conectar las necesidades estratégicas con arquitecturas de software claras, sin complejidad innecesaria.
              </p>
              <p>
                En mi tiempo libre me gusta explorar el arte, los cómics y desarrollar prototipos de juegos interactivos en <strong className="paper-emphasis">Godot Engine</strong> y modelado en Blender.
              </p>
            </div>

            {/* 3 Simple Minimalist Pillars */}
            <div className="about-pillars-row">
              <div className="paper-pillar">
                <h4>Gestión & Procesos</h4>
                <p>Alineación entre requerimientos de negocio, viabilidad técnica y reducción de fricción.</p>
              </div>

              <div className="paper-pillar">
                <h4>Desarrollo de Software</h4>
                <p>Aplicaciones web y móviles estructuradas con React, Java, bases de datos SQL y NoSQL.</p>
              </div>

              <div className="paper-pillar">
                <h4>Interactividad & Juegos</h4>
                <p>Exploración de mecánicas lúdicas, audio ambiental y sistemas en tiempo real con Godot.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function AboutMe({ id }) {
  return (
    <section id={id} className="about-section">
      <div className="about-card">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">Acerca de Mí</h2>
            <p>
              Soy <strong>Santino Joaquin Travasso Garnier</strong>, 
              estudiante de la <em>Licenciatura en Gestión de 
              Tecnologías de la Información.</em> Mi camino empezó por
              la pura fascinación de crear, pero evolucionó cuando  
              entendí que el código no es el fin, <mark>sino el medio.</mark></p>
            <p>
              Me distingo por no buscar 'crear por crear', 
              sino por diseñar <mark>soluciones reales que aporten 
              valor tangible a empresas y personas.</mark> Mi formación 
              me permite ver el panorama completo: desde la 
              lógica del backend hasta la necesidad del usuario final.
            </p>
            <p>
              Cuando no enfocado en la <strong>universidad</strong>, canalizo mi creatividad 
              a través del arte y los cómics, juego con la 
              Inteligencia Artificial o desarrollo mis propios mundos 
              interactivos en <mark>Godot Engine.</mark>
            </p>
          </div>
          <div className="about-photo">
            <div className="photo-placeholder">
              <span className="placeholder-text">Mi Foto</span>
              <img 
                src="/profile.jpg" 
                alt="Santino" 
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { AboutMe } from './AboutMe';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { GithubContributions } from './GithubContributions';
import ToolsCarousel from './ToolsCarousel';
import './MainScreen.css';

export function MainScreen() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectPage, setProjectPage] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  const [projects] = useState([
    {
      id: 1,
      name: 'AGENCIA DE MARKETING GRAVITAS',
      image: `${import.meta.env.BASE_URL}gravitas.png`,
      github: '',
      tags: ['React', 'Marketing TI', 'SaaS', 'Business Architecture'],
      description: 'Plataforma integral orientada a la gestión y desarrollo estratégico en el área de marketing digital para profesionales y firmas jurídicas.',
      details: 'Diseñada para automatizar la captación de prospectos, estructurar pipelines comerciales y ofrecer métricas analíticas claras de rendimiento.',
      modules: [
        { name: 'Panel de control de prospectos', completed: true },
        { name: 'Módulo de métricas publicitarias', completed: true },
        { name: 'Integración CRM & Agenda', completed: true },
        { name: 'Generador de reportes de rendimiento', completed: true },
        { name: 'Módulo de autenticación por roles', completed: true }
      ]
    },
    {
      id: 2,
      name: 'GYM TRACKER COLOSSUS',
      image: `${import.meta.env.BASE_URL}gymtrack.png`,
      github: 'https://github.com/SJTG/Gym-Tracker-Colossus',
      tags: ['React', 'State Management', 'Fitness Tech', 'Bases de Datos'],
      description: 'Aplicación web diseñada para registrar, cuantificar y periodizar entrenamientos de sobrecarga progresiva sin la fricción de apps de notas.',
      details: 'Cronometraje de series y descansos, persistencia de cargas, cálculo de volumen de entrenamiento por grupo muscular y seguimiento visual del esfuerzo.',
      modules: [
        { name: 'Creador dinámico de ejercicios', completed: true },
        { name: 'Constructor de rutinas y microciclos', completed: true },
        { name: 'Asignador de calendario semanal', completed: true },
        { name: 'Visualizador de sets y RPE', completed: true },
        { name: 'Input inteligente de carga y repeticiones', completed: true },
        { name: 'Checklist de progresión histórica', completed: true },
        { name: 'Cronómetro activo de series', completed: true },
        { name: 'Cronómetro de descanso automático', completed: true },
        { name: 'Base de datos y persistencia', completed: true }
      ]
    },
    {
      id: 3,
      name: 'MIDNIGHT',
      image: `${import.meta.env.BASE_URL}midnight.webp`,
      github: '',
      tags: ['Godot Engine', 'Terror Psicológico', 'Audio 3D Binaural', 'Atmósfera'],
      description: 'Videojuego de terror psicológico en primera persona desarrollado en Godot Engine. Ambientado dentro de un automóvil varado en una ruta desolada en mitad de la noche.',
      details: 'Diseñado bajo una premisa claustrofóbica de supervivencia pasiva: gestión de batería y tablero eléctrico, visión limitada por empañamiento del parabrisas y espejos retrovisores, ambientación sonora 3D posicional y eventos dinámicos en la oscuridad exterior.',
      modules: [
        { name: 'Física e interactividad de cabina', completed: true },
        { name: 'Gestión de batería y tablero eléctrico', completed: true },
        { name: 'Sistema de audio ambiental y 3D posicional', completed: true },
        { name: 'Shader de empañado y limpiaparabrisas', completed: true },
        { name: 'Comportamiento de amenazas en la oscuridad', completed: true },
        { name: 'Sistema de radio y frecuencias analógicas', completed: false },
        { name: 'Mecánicas de eventos psicológicos aleatorios', completed: false },
        { name: 'Optimización de iluminación y niebla volumétrica', completed: false }
      ]
    },
    {
      id: 6,
      name: 'SHIV',
      image: `${import.meta.env.BASE_URL}shiv.png`,
      github: 'https://github.com/SJTG/Shiv',
      tags: ['Web App', 'BYOK', 'IA Generativa', 'Empleabilidad'],
      description: 'Aplicación web BYOK (Bring Your Own Key) que adapta tu currículum vitae en base a la oferta laboral a la que te postulás.',
      details: 'Pegás la oferta, usás tu propia API key y Shiv reescribe y prioriza la experiencia y habilidades de tu CV para alinearlas con los requisitos del puesto.',
      modules: []
    },
    {
      id: 5,
      name: 'PORTFOLIO PERSONAL',
      image: null,
      github: 'https://github.com/SJTG/santrav-portfolio',
      tags: ['React', 'Vite', 'Look Paper', 'GitHub API'],
      description: 'Espacio personal con estética paper editorial y minimalista, conectado a la API de GitHub en tiempo real para visualizar contribuciones y repositorios.',
      details: 'Construido sin dependencias superfluas ni artefactos visuales artificiales; enfocado en la legibilidad, la calma visual y la claridad técnica.',
      modules: [
        { name: 'Integración API de GitHub en vivo', completed: true },
        { name: 'Diseño editorial paper y tipografía Lora', completed: true },
        { name: 'Estructuración modular de componentes', completed: true },
        { name: 'Ficha técnica interactiva de proyectos', completed: true },
        { name: 'Optimización de rendimiento y accesibilidad', completed: true }
      ]
    },
    {
      id: 4,
      name: 'RITMO FIT MOBILE',
      image: `${import.meta.env.BASE_URL}ritmofit.png`,
      github: 'https://github.com/sofiacanzian/Apps_Grupo9_ReactNative',
      tags: ['React Native', 'Expo', 'Mobile UX', 'Gestión de Acceso'],
      description: 'Aplicación móvil universitaria orientada a la gestión integral de membresías, ingreso por credenciales digitales y reserva de clases para centros de fitness.',
      details: 'Proyecto colaborativo enfocado en la experiencia del usuario móvil, integración con servicios en tiempo real y flujo rápido de verificación en recepción.',
      modules: [
        { name: 'Autenticación y perfil de usuario', completed: true },
        { name: 'Gestor de credenciales y acceso QR', completed: true },
        { name: 'Reserva y cupos de clases en vivo', completed: true },
        { name: 'Sistema de calificación y feedback', completed: true },
        { name: 'Panel de notificaciones de entrenamiento', completed: true }
      ]
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('santinotravasso@gmail.com');
    showToast('Correo copiado: santinotravasso@gmail.com');
  };

  const calculateProgress = (modules) => {
    if (!modules || modules.length === 0) return 100;
    const completed = modules.filter(m => m.completed).length;
    return Math.round((completed / modules.length) * 100);
  };

  // Carousel Pagination: maximum 4 projects per page
  const projectsPerPage = 4;
  const totalProjectPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    projectPage * projectsPerPage,
    (projectPage + 1) * projectsPerPage
  );

  return (
    <div className="paper-page-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="paper-toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Project Deep Details Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Top Paper Header */}
      <header className="paper-navbar">
        <div className="navbar-inner">
          <a href="#" className="navbar-brand-paper">
            <span className="brand-dot-paper"></span>
            <span className="brand-title-paper">Santino Travasso</span>
            <span className="brand-role-badge">GTI</span>
          </a>

          <nav className="navbar-links-paper">
            <a href="#sobre-mi" className="nav-anchor-paper">Sobre Mí</a>
            <a href="#proyectos" className="nav-anchor-paper">Proyectos</a>
            <a href="#github" className="nav-anchor-paper">Actividad Git</a>
            <a href="#herramientas" className="nav-anchor-paper">Tecnologías</a>
            <a 
              href="https://www.linkedin.com/in/santino-travasso-garnier-0144572b9/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-btn-linkedin-paper"
            >
              LinkedIn ↗
            </a>
          </nav>
        </div>
      </header>

      {/* Main Flow */}
      <main className="paper-main-flow">
        {/* HERO SECTION - Relaxed, Human & Paper Editorial */}
        <section className="hero-section-paper">
          <div className="hero-container-paper">
            <span className="section-eyebrow">Licenciatura en Gestión de TI & Desarrollo de Software</span>
            
            <h1 className="hero-title-paper">
              Santino Joaquin Travasso Garnier
            </h1>

            <p className="hero-lead-paper">
              Estudiante de Gestión de Tecnologías de la Información y desarrollador de software. 
              Enfocado en crear herramientas claras, funcionales y con propósito, entendiendo el código como el medio para resolver problemas concretos.
            </p>

            <div className="hero-actions-paper">
              <a href="#proyectos" className="paper-cta-primary">
                Ver Proyectos ↓
              </a>
              <a href="#github" className="paper-cta-secondary">
                Actividad GitHub
              </a>
              <button 
                type="button" 
                className="paper-cta-ghost"
                onClick={handleCopyEmail}
              >
                Copiar Email ✉
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <AboutMe id="sobre-mi" />

        {/* PROJECTS SECTION (Max 4 per page in carousel style, no categories) */}
        <section id="proyectos" className="projects-section-paper">
          <div className="projects-header-paper">
            <div>
              <span className="section-eyebrow">Proyectos seleccionados</span>
              <h2 className="projects-heading-paper">Trabajos y Desarrollos</h2>
              <p className="projects-subtitle-paper">
                Plataformas de gestión, aplicaciones móviles y exploración de mecánicas de juego en Godot.
              </p>
            </div>

            {totalProjectPages > 1 && (
              <div className="projects-carousel-bar">
                <button 
                  type="button" 
                  className="carousel-btn prev"
                  onClick={() => setProjectPage(p => Math.max(0, p - 1))}
                  disabled={projectPage === 0}
                  aria-label="Página anterior"
                >
                  ←
                </button>
                
                <span className="carousel-page-indicator">
                  {projectPage + 1} de {totalProjectPages}
                </span>

                <button 
                  type="button" 
                  className="carousel-btn next"
                  onClick={() => setProjectPage(p => Math.min(totalProjectPages - 1, p + 1))}
                  disabled={projectPage === totalProjectPages - 1}
                  aria-label="Página siguiente"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Projects Grid (Max 4 cards) */}
          <div className="projects-grid-paper">
            {currentProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                calculateProgress={calculateProgress}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

          {/* Bottom Carousel Controls for convenient navigation */}
          {totalProjectPages > 1 && (
            <div className="projects-carousel-footer">
              <button 
                type="button" 
                className="carousel-btn prev"
                onClick={() => setProjectPage(p => Math.max(0, p - 1))}
                disabled={projectPage === 0}
              >
                ← Proyectos anteriores
              </button>

              <div className="carousel-dots-group">
                {Array.from({ length: totalProjectPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-page-dot ${idx === projectPage ? 'active' : ''}`}
                    onClick={() => setProjectPage(idx)}
                    aria-label={`Página ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button 
                type="button" 
                className="carousel-btn next"
                onClick={() => setProjectPage(p => Math.min(totalProjectPages - 1, p + 1))}
                disabled={projectPage === totalProjectPages - 1}
              >
                Más proyectos →
              </button>
            </div>
          )}
        </section>

        {/* LIVE GITHUB CONTRIBUTIONS DASHBOARD */}
        <GithubContributions />

        {/* TECHNICAL ARSENAL / TECNOLOGÍAS */}
        <ToolsCarousel />

        {/* CONTACT BANNER */}
        <section className="contact-section-paper">
          <div className="paper-card contact-card-paper">
            <span className="section-eyebrow">Contacto & Conexión</span>
            <h2 className="contact-heading-paper">Conversemos sobre tecnología o nuevos proyectos</h2>
            <p className="contact-text-paper">
              Disponible para colaborar en desarrollo de software, gestión tecnológica o intercambio de ideas.
            </p>
            
            <div className="contact-actions-paper">
              <button 
                type="button" 
                className="contact-btn-email"
                onClick={handleCopyEmail}
              >
                santinotravasso@gmail.com (Copiar)
              </button>
              <a 
                href="https://www.linkedin.com/in/santino-travasso-garnier-0144572b9/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-btn-linkedin"
              >
                Perfil de LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Paper Footer */}
      <footer className="footer-paper">
        <div className="footer-inner-paper">
          <div className="footer-left-paper">
            <strong>Santino Joaquin Travasso Garnier</strong>
            <span>Licenciatura en Gestión de Tecnologías de la Información</span>
          </div>
          <div className="footer-right-paper">
            <span>Buenos Aires, Argentina</span>
            <span className="footer-separator">•</span>
            <a href="https://github.com/SJTG" target="_blank" rel="noreferrer">GitHub</a>
            <span className="footer-separator">•</span>
            <a href="https://www.linkedin.com/in/santino-travasso-garnier-0144572b9/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

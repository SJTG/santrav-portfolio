import { useState, useEffect } from 'react';
import { Cursor } from './Cursor';
import { AboutMe } from './AboutMe';
import { ProjectCard } from './ProjectCard';
import ToolsCarousel from './ToolsCarousel';
import './MainScreen.css';

export function MainScreen({ onNavigateBlog }) {
  const [isPointer, setIsPointer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const [projects] = useState([
    {
      id: 1,
      name: 'AGENCIA DE PUBLICIDAD Y PROMOCION DIGITAL GRAVITAS',
      image: `${import.meta.env.BASE_URL}gravitas.png`,
      github: '',
      description: 'Plataforma integra para el desarrollo en el area de marketing digital para abogados.',
      modules: [
      ]
    },
    {
      id: 2,
      name: 'GYM TRACKER',
      image: `${import.meta.env.BASE_URL}gymtrack.png`,
      github: '',
      description: 'Una simple app para poder registrar mis entrenamientos, en vez de realizarlo en la aplicacion de notas',
      modules: [
        { name: 'Creador de ejercicios', completed: false },
        { name: 'Constructor de rutinas', completed: false },
        { name: 'Asignador de calendario', completed: false },
        { name: 'Visualizador de sets', completed: false },
        { name: 'Input de carga', completed: false },
        { name: 'Checklist de progreso', completed: false },
        { name: 'Cronometro de ejercicios', completed: false },
        { name: 'Cronometro de descanso', completed: false },
        { name: 'Base de datos', completed: false }
      ]
    },
    {
      id: 3,
      name: 'DEMETER PROTOCOL',
      image: `${import.meta.env.BASE_URL}demeter.png`,
      github: '',
      description: 'Un videojuego en tercera persona en el motor Godot basado en la idea de restauracion del ecosistema',
      modules: [
        { name: 'Sistema de interaccion', completed:false },
        { name: 'Gestor de estado de las plantas', completed: false },
        { name: 'Medidor de radiacion', completed: false },
        { name: 'Terminal: Simulador de misiones', completed: false },
        { name: 'Terminal: Gestion de inventario', completed: false },
        { name: 'Sistema de recetas', completed: false },
        { name: 'Analizador de ADN', completed: false },
        { name: 'Ciclo de dias', completed: false }
      ]
    },
    {
      id: 4,
      name: 'RITMO FIT MOBILE',
      image: `${import.meta.env.BASE_URL}ritmofit.png`,
      github: 'https://github.com/sofiacanzian/Apps_Grupo9_ReactNative',
      description: 'Proyecto universitario gestor de ingresos, clases y ratings de un gimnasio. Hecho con expo.',
      modules: [
      ]
    },
    {
      id: 5,
      name: 'Portfolio',
      image: `${import.meta.env.BASE_URL}Santrav.png`,
      github: 'https://github.com/SJTG/santrav-portfolio',
      description: 'Una pagina web en donde pueda trackear mis proyectos de manera rapida y sencilla.',
      modules: [
      ]
    }
  ]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(!!isClickable);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    // Detectar scroll para cambiar entre navbar superior y lateral
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    // Configurar scroll suave para enlaces internos
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Detectar visibilidad de proyectos y herramientas para animaciones
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observar proyectos
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      const projectCards = projectsGrid.querySelectorAll('.project-card');
      projectCards.forEach(card => observer.observe(card));
    }

    // Observar herramientas
    const toolsSection = document.querySelector('.tools-section');
    if (toolsSection) {
      observer.observe(toolsSection);
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  const calculateProgress = (modules) => {
    if (!modules || modules.length === 0) {
      return 100; // Si no hay módulos, el proyecto está terminado
    }
    const completed = modules.filter(m => m.completed).length;
    return Math.round((completed / modules.length) * 100);
  };

  // Calcular proyectos para la página actual
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);
  
  // Estado para controlar animación
  const [isAnimating, setIsAnimating] = useState(false);

  // Manejadores de paginación con animación
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="modern-layout">
      <Cursor isPointer={isPointer} />

      <nav className={`nav-bar ${isScrolled ? 'nav-bar-hidden' : ''}`}>
        <span className="nav-logo">SANTINO JTG</span>
        <div className="nav-links">
          <a href="#sobre-mi" className="nav-link">SOBRE MÍ</a>
          <a href="#proyectos" className="nav-link">PROYECTOS</a>
          <a href="#herramientas" className="nav-link">HERRAMIENTAS</a>
          <a href="#" className="nav-link disabled" onClick={(e) => {
            e.preventDefault();
          }}>BLOG</a>
          <a href="https://www.linkedin.com/in/santino-travasso-garnier-0144572b9/" className="nav-link" target="_blank" rel="noopener noreferrer">
            LINKEDIN
          </a>
        </div>
        <div className="nav-info">BUENOS AIRES | 2026</div>
      </nav>

      <nav className={`nav-lateral ${isScrolled ? 'nav-lateral-visible' : ''}`}>
        <div className="nav-lateral-content">
          <span className="nav-lateral-logo">S</span>
          <div className="nav-lateral-links">
            <a href="#sobre-mi" className="nav-lateral-link" title="Sobre Mí">S</a>
            <a href="#proyectos" className="nav-lateral-link" title="Proyectos">P</a>
            <a href="#herramientas" className="nav-lateral-link" title="Herramientas">H</a>
            <a href="#" className="nav-lateral-link disabled" onClick={(e) => {
              e.preventDefault();
            }} title="Blog">B</a>
            <a href="https://www.linkedin.com/in/santino-travasso-garnier-0144572b9/" className="nav-lateral-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">L</a>
          </div>
          <div className="nav-lateral-info">2026</div>
        </div>
      </nav>

      <main className="content-stack">
        <section className="hero">
          <h1 className="title">SANTINO</h1>
          <p className="subtitle">ARCHITECTURE & DEVELOPMENT</p>
        </section>

        <AboutMe id="sobre-mi" />

        <section id="proyectos" className={`projects-grid ${isAnimating ? 'projects-transition' : ''}`}>
          {currentProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              calculateProgress={calculateProgress} 
            />
          ))}
        </section>

        {totalPages > 1 && (
          <div className="projects-pagination">
            <button 
              className="pagination-btn prev-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <span className="pagination-info">
              Página {currentPage} de {totalPages}
            </span>
            <button 
              className="pagination-btn next-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </main>

      <ToolsCarousel />

      <footer className="footer">
        <p>SANTRAV-SOFTWARE & HARDWARE © 2026</p>
      </footer>
    </div>
  );
}

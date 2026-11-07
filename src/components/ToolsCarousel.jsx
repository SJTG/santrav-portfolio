import React, { useState, useMemo } from 'react';
import './ToolsCarousel.css';

const allTools = [
  // --- CORE & WEB ---
  { 
    id: 1, 
    name: 'JavaScript', 
    category: 'frontend',
    categoryName: 'Frontend',
    level: 'ES6+ / Avanzado',
    description: 'Lógica e interactividad del lado del cliente y servidor.', 
    image: `${import.meta.env.BASE_URL}Herramientas/javascript.png`
  },
  { 
    id: 2, 
    name: 'React', 
    category: 'frontend',
    categoryName: 'Frontend',
    level: 'SPA / Hooks',
    description: 'Construcción de interfaces de usuario modulares y reactivas.', 
    image: `${import.meta.env.BASE_URL}Herramientas/react.png`
  },
  { 
    id: 3, 
    name: 'HTML5', 
    category: 'frontend',
    categoryName: 'Frontend',
    level: 'Semántica Web',
    description: 'Estructuración accesible, limpia y optimizada para SEO.', 
    image: `${import.meta.env.BASE_URL}Herramientas/html.png`
  },
  { 
    id: 4, 
    name: 'CSS3', 
    category: 'frontend',
    categoryName: 'Frontend',
    level: 'Layout & Estilos',
    description: 'Diseño adaptable, Flexbox, Grid y tipografía cuidada.', 
    image: `${import.meta.env.BASE_URL}Herramientas/css.png`
  },

  // --- BACKEND & DATA ---
  { 
    id: 5, 
    name: 'Java', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'POO & Arquitectura',
    description: 'Programación orientada a objetos y lógica estructurada.', 
    image: `${import.meta.env.BASE_URL}Herramientas/java.png`
  },
  { 
    id: 6, 
    name: 'SQL', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'Bases Relacionales',
    description: 'Modelado relacional, integridad referencial y consultas analíticas.', 
    image: `${import.meta.env.BASE_URL}Herramientas/SQL.png`
  },
  { 
    id: 7, 
    name: 'MongoDB', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'NoSQL Documental',
    description: 'Modelos de documentos flexibles para prototipado ágil.', 
    image: `${import.meta.env.BASE_URL}Herramientas/mongodb.png`
  },
  { 
    id: 8, 
    name: 'Redis', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'Caché en Memoria',
    description: 'Persistencia clave-valor para aceleración y sesiones.', 
    image: `${import.meta.env.BASE_URL}Herramientas/Redis.png`
  },
  { 
    id: 9, 
    name: 'Cassandra', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'Datos Distribuidos',
    description: 'Gestión y tolerancia a fallos en entornos de alta concurrencia.', 
    image: `${import.meta.env.BASE_URL}Herramientas/Cassandra.png`
  },
  { 
    id: 10, 
    name: 'Neo4j', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'Grafos & Relaciones',
    description: 'Base de datos de grafos para mapeo de entidades interconectadas.', 
    image: `${import.meta.env.BASE_URL}Herramientas/Neo4j.png`
  },

  { 
    id: 16, 
    name: 'Go', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'Concurrencia & APIs',
    description: 'Servicios backend eficientes, goroutines y herramientas de línea de comandos.', 
    image: `${import.meta.env.BASE_URL}Herramientas/go.svg`
  },

  { 
    id: 19, 
    name: 'Python', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'Scripting & Automatización',
    description: 'Scripts, automatización de tareas, análisis de datos y servicios backend.', 
    image: `${import.meta.env.BASE_URL}Herramientas/python.svg`
  },
  { 
    id: 20, 
    name: 'JSON', 
    category: 'backend',
    categoryName: 'Backend & Datos',
    level: 'Intercambio de Datos',
    description: 'Estructuración y serialización de datos para APIs y configuración.', 
    image: `${import.meta.env.BASE_URL}Herramientas/json.svg`
  },

  // --- MOBILE ---
  { 
    id: 11, 
    name: 'Android Studio', 
    category: 'mobile',
    categoryName: 'Mobile',
    level: 'Ecosistema Android',
    description: 'Desarrollo e inspección nativa en dispositivos y emuladores.', 
    image: `${import.meta.env.BASE_URL}Herramientas/Android.png`
  },
  { 
    id: 12, 
    name: 'Expo & React Native', 
    category: 'mobile',
    categoryName: 'Mobile',
    level: 'Multiplataforma',
    description: 'Desarrollo de aplicaciones móviles multiplataforma.', 
    image: `${import.meta.env.BASE_URL}Herramientas/expo.png`
  },

  // --- CREATIVE & ENGINE ---
  { 
    id: 13, 
    name: 'Godot Engine', 
    category: 'creative',
    categoryName: 'Creative & 3D',
    level: 'Game Development',
    description: 'Desarrollo de videojuegos 2D/3D, física y mecánicas lúdicas.', 
    image: `${import.meta.env.BASE_URL}Herramientas/godot.png`
  },
  { 
    id: 14, 
    name: 'Blender', 
    category: 'creative',
    categoryName: 'Creative & 3D',
    level: 'Modelado 3D',
    description: 'Modelado tridimensional, iluminación y optimización de props.', 
    image: `${import.meta.env.BASE_URL}Herramientas/blender.png`
  },
  { 
    id: 15, 
    name: 'Photoshop', 
    category: 'creative',
    categoryName: 'Creative & 3D',
    level: 'Composición Visual',
    description: 'Edición gráfica, diagramación y prototipos visuales.', 
    image: `${import.meta.env.BASE_URL}Herramientas/photoshop.png`
  },

  // --- IA ---
  { 
    id: 17, 
    name: 'Claude', 
    category: 'ai',
    categoryName: 'IA',
    level: 'LLM & Agentes',
    description: 'Asistencia en desarrollo, integración vía API y flujos agénticos.', 
    image: `${import.meta.env.BASE_URL}Herramientas/claude.svg`
  },
  { 
    id: 18, 
    name: 'Gemini', 
    category: 'ai',
    categoryName: 'IA',
    level: 'LLM Multimodal',
    description: 'Modelos multimodales de Google para generación y análisis de contenido.', 
    image: `${import.meta.env.BASE_URL}Herramientas/googlegemini.svg`
  }
];

export const ToolsCarousel = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return allTools;
    return allTools.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="herramientas" className="tools-section-paper">
      <div className="paper-card tools-card-paper">
        <div className="tools-header-paper">
          <div>
            <span className="section-eyebrow">Stack técnico</span>
            <h2 className="tools-heading-paper">Tecnologías</h2>
            <p className="tools-subtitle-paper">
              Tecnologías y lenguajes que aplico en desarrollo de software, gestión de datos y motores gráficos.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="tools-filters-paper">
            {[
              { id: 'all', label: `Todas (${allTools.length})` },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend & Datos' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'creative', label: 'Creative & 3D' },
              { id: 'ai', label: 'IA' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tool-pill-paper ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="tools-grid-paper">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="tool-item-paper">
              <div className="tool-logo-box">
                <img 
                  src={tool.image} 
                  alt={tool.name} 
                  className="tool-icon-img"
                  loading="lazy"
                />
              </div>

              <div className="tool-info-paper">
                <div className="tool-name-row">
                  <h4 className="tool-name-paper">{tool.name}</h4>
                  <span className="tool-level-paper">{tool.level}</span>
                </div>
                <p className="tool-desc-paper">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsCarousel;

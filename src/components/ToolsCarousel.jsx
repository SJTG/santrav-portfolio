import React, { useState, useEffect } from 'react';
import './ToolsCarousel.css';

const ToolsCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);

const tools = [
    // --- CORE & WEB ---
    { 
      id: 1, 
      name: 'JavaScript', 
      description: 'Lógica e interactividad del lado del cliente y servidor (ES6+).', 
      image: '../public/Herramientas/javascript.png' 
    },
    { 
      id: 2, 
      name: 'React', 
      description: 'Construcción de interfaces de usuario modernas y SPA.', 
      image: '../public/Herramientas/react.png' 
    },
    { 
      id: 3, 
      name: 'HTML5', 
      description: 'Estructura semántica y accesibilidad web.', 
      image: '../public/Herramientas/html.png' 
    },
    { 
      id: 4, 
      name: 'CSS3', 
      description: 'Diseño responsivo, Grid, Flexbox y animaciones.', 
      image: '../public/Herramientas/css.png' 
    },

    // --- BACKEND & DATA (SQL/NoSQL) ---
    { 
      id: 5, 
      name: 'JAVA', 
      description: 'Programación orientada a objetos y arquitectura de backend robusta.', 
      image: '../public/Herramientas/java.png' 
    },
    { 
      id: 6, 
      name: 'SQL', 
      description: 'Gestión y consultas complejas en bases de datos relacionales.', 
      image: '../public/Herramientas/sql.png' 
    },
    { 
      id: 7, 
      name: 'MongoDB', 
      description: 'Base de datos orientada a documentos para aplicaciones escalables.', 
      image: '../public/Herramientas/mongodb.png' 
    },
    { 
      id: 8, 
      name: 'Redis', 
      description: 'Almacenamiento en memoria para caché y alta velocidad.', 
      image: '../public/Herramientas/redis.png' 
    },
    { 
      id: 9, 
      name: 'Cassandra', 
      description: 'Gestión de grandes volúmenes de datos distribuidos.', 
      image: '../public/Herramientas/cassandra.png' 
    },
    { 
      id: 10, 
      name: 'Neo4j', 
      description: 'Base de datos orientada a grafos para relaciones complejas.', 
      image: '../public/Herramientas/neo4j.png' 
    },

    // --- MOBILE ---
    { 
      id: 11, 
      name: 'Android Studio', 
      description: 'Desarrollo nativo de aplicaciones móviles en ecosistema Android.', 
      image: '../public/Herramientas/android.png' 
    },
    { 
      id: 12, 
      name: 'Expo', 
      description: 'Iteración rápida y despliegue para aplicaciones React Native.', 
      image: '../public/Herramientas/expo.png' 
    },

    // --- CREATIVE & ENGINE ---
    { 
      id: 13, 
      name: 'Godot Engine', 
      description: 'Desarrollo de videojuegos 2D/3D y sistemas interactivos.', 
      image: '../public/Herramientas/godot.png' 
    },
    { 
      id: 14, 
      name: 'Blender', 
      description: 'Modelado 3D, renderizado y creación de assets.', 
      image: '../public/Herramientas/blender.png' 
    },
    { 
      id: 15, 
      name: 'Photoshop', 
      description: 'Edición de imagen, diseño de UI y composición gráfica.', 
      image: '../public/Herramientas/photoshop.png' 
    }
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(tools.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const getCurrentPageTools = () => {
    const startIndex = currentPage * itemsPerPage;
    return tools.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section id="herramientas" className="tools-section">
      <h2>Herramientas</h2>
      <div className="tools-grid">
        {getCurrentPageTools().map((tool) => (
          <div key={tool.id} className="tool-card">
            <img src={tool.image} alt={tool.name} className="tool-card-image" />
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <div className="navigation-arrows">
          <button 
            className="arrow-btn"
            onClick={handlePrev}
            aria-label="Página anterior"
          >
            ‹
          </button>
          <button 
            className="arrow-btn"
            onClick={handleNext}
            aria-label="Página siguiente"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToolsCarousel;

import { useState, useEffect } from 'react'
import { Cursor } from './Cursor'
import './Blog.css'

export function Blog({ onNavigateHome }) {
  const [isPointer, setIsPointer] = useState(false)
  
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(!!isClickable);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const [posts] = useState([
    {
      id: 1,
      title: 'Mi Viaje en el Desarrollo Web',
      date: '2026-02-15',
      image: 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Web+Development',
      excerpt: 'Reflexiones sobre cómo comenzó mi pasión por la programación y los primeros pasos en el mundo del desarrollo.',
      content: [
        {
          type: 'paragraph',
          text: 'Todo comenzó con una simple curiosidad: ¿cómo funcionan las cosas? Recuerdo aquella primera línea de código que escribí, temblando de emoción mientras veía cómo una simple instrucción podía crear algo tangible en la pantalla.'
        },
        {
          type: 'quote',
          text: 'La programación no es solo escribir código, es resolver problemas y crear experiencias.',
          author: 'Santino'
        },
        {
          type: 'paragraph',
          text: 'En mis inicios, cada error era una montaña imposible de escalar. Los mensajes de error en rojo parecían burlarse de mí, pero con cada intento fallido aprendía algo nuevo. Descubrí que la verdadera esencia del desarrollo no está en la perfección, sino en la perseverancia.'
        },
        {
          type: 'list',
          items: [
            'Aprender a leer la documentación',
            'Entender el pensamiento lógico',
            'Practicar constantemente',
            'No temer al fracaso'
          ]
        },
        {
          type: 'paragraph',
          text: 'Hoy, cada proyecto que emprendo es un homenaje a aquel principiante que no se rindió. La programación se ha convertido en mi forma de expresión, mi herramienta para crear un mundo mejor, pixel a pixel.'
        }
      ]
    },
    {
      id: 2,
      title: 'React Hooks: Simplificando la Lógica',
      date: '2026-02-10',
      image: 'https://via.placeholder.com/800x400/61dafb/000000?text=React+Hooks',
      excerpt: 'Exploración de cómo React Hooks ha transformado la forma en que escribimos componentes funcionales.',
      content: [
        {
          type: 'paragraph',
          text: 'React Hooks representó una revolución en el desarrollo con React. De repente, los componentes funcionales dejaron de ser simples funciones para convertirse en entidades completas con estado y ciclo de vida.'
        },
        {
          type: 'code',
          code: 'const [count, setCount] = useState(0);\nconst [data, setData] = useState(null);\n\nuseEffect(() => {\n  fetchData().then(setData);\n}, []);'
        },
        {
          type: 'paragraph',
          text: 'La magia de los Hooks radica en su simplicidad. useState nos permite manejar el estado sin necesidad de clases, mientras que useEffect nos brinda el control del ciclo de vida de manera elegante y predecible.'
        },
        {
          type: 'list',
          items: [
            'useState: Manejo de estado local',
            'useEffect: Efectos secundarios y ciclo de vida',
            'useContext: Acceso a contextos globales',
            'useMemo: Optimización de cálculos costosos',
            'useCallback: Memorización de funciones'
          ]
        },
        {
          type: 'paragraph',
          text: 'Esta transformación no solo simplificó la sintaxis, sino que también cambió nuestra forma de pensar los componentes. Ahora podemos crear lógica reutilizable y compartirla entre diferentes partes de nuestra aplicación de manera más natural.'
        }
      ]
    },
    {
      id: 3,
      title: 'Diseño Retro en Aplicaciones Modernas',
      date: '2026-02-05',
      image: 'https://via.placeholder.com/800x400/ff6b6b/ffffff?text=Retro+Design',
      excerpt: 'Cómo incorporar elementos visuales retro en interfaces modernas para crear experiencias nostálgicas.',
      content: [
        {
          type: 'paragraph',
          text: 'El diseño retro ha experimentado un renacimiento en el mundo digital. No se trata de copiar el pasado, sino de reinterpretarlo con la tecnología actual para crear experiencias que conecten emocionalmente con los usuarios.'
        },
        {
          type: 'gallery',
          images: [
            'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Pixel+Art',
            'https://via.placeholder.com/300x200/4ecdc4/000000?text=Neon+Grid',
            'https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Terminal+Style'
          ]
        },
        {
          type: 'paragraph',
          text: 'Los elementos retro más populares incluyen tipografías pixeladas, colores neón, efectos CRT, sombras gruesas y animaciones 8-bit. Estos elementos no solo son estéticos, sino que también evocan recuerdos y emociones.'
        },
        {
          type: 'list',
          items: [
            'Tipografías pixeladas y monoespaciadas',
            'Colores neón y vibrantes',
            'Efectos de escaneo y estática',
            'Bordes gruesos y sombras',
            'Animaciones 8-bit'
          ]
        },
        {
          type: 'paragraph',
          text: 'El secreto está en el equilibrio. Un exceso de elementos retro puede resultar caótico, mientras que una pizca estratégica puede darle personalidad a cualquier proyecto moderno.'
        }
      ]
    },
    {
      id: 4,
      title: 'Optimización de Performance en Aplicaciones React',
      date: '2026-01-28',
      image: 'https://via.placeholder.com/800x400/4ecdc4/000000?text=Performance',
      excerpt: 'Técnicas y mejores prácticas para optimizar el rendimiento en aplicaciones React de gran escala.',
      content: [
        {
          type: 'paragraph',
          text: 'En el desarrollo moderno, el rendimiento no es un lujo, es una necesidad. Las aplicaciones lentas frustran a los usuarios y afectan negativamente la experiencia general.'
        },
        {
          type: 'stats',
          data: [
            { label: 'Tiempo de carga ideal', value: '< 3 segundos' },
            { label: 'Renderizado inicial', value: '< 1 segundo' },
            { label: 'Interacciones', value: '< 100ms' }
          ]
        },
        {
          type: 'paragraph',
          text: 'React nos proporciona herramientas poderosas para optimizar el rendimiento. El key más importante es entender cuándo y por qué se vuelve a renderizar un componente.'
        },
        {
          type: 'list',
          items: [
            'Utilizar memoización con useMemo y useCallback',
            'Implementar virtualización para listas largas',
            'Optimizar imágenes y recursos estáticos',
            'Dividir el código con lazy loading',
            'Evitar renders innecesarios con shouldComponentUpdate'
          ]
        },
        {
          type: 'paragraph',
          text: 'La clave está en medir, analizar y optimizar de manera continua. Herramientas como React DevTools, Lighthouse y WebPageTest son imprescindibles para cualquier desarrollador serio.'
        }
      ]
    }
  ])

  const [selectedPost, setSelectedPost] = useState(null)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  if (selectedPost) {
    return (
      <div className="blog-container">
        <Cursor isPointer={isPointer} />
        
        <header className="blog-header">
          <a className="back-link" href="#" onClick={(e) => {
            e.preventDefault();
            setSelectedPost(null);
          }}>
            Volver a Blog
          </a>
          <a className="home-link" href="#" onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}>
            Inicio
          </a>
        </header>

        <article className="post-detail">
          <img src={selectedPost.image} alt={selectedPost.title} className="post-image" />
          <div className="post-meta">
            <h1>{selectedPost.title}</h1>
            <time>{formatDate(selectedPost.date)}</time>
          </div>
          <div className="post-body">
            {selectedPost.content.map((block, index) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={index}>{block.text}</p>;
                case 'quote':
                  return (
                    <blockquote key={index} className="post-quote">
                      <p>"{block.text}"</p>
                      <cite>— {block.author}</cite>
                    </blockquote>
                  );
                case 'list':
                  return (
                    <ul key={index} className="post-list">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  );
                case 'code':
                  return (
                    <pre key={index} className="post-code">
                      <code>{block.code}</code>
                    </pre>
                  );
                case 'gallery':
                  return (
                    <div key={index} className="post-gallery">
                      {block.images.map((image, imageIndex) => (
                        <img key={imageIndex} src={image} alt={`Gallery image ${imageIndex + 1}`} />
                      ))}
                    </div>
                  );
                case 'stats':
                  return (
                    <div key={index} className="post-stats">
                      {block.data.map((stat, statIndex) => (
                        <div key={statIndex} className="stat-item">
                          <span className="stat-label">{stat.label}</span>
                          <span className="stat-value">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="blog-container">
      <Cursor isPointer={isPointer} />
      
      <header className="blog-header">
        <h1 className="blog-title">BLOG / PENSAMIENTOS</h1>
        <a className="home-link" href="#" onClick={(e) => {
          e.preventDefault();
          onNavigateHome();
        }}>
          Inicio
        </a>
      </header>

      <div className="blog-posts">
        {posts.map(post => (
          <article key={post.id} className="blog-card" onClick={() => setSelectedPost(post)}>
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
              <div className="blog-card-overlay">
                <span className="read-more">Leer Más →</span>
              </div>
            </div>
            <div className="blog-card-content">
              <h2>{post.title}</h2>
              <time className="blog-date">{formatDate(post.date)}</time>
              <p>{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="blog-footer">
        <p>© 2026 SANTRAV-SOFTWARE | Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

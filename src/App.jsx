import { useState } from 'react'
import { BootSequence } from './components/BootSequence'
import { MainScreen } from './components/MainScreen'
import { Blog } from './components/Blog'
import './App.css'

function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const handleBootComplete = () => {
    setBootComplete(true)
  }

  if (!bootComplete) {
    return <BootSequence onBootComplete={handleBootComplete} />
  }

  if (currentPage === 'blog') {
    return <Blog onNavigateHome={() => setCurrentPage('home')} />
  }

  return <MainScreen onNavigateBlog={() => setCurrentPage('blog')} />
}

export default App

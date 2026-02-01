import { useState } from 'react'
import Pokedex from './pages/Pokedex';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pokedex />
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ active, setActive ] = useState(false)
  const [ position, setPosition ] = useState({x:0, y:0})

  useEffect( ()=> {
    console.log('efecto', {active})

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({x:clientX, y:clientY})
      console.log('position','x:', clientX, 'y:', clientY)
    }

    if (active){
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      if (active){
        window.removeEventListener('pointermove', handleMove)
      }
    }
  }, [active])


  return (
    <>
    <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}/>
    <div>
      <button onClick={()=> setActive(!active)}>
        {active? 'Desactivar' : 'Activar'} efecto
      </button>
    </div>

    </>
  )
}

export default App
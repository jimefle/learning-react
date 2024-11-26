// cuadrado del tablero

// eslint-disable-next-line react/prop-types
const Square = ({ children, isSelected, updateBoard, index }) =>{
    // children: X u O 
    const className = `square ${isSelected ? 'is-selected' : ''}` // cambia los cuadrados de turno
  
    const handleClick = () => {
      updateBoard(index)
  
    }
  
    return(
      <div className={className} onClick={handleClick}>
        {children} 
      </div>
    )
  }

  export default Square
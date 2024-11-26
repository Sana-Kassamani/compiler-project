import React from 'react';
import '../styles/Selectors.css'

const AiButton = ({children, onClick}) => {
  return (
    <button className='ai-button selector' onClick={onClick}>{children}</button>
  )
}

export default AiButton
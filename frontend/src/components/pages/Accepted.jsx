import React from 'react'
import Check from '../../assets/check.svg'
import '../../styles/Accepted.css'

const Accepted = () => {
  return (
    <div className='accepted'>
        <img src={Check} alt="Accepted" />
        <h1>Invitation Accepted</h1>
    </div>
  )
}

export default Accepted
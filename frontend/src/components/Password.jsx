import React, { useState } from 'react'
import Eye from '../assets/eye.svg'
import ClosedEye from '../assets/eye-closed.svg'

const Password = () => {
    const [type, setType] = useState('password');
    const handleClick = () => {
        setType((prev) => (prev === 'password' ? 'text' : 'password'));
    };
  return (
    <div className="password">
          <input
            type={type}
            name="password"
            placeholder="Password"
            required="required"
          />
          <div className="eye" onClick={handleClick}><img src={type === 'password' ? ClosedEye : Eye} alt="" /></div>
      </div>
  )
}

export default Password
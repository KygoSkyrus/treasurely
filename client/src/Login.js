import React from 'react'

const Login = ({ handleLogin, passCode, setPassCode }) => {
  return (
    <div style={{ display: "flex" }}>
      <input type="password" placeholder='enter passcode' className='input' value={passCode} onChange={e => setPassCode(e.target.value)} onKeyUp={(e) => {
        if (e.key === "Enter") handleLogin()
      }} />
      <button onClick={() => handleLogin()} className='btn'>Enter</button>
    </div>
  )
}

export default Login
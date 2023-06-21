import React from 'react'

const Login = ({handleLogin,passCode,setPassCode}) => {
  return (
    <div>
        <input tyepe="text" placeholder='enter passcode' value={passCode} onChange={e => setPassCode(e.target.value)} />
        <button onClick={()=>handleLogin()}>Enter</button>
    </div>
  )
}

export default Login
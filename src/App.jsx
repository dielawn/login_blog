import { useState } from 'react'
import { Login, Logout } from './Login'
import { AuthReq } from './AuthReq'

import './App.css'

function App() {
  const [user, setUser] = useState(null)


  return (
    <div>

      {user ? <div>
        <h1>Hello {user.username}</h1>
        <Logout />

      </div> : <div>
      <h1>Hello</h1>
      <Login />
      </div>}

    </div>
  )
}

export default App

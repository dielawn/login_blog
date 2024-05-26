import { useState } from 'react'
import { Login, Logout } from './Login'
import { Register } from './Register'
import { AuthReq } from './AuthReq'

import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = () => {
    //check jwt for user data if so set user
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setMessage('Valid token')
      } catch (error) {
        setMessage(`Invalid token ${error}`)
      }
    }
  }

  return (
    <div>
      <AuthReq />
      {user ? <div>
        <h1>Hello {user.username}</h1>
        <Logout handleUser={handleUser} />
      </div> 
      : 
      <div>
        <h1>Hello</h1>
        <h3>Please Login</h3>
        <Login handleUser={handleUser} />
        <hr />
        <h4>Or Create a new account</h4>
        <Register />
      </div>}
      <p>{message}</p>
    </div>
  )
};

export default App

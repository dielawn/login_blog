import { useState, useEffect } from 'react'
import { Login, Logout } from './Login'
import { Register } from './Register'
import { AuthReq } from './AuthReq'
import { jwtDecode } from "jwt-decode";

import './App.css'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const updateUser = (updatedUser) => {
    setUser({ user: updatedUser });
};

  useEffect(() => {
    handleUser();
  }, []);


  const handleUser = async () => {
    //check jwt for user data if so set user
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setMessage('Valid token');
      } catch (error) {
        setMessage(`Invalid token ${error}`)
      }
    } else {
      try {
        const res = await axios.get('/home', {
          headers: { Authorization: `Bearer ${token}`},
        });
        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
          setMessage('User set');
        } else {
          //logging out
          setUser(null)
        }
      } catch (error) {
        setMessage(`Error fetching home: ${error}`)
      }
    }
  }

  return (
    <div>
      {user ?( <div>
          <h1>Hello {user.username}</h1>
          <Logout handleUser={handleUser}  />
          {/* Include other protected components like AuthReq */}
          <AuthReq updateUser={updateUser}/>
        </div>)
      : 
     ( <div>
        <h1>Hello</h1>
        <h3>Please Login</h3>
        <Login handleUser={handleUser} />
        <hr />
        <h4>Or Create a new account</h4>
        <Register />
      </div>)}
      <p>{message}</p>
    </div>
  )
};

export default App

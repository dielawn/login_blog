import React, {useState} from "react";
import axios from "axios";
import config from "./config";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('Starting Message');

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${config.apiBaseUrl}/register`, { username, password, admin: false, posts: [] });
            if (res.status === 201) {
                setMessage('Registration successful')
            }
            if (res.status === 400) {
                setMessage('Username already exists')
            }
            
        }  catch (error) {
            console.log('Error:', error);
            if (error.response) {
                setMessage(`Registration Failed: ${error.response.data.message}`);
            } else {
                setMessage('Registration Failed: An unexpected error occurred.');
            }
        }
        
    }

    return (
        <div>
           <form onSubmit={handleRegistration}>
           <label htmlFor="username">Username 
            <input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /></label>
            <label htmlFor="password">Password 
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                /></label>
            <button type="submit">register</button>
           </form>
           <p>{message}</p>
        </div>
    )
}
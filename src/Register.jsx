import React, {useState} from "react";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegistration = async () => {
        e.preventDefault();
        try {
            const res = await axios.post('/register', { username, password, admin: false });
            if (res.status === 201) {
                setMessage('Registration successful')
            }
            if (res.status === 400) {
                setMessage('Username already exists')
            }
            
        } catch (error) {
            setMessage(`Registration Failed: ${error.res.data.message}`);
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
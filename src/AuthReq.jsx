import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";

export const AuthReq = () => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setMessage('No token found, please log in');
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            try {
                
                const res = await axios.get(`${config.apiBaseUrl}/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage('Token set')
                setData(res.data);
            }  catch (error) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    setMessage(`Failed to fetch data: ${error.response.data.message}`);
                } else if (error.request) {
                    // Request was made but no response received
                    setMessage('Failed to fetch data: No response from server');
                } else {
                    // Something else caused the error
                    setMessage(`Error: ${error.message}`);
                }
            }
        }

        fetchData();
    }, []);
    return (
        <div>
            <h2>AuthReq</h2>
        {data ? (
            <div>{JSON.stringify(data)}</div>
        ) : (
            <p>{message}</p>
        )}
    </div>
    )
}
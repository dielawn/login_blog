import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthReq = () => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('/user/protected-route', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(res.data);
            } catch (error) {
                setMessage(`Failed to fetch data: ${error.res.data.message}`)
            }
        }

        fetchData();
    }, []);
    return (
        <div>
        {data ? (
            <div>{JSON.stringify(data)}</div>
        ) : (
            <p>{message}</p>
        )}
    </div>
    )
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import { convertUnixTime, getHrMin } from "../utils";
import { Blog } from './Blog';
import { NewPost } from "./NewPost";

export const AuthReq = ({ updateUserPosts }) => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');
    const [iat, setIat] = useState(null)
    const [expTime, setExpTime] = useState(null)

    
    useEffect(() => {
        if (data && data.user) {
            setExpTime(getHrMin(data.user.exp))
            setIat(convertUnixTime(data.user.iat))
        }
       }, [data])

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
                console.log('Response Data:', res.data); 
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
            <div>
                <h3><strong>{data.user.username}</strong> is logged in.</h3>
                <p>ID: {data.user.id}</p>
                <p>Session initiated: {iat}</p>
                <p>User will be logged out at: {expTime}</p>
                {data.user.posts && <Blog data={data}/>}
                <div>
                   <NewPost data={data} updateUserPosts={updateUserPosts}/>
                </div>
            </div>

           
        ) : (
            <p>{message}</p>
        )}
    </div>
    )
}
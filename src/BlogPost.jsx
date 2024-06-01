import React, { useState } from "react";
import axios from "axios";
import config from "./config";

export const BlogPost = ({ title, author, content, comments, createdAt, postId, onDelete }) => {
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const res = await axios.delete(`${config.apiBaseUrl}/posts/${postId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                } 
            );
            if (res.status === 200) {
                onDelete(postId)
                setMessage(`Success deleting post: ${postId}`)                
            }

        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
    }

    return (
        <div>
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p>{content}</p>
            <div>
                {comments && comments.map((comment, index) => {
                <div key={index}>
                   <h2>{comment.title}</h2>
                   <h3>{comment.author}</h3>
                   <p>{comment.content}</p>
                </div>
                })}
            </div>
            <p>{new Date(createdAt).toLocaleString()}</p>
            <form onSubmit={handleDelete}><button type="submit">Delete</button></form>
            <p>{message}</p>
        </div>
    )
}; 
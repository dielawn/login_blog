import React, { useState, useEffect } from "react";
import { BlogPost } from "./BlogPost";
import axios from "axios";
import config from "./config";

export const Blog = ({ handleDelete }) => {

    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${config.apiBaseUrl}/posts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (res.status === 200) {
                    setPosts(res.data.posts)
                    setMessage('Post data set')
                } else {
                    setMessage('No posts found')
                }
                
                
            } catch (error) {
                setMessage(`Error: ${error.response?.data?.message || error.message}`);
            }
        };

        fetchPosts();      
    }, [])

    const removePost = (postId) => {
        setPosts(posts.filter(post => post._id !== postId));
    }
    

return (
    <div>
        {posts.length > 0 ? (
            posts.map(post => (
                <BlogPost
                    key={post._id}
                    title={post.title}
                    author={post.author.username} 
                    content={post.content}
                    comments={post.comments}
                    createdAt={post.createdAt}
                    postId={post._id}
                    onDelete={removePost}
                />
            ))
        ) : (
            <p>{message || 'No posts found'}</p>
        )}
    </div>
);
};

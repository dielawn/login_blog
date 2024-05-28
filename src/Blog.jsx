import React, { useState, useEffect } from "react";
import { BlogPost } from "./BlogPost";
import axios from "axios";

export const Blog = ({ data }) => {
const [posts, setPosts] = useState([]);
const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postPromises = data.user.posts.map(postId =>
                    axios.get(`${config.apiBaseUrl}/posts/${postId}`)
                );
                const postResponses = await Promise.all(postPromises);
                const postsData = postResponses.map(response => response.data.post);
                setPosts(postsData)
            } catch (error) {
                setMessage(`Error: ${error.response?.data?.message || error.message}`);
            }
        };

        if (data.user && data.user.posts) {
            fetchPosts();
        }
    }, [data.user])
    
console.log(data.user)
return (
    <div>
        {posts.length > 0 ? (
            posts.map(post => (
                <BlogPost
                    key={post._id}
                    title={post.title}
                    author={post.author.username} // Assuming post.author is populated with user data
                    content={post.content}
                    comments={post.comments}
                    createdAt={post.createdAt}
                />
            ))
        ) : (
            <p>{message || 'No posts found'}</p>
        )}
    </div>
);
};

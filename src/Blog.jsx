import React, { useState, useEffect } from "react";
import { BlogPost } from "./BlogPost";
import axios from "axios";
import config from "./config";

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
                const postsData = postResponses
                    .map(response => response.data.post)
                    .filter(post => post !== null);
                setPosts(postsData)
                console.log(postsData)
            } catch (error) {
                setMessage(`Error: ${error.response?.data?.message || error.message}`);
            }
        };

        if (data.user && data.user.posts) {
            fetchPosts();
        }
    }, [data.user])

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
                    author={post.author.username} // Assuming post.author is populated with user data
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

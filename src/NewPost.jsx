import React,  { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";

export const NewPost = ({ data, updateUserPosts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleNewPost = async (e) => {
        e.preventDefault();
        try {
            console.log(data.user.id)
            const newPost = {
                title,
                author: data.user.id,
                content,
            }
            const token = localStorage.getItem('token');
            const res = await axios.post(`${config.apiBaseUrl}/posts`,
                newPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                } 
            );
            
            if (res.status === 201) {
                //adds post to database user.posts
                const postId = res.data.post._id
                console.log(postId)
                await addPostToUser(postId)   
                // updates user with new db post data      
                updateUserPosts(postId)      
                setMessage('Success posting')
                setTitle('');
                setContent('')
            }
        } catch (error) {
            console.error(error)
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
    }

   
        const addPostToUser = async (postId) => {
            try {                
                const token = localStorage.getItem('token');
                const res = await axios.post(`${config.apiBaseUrl}/user/posts`,
                    { postId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    } 
                );

                if (res.status === 200) {
                    setMessage('Post added to user successfully')
                }
            } catch (error) {
                console.error(error)
                setMessage(`Error: ${error.response?.data?.message || error.message}`);
            }
        }

   
    return (
        <div>
             <fieldset><legend>Blog Post</legend>
                <form onSubmit={handleNewPost}>
                    <input 
                        type="text" 
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit" >Post to blog</button>
                </form>
            </fieldset>
            <p>{message}</p>
        </div>
    )
}
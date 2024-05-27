import React,  { useState } from "react";
import axios from "axios";
import config from "./config";

export const NewPost = ({ data, updateUser }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleNewPost = async (e) => {
        e.preventDefault();
        try {
            
            const newPost = {
                title,
                author: data.user.id,
                content,
            }
            const res = await axios.post(`${config.apiBaseUrl}/posts`, newPost );
            console.log(res)
            if (res.status === 201) {
                //push to user.posts
                
                const createdPost = res.data.post;
                const updatedUser = {...data.user };
                updatedUser.posts.push(createdPost.id);
                updateUser(updatedUser);
                setMessage('Success posting')
                setTitle('');
                setContent('')
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
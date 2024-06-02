import React, { useState, useEffect} from 'react';
import axios from 'axios';
import config from './src/config';

const Comment = ({ commentId }) => {
    const [message, setMessage] = useState('')
    const [commentData, setCommentData] = useState(null)
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [timestamp, setTimestamp] = useState('')

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const res = await axios.get(`${config.apiBaseUrl}/posts/${commentId}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (res.status === 200) {
                    console.log(res.data)
                    setCommentData(res.data)
                    setMessage(`Success fetching comments`)
                } else {
                    setMessage(`${res.status} ${res.message}`)
                }

            } catch (error) {
                setMessage(`Error: ${error.response?.data?.message || error.message}`);
            }
        }
        fetchComment();
    }, [commentId]);

    useEffect(() => {        
        if (commentData) {
            setContent(commentData.post.content);
            setAuthor(commentData.post.author.username);
            setTimestamp(commentData.post.createdAt);
        }
    }, [commentData])

    if (!commentData) {
        setMessage('Loading...')
    }


    return (
       
            <div key={commentId}>
                <p>{author}</p>
                <p>{content}</p>
                <p>{new Date(timestamp).toLocaleString()}</p>
                <p>{message}</p>
            </div>
    )
};

export default Comment;


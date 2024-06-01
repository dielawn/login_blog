import React, { useState } from "react";
import axios from "axios";
import config from "./config";

export const BlogPost = ({ title, author, content, comments, createdAt, postId, onDelete, userId }) => {
    const [message, setMessage] = useState('');
    // UPDATE
    const [isEdit, setIsEdit] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title)
    const [editedContent, setEditedContent] = useState(content)

    // Comments
    const [isCommentsVis, setIsCommentsVis] = useState(false);
    const [isAddComment, setIsAddComment] = useState(false);
    const [newComment, setNewComment] = useState('');
    
    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.delete(`${config.apiBaseUrl}/delete/${postId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    };

    const handleEdit = async (e) => {
        try {
            e.preventDefault();
        const updatedPost = {
            title: editedTitle,
            author,
            content: editedContent,
            comments,
        }
        const res = await axios.put(`${config.apiBaseUrl}/posts/${postId}`, updatedPost,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            } 
        );

        if (res.status === 200) {
            setMessage('Post updated')
            setIsEdit(false)
        } else {
            setMessage(`${res.status} ${res.message}`)
        }

        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
    } 

    const handleComment = async (e) => {
        try {
            e.preventDefault();
            const postComment = {title, author: userId, content: newComment}
            const res = await axios.post(`${config.apiBaseUrl}/posts/${postId}/comments`, postComment, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (res.status === 201) {
                setMessage('Successfully added comment')
            } else {
                setMessage(`${res.status} ${res.message}`)
            }
      

        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }


    }

    return (
        <div>
            {isEdit ? (
                <div>
                    <h3>{author}</h3>
                    <h4>EDIT</h4>
                    <input
                        placeholder={title}
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        placeholder={content}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <form onSubmit={handleEdit}><button type="submit">Save</button></form>
                </div>
            ) : (
                <div>
                    <h2>{title}</h2>
                    <h3>{author}</h3>
                    <p>{content}</p>
                    <button onClick={() => setIsEdit(!isEdit)}>Edit post</button>
                    <button onClick={() => setIsAddComment(!isAddComment)}>Open add Comment</button>

                    {isAddComment && (
                        <form onSubmit={handleComment}>
                            <textarea
                                placeholder="Comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button type="submit">Submit comment</button>
                        </form>
                    )}

                    <button onClick={() => setIsCommentsVis(!isCommentsVis)}>
                        View {comments.length} comments
                    </button>
                    {isCommentsVis && (
                        <div>
                            {comments.map((comment, index) => (
                                <div key={index}>                                   
                                    <p>{comment.author}</p>
                                    <p>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <p>{new Date(createdAt).toLocaleString()}</p>
                    <form onSubmit={handleDelete}><button type="submit">Delete</button></form>
                </div>
            )}
            <p>{message}</p>
        </div>
    );
};
 
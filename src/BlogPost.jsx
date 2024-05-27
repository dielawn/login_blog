import React from "react";

export const BlogPost = ({ title, author, content, comments, createdAt }) => {

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
            <p>{new Date(createdAt).tolocaleString()}</p>
        </div>
    )
}; 
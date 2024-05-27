import React from "react";
import { BlogPost } from "./BlogPost";

export const Blog = ({ data }) => {
    
console.log(data)
    return (
        <div>
            {data && data.user.posts.map((post) => {
                <BlogPost 
                    key={post._id}
                    title={post.title}
                    author={post.author.username}
                    content={post.content}
                    comments={post.comments}
                    createdAt={post.createdAt}
                />
            })}
        </div>
    )
};
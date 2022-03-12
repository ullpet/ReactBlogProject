import React from "react";
import PostListItem from "../PostListItem";
import "./postlist.css";

const PostList = ({posts, onDelete, onToggleImportant, onLike}) => {

    const elements = posts.map((item) => {
        const {id} = item;
        return (
            <li key={item.id}
                className="list-group-item">

                <PostListItem
                label={item.label}
                important={item.important}
                like = {item.like}
                onDelete = {() => onDelete(id)}
                onToggleImportant ={() => onToggleImportant(id)}
                onLike ={() => onLike(id)}
                />
            </li>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;
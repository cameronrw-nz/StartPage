import React from "react";

function RedditView(props) {
    let content;
    if (props.content) {
        content = (
            <div className="reddit-content">
                <a href={`https://reddit.com/${props.content.link}`}>
                    {props.content.name}
                </a>
            </div>
            );
    }
    
    return (
        <div className="reddit">
            <h2>Reddit Saved</h2>
            <div>{props.isLoading ?  "Loaded" : "Loading"}</div>
            <div onClick={props.pickRandom}>Generate Saved</div>
            {content}
        </div>
    )
}

export default RedditView;
import React from "react";

function RedditView(props) {
    let content;
    if (props.content) {
        content = props.content.map(item => {
            return GetRedditItem(item.name, item.link);
        });
    }

    return (
        <div className="sidepanel-content">
            <h2>Reddit Saved</h2>
            {props.isLoading ? (
                <div>Loading...</div>
            ) : (
                <div onClick={props.pickRandom}>
                    Generate Saved Reddit Items
                </div>
            )}
            {content}
        </div>
    );
}

function GetRedditItem(name, link) {
    return (
        <div className="reddit-content">
            <a href={`https://reddit.com/${link}`}>{name}</a>
        </div>
    );
}

export default RedditView;

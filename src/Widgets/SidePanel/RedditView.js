import React from "react";

function RedditView(props) {
    let content;
    let redditContent;

    if (props.isLoggedIn) {
        if (props.content) {
            redditContent = props.content.map(item => {
                return GetRedditItem(item.name, item.link, item.colour);
            });
        }

        content = props.isLoading ? (
            <div>Loading...</div>
        ) : (
            <div onClick={props.pickRandom}>Generate Saved Reddit Items</div>
        );
    } else {
        content = (
            <form onSubmit={props.onSubmit}>
                <div className="sidepanel-link-input">
                    <input type="text" name="username" placeholder="username" />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <button type="submit" className="sidepanel-content-button">
                        +
                    </button>
                </div>
                <div>{props.errorMessage}</div>
            </form>
        );
    }

    return (
        <div className="sidepanel-content">
            <h2>Reddit Saved</h2>
            {redditContent}
            {content}
        </div>
    );
}

function GetRedditItem(name, link, colour) {
    return (
        <div className="reddit-content" style={{ backgroundColor: colour }}>
            <a href={`https://reddit.com/${link}`}>{name}</a>
        </div>
    );
}

export default RedditView;

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
            <div className="action-button" onClick={props.pickRandom}>
                <div className="action-button-content">Refresh</div>
            </div>
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
        <a href={`https://reddit.com/${link}`}>
            <div className="section-item" style={{ backgroundColor: colour }}>
                {name}
            </div>
        </a>
    );
}

export default RedditView;

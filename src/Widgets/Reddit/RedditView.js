import React from "react";

function RedditView(props) {
    let content;
    let redditContent;

    if (props.isLoggedIn) {
        if (props.content) {
            redditContent = props.content.map(item => {
                return GetRedditItem(
                    item.name,
                    item.link,
                    item.colour,
                    props.theme
                );
            });
        }

        content = props.isLoading ? (
            <div style={{ color: props.theme.staticText }}>Loading...</div>
        ) : (
            <div className="action-button" onClick={props.pickRandom}>
                <div
                    className="action-button-content"
                    style={{
                        color: props.theme.staticText,
                        borderColor: props.theme.borderColor
                    }}
                >
                    Refresh
                </div>
            </div>
        );
    } else {
        content = (
            <form onSubmit={props.onSubmit}>
                <div className="sidepanel-link-input">
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        style={{
                            borderColor: props.theme.border,
                            background: props.theme.boxBackground,
                            color: props.theme.dynamicText
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        style={{
                            borderColor: props.theme.border,
                            background: props.theme.boxBackground,
                            color: props.theme.dynamicText
                        }}
                    />
                    <button
                        type="submit"
                        className="sidepanel-content-button"
                        style={{
                            borderColor: props.theme.border,
                            background: props.theme.boxBackground,
                            color: props.theme.dynamicText
                        }}
                    >
                        +
                    </button>
                </div>
                <div
                    style={{
                        color: props.theme.dynamicText
                    }}
                >
                    {props.errorMessage}
                </div>
            </form>
        );
    }

    return (
        <div className="sidepanel-content">
            <h2 style={{ color: props.theme.staticText }}>Reddit Saved</h2>
            {redditContent}
            {content}
        </div>
    );
}

function GetRedditItem(name, link, colour, theme) {
    return (
        <a href={`https://reddit.com/${link}`}>
            <div
                className="section-item"
                style={{ backgroundColor: colour, borderColor: theme.border }}
            >
                {name}
            </div>
        </a>
    );
}

export default RedditView;

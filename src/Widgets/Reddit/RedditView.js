import React from "react";
import Select from "react-select/creatable";

function RedditView(props) {
    let loginDisplay;
    let refreshItemDisplay;
    let redditContentDisplay;
    let chosenSubredditDisplay;

    if (!props.isShowingSubreddits) {
        const customStyles = {
            control: () => ({
                display: "flex",
                backgroundColor: props.theme.boxBackground
            }),
            menuList: provided => ({
                ...provided,
                backgroundColor: props.theme.boxBackground
            }),
            multiValue: provided => ({
                ...provided,
                backgroundColor: props.theme.boxBackground,
                color: props.theme.dynamicText
            }),
            multiValueLabel: provided => ({
                ...provided,
                color: props.theme.dynamicText
            }),
            multiValueRemove: provided => ({
                ...provided,
                color: props.theme.dynamicText
            })
        };
        chosenSubredditDisplay = (
            <div style={{ border: `1px solid ${props.theme.border}` }}>
                <Select
                    styles={customStyles}
                    isMulti={true}
                    closeMenuOnSelect={false}
                    backspaceRemovesValue={true}
                    options={props.availableSubreddits}
                    onChange={props.onSubredditChange}
                    value={props.chosenSubreddits}
                />
            </div>
        );
    }

    if (props.isLoggedIn) {
        if (props.content) {
            redditContentDisplay = props.content.map(redditItem => {
                return GetRedditItemDisplay(
                    redditItem.name,
                    redditItem.link,
                    redditItem.colour,
                    props.theme
                );
            });
        }

        refreshItemDisplay = props.isLoading ? (
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
        loginDisplay = (
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
            {chosenSubredditDisplay}
            {redditContentDisplay}
            {refreshItemDisplay}
            {loginDisplay}
        </div>
    );
}

function GetRedditItemDisplay(name, link, colour, theme) {
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

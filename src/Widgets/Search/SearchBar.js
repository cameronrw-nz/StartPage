import React, { useState } from "react";

import GoogleIcon from "./Resources/GoogleIcon.svg";
import RedditIcon from "./Resources/RedditIcon.svg";
import YoutubeIcon from "./Resources/YoutubeIcon.svg";
import { ThemeContext, themes } from "../../Shared/Theme/ThemeContext";
import LightOn from "../../Shared/Icons/light-on.svg";
import LightOff from "../../Shared/Icons/light-off.svg";

function SearchBar(props) {
    const [currentProviderIndex, setProviderIndex] = useState(0);

    function handleProviderChange(event, maxNoOfProviders) {
        var currentIndex = currentProviderIndex;
        if (event.keyCode === 38) {
            currentIndex--;
        } else if (event.keyCode === 40) {
            currentIndex++;
        }

        setProviderIndex(
            ((currentIndex % maxNoOfProviders) + maxNoOfProviders) %
                maxNoOfProviders
        );
    }

    function handleClick(maxNoOfProviders) {
        var currentIndex = currentProviderIndex;
        currentIndex++;
        setProviderIndex(
            ((currentIndex % maxNoOfProviders) + maxNoOfProviders) %
                maxNoOfProviders
        );
    }

    var providers = [
        {
            action: "https://www.google.com/search",
            placeholder: "Search Google",
            icon: GoogleIcon
        },
        {
            action: "https://www.youtube.com/results?search_query",
            placeholder: "Search Youtube",
            icon: YoutubeIcon
        },
        {
            action: "https://www.reddit.com/search",
            placeholder: "Search Reddit",
            icon: RedditIcon
        }
    ];

    const icon = props.theme.id === themes.dark.id ? LightOn : LightOff;

    return (
        <ThemeContext.Consumer>
            {theme => (
                <form
                    action={providers[currentProviderIndex].action}
                    method="get"
                    name="searchform"
                >
                    <div
                        className="search-bar"
                        style={{
                            color: theme.dynamicText
                        }}
                    >
                        <div
                            className="search-bar-icon"
                            onClick={() => handleClick(providers.length)}
                            style={{
                                borderColor: theme.border,
                                backgroundColor: theme.boxBackground
                            }}
                        >
                            <img
                                src={providers[currentProviderIndex].icon}
                                alt="Switch Search Provider"
                            />
                        </div>
                        <input
                            className="search-bar-search"
                            autoComplete="off"
                            type="text"
                            name="q"
                            onKeyDown={event =>
                                handleProviderChange(event, providers.length)
                            }
                            style={{
                                borderColor: theme.border,
                                backgroundColor: theme.boxBackground,
                                color: theme.dynamicText
                            }}
                        />
                        <img
                            src={icon}
                            className="light-icon"
                            onClick={props.onThemeChanged}
                            alt="logo"
                        />
                    </div>
                </form>
            )}
        </ThemeContext.Consumer>
    );
}

export default SearchBar;

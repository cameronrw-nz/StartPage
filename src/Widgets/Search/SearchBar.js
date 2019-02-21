import React, { useState } from 'react'

import GoogleIcon from './Resources/GoogleIcon.svg'
import RedditIcon from './Resources/RedditIcon.svg'
import YoutubeIcon from './Resources/YoutubeIcon.svg'

function SearchBar() {
    const [currentProviderIndex, setProviderIndex] = useState(0);

    function handleProviderChange(event, maxNoOfProviders) {
        var currentIndex = currentProviderIndex;
        if (event.keyCode === 38){
            currentIndex--;
        }
        else if (event.keyCode === 40) {
            currentIndex++;
        }
        
        setProviderIndex((currentIndex % maxNoOfProviders + maxNoOfProviders) % maxNoOfProviders); 
    }

    function handleClick(maxNoOfProviders) {
        var currentIndex = currentProviderIndex;
        currentIndex++;
        setProviderIndex((currentIndex % maxNoOfProviders + maxNoOfProviders) % maxNoOfProviders); 
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

    return (
        <div className="search-bar">
            <div className="search-bar-icon" onClick={() => handleClick(providers.length)}>
                <img src={providers[currentProviderIndex].icon} alt="Switch Search Provider" />
            </div>
            <form action={providers[currentProviderIndex].action} method="get" name="searchform">
                <input 
                    className="search-bar-search" 
                    autoComplete="off" 
                    type="text" 
                    name="q" 
                    placeholder={providers[currentProviderIndex].placeholder}
                    onKeyDown={(event) => handleProviderChange(event, providers.length)}/>
            </form>
        </div>
    );
}

export default SearchBar
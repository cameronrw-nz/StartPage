import React from 'react'

import GoogleIcon from './Resources/GoogleIcon.svg'
import RedditIcon from './Resources/RedditIcon.svg'
import YoutubeIcon from './Resources/YoutubeIcon.svg'

class SearchBar extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            currentProviderIndex: 0
        }

        this.handleProviderChange = this.handleProviderChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleProviderChange(event, maxNoOfProviders) {
        var currentProviderIndex = this.state.currentProviderIndex;
        if (event.keyCode === 38){
            currentProviderIndex--;
        }
        else if (event.keyCode === 40) {
            currentProviderIndex++;
        }
        
        this.setState({
            currentProviderIndex: (currentProviderIndex % maxNoOfProviders + maxNoOfProviders) % maxNoOfProviders 
        })
    }

    handleClick(maxNoOfProviders) {
        var currentProviderIndex = this.state.currentProviderIndex;
        currentProviderIndex++;
        this.setState({
            currentProviderIndex: (currentProviderIndex % maxNoOfProviders + maxNoOfProviders) % maxNoOfProviders 
        })
    }

    render() {
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
                <div className="search-bar-icon" onClick={() => this.handleClick(providers.length)}>
                    <img src={providers[this.state.currentProviderIndex].icon} alt="Switch Search Provider" />
                </div>
                <form action={providers[this.state.currentProviderIndex].action} method="get" name="searchform">
                    <input 
                        className="search-bar-search" 
                        autoComplete="off" 
                        type="text" 
                        name="q" 
                        placeholder={providers[this.state.currentProviderIndex].placeholder}
                        onKeyDown={(event) => this.handleProviderChange(event, providers.length)}/>
                </form>
            </div>
        )
    }
}

export default SearchBar
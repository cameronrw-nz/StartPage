import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            currentProviderIndex: 0
        }

        this.handleProviderChange = this.handleProviderChange.bind(this)
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

    render() {
        var providers = [
            {
                action: "https://www.google.com/search",
                placeholder: "Search Google"
            },
            {
                action: "https://www.youtube.com/results?search_query",
                placeholder: "Search Youtube"
            },
            {
                action: "https://www.reddit.com/search",
                placeholder: "Search Reddit"
            }
        ];

        
        return (
            <div>
                <form action={providers[this.state.currentProviderIndex].action} method="get" name="searchform">
                    <input 
                        className="search-bar-search" 
                        autoComplete="off" 
                        type="text" 
                        name="q" 
                        placeholder={providers[this.state.currentProviderIndex].placeholder}
                        onKeyDown={(event) => this.handleProviderChange(event, providers.length)} />
                </form>
            </div>
        )
    }
}

export default SearchBar
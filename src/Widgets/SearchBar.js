import React from 'react'

class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <form action="https://www.google.com/search" method="get" name="searchform">
                    <input className="search-bar-search" autocomplete="off" type="text" name="q" placeholder="Search"/>
                </form>
            </div>
        )
    }
}

export default SearchBar
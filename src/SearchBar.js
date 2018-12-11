import React from 'react'

class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <input className="search-bar-search" type="text" placeholder="Search">
                    </input>
                </form>
            </div>
        )
    }
}

export default SearchBar
import React, { Component } from 'react';

import DateBar from './Widgets/DateBar'
import IconBar from './Widgets/IconBar';
import SearchBar from './Widgets/SearchBar'
import Weather from './Widgets/Weather'

import './Styles/App.css';


class App extends Component {
    render() {
        return (
            <div className="app">
                <DateBar />
                <header className="app-content">
                    
                    <SearchBar />
                    <IconBar />
                </header>
            </div>
        );
    }
}

export default App;

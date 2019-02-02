import React, { Component } from 'react';

import DateBar from './Widgets/DateBar'
import IconBar from './Widgets/IconBar';
import SidePanel from './Widgets/SidePanel/SidePanelController';
import SearchBar from './Widgets/Search/SearchBar'
import Weather from './Widgets/Weather/WeatherController'

import './Styles/App.css';


class App extends Component {
    render() {
        return (
            <div className="app">
                <SidePanel />
                <div className="app-header">
                    <Weather />
                    <DateBar />
                </div>
                <header className="app-content">
                    <SearchBar />
                    <IconBar />
                </header>
            </div>
        );
    }
}

export default App;

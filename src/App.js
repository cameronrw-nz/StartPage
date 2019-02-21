import React from 'react';

import DateBar from './Widgets/DateBar'
import IconBar from './Widgets/IconBar';
import SidePanel from './Widgets/SidePanel/SidePanel';
import SearchBar from './Widgets/Search/SearchBar'
import Weather from './Widgets/Weather/WeatherController'

import './Styles/App.css';

function App() {
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

export default App;

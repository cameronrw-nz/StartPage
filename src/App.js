import React from "react";

import DateBar from "./Widgets/DateBar";
import IconBar from "./Widgets/IconBar";
import SidePanel from "./Widgets/SidePanel/SidePanel";
import SearchBar from "./Widgets/Search/SearchBar";
import Weather from "./Widgets/Weather/WeatherController";

import "./Styles/App.css";
import Panels from "./Panels";

function App() {
    return (
        <div className="app">
            <div className="app-header">
                <Weather />
                <DateBar />
            </div>
            <header className="app-content">
                <IconBar />
                <SearchBar />
                <Panels />
            </header>
        </div>
    );
}

export default App;

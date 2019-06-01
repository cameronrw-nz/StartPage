import React, { useState } from "react";

import DateBar from "./Widgets/DateBar";
import IconBar from "./Widgets/IconBar";
import Panels from "./Widgets/Panels";
import SearchBar from "./Widgets/Search/SearchBar";
import Weather from "./Widgets/Weather/WeatherController";
import { ThemeContext, themes } from "./Shared/Theme/ThemeContext";
import ThemeButton from "./Shared/Theme/ThemeButton";

import "./Styles/App.css";

function App() {
    const [theme, setTheme] = useState(themes.light);

    const toggleTheme = () => {
        setTheme(theme === themes.dark ? themes.light : themes.dark);
    };

    return (
        <ThemeContext.Provider value={theme}>
            <div className="app" style={{ backgroundColor: theme.background }}>
                <div className="app-header">
                    <Weather />
                    <DateBar />
                </div>
                <header className="app-content">
                    <IconBar />
                    <SearchBar theme={theme} onThemeChanged={toggleTheme} />
                    <Panels />
                </header>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;

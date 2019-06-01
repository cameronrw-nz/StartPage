import React, { useState } from "react";

import DateBar from "./Widgets/DateBar";
import IconBar from "./Widgets/IconBar";
import Panels from "./Widgets/Panels";
import SearchBar from "./Widgets/Search/SearchBar";
import Weather from "./Widgets/Weather/WeatherController";
import { ThemeContext, themes } from "./Shared/Theme/ThemeContext";

import "./Styles/App.css";

function App() {
    const defaultTheme = window.localStorage.getItem("theme");
    const [theme, setTheme] = useState(
        defaultTheme ? JSON.parse(defaultTheme) : themes.dark
    );

    const toggleTheme = () => {
        const newTheme =
            theme.id === themes.dark.id ? themes.light : themes.dark;
        setTheme(newTheme);
        localStorage.setItem("theme", JSON.stringify(newTheme));
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

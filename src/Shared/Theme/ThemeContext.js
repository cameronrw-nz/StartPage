import React from "react";

export const themes = {
    light: {
        id: 0,
        boxBackground: "#d0d0d0",
        staticText: "black",
        dynamicText: "black",
        background: "#b9b9b9",
        border: "black"
    },
    dark: {
        id: 1,
        boxBackground: "#49505f",
        staticText: "#818b9e",
        dynamicText: "white",
        background: "#383e4b",
        border: "#6b7586"
    }
};

export const ThemeContext = React.createContext(
    JSON.parse(window.localStorage.getItem("theme")) || themes.dark
);

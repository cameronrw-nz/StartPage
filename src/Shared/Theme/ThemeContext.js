import React from "react";

export const themes = {
    light: {
        boxBackground: "#d0d0d0",
        staticText: "black",
        dynamicText: "black",
        background: "#b9b9b9",
        border: "black"
    },
    dark: {
        boxBackground: "#49505f",
        staticText: "#818b9e",
        dynamicText: "white",
        background: "#383e4b",
        border: "#6b7586"
    }
};

export const ThemeContext = React.createContext(themes.dark);

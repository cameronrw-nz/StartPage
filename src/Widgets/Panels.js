import React from "react";
import CurrencyConversion from "./CurrencyConversion";
import RedditController from "./Reddit/RedditController";
import Link from "./Links";
import { ThemeContext } from "../Shared/Theme/ThemeContext";

function Panels() {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <div className="panels">
                    <RedditController />
                    <CurrencyConversion />
                    <Link theme={theme} />
                </div>
            )}
        </ThemeContext.Consumer>
    );
}

export default Panels;

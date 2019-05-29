import React from "react";
import CurrencyConversion from "./Widgets/CurrencyConversion";
import RedditController from "./Widgets/RedditController";
import Link from "./Widgets/Links";

function Panels() {
    return (
        <div className="panels">
            <RedditController />
            <CurrencyConversion />
            <Link />
        </div>
    );
}

export default Panels;

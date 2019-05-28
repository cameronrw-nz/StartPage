import React from "react";
import CurrencyConversion from "./Widgets/SidePanel/CurrencyConversion";
import RedditController from "./Widgets/SidePanel/RedditController";
import Link from "./Widgets/SidePanel/Links";

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

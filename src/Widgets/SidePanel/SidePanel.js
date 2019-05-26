import React, { useState } from "react";

import RedditController from "./RedditController";
import CurrencyConversion from "./CurrencyConversion";
import Link from "./Links";

function SidePanel() {
    const [isExpanded, setExpanded] = useState(false);

    function handleExpand() {
        setExpanded(!isExpanded);
    }

    var marginLeft = "-355px";
    if (isExpanded === true) {
        marginLeft = "0px";
    }

    return (
        <div>
            <div className="sidepanel" style={{ marginLeft: marginLeft }}>
                <div className="sidepanel-expander" onClick={handleExpand} />
                <CurrencyConversion />
                <RedditController />
                <Link />
            </div>
        </div>
    );
}

export default SidePanel;

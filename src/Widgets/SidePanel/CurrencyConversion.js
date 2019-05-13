import React, { useState, useEffect } from "react";

import * as Api from "../../Api/Api"

function CurrencyConversion() {
    const [thb, setThb] = useState(1)
    const [nzd, setNzd] = useState(1)
    const [nzdToThb, setNzdToThb] = useState(1)

    useEffect(() => {
        Api.getCurrencyConversion()
            .then(
                response => {
                    if (!response || !response.data || !response.data.NZD_THB) {
                        return;
                    }
                    setNzdToThb(response.data.NZD_THB.val);
                    setThb((parseFloat(nzd) * response.data.NZD_THB.val).toFixed(2));
                });
    });

    function onNZDChanged(e) {
        setNzd(e.target.value);
        setThb((parseFloat(e.target.value) * nzdToThb).toFixed(2));
    }

    function onTHBChanged(e) {
        setNzd((parseFloat(e.target.value) / nzdToThb).toFixed(2));
        setThb(e.target.value);
    }
    console.log(`NZD: ${nzd}, THB: ${thb}`);
    return (
        <div className="sidepanel-content">
            <h2>Currency Converter</h2>
            <input type="text" placeholder="THB" name="thb" value={thb} onInput={onTHBChanged} />
            <input type="text" placeholder="NZD" name="nzd" value={nzd} onInput={onNZDChanged} />
        </div>
    );
}

export default CurrencyConversion;
import React, { useState, useEffect } from "react";
import axios from "axios";

function CurrencyConversion() {
    const [thb, setThb] = useState(1)
    const [nzd, setNzd] = useState(1)
    const [nzdToThb, setNzdToThb] = useState(1)

    useEffect(() => {
        axios
        .get("https://free.currencyconverterapi.com/api/v6/convert?q=NZD_THB&compact=y&apiKey=" + process.env.REACT_APP_CURRENCY_APIKEY)
        .then( 
            response => {
                if (!response || !response.data || !response.data.NZD_THB) {
                    return ;
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

    return (
        <div className="sidepanel-content">
            <h2>Currency Converter</h2>
            <input type="text" placeholder="THB" name="thb" value={thb} onInput={onTHBChanged} />
            <input type="text" placeholder="NZD" name="nzd" value={nzd} onInput={onNZDChanged} />
        </div>
    );
}

export default CurrencyConversion;
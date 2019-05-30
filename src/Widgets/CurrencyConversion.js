import React, { useState, useEffect } from "react";

import * as Api from "../Api/Api";

const availableCurrencies = ["NZD", "THB", "USD"];

function CurrencyConversion() {
    const [fromCurrency, setFromCurrency] = useState("NZD");
    const [toCurrency, setToCurrency] = useState("THB");
    const [fromAmount, setFromAmount] = useState(1);
    const [toAmount, setToAmount] = useState(1);
    const [fromTo, setFromTo] = useState(1);

    useEffect(() => {
        getExchangeRate();
    }, []);

    function getExchangeRate(isSettingTo = true) {
        Api.getCurrencyConversion(fromCurrency, toCurrency).then(response => {
            if (
                !response ||
                !response.data ||
                !response.data[`${fromCurrency}_${toCurrency}`]
            ) {
                return;
            }
            setFromTo(response.data[`${fromCurrency}_${toCurrency}`].val);
            if (isSettingTo) {
                setToAmount(
                    (
                        parseFloat(fromAmount) *
                        response.data[`${fromCurrency}_${toCurrency}`].val
                    ).toFixed(2)
                );
            } else {
                setFromAmount(
                    (
                        parseFloat(toAmount) /
                        response.data[`${fromCurrency}_${toCurrency}`].val
                    ).toFixed(2)
                );
            }
        });
    }

    function onToChanged(e) {
        setToAmount(e.target.value);
        setFromAmount((parseFloat(e.target.value) * fromTo).toFixed(2));
    }

    function onFromChanged(e) {
        setToAmount((parseFloat(e.target.value) / fromTo).toFixed(2));
        setFromAmount(e.target.value);
    }

    function onFromCurrencyChanged() {
        var currencyIndex = availableCurrencies.indexOf(fromCurrency);
        var newIndex = (currencyIndex + 1) % availableCurrencies.length;
        setFromCurrency(availableCurrencies[newIndex]);
        getExchangeRate();
    }

    function onToCurrencyChanged() {
        var currencyIndex = availableCurrencies.indexOf(toCurrency);
        var newIndex = (currencyIndex + 1) % availableCurrencies.length;
        setToCurrency(availableCurrencies[newIndex]);
        getExchangeRate(false);
    }

    return (
        <div className="sidepanel-content">
            <h2>Currency Converter</h2>
            <div className="sidepanel-link-input">
                <input
                    type="text"
                    placeholder="THB"
                    value={fromAmount}
                    onInput={onFromChanged}
                />
                <div
                    className="currency"
                    style={{ marginRight: "4px" }}
                    onClick={onFromCurrencyChanged}
                >
                    {fromCurrency}
                </div>
                <input
                    type="text"
                    placeholder="NZD"
                    value={toAmount}
                    onInput={onToChanged}
                />
                <div className="currency" onClick={onToCurrencyChanged}>
                    {toCurrency}
                </div>
            </div>
        </div>
    );
}

export default CurrencyConversion;

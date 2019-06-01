import React, { useState, useEffect } from "react";

import * as Api from "../Shared/Api/Api";
import usePrevious from "../UsePrevious";
import { ThemeContext } from "../Shared/Theme/ThemeContext";

const availableCurrencies = ["NZD", "THB", "USD"];

function CurrencyConversion() {
    const [fromCurrency, setFromCurrency] = useState("NZD");
    const [toCurrency, setToCurrency] = useState("THB");
    const [fromAmount, setFromAmount] = useState(1);
    const [toAmount, setToAmount] = useState(1);
    const [fromTo, setFromTo] = useState(1);

    const previousFrom = usePrevious(fromCurrency);
    const previousTo = usePrevious(toCurrency);

    useEffect(() => {
        if (previousFrom !== fromCurrency) {
            getExchangeRate();
        } else if (previousTo !== toCurrency) {
            getExchangeRate(false);
        }
    }, [fromCurrency, toCurrency]);

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
        setFromAmount((parseFloat(e.target.value) / fromTo).toFixed(2));
    }

    function onFromChanged(e) {
        setToAmount((parseFloat(e.target.value) * fromTo).toFixed(2));
        setFromAmount(e.target.value);
    }

    function onFromCurrencyChanged() {
        var currencyIndex = availableCurrencies.indexOf(fromCurrency);
        var newIndex = (currencyIndex + 1) % availableCurrencies.length;
        setFromCurrency(availableCurrencies[newIndex]);
    }

    function onToCurrencyChanged() {
        var currencyIndex = availableCurrencies.indexOf(toCurrency);
        var newIndex = (currencyIndex + 1) % availableCurrencies.length;
        setToCurrency(availableCurrencies[newIndex]);
    }

    return (
        <ThemeContext.Consumer>
            {theme => (
                <div className="sidepanel-content">
                    <h2 style={{ color: theme.staticText }}>
                        Currency Converter
                    </h2>
                    <div
                        className="sidepanel-link-input"
                        style={{ color: theme.dynamicText }}
                    >
                        <input
                            type="text"
                            placeholder="THB"
                            value={fromAmount}
                            onChange={onFromChanged}
                            style={{
                                borderColor: theme.border,
                                background: theme.boxBackground,
                                color: theme.dynamicText
                            }}
                        />
                        <div
                            className="currency"
                            onClick={onFromCurrencyChanged}
                            style={{
                                marginRight: "4px",
                                borderColor: theme.border,
                                background: theme.boxBackground
                            }}
                        >
                            {fromCurrency}
                        </div>
                        <input
                            type="text"
                            placeholder="NZD"
                            value={toAmount}
                            onChange={onToChanged}
                            style={{
                                borderColor: theme.border,
                                background: theme.boxBackground,
                                color: theme.dynamicText
                            }}
                        />
                        <div
                            className="currency"
                            onClick={onToCurrencyChanged}
                            style={{
                                borderColor: theme.border,
                                background: theme.boxBackground
                            }}
                        >
                            {toCurrency}
                        </div>
                    </div>
                </div>
            )}
        </ThemeContext.Consumer>
    );
}

export default CurrencyConversion;

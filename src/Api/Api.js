import axios from "axios";

export async function getCurrencyConversion() {
    return axios
        .get("https://free.currencyconverterapi.com/api/v6/convert?q=NZD_THB&compact=y&apiKey=" + process.env.REACT_APP_CURRENCY_APIKEY)
}
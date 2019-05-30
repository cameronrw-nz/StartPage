import axios from "axios";

export async function getCurrencyConversion(from, to) {
    return axios.get(
        `https://free.currencyconverterapi.com/api/v6/convert?q=${from}_${to}&compact=y&apiKey=${
            process.env.REACT_APP_CURRENCY_APIKEY
        }`
    );
}

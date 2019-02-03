import React from "react";
import axios from "axios";

class CurrencyConversion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            thb: 100,
            nzd: undefined,
            nzdToThb: 1
        }

        this.onNZDChanged = this.onNZDChanged.bind(this);
        this.onTHBChanged = this.onTHBChanged.bind(this);
    }
    
    componentDidMount() {
        axios
            .get("https://free.currencyconverterapi.com/api/v6/convert?q=NZD_THB&compact=y")
            .then( 
                response => {
                    this.setState({
                        nzdToThb: response.data.NZD_THB.val,
                        nzd: (parseFloat(this.state.thb) / response.data.NZD_THB.val).toFixed(2),
                    })
                });
    }

    onNZDChanged(e) {
        this.setState({
            nzd: e.target.value,
            thb: (parseFloat(e.target.value) * this.state.nzdToThb).toFixed(2)
        })
    }

    onTHBChanged(e) {

        this.setState({
            nzd: (parseFloat(e.target.value) / this.state.nzdToThb).toFixed(2),
            thb: e.target.value
        })
    }

    render() {
        return (
            <div className="sidepanel-content">
                <h2>Currency Converter</h2>
                <input type="text" placeholder="THB" name="thb" value={this.state.thb} onInput={this.onTHBChanged} />
                <input type="text" placeholder="NZD" name="nzd" value={this.state.nzd} onInput={this.onNZDChanged} />
            </div>
        );
    }
}

export default CurrencyConversion;
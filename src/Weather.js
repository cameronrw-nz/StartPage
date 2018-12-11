import React from 'react'
import axios from 'axios';

class Weather extends React.Component {
    constructor() {
        super()
    
        this.state = {
            weather: '',
            main: '',
        }
    
        this.getMyLocation = this.getMyLocation.bind(this)
    }
    
    componentDidMount() {
        this.getMyLocation()
    }
    
    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation
        
        if (location) {
            location.getCurrentPosition((position) => {
                this.getWeatherData(position.coords.latitude, position.coords.longitude)
            }, (error) => {
                this.setState({ weather: 'err-weather', main: 'err-main' })
            })
        }
    
    }

    async getWeatherData(latitude, longitude) {
        axios
            .get("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude +  "&lon=" + longitude + "&units=metric&APPID=3c948094ab0c37cefda77bff721b6f13")
            .then( 
                response => {
                    this.setState({
                        weather: response.data.weather,
                        main: response.data.main
                    })
                });
    }
    
    render() {
        const { weather, main } = this.state
        
        return (
            <div>
                <div>{new String(weather)}</div>
                <div>{new String(main)}</div>
            </div>
        )
    }
}

export default Weather
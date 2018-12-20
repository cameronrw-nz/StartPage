import React from 'react'
import axios from 'axios';

import WeatherView from './WeatherView'

class WeatherController extends React.Component {
    constructor() {
        super()
    
        this.state = {
            currentWeather: null
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
            })
        }
    
    }

    // Bad practice to show API key but since it's a free acc it doesn't matter 
    async getWeatherData(latitude, longitude) {
        axios
            .get("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude +  "&lon=" + longitude + "&units=metric&dt=UTC&APPID=3c948094ab0c37cefda77bff721b6f13")
            .then( 
                response => {

                    var currentWeather = {
                        weatherId: response.data.weather[0].id,
                        temp: response.data.main.temp,
                        wind: response.data.wind.speed,
                        sunriseTime: response.data.sys.sunrise,
                        sunsetTime: response.data.sys.sunset,
                    }
                    this.setState({
                        currentWeather:  currentWeather,
                    })
                });
    }
    
    render() {
        return (
            <React.Fragment>
                {this.state.currentWeather === null ? <div /> : (<WeatherView currentWeather={this.state.currentWeather}/>)}
            </React.Fragment>
        )
    }
}

export default WeatherController
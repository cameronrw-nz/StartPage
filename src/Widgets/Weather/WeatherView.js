import React from 'react'

import * as WeatherIds from './Resources/WeatherConstants'
import BrokenClouds from './Resources/brokenClouds.svg'
import ClearSky from './Resources/clearSky.svg'
import FewClouds from './Resources/fewClouds.svg'
import Fog from './Resources/fog.svg'
import HeavyRain from './Resources/heavyRain.svg'
import Rain from './Resources/rain.svg'
import ScatteredClouds from './Resources/scatteredClouds.svg'
import Snow from './Resources/snow.svg'
import ThunderStorm from './Resources/thunderStorm.svg'

function WeatherView(props) {
    var description = props.currentWeather.weatherId !== null ? WeatherIds["id" + props.currentWeather.weatherId] : ""

    let icon = null;
    if (props.currentWeather.weatherId !== null){
        switch (props.currentWeather.weatherId.toString()[0]) {
            case "2":
                icon = ThunderStorm
                break;
            case "3":
                icon = Rain
                break;
            case "5":
                icon = HeavyRain
                break;
            case "6":
                icon = Snow
                break;
            case "7":
                icon = Fog
                break;
            case "8":
                switch (props.currentWeather.weatherId) {
                    case 800:
                        icon = ClearSky
                        break;
                    case 801:
                        icon = FewClouds
                        break;
                    case 802:
                        icon = ScatteredClouds
                        break;
                    case 803:
                    case 804:
                        icon = BrokenClouds
                        break;
                    default:
                        icon = null;
                }
                break;
            default:
                icon = null
        }
    }

    return (
        <div className="weather">
            <div className="weather-current-primary">    
                <div className="flex-item">
                        {Math.round(props.currentWeather.temp * 10 ) / 10 + "\xB0C"}
                    <img src={icon} className="weather-primary-icon" alt="logo" />
                </div>
                
            </div>
            <div className="weather-current-secondary">
                <div className="flex">
                    {"Sunrise: " + new Date(props.currentWeather.sunriseTime*1000).toLocaleTimeString('it-IT')}
                </div>
                <div className="flex">
                    {"Sunset: " + new Date(props.currentWeather.sunsetTime*1000).toLocaleTimeString('it-IT')}
                </div>
            </div>
        </div>
    )
}

export default WeatherView
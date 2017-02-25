import React, { Component } from 'react';
import ForecastIo from 'forecastio';
import GoogleMapsApi from 'googlemaps';
import Navbar from './components/navbar';
import LoadingIndicator from './components/loading.js';
import Container from './components/container';
import PageHeader from './components/page-header';
import CurrentWeather from './components/currentWeather';
import WeatherDetails from './components/weatherDetails';
import HorizontalSplitter from './components/horizontalSplitter';
import ThreeDaysForecast from './components/threeDaysforecast';

const KEYS = {
  FORCAST_IO_KEY: "2374093c2fb941ec35ea56c924888425",
  GOOGLE_MAPS_KEY: "AIzaSyA5IMvt44BgUBVCYfNICNKsHuyCUBuE2o0"
}

// English and french days's names
const DAYS = {
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  fr: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ]
}

// forecastio api
const Forecast = new ForecastIo(KEYS.FORCAST_IO_KEY);

// googlemaps api
const publicConfig = {
  key: KEYS.GOOGLE_MAPS_KEY
}
const GoogleMap = new GoogleMapsApi(publicConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      language: '',
      city: '',
      weather: {}
    }
    this.request = this.request.bind(this);
    this.getDayOfTheWeek = this.getDayOfTheWeek.bind(this);
    this.getData();
  }

  // Geolocation
  getData() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.request);
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }
  // Request weather data
  request(location) {
    let longitude = location.coords.longitude;
    let latitude = location.coords.latitude;
    let language = navigator.language;
    // forecastio options
    let options = {
      exclude: "minutly, hourly, flags",
      units: "auto",
      lang: language
    }
    // Get weather data
    Forecast.forecast(latitude, longitude, options, (err, data) => {
      if(err) {
        throw err;
      }
      // googlemaps options
      let reverseGeocodeParams = {
        latlng: `${latitude},${longitude}`,
        language: language,
        location_type: "APPROXIMATE",
        result_type: "locality"
      }
      // Get city name
      GoogleMap.reverseGeocode(reverseGeocodeParams, (err, city) => {
        if(err) {
          throw err;
        }
        //Send weather data, city data and request language
        let cityName = city.results[0].address_components[0].long_name;
        this.setState({ language, weather: data, city: cityName, loaded: true });
      });
    });
  }
  // Get day of the week from a timestamp
  getDayOfTheWeek(timestamp, lang) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    if(lang !== "en" && lang !== "fr") {
      lang = "en";
    }
    return DAYS[lang][day];
  }

  render() {
    let sunrise = {};
    let sunset = {};
    let forecast = [];
    // format some data, I want to sleep maybe I'll rewrite this later
    if(this.state.loaded) {
      sunrise.timestamp = this.state.weather.daily.data[0].sunriseTime;
      sunrise.date = (new Date(sunrise.timestamp * 1000));
      sunrise.hour = sunrise.date.getHours() < 10 ? "0" + sunrise.date.getHours() : sunrise.date.getHours();
      sunrise.minute = sunrise.date.getMinutes() < 10 ? "0" + sunrise.date.getMinutes() : sunrise.date.getMinutes();
    
      sunset.timestamp = this.state.weather.daily.data[0].sunsetTime;
      sunset.date = (new Date(sunset.timestamp * 1000));
      sunset.hour = sunset.date.getHours() < 10 ? "0" + sunset.date.getHours() : sunset.date.getHours();
      sunset.minute = sunset.date.getMinutes() < 10 ? "0" + sunset.date.getMinutes() : sunset.date.getMinutes();

      forecast = [
        {
          tempMax: parseInt(this.state.weather.daily.data[1].temperatureMax, 10),
          tempMin: parseInt(this.state.weather.daily.data[1].temperatureMin, 10),
          icon: this.state.weather.daily.data[1].icon,
          date: this.getDayOfTheWeek(this.state.weather.daily.data[1].time, this.state.language)
        },
        {
          tempMax: parseInt(this.state.weather.daily.data[2].temperatureMax, 10),
          tempMin: parseInt(this.state.weather.daily.data[2].temperatureMin, 10),
          icon: this.state.weather.daily.data[2].icon,
          date: this.getDayOfTheWeek(this.state.weather.daily.data[2].time, this.state.language)
        },
        {
          tempMax: parseInt(this.state.weather.daily.data[3].temperatureMax, 10),
          tempMin: parseInt(this.state.weather.daily.data[3].temperatureMin, 10),
          icon: this.state.weather.daily.data[3].icon,
          date: this.getDayOfTheWeek(this.state.weather.daily.data[3].time, this.state.language)
        }
      ]
    }
    return (
      <div>
       <Navbar />
       <LoadingIndicator hide={this.state.loaded}/>
       {
        this.state.loaded 
        &&
        <Container>
        <PageHeader cityName={this.state.city}/>
        <CurrentWeather 
          icon={this.state.weather.currently.icon}
          temperature={parseInt(this.state.weather.currently.temperature, 10)+ "°"}
          summary={this.state.weather.currently.summary}
        />  
        <WeatherDetails 
          precipIntensity={this.state.weather.currently.precipIntensity + " %"}
          sunriseTime={`${sunrise.hour}:${sunrise.minute}`}
          sunsetTime={`${sunset.hour}:${sunset.minute}`}
          windSpeed={parseInt(this.state.weather.currently.windSpeed, 10) + " m/s"}
        />
        <HorizontalSplitter />
        <ThreeDaysForecast 
          forecast={forecast}
          summary={this.state.weather.daily.summary}
        />
        </Container>
       }
      </div>
    );
  }
}

export default App;

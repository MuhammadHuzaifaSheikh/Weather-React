import React from "react";
import "./App.css";
import Form from "./app_component/form.component";
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };



  }



  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }


  getWeather = (e) => {
    e.preventDefault();


    const city = e.target.elements.city.value;
    let url = 'https://community-open-weather-map.p.rapidapi.com/weather?q=' + city;
    fetch(url, {
      method: 'GET',
      // body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "1c66ab8b48msh3db4f21f3bc5d18p1d1f55jsn535379a20358",
      },
    }).then((data) => {
      data.json().then((response) => {
        console.log(response);

        this.setState({city:response.name,country:" ,"+ response.sys.country,
          celsius: Math.floor((response.main.temp)-273),
          temp_max:Math.floor((response.main.temp_max)-273),
          temp_min:Math.floor((response.main.temp_min)-273),
          description:response.weather[0].description,

        })

        let weatherIcon = {
          Thunderstorm: "wi-thunderstorm",
          Drizzle: "wi-sleet",
          Rain: "wi-storm-showers",
          Snow: "wi-snow",
          Atmosphere: "wi-fog",
          Clear: "wi-day-sunny",
          Clouds: "wi-day-fog"
        };

        this.get_WeatherIcon(weatherIcon, response.weather[0].id);

      })
    }).catch((error) => {
      console.log(error);
    });


  };

  render() {
    return (
        <div className="App">
          <Form loadweather={this.getWeather} error={this.state.error} />
          <Weather
              cityname={this.state.city}
              countryName={this.state.country}
              weatherIcon={this.state.icon}
              temp_celsius={this.state.celsius}
              temp_max={this.state.temp_max}
              temp_min={this.state.temp_min}
              description={this.state.description}
          />
        </div>
    );
  }
}

export default App;
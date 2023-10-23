import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
// import './App.css';

const API_KEY = '302a1f9beaeacb4c121ebdbf9cc32cc8';

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: '',
    weather: undefined
  }

  gettingWeather = async (e) => {

    e.preventDefault();
    const city = e.target.elements.city.value;

      if(city){
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        console.log(data);

        if (!data.message){

        let date = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        let sunset_date = date;

        let date1 = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        let sunrise_date = date1;

        let tempepature = Math.round(data.main.temp);

        switch(data.weather[0].main){
          case 'Thunderstorm':
            document.querySelector(".wrapper").style.backgroundImage = 'url(https://wallpapers.com/images/hd/captivating-4k-display-of-a-lightning-storm-1z2emqcmjbrhywkc.jpg)';
            break
          case 'Drizzle':
            document.querySelector(".wrapper").style.backgroundImage = 'url(https://wallpapers.com/images/hd/rain-4k-3zpnnzngt4ldywx5.jpg)';
            break
          case 'Rain':
            document.querySelector(".wrapper").style.backgroundImage = "url(https://www.sciline.org/wp-content/uploads/2021/02/cropped-Torrential-Rain-Flooding-and-Climate-Change.jpg)";
            break
          case 'Snow':
            document.querySelector(".wrapper").style.backgroundImage = "url(https://www-cdn.eumetsat.int/files/styles/16_9_large/s3/2022-07/snow_road_forest_aspot_AdobeStock.jpg?h=d1cb525d&itok=BswrDXoq)";
            break
          case 'Clear':
            document.querySelector(".wrapper").style.backgroundImage = "url(https://wallpapers.com/images/hd/greenish-yellow-clear-sky-yj0vaq01r0minqre.jpg)";
            break
          case 'Clouds':
            document.querySelector(".wrapper").style.backgroundImage = 'url(https://wallpapers.com/images/featured/clouds-6swlqte8g6dniemk.jpg)';
            break
          default:
            document.querySelector(".wrapper").style.backgroundImage = "url(https://cdn.staticcrate.com/stock-hd/effects/footagecrate-4k-looping-mist-background-1-effect-lg.jpg)";
            break
          };

        this.setState({
          temp: tempepature,
          city: data.name,
          country: data.sys.country,
          sunrise: sunrise_date,
          sunset: sunset_date,
          error: "",
          weather: data.weather[0].main
        });

        } else{
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: `${data.message}, try to write right name`,
          weather: undefined
      });
      };

    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Please enter the city",
        weather: undefined
      });
    }
  };
  
  render(){
    return(
      <div>
        <div className="wrapper">
          <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info/>
              </div>
            <div className="col-sm-7 form">        
              <Form weatherMethod={this.gettingWeather} />
              <Weather 
                temp = {this.state.temp}
                city = {this.state.city}
                country = {this.state.country}
                sunrise = {this.state.sunrise}
                sunset = {this.state.sunset}
                error = {this.state.error}
                weather = {this.state.weather}
              />
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
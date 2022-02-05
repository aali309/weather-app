import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Panel, PanelGroup } from "react-bootstrap";

function MainComponent(props) {
  //useSate to set the data pulled from the weather object
  const [weatherData, setWeatherData] = useState();
  //this will get the current location from
  let id = props.location;

  const getData = async (id) => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=baaff88971c49e8746e3c9e3262fc830`
    );
    setWeatherData(response.data);
  };

  //updateing the page
  useEffect(() => {
    getData(id);
  }, [id]);

  {
    //physically see the object in the console
    console.log(weatherData);
  }

  if (weatherData) {
    return (
      <div className="panel">
        <div>
          <img
            src={`http://openweathermap.org/images/flags/${weatherData.sys.country.toLowerCase()}.png`}
          />
          <span> </span>
          <span>
            {weatherData.name},{weatherData.sys.country}
          </span>

          <p>
            Feels Like:
            {Math.floor(weatherData.main.feels_like)}&deg;C,{" "}
            {weatherData.weather[0].description}
          </p>
          <span>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
            {Math.floor(weatherData.main.temp)}&deg;C
          </span>
          <br />
        </div>

        <table id="customers">
          <tr>
            <td>
              <span>
                Expected weather from :{" "}
                <span id="wind">{Math.floor(weatherData.main.temp_min)}</span>
                &deg;C
              </span>{" "}
              to{" "}
              <span>
                <span id="wind">{Math.floor(weatherData.main.temp_max)}</span>
                &deg;C
              </span>
            </td>
          </tr>
          <tr>
            <td>
              Humidity - <span id="humidity">{weatherData.main.humidity}</span>%
              <span>💧</span>{" "}
              <span>Pressure : {weatherData.main.pressure} </span>
              <span>
                <span>Clouds : {weatherData.weather[0].description} </span>{" "}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                Wind: <span id="wind">{weatherData.wind.speed}</span> m/s
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                Geo Location:{" "}
                <span id="wind">
                  {weatherData.coord.lat} , {weatherData.coord.lon}
                </span>
              </span>
            </td>
          </tr>
        </table>
      </div>
    );
  } else {
    return <div>ERROR</div>;
  }
}

export default MainComponent;

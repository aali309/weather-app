import React from "react";
import { PanelGroup, Panel, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SearchListComponent(props) {
  const [weatherData, setWeatherData] = useState([]);
  //state for pagination
  const [page, setPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  var daylist = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [currentDate, setCurrentDate] = useState("");
  //const [sunset, setSunset] = useState("");
  //const [sunrise, setSunrise] = useState("");
  const pageSize = 3;

  let { updateSearchId } = useParams();

  function calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  function getPaginatedData(res, size, max) {
    size = size || 10;
    max = max || 100;
    size = size > max ? max : size;
    var pages = Math.ceil(res.length / size),
      items = [];
    for (var p = 1; p <= pages; p++) {
      var start = Math.ceil(size * (p - 1));
      items.push(res.slice(start, start + size));
    }
    return items;
  }

  const paginationButton = (p, index) => {
    return (
      <Button
        bsStyle="primary"
        active={index + 1 === pageNumber}
        onClick={(e) => {
          setPageNumber(index + 1);
        }}
      >
        {index + 1}{" "}
      </Button>
    );
  };

  const getData = async (cityId) => {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/find?q=${cityId}&units-metric&cnt=50&APPID=5e1cdce741ca74b75f69226cf0c6d37e`
    );
    setWeatherData(res.data.list);
    setPage(getPaginatedData(res.data.list, 3, 3));
    setTotalPages(Math.ceil(page.length / pageSize));
  };

  useEffect(() => {
    var current = new Date();

    var date = "";
    var date =
      "Date: " +
      current.getFullYear() +
      "/" +
      (current.getMonth() + 1) +
      "/" +
      current.getDate() +
      "...Time: " +
      current.getHours() +
      ":" +
      current.getMinutes();
    setCurrentDate(date);
    getData(updateSearchId);
  }, [updateSearchId]);

  const listData = (data, index) => {
    return (
      <div>
        <PanelGroup
          accordion
          id="accordion-uncontrolled-example"
          defaultActiveKey="2"
        >
          <Panel className="Panel" bsStyle="info" eventKey={data}>
            <Panel.Heading>
              <Panel.Title toggle>
                <div>
                  <img
                    src={`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`}
                  />
                  <span> </span>
                  <span>
                    {data.name},{data.sys.country}
                  </span>

                  <p>
                    feels like {Math.floor(data.main.feels_like - 273.15)}
                    &deg;C, {data.weather[0].description}
                  </p>
                  <span>
                    <img
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    />
                    {Math.floor(data.main.temp - 273.15)}&deg;C
                  </span>
                  <br />
                  <button
                    className="addbutton"
                    onClick={(e) => props.addRecentlyViewed(data.id)}
                  >
                    +
                  </button>
                </div>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <div>
                <table id="customers">
                  <tr>
                    <td>
                      <span>
                        Expected weather from :{" "}
                        {Math.floor(data.main.temp_min - 273.15)}&deg;C{" "}
                      </span>{" "}
                      to{" "}
                      <span>
                        Max:{" "}
                        <span id="wind">
                          {Math.floor(data.main.temp_max - 273.15)}{" "}
                        </span>{" "}
                        &deg;C
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span id="date">{currentDate}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span id="dayoftheweek">
                        {daylist[new Date().getDay()]}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        Sunrise:{" "}
                        <p>
                          {new Date(data.sys.sunrise * 1000).toLocaleTimeString}
                        </p>
                        <span>
                          <p>
                            SunSet:{" "}
                            {new Date(data.sys.setSunset * 1000).toTimeString}
                          </p>
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Humidity - <span id="humidity">{data.main.humidity}</span>
                      %<span>💧</span>{" "}
                      <span>Pressure : {data.main.pressure} </span>
                      <span>
                        <span>Clouds : {data.weather[0].description} </span>{" "}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        Wind: <span id="wind">{data.wind.speed}</span> m/s
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        Geo Location:{" "}
                        <span id="wind">
                          {data.coord.lat} , {data.coord.lon}
                        </span>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </div>
    );
  };

  {
    console.log(weatherData);
  }
  {
    console.log(page);
  }
  {
    console.log(pageNumber);
  }

  if (weatherData.length != 0 && page.length != 0) {
    return (
      <div>
        {Array.from(page[pageNumber - 1]).map(listData)}
        {page.map(paginationButton)}
      </div>
    );
  } else {
    return (
      <div className="alert-danger">
        <p>
          <mark>City you entered can't be found!!</mark>
        </p>
      </div>
    );
  }
}

export default SearchListComponent;

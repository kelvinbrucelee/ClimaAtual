import React, { Fragment, useState, useEffect } from "react";
import "./Clima.css"
import { Image } from 'react-bootstrap';
import axios from 'axios'

export default props => {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  const cardStyle = {
    backgroundColor: props.color || '#00ff',
    borderColor: props.color || '#00ff',
  }
  if (location == false) {
    return (
      <div className='Alerta'>
        <ul>
          <li>Você precisa habilitar a localização no browser</li>
        </ul>
        <Image src={process.env.PUBLIC_URL + '/img/localizacao.png'} thumbnail />
      </div>
    )
  } else if (weather == false) {
    return (
      <Fragment>
        <div class="loader">Loading...</div>
      </Fragment>
    )
  } else {
    return (
      <div className="Card" style={cardStyle}>
        <div className="Title"><h1>Clima nas suas Coordenadas:<br /> {weather['weather'][0]['description']}°</h1></div>
        <Fragment>
          <div className="Content">
            <a>Temperatuta atual: {weather['main']['temp']}°</a><br />
            <a>Temperatura Maxima: {weather['main']['temp_max']}°</a><br />
            <a>Temperatura Minima: {weather['main']['temp_min']}°</a><br />
            <a>Pressão: {weather['main']['pressure']} hpa</a><br />
            <a>Humidade: {weather['main']['humidity']}%</a>
          </div>
        </Fragment>
      </div>
    )
  }
}
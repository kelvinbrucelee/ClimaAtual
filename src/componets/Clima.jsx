import React, { Fragment, useState, useEffect } from "react";
import "./Clima.css"
import { OverlayTrigger, Card, ProgressBar, Badge, ListGroupItem, ListGroup, Tooltip } from 'react-bootstrap';
import axios from 'axios'

// Obtém a data/hora atual
var data = new Date();

// Guarda cada pedaço em uma variável
var dias = new Array(
  'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado');
var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

var mes = data.getMonth();          // 0-11 (zero=janeiro)
var ano4 = data.getFullYear();       // 4 dígitos

// Formata a data e a hora (note o mês + 1)
var str_data = (mes + 1) + ' ' + months[data.getMonth()] + ' ' + ano4;

export default props => {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  function letraMaiuscula(str) {
    var subst = str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    return subst;
  }

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: "61a6c6f7a81962b8d69cc80d900a8543",
        lang: 'pt',
        units: 'metric',
        icon: 'icon'
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

  if (location == false) {
    return (
      <Card className="Alerta" style={{ width: '23rem' }}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/localizacao.png'} />
        <Card.Body>
        </Card.Body>
        <ListGroup >
          <ListGroupItem class="fw-light mt-4 text-white">Você precisa habilitar a localização no browser</ListGroupItem>
        </ListGroup>
      </Card>
    )
  } else if (weather == false) {
    return (
      <Fragment>
        <div class="loader">Loading...</div>
      </Fragment>
    )
  } else {
    return (
      <Card className="Card" border="dark" style={{ width: '23rem' }}>
        <Card.Header className="header-color" as="h5"><div className="titulo-text">{weather.name}, {weather.sys.country}</div><br />
          <div className="data">{dias[data.getDay()]}, {str_data}</div></Card.Header>
        <Card.Body className="body-center">
          <Card.Text>
            <Badge className="temp" bg="secondary" bg="warning" text="dark">{Math.trunc(weather.main.temp)}°c</Badge><br />
            <div>
              <Card.Img className="image-temp" variant="top" src={process.env.PUBLIC_URL + '/icons/' + weather.weather[0].icon + '.png'} />
            </div>
            <div className="descricao">{letraMaiuscula(weather.weather[0].description)}</div>
            <div className="temp-max-min">{Math.trunc(weather.main.temp_min)}°c / {Math.trunc(weather.main.temp_max)}°c </div><br />
            <div>
              <Card.Title className="progress-text">Humidade</Card.Title>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{weather['main']['humidity']}%</Tooltip>}>
                <ProgressBar striped variant="info" now={weather['main']['humidity']} />
              </OverlayTrigger>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
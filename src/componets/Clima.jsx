import React, { Fragment, useState, useEffect } from "react";
import "./Clima.css"
import { OverlayTrigger, Card, ProgressBar, Badge, ListGroupItem, ListGroup, Tooltip } from 'react-bootstrap';
import axios from 'axios'

export default props => {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: "61a6c6f7a81962b8d69cc80d900a8543",
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

  if (location == false) {
    return (
      <Card className="Alerta" style={{ width: '23rem' }}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/localizacao.png'} />
        <Card.Body>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Você precisa habilitar a localização no browser</ListGroupItem>
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
        <Card.Header className="text-center" as="h5">Clima nas suas Coordenadas:<br /> {weather['weather'][0]['description']}°</Card.Header>
        <Card.Body>
          <Card.Text>
            <a>Temperatuta atual: <Badge bg="secondary" pill bg="warning" text="dark">{weather['main']['temp']}°</Badge></a><br />
            <a>Temperatura Maxima: <Badge bg="secondary" pill bg="danger" text="dark">{weather['main']['temp_max']}°</Badge> </a><br />
            <a>Temperatura Minima: <Badge bg="secondary" pill bg="info" text="dark">{weather['main']['temp_min']}°</Badge> </a><br />
            <div>
              <a>Pressão: <Badge bg="secondary" pill bg="success" text="dark">{weather['main']['pressure']} hpa</Badge> </a><br />
              <a>Humidade: <Badge bg="secondary" pill bg="secondary" text="dark">{weather['main']['humidity']}%</Badge></a>
              <div>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Humidade: {weather['main']['humidity']}%</Tooltip>}>
                  <ProgressBar striped variant="info" now={weather['main']['humidity']} />
                </OverlayTrigger>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
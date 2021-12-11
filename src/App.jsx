import React from "react";
import { Card } from 'react-bootstrap';

import './App.css'
import Clima from './componets/Clima'
import background from "./img/clima.png";

var sectionStyle = {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundImage: `url(${background})`
};

export default _ =>
    <div className="App" style={sectionStyle}>
        <Card className="Tit">
            <Card.Body>CLIMA DA LOCALIZAÇÃO ATUAL</Card.Body>
        </Card>
        <div className="Cards">
            <Clima>
            </Clima>
        </div>
    </div>
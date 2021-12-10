import React from "react";

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
        <nav>
            <ul>
                <li className="Titulo">CLIMA DA LOCALIZAÇÃO ATUAL</li>
            </ul>
        </nav>
        <div className="Cards">
            <Clima titulo='CLIMA ATUAL'>
            </Clima>
        </div>
    </div>
import React from "react";
import { Card } from 'react-bootstrap';

import './App.css'
import Clima from './componets/Clima'

export default _ =>
    <div className="App">
        <Card className="Tit">
            <Card.Body class="fw-light mt-3 text-white">TEMPO E TEMPERATURA</Card.Body>
        </Card>
        <div className="Cards">
            <Clima>
            </Clima>
        </div>
        <body class="d-flex flex-column">
            <div id="page-content">
                <div class="container text-center">
                    <div class="row justify-content-center">
                        <div class="col-md-7">
                            <h1 class="fw-light mt-4 text-white">Clima da localização atual</h1>
                            <p class="lead text-white-50">Saiba da previsão do tempo da sua localização atual</p><br />
                        </div>
                    </div>
                </div>
            </div>
            <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50">
                <div class="container text-center">
                    <small>Desenvolvedor &copy; Kelvin Brucelee</small>
                </div>
            </footer>
        </body>

    </div>
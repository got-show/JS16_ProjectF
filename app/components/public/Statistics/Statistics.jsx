import React from 'react';
let {Component} = React;
import {Grid, Row, Col} from 'react-bootstrap';
import './Statistics.css';

let js = require('raw!./src.js');/* eslint no-undef:0 */

// import HousesTop5 from '../../common/Ranking/HousesTop5';
import PlodTop5 from '../../common/Ranking/PlodTop5';
import Survivors from '../../common/Ranking/Survivors';
// import MapComp from '../../common/MapComp/MapComp.jsx';

export default class Statistics extends Component {
  componentDidMount() {
    eval(js);
  }
  render() {
    return (<Grid id="Statistics">
      <Row className="simple-info">
        <Col md={3} >
          <div className="card">
            <h5>Number of characters</h5>
            <h2>55</h2>
          </div>
        </Col>
        <Col md={3} >
          <div className="card">
            <h5>Most likely survivor</h5>
            <h2>ROOSE BOLTON</h2>
          </div>
        </Col>
        <Col md={3} >
          <div className="card">
            <h5>Most likely to die</h5>
            <h2>TOMMEN BARATHON</h2>
          </div>
        </Col>
        <Col md={3} >
          <div className="card">
            <h5>Most dangerous house</h5>
            <h2>HOUSE TULLY</h2>
          </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={4} >
          <div className="card">
            <Survivors className="ranking"/>
          </div>
        </Col>
        <Col md={8} >
          <div className="card">
            <div className="center" id="characters_per_episode"></div>
          </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={6} >
          <div className="card">
            <div className="center" id="distribution_nobles_plods"></div>
          </div>
        </Col>
        <Col md={6} >
          <div className="card">
            <div className="center" id="distribution_plods_age_distribution"></div>
          </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={4} >
          <div className="card">
            <PlodTop5 className="ranking"></PlodTop5>
          </div>
        </Col>

        <Col md={8} >
          <div className="card">
            <div className="center" id="avgPLOD_per_episode"></div>
          </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={6} >
          <div className="card">
            <div className="center" id="new_characters_introduced"></div>
          </div>
        </Col>
        <Col md={6} >
          <div className="card">
            <div className="center" id="dead_and_alive"></div>
          </div>
        </Col>
      </Row>

      <Row className="chart-row">
        <Col md={12} >
          <div className="card">
            <div className="center" id="distribution_plods"></div>
          </div>
        </Col>
      </Row>
    </Grid>);
  }
}

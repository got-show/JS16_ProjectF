import React from 'react';
let {Component} = React;
import { Grid, Row, Col, Card } from 'react-bootstrap';
import './Statistics.css';

let js = require('raw!./src.js'); /*eslint no-undef:0 */

export default class Statistics extends Component {
  componentDidMount() {
     eval(js);
  }
  render() {
    return (
      <Grid>
      <Row>
        <Col md={8} mdPush={2}>

        </Col>
      </Row>
      </Grid>
    );
  }
}

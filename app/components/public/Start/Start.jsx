import React from 'react';
let {Component} = React;
import { Row,Col, Grid } from 'react-bootstrap';

import ForTheThrone from '../../common/ForTheThrone/ForTheThrone.jsx';
import './Start.css';

import CharacterList from 'json!../../common/ForTheThrone/antagonistCharacters.json';


import PlodTop5 from '../../common/Ranking/PlodTop5';
import Survivors from '../../common/Ranking/Survivors';
import MapComp from '../../common/MapComp/MapComp.jsx';

export default class Start extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="home">
          <Row>
            <Col>
              <ForTheThrone />
            </Col>
          </Row>
          <Grid className="content">
            <Row >
              <Col md={6}>
                <div className="card">
                  <Survivors className="ranking"/>
                </div>
              </Col>
              <Col md={6}  >
                <div className="card">
                  <PlodTop5 className="ranking"></PlodTop5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div id="characterMap">
                  <MapComp character={[CharacterList.characters[0].name]} />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

import React from 'react';
let { Component } = React;
import { Row, Col, Grid } from 'react-bootstrap';

import './Start.css';

import antagonistCharacters from 'json!./antagonistCharacters.json';
import ForTheThrone from '../../common/ForTheThrone/ForTheThrone.jsx';
import PlodTop5 from '../../common/Ranking/PlodTop5';
import Survivors from '../../common/Ranking/Survivors';
import MapComp from '../../common/MapComp/MapComp.jsx';

export default class Start extends Component {

  constructor(props) {
    super(props);

    let antagonistsCount = antagonistCharacters.antagonists.length;
    let randomElemIndex = Math.floor(Math.random() * antagonistsCount);

    // setting the characters
    let left = Math.floor(Math.random() * 2);
    let charLeft = antagonistCharacters.antagonists[randomElemIndex][left];
    let charRight = antagonistCharacters.antagonists[randomElemIndex][1 - left];

    let tmp=charLeft;
    charLeft=antagonistCharacters.characters[charLeft];
    charLeft.img=tmp;
    tmp=charRight;
    charRight=antagonistCharacters.characters[charRight];
    charRight.img=tmp;

    this.state = {
      charLeft: charLeft,
      charRight: charRight
    };
  }

  render() {
    return (
      <div id="home">
        <ForTheThrone charLeft={this.state.charLeft} charRight={this.state.charRight} />

        <Grid className="content">
          <Row >
            <Col md={6}>
              <div className="card">
                <Survivors className="ranking" />
              </div>
            </Col>
            <Col md={6}  >
              <div className="card">
                <PlodTop5 className="ranking" />
              </div>
            </Col>
          </Row>
          <hr/>
          <Row >
            <Col>
            <h3 className="center">follow characters in the books</h3>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col md={12} >
              <div className="center">{this.state.charLeft.name}'s and {this.state.charRight.name}'s location history on a map:</div><br />
              <MapComp character={[this.state.charLeft.name, this.state.charRight.name]}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

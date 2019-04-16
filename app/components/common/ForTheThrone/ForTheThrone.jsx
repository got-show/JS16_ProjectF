import React from 'react';
import PropTypes from 'prop-types';
let { Component } = React;

import './ForTheThrone.css';

import { LinkContainer } from 'react-router-bootstrap';

import Actions from '../../../actions/CharactersPlodActions.js';
import Store from '../../../stores/CharactersPlodStore.js';
import Countdown from '../Countdown/Countdown.jsx';
import Slider from './Slider/Slider.jsx';

import * as Img from './img';

export default class ForTheThrone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            charLeft: props.charLeft,
            charRight: props.charRight,
            charLeftPlod: {},
            charRightPlod: {}
        };
    }



    componentWillMount() {
        Store.addChangeListener(this._onChange.bind(this));
    }

    componentDidMount() {
        Actions.loadCharactersPlodByName([this.state.charLeft.name, this.state.charRight.name]);
    }

    _onChange() {
        let plods = Store.getCharactersPlodByName();
        let plodLeft, plodRight;

        if (plods[0].name == this.state.charLeft.name) {
            plodLeft = plods[0];
            plodRight = plods[1];
        } else {
            plodLeft = plods[1];
            plodRight = plods[0];
        }

        if (plodLeft !== undefined) {
            plodLeft.plod = isNaN(plodLeft.plodB) ? 100 : plodLeft.plodB * 100;
        } else {
            plodLeft = {plod: 100};
        }

        if (plodRight !== undefined) {
            plodRight.plod = isNaN(plodRight.plodB) ? 100 : plodRight.plodB * 100;
        } else {
            plodRight = {plod: 100};
        }

        this.setState({
            charLeftPlod: plodLeft,
            charRightPlod: plodRight
        });
    }

    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div id="fttContainer" style={{backgroundImage: `url(${Img['texture']})`}}>
                <p className={"header-copyright"}>© 2019 Home Box Office, Inc. / Sky All rights reserved.</p>
                <LinkContainer to={'/characters/' + this.state.charLeft.name} >
                    <div className="fttCharArea fttLeft" style={{ cursor: 'pointer' }} >
                    </div>
                </LinkContainer>
                <LinkContainer to={'/characters/' + this.state.charRight.name}>
                    <div className="fttCharArea fttRight" style={{ cursor: 'pointer' }}>

                    </div>
                </LinkContainer>

                <div id="fttAntagonists">
                    <img src={Img["IronThrone"]} id="fttThrone" />
                    <div id="fttHeader" className="center">
                        <br />
                        <h3>When you play the game of thrones you win...</h3>
                        <h1 className="center">...or you die</h1>
                    </div>

                    <div className="fttCharContainer fttLeft">
                        <LinkContainer to={'/characters/' + this.state.charLeft.name} >
                            <img src={Img[this.state.charLeft.img]} id="fttCharLeftImg" className="fttCharImg fttLeft" />
                        </LinkContainer>
                        <div className="fttCharTombstone fttCharLeftTombstone fttTombstonePlod" style={{backgroundImage: `url(${Img['tombstone']})`}}>
                            {this.state.charLeftPlod.plod < 100 ? Math.round(this.state.charLeftPlod.plod) : 100} %
                        </div>
                        <div className="fttCharTombstone fttCharLeftTombstone fttTombstoneQuestionMark" style={{backgroundImage: `url(${Img['tombstone']})`}}>?</div>
                        <div id="fttCharLeftText" className="fttCharText">
                            <h2>{this.state.charLeft.question}</h2>
                            <p>
                                Click on this character to see some statistics about how we calculated their <strong>Predicted Likelihood of Death</strong> of
                                <strong> {this.state.charLeftPlod.plod < 100 ? Math.round(this.state.charLeftPlod.plod) : 100} %</strong>.
                            </p>
                            <p>{this.state.charLeft.description}</p>
                            <i>"{this.state.charLeft.quote}"</i>
                        </div>
                    </div>
                    <div className="fttCharContainer fttRight">
                        <LinkContainer to={'/characters/' + this.state.charRight.name}>
                            <img src={Img[this.state.charRight.img]} id="fttCharRightImg" className="fttCharImg fttRight" />
                        </LinkContainer>
                        <div className="fttCharTombstone fttCharRightTombstone fttTombstonePlod" style={{backgroundImage: `url(${Img['tombstone']})`}}>
                            {this.state.charRightPlod.plod < 100 ? Math.round(this.state.charRightPlod.plod) : 100} %
                        </div>
                        <div className="fttCharTombstone fttCharRightTombstone fttTombstoneQuestionMark" style={{backgroundImage: `url(${Img['tombstone']})`}}>?</div>
                        <div id="fttCharRightText" className="fttCharText">
                            <h2>{this.state.charRight.question}</h2>
                            <p>
                                Click on this character to see some statistics about how we calculated their <strong>Predicted Likelihood of Death</strong> of
                                <strong> {this.state.charRightPlod.plod < 100 ? Math.round(this.state.charRightPlod.plod) : 100} %</strong>.
                            </p>
                            <p>{this.state.charRight.description}</p>
                            <i>"{this.state.charRight.quote}"</i>
                        </div>
                    </div>

                    <div id="aiLink" className="fttCard">
                        <h3 className="center" style={{ "marginTop": "0px" }}>A Song of ice and data:</h3>
                        <h4 className="center">Westeros and Machine learning</h4>
                        <p>Our in-house developed machine learning algorithm predicts likelihood of death based on various
                        features that we extracted for each of the more than 2000 characters in George R.&nbsp;R. Martin's
                        <i> A&nbsp;Song of&nbsp;Ice and&nbsp;Fire</i> series</p>
                        <div className="center">
                            <a id="readMoreLink" href="/machine-learning-algorithm-predicts-death-game-of-thrones">
                                <b>Read more about our prediction algorithm.</b>
                            </a>
                        </div>
                    </div>
                    
                    <div id="fttWhoDoYouChoose" className="fttCard">
                        <h4 className="center">Who do you choose</h4>
                        <h2 className="center">#ForTheThrone?</h2>
                        <p className="center">Click or hover over a character to discover their<br /><b>Predicted Likelihood of Death</b> in GoT: Season 8!</p>
                    </div>
                </div>
                <div id="fttCountdown">
                    <div className="content">
                        <div id="fttCountdownLeft">
                            <Countdown></Countdown>
                        </div>
                        <div id="fttCountdownRight">
                            <h3>Discover your favorite character's <strong>chance of survival</strong> now!</h3>
                        </div>
                    </div>
                </div>
                <div id="fttCharacters">
                    <div className="content">
                        <Slider></Slider>
                    </div>
                </div>
            </div>
        );
    }
}

ForTheThrone.propTypes = {
    charLeft: PropTypes.object.isRequired,
    charRight: PropTypes.object.isRequired
};

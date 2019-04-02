import React from 'react';
let {Component} = React;

import { Link } from 'react-router';
import {Grid, Row, Col, OverlayTrigger, Tooltip, Glyphicon} from 'react-bootstrap';
import "./Ranking.css";
import SentimentStore from '../../../stores/TwitterSentimentsStore';
import SentimentsActions from '../../../actions/TwitterSentimentsActions';

import HousesTop5 from '../../common/Ranking/HousesTop5';
import PlodTop5 from '../../common/Ranking/PlodTop5';
import Survivors from '../../common/Ranking/Survivors';

export default class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            twitterTopSentiments: [],
            twitterFlopSentiments: [],
            twitterMostDiscussedSentiments: [],
            twitterTopControversial: []
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount (){
        SentimentStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        SentimentStore.removeChangeListener(this._onChange);
    }


    componentDidMount() {
        const startDate = (new Date(1995, 11, 17)).toISOString();
        const today = (new Date()).toISOString();
        SentimentsActions.loadTopSentiments(5);
        SentimentsActions.loadFlopSentiments(5);
        SentimentsActions.loadMostDiscussedSentiments(5);
        SentimentsActions.loadControversialSentiments(5, startDate , today);
    }

    _onChange() {
        this.setState({
            twitterTopSentiments: SentimentStore.getTopSentiments(),
            twitterFlopSentiments: SentimentStore.getFlopSentiments(),
            twitterMostDiscussedSentiments: SentimentStore.getMostDiscussedSentiments(),
            twitterTopControversial: SentimentStore.getFlopSentiments()
        });
    }

    render() {

        return (
            <div>
            <div className="header-ranking">
                <Grid>
                    <Row className="ranking-fields ranking-plod">
                        <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                          <PlodTop5/>
                        </Col>
                    </Row>
                </Grid>
            </div>
                <Grid className="ranking tweets-fields">
                 <Row className="ranking-fields">
                    <h1 className="center rankingTweets-heading">Tweets about GoT-characters:</h1>
                        <Col sm={12} md={6}>
                            <div className="ranking-field">
                                    <h2 className="text-center ranking-title twitterTooltip">Most Positive Mentions
                                        <OverlayTrigger placement="top" overlay={<Tooltip>love, joy, enthusiasm</Tooltip>}>
                                            <Glyphicon glyph="question-sign" />
                                        </OverlayTrigger>
                                    </h2>
                                    {
                                        this.state.twitterTopSentiments.map((char) => {
                                            return <Row>
                                                    <Col xs={8}>
                                                        <h4><Link to={'/characters/' + char.name}>
                                                            {char.name}
                                                        </Link>
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} className="text-center">
                                                        <OverlayTrigger trigger="hover" placement="top" overlay={<Tooltip><u><strong>Tweets</strong></u><br/><strong>{char.positive}</strong> positive<br/><strong>{char.negative}</strong> negative<br/>
                                                        <strong>{char.total}</strong> total</Tooltip>}>
                                                            <a href={"http://twitter.com/share?text=I%20love%20"+char.name+"&url=https://got.show/&via=gotjstech"} target="_blank">
                                                                <h4 className="support">
                                                                {char.positive} &nbsp;<span className="glyphicon glyphicon-thumbs-up"></span>
                                                                </h4>
                                                            </a>
                                                        </OverlayTrigger>
                                                    </Col>
                                                    </Row>;
                                        })
                                    }
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className="ranking-field">
                                <h2 className="text-center ranking-title twitterTooltip">Most Negative Mentions
                                    <OverlayTrigger placement="top" overlay={<Tooltip>hate, fear, anger, frustration</Tooltip>}>
                                        <Glyphicon glyph="question-sign" />
                                    </OverlayTrigger>
                                </h2>
                                    {
                                        this.state.twitterFlopSentiments.map((char) => {
                                            return <Row>
                                                    <Col xs={8}>
                                                        <h4><Link to={'/characters/' + char.name}>
                                                            {char.name}
                                                        </Link>
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} className="text-center">
                                                        <OverlayTrigger trigger="hover" placement="top"
                                                        overlay={<Tooltip><u><strong>Tweets</strong></u><br/><strong>{char.positive}</strong> positive<br/><strong>{char.negative}</strong> negative<br/>
                                                        <strong>{char.total}</strong> total</Tooltip>}>
                                                            <a href={"http://twitter.com/share?text=I%20hate%20"+char.name+"&url=https://got.show/&via=gotjstech"} target="_blank">
                                                                <h4 className="nosupport">
                                                                {char.negative} &nbsp;<span className="glyphicon glyphicon-thumbs-down"></span>
                                                                </h4>
                                                            </a>
                                                        </OverlayTrigger>
                                                    </Col>
                                                    </Row>;
                                        })
                                    }
                            </div>
                        </Col>
                    </Row>

                    <Row className="ranking-fields">
                        <Col sm={12} md={6}>
                            <HousesTop5/>
                        </Col>
                        <Col sm={12} md={6}>
                            <Survivors></Survivors>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

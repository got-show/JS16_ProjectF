import React from 'react';
let { Component } = React;

import './Outcomes.css';

import outcomesJSON from 'json!./outcomes.json';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router';

import * as Img from './img';
import * as ImgFTT from '../ForTheThrone/img';

import $ from 'jquery';

const properties = {
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    autoplay:false
  };

export default class OutcomesSeason8 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            outcomes: this.getOutcomes()
        };

    }

    getOutcomes() {
        let returnArray = [];
        
        let allKeys = Object.keys(outcomesJSON.characters);
        let keys = [];
        for (let i in allKeys) {
            if (outcomesJSON.characters[allKeys[i]].episode !== 0) {
                keys.push(allKeys[i]);
            }
        }

        keys.sort((a, b) => {
            return outcomesJSON.characters[b].episode - outcomesJSON.characters[a].episode;
        });

        let size = 3;

        for (let i = 0; i < (keys.length/size); i++) {
            let temp = [];

            for (let j = 0; j < size; j++) {
                let keyIndex = (i * size) + j;

                if (keyIndex < keys.length) {
                    let charSlug = keys[keyIndex];

                    let char = outcomesJSON.characters[charSlug];
                    char.slug = charSlug;
                    temp.push(char);
                }
            }

            returnArray.push(temp);
        }

        return returnArray;
    }

    render() {
        var baseUrl = process.env.__PROTOCOL__ + process.env.__API__ + ((process.env.__PORT__ !== undefined) ? ':' + process.env.__PORT__ : '') + process.env.__PREFIX__;

        return (
            <div id="outcomes">
                <hr />
                <h3 className="center">Deaths in season 8</h3>
        {/*<Link to="/dead-characters-table" style={{fontSize: "0.8em"}}>Full Table&nbsp; <i className="fas fa-external-link-alt"></i></Link>*/}
                <hr />
                <Slide {...properties}>
                    {this.state.outcomes.map(function (pageElems, page) {
                        return (
                            <div className="each-slide" key={page}>
                                {
                                    pageElems.map(function(value, index){
                                        let smallImageLink = value.hasSmallImage ? ImgFTT[value.slug + "Small"] : baseUrl + "show/images/" + value.name.replace(/ /gi, '_') + ".jpg";
                                        console.log(smallImageLink);
                                        return (
                                            <div key={index} className="card">
                                                <div className="top-img" style={{backgroundImage: `url(${Img[value.image]})`}}>
                                                    <div>
                                                        <div>Died in episode {value.episode}</div>
                                                        <div className="plod">{value.plod}%</div>
                                                        <div>predicted likelihood<br />of death</div>
                                                    </div>
                                                </div>
                                                <div className="leftImage">
                                                    <img src={smallImageLink} />
                                                </div>
                                                <div className="rightTitle">
                                                    <h4>{value.outcome}</h4>
                                                </div>
                                                <div className="comment">{value.comment}</div>
                                                <Link to={"/characters/" + value.name} className="link">more</Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    }.bind(this))}
                </Slide>
                <div className="spoilerWarning">
                    <div className="spoilerWarningPrompt">
                        <hr />
                        <h3 className="center">Spoiler Alert!</h3>
                        <div>The following section lists characters, who have died in season 8.<br/>Are you sure you want to reveal this section of the page?</div>
                        <div className="showSpoilersButton" onClick={(e) => {
                            $(e.currentTarget).closest('.spoilerWarning').fadeOut(200);
                        }}>Show Spoilers</div>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }

}
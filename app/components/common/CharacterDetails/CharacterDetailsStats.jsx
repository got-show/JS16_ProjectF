import React from 'react';
import 'jquery';
let {Component} = React;

import './CharacterDetailsStats.css';

export default class CharacterDetailsStats extends Component {
    constructor(props) {
        super(props);

        this.stats = {
            nobles: {
                total: 897,
                dead: 145 // estimated
            },
            peasants: {
                total: 1052,
                dead: 350 // estimated
            },
            male: {
                total: 1205,
                dead: 366
            },
            female: {
                total: 741,
                dead: 129
            },
            attributes: {"House Arryn":0.56,"House Baratheon of Dragonstone":1.05,"House Baratheon of King's Landing":1.32,"House Bolton":0.946,"House Frey":0.864,"House Greyjoy":0.697,"House Lannister":0.551,"House Martell":1.4,"House Stark":0.618,"House Targaryen":0.577,"House Tarly":0.372,"House Tully":1.61,"House Tyrell":1.58,"hasLovers":0.937,"hasTitles":1.13,"isMajor":0.844,"isMarried":0.443,"male":2.02}
        };
    }

    init() {
        this.cards = [];

        this.character = this.props.data.character;
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    createCards() {
        let character;
        if (this.character.hasShow) {
            character = this.character.show;
        } else if (this.character.hasBook) {
            character = this.character.book;
        } else {
            return;
        }

        if (character && character.culture) {
            let culture = character.culture;
            let index = this.stats.attributes.hasOwnProperty(culture);
            
            if (index) {
                let change = this.stats.attributes[culture];
                this.cards.push({
                    title: culture,
                    type: "Culture",
                    text: <span>Characters with this culture have a proportionally <b>{change > 1 ? 'higher' : 'lower'}</b>  predicted likelihood of death.</span>,
                    value: culture,
                    proportionalChange: (100 * change - 100).toFixed(2)
                });
            }
        }

        if (character && character.house) {
            let house = character.house;
            let index = this.stats.attributes.hasOwnProperty(house);
            
            if (index) {
                let change = this.stats.attributes[house];
                this.cards.push({
                    title: house,
                    type: "House",
                    text: <span>Characters with this house have a proportionally <b>{change > 1 ? 'higher' : 'lower'}</b>  predicted likelihood of death.</span>,
                    value: house,
                    proportionalChange: (100 * change - 100).toFixed(2)
                });
            }
        }
        
        if (character && character.origin) {
            let origin = character.origin;
            let index = this.stats.attributes.hasOwnProperty(origin);
            
            if (index) {
                let change = this.stats.attributes[origin];
                this.cards.push({
                    title: origin,
                    type: "Place of birth",
                    text: <span>Characters with this place of birth have a proportionally <b>{change > 1 ? 'higher' : 'lower'}</b>  predicted likelihood of death.</span>,
                    value: origin,
                    proportionalChange: (100 * change - 100).toFixed(2)
                });
            }
        }

        if (character && character.spouse && character.spouse.length > 0){
            let index = this.stats.attributes.hasOwnProperty("isMarried");
            
            if (index) {
                let change = this.stats.attributes["isMarried"];
                this.cards.push({
                    title: this.charPronoun(true) + " is married",
                    type: "Spouse",
                    text: <span>Characters that are married have a proportionally <b>{change > 1 ? 'higher' : 'lower'}</b>  predicted likelihood of death.</span>,
                    value: "Married",
                    proportionalChange: (100 * change - 100).toFixed(2)
                });
            }
        }

        if (character && character.titles){
            let index = this.stats.attributes.hasOwnProperty("hasTitles");

            if (index) {
                let value = this.stats.attributes["hasTitles"];
                let change = value;

                this.cards.push({
                    title: this.charPronoun(true) + " has titles",
                    type: "Title",
                    text: "Having titles proportionally " + (change > 1 ? 'increases' : 'decreases') + " the predicted likelihood of death.",
                    value: "Title",
                    proportionalChange: (100 * change - 100).toPrecision(2)
                });
            }
        }

        if (character && character.gender === 'male'){
            let index = this.stats.attributes.hasOwnProperty("male");

            if (index) {
                let value = this.stats.attributes["male"];
                let change = value;

                this.cards.push({
                    title: this.charPronoun(true) + " is Male",
                    type: "Male",
                    text: "Being male proportionally " + (change > 1 ? 'increases' : 'decreases') + " the predicted likelihood of death.",
                    value: "Male",
                    proportionalChange: (100 * change - 100).toPrecision(2)
                });
            }
        }

        if (character && character.pagerank.rank > 550){
            let index = this.stats.attributes.hasOwnProperty("isMajor");

            if (index) {
                let value = this.stats.attributes["isMajor"];
                let change = value;

                this.cards.push({
                    title: "Major Character",
                    type: "Major or Minor Character",
                    text: "Being a major character proportionally " + (change > 1 ? 'increases' : 'decreases') + " the predicted likelihood of death.",
                    value: "Major Character",
                    proportionalChange: (100 * change - 100).toPrecision(2)
                });
            }
        }
        
        this.shuffle(this.cards);
        this.cards = this.cards.slice(0, 3);
    }

    charPronoun(capitalize = false) {
        let gender = 'undefined';
        if (this.character.hasShow && this.character.show.gender) {
            gender = this.character.show.gender;
        } else if (this.character.hasBook && this.character.book.gender) {
            gender = this.character.book.gender;
        }
         
        if (gender !== 'undefined') {
            if (capitalize) {
                return gender === 'male' ? 'He' : 'She';
            } else {
                return gender === 'male' ? 'he' : 'she';
            }
        } else {
            if (capitalize) {
                return 'They';
            } else {
                return 'they';
            }
        }
    }

    charPronounPosessive(capitalize = false) {
        let gender = 'undefined';
        if (this.character.hasShow && this.character.show.gender) {
            gender = this.character.show.gender;
        } else if (this.character.hasBook && this.character.book.gender) {
            gender = this.character.book.gender;
        }
         
        if (gender !== 'undefined') {
            if (capitalize) {
                return gender === 'male' ? 'His' : 'Her';
            } else {
                return gender === 'male' ? 'his' : 'her';
            }
        } else {
            if (capitalize) {
                return 'Their';
            } else {
                return 'their';
            }
        }
    }

    renderSimpleBarChart(top, topTotal, topDesc, bottom, bottomTotal, bottomDesc, title, description) {
        return (
            <div className="simpleBarChart">
                <h4>{title}</h4>
                <div>{description}</div>
                <div className="simpleBarChartBars">
                    <div className="barTop bar">
                        <div className="barFill" style={{width: Math.round(100 * top/topTotal) + "%"}}>
                            {Math.round(100 * top/topTotal) + "%"}
                            <div className="barAnnotation">{topDesc}</div>
                        </div>
                    </div>
                    <div className="barBottom bar">
                        <div className="barFill" style={{width: Math.round(100 * bottom/bottomTotal) + "%"}}>
                            {Math.round(100 * bottom/bottomTotal) + "%"}
                            <div className="barAnnotation">{bottomDesc}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        this.init();
        this.createCards();

        if (!this.character || !this.character.show) {
            return (<div></div>);
        }

        return (
            <div className="center">
                {this.renderSimpleBarChart(
                    this.stats.nobles.dead,
                    this.stats.nobles.total,
                    "Nobles",
                    this.stats.peasants.dead,
                    this.stats.peasants.total,
                    "Peasants",
                    this.character.show.titles.length == 0 ? this.character.name + " is a peasant" : this.character.name + " is a noble",
                    (<span><p>{this.character.show.titles.length == 0 ? "Being a peasant is dangerous in the world of Westeros" : "Being a noble is safer in the world of Westeros"}.</p>
                    <p>See the following graph for the <b>percentage of dead peasant and noble</b> characters</p></span>)
                )}

                {this.renderSimpleBarChart(
                    this.stats.female.dead,
                    this.stats.female.total,
                    "Women",
                    this.stats.male.dead,
                    this.stats.male.total,
                    "Men",
                    this.character.show.gender == 'male' ? this.charPronoun(true) + " is male" : this.charPronoun(true) + " is female",
                    (<span><p>{this.character.show.gender == 'male' ? "Being male is dangerous in the world of Westeros" : "Being female is safer in the world of Westeros"}.</p> 
                    <p>See the following graph for the <b>percentage of dead male and female</b> characters</p></span>)
                )}

                <div className="cardContainer">
                {this.cards.map(function(card, index) {
                    return (
                        <div className="statsCard" key={index}>
                            <span className="subtitle">{card.type}</span>
                            <h4>{card.title}</h4>
                            <div className="description">{card.text}</div>
                            <div className="proportion">
                                <p className="center">proportionally around</p>
                                <h3>
                                    {card.proportionalChange > 0 ? 
                                        <i className="fas fa-arrow-circle-up" style={{color:"#c9180c"}}></i>
                                        : <i className="fas fa-arrow-circle-down" style={{color:"#0cc90c"}}></i> }
                                    &nbsp;{Math.abs(card.proportionalChange)} %
                                </h3>
                                <span><h4 className="center">{card.proportionalChange > 0 ? 'higher' : 'lower'}</h4> Predicted Likelihood of Death on&nbsp;average.</span>
                            </div>
                        </div>
                    );
                }.bind(this))}
                </div>

                <div className="center">
                    <blockquote className="lowerQuote">
                        <i>"Never forget what you are, the rest of the world will not. 
                            Wear it like armor and it can never be used to hurt you."</i>
                        <span> -&nbsp;Tyrion&nbsp;Lannister</span>
                    </blockquote>
                </div>
            </div>
        );
    }
}

CharacterDetailsStats.propTypes = { data: React.PropTypes.object};

/*eslint no-undef: 0*/

import React from 'react';
let {Component} = React;
import $ from 'jquery';
import './Characters.css';
import { Row, Col, Grid, ProgressBar } from 'react-bootstrap';

import MapComp from '../../common/MapComp/MapComp.jsx';
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterDetailsMedia from '../../common/CharacterDetails/CharacterDetailsMedia.jsx';
import CharacterDetailsStats from '../../common/CharacterDetails/CharacterDetailsStats.jsx';

import CharacterPlodDisplay from '../../common/CharacterPlodDisplay/CharacterPlodDisplay';
import DeadCharacter from './DeadCharacter';

import * as Img from './img';

export default class Character extends Component {

    constructor (props) {
        super(props);

        this.SHOW_YEAR = 305;
        this.BOOK_YEAR = 300;
        this.animating = false;
        let character = {
            name: "",
            hasShow: false,
            hasBook: false,
            show: {},
            book: {}
        };

        this.state = {
            character: character,

            plodShow: 0,
            plodBook: 0,

            plodByYearShow: [],
            plodByYearBook: [],

            plodTextShow: '',
            plodTextBook: ''
        };

        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        Store.addChangeListener(this._onChange);
    }

    componentDidMount() {
        Actions.loadCharacter(decodeURIComponent(this.props.params.id));
    }

    componentWillUnmount(){
        Store.removeChangeListener(this._onChange);
    }

    _onChange() {
        let character = Store.getCharacter();
        this.setState({
            character: character
        });

        // TV show PLOD data
        let checkShow = false;
        let showLongevity = [];

        if (character.hasShow) {
            checkShow = character.show.alive;

            let showLongevityB = character.show.longevityB;
            let showLongevityStartB = parseInt(character.show.longevityStartB);

            let start = this.SHOW_YEAR - showLongevityStartB;
            showLongevity = showLongevityB.splice(start, start + 21);
        }

        // book PLOD Data
        let checkBook = false;
        let bookLongevity = [];

        if (character.hasBook) {
            checkBook = character.book.alive;

            let bookLongevityB = character.book.longevityB;
            let bookLongevityStartB = parseInt(character.book.longevityStartB);

            let start = this.BOOK_YEAR - bookLongevityStartB;
            bookLongevity = bookLongevityB.splice(start, start + 21);
        }

        this.setState({
            // Show data
            plodShow:       checkShow ? Math.round(character.show.plodB * 100) : 100,
            plodByYearShow: checkShow ? showLongevity : [],
            plodTextShow:   checkShow ? '%(percent)s%' : 'D E A D',

            // Book data
            plodBook:       checkBook ? Math.round(character.book.plodB * 100) : 100,
            plodByYearBook: checkBook ? bookLongevity : [],
            plodTextBook:   checkBook ? '%(percent)s%' : 'D E A D'  
        });
    }

    togglePlodDisplay() {
        if (this.animating) {
            return;
        }

        this.animating = true;
        var bookContainer = $(".plodBookContainer");
        var characterShowImg = $(".character-show-img");
        var disclaimer = $('.disclaimer');
        if (bookContainer.hasClass('plodContainerHidden')) {
            bookContainer.removeClass("plodContainerZIndexLower").removeClass("plodContainerHidden");
            characterShowImg.addClass("hiddenImg");
            disclaimer.addClass('hiddenImg');
        } else {
            bookContainer.addClass("plodContainerHidden");
            characterShowImg.removeClass("hiddenImg");
            disclaimer.removeClass('hiddenImg');
            window.setTimeout(() => {
                $(".plodBookContainer").addClass("plodContainerZIndexLower");
            }, 400);
        }

        let button = $(".togglePlodDisplayButtonBackground");
        if (button.hasClass("active")) {
            button.removeClass("active");
        } else {
            button.addClass("active");
        }

        window.setTimeout(function() {
            this.animating = false;
        }.bind(this), 400);
    }

    render() {
        var baseUrl = process.env.__PROTOCOL__ + process.env.__API__ + ((process.env.__PORT__ !== undefined) ? ':' + process.env.__PORT__ : '') + process.env.__PREFIX__;
        
        var imgBook = (this.state.character.book && this.state.character.book.image) ? (baseUrl + "book/images/" + this.state.character.book.slug + ".jpg") : 
                      (this.state.character.book && this.state.character.book.gender === "female") ? Img['PlaceholderFemale'] : Img['PlaceholderMale'];
        var imgShow = (this.state.character.show && this.state.character.show.image) ? (baseUrl + "show/images/" + this.state.character.show.slug + ".jpg") : false;
        
        var booksAliveShowDead = (!this.state.character.hasShow || this.state.character.show && this.state.character.show.alive == false)
            && this.state.character.book && this.state.character.book.alive == true ;

        return (
          <Grid id="character-page-container">
            <div className="character-container">
                <Row>
                    <div className="character-header">
                        <div className="character-name-container">
                            <div className="character-name-background"></div>
                            <Col md={9} mdOffset={3} className="character-name">
                                <div className="u-inlineBlock"><h1>{this.state.character.name}</h1></div>
                            </Col>
                        </div>
                    </div>
                </Row>
                <Row className="character-intro" fluid >
                    <Col md={3}>
                        <div className="character-photo">
                            <img src={imgBook}/>
                            {imgShow !== false ? 
                                <img className={"character-show-img " + (booksAliveShowDead ? 'hiddenImg' : '')}src={imgShow}/> : ''}
                            {imgShow !== false ? <div className="disclaimer">© 2019 Home Box Office, Inc. / Sky All rights reserved.</div> : ''}
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="togglePlodDisplayButton" onClick={this.togglePlodDisplay.bind(this)}>
                            <div className={"togglePlodDisplayButtonBackground " + (booksAliveShowDead ? 'active' : '')}></div>
                            <div className="togglePlodDisplayButtonOption">Show</div>
                            <div className="togglePlodDisplayButtonOption">Book</div>
                        </div>
                        <div className="plodOuterContainer">
                            { this.state.character.show && this.state.character.show.alive == true && this.state.plodByYearShow && this.state.plodShow ?
                                <div className="plodShowContainer">
                                    <h3>Our Predictions</h3>
                                    <a className="subtitle" target="_blank" href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}>TV show <i className="fas fa-external-link-alt"></i></a>
                                    <p>The current year in the TV show is probably {this.SHOW_YEAR} AC.
                                        <br />{this.state.character.name}'s <b>Likelihood to Survive</b> between the years 305 and 325 AC is:</p>
                                    <div className="plodContainer">
                                        <CharacterPlodDisplay plodByYear={this.state.plodByYearShow} startingYear={305}/>
                                    </div>
                                    <p>{this.state.character.name}'s <b>Predicted Likelihood of Death</b> in season 8 is:</p>
                                    <div className="plodContainer">
                                        <ProgressBar now={this.state.plodShow} label={this.state.plodTextShow} />
                                        <img src={Img['RipTombstone']} />
                                    </div>
                                </div> 
                                : this.state.character.hasShow && this.state.character.show && !this.state.character.show.alive ?
                                <div className="plodShowContainer">
                                    <a className="subtitle" target="_blank" href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}>TV show <i className="fas fa-external-link-alt"></i></a>
                                    <DeadCharacter name={this.state.character.name} 
                                                   deathText={this.state.character.show && this.state.character.show.death ? this.state.character.show.death + ' AC' : 'D E A D'} 
                                                   mediumText="TV show"/>
                                </div>
                                :
                                <div className="plodShowContainer">
                                    <a className="subtitle" target="_blank" href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}>TV show <i className="fas fa-external-link-alt"></i></a>
                                    <div className="sorryNoData">Sorry, we don't have any data for this character.</div>
                                </div>
                            }

                            { this.state.character.book && this.state.character.book.alive == true && this.state.plodByYearBook && this.state.plodBook ?
                                <div className={"plodBookContainer " + (booksAliveShowDead ? '' : 'plodContainerHidden plodContainerZIndexLower')}>
                                    <h3>Our Predictions</h3>
                                    <a className="subtitle" target="_blank" href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}>Books <i className="fas fa-external-link-alt"></i></a>
                                    <p>The current year in the Books is probably {this.BOOK_YEAR} AC.
                                        <br />{this.state.character.name}'s <b>Likelihood to Survive</b> between the years 300 and 320 AC is:</p>
                                    <div className="plodContainer">
                                        <CharacterPlodDisplay plodByYear={this.state.plodByYearBook} startingYear={300}/>
                                    </div>
                                    <p>{this.state.character.name}'s <b>Predicted Likelihood of Death</b> in <i>'the Winds of Winter'</i> is:</p>
                                    <div className="plodContainer">
                                        <ProgressBar now={this.state.plodBook} label={this.state.plodTextBook} />
                                        <img src={Img['RipTombstone']} />
                                    </div>
                                </div>
                                : this.state.character.hasBook && this.state.character.book && !this.state.character.book.alive ?
                                <div className="plodBookContainer plodContainerHidden plodContainerZIndexLower">
                                    <a className="subtitle" target="_blank" href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}>Books <i className="fas fa-external-link-alt"></i></a>
                                    <DeadCharacter 
                                        name={this.state.character.name} 
                                        deathText={this.state.character.book && this.state.character.book.death ? this.state.character.book.death + ' AC' : 'D E A D'} 
                                        mediumText="books"/>
                                </div>
                                :
                                <div className="plodBookContainer plodContainerHidden plodContainerZIndexLower">
                                    <a className="subtitle" target="_blank" href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}>Books <i className="fas fa-external-link-alt"></i></a>
                                    <div className="sorryNoData">Sorry, we don't have any data for this character.</div>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
                {!this.state.character.hasShow && this.state.character.hasBook ? '' :
                <Row>
                    <Col md={12}>
                        <hr />
                        <div className="sectionHeader">
                            <h3>Comparison</h3>
                            <h4>between the&nbsp;books and&nbsp;the TV&nbsp;show</h4>
                        </div>
                        <hr />
                        <CharacterDetailsMedia data={this.state} character={this.state.character}/>
                    </Col>
                </Row>}
                {!this.state.character.hasShow ? '' : <Row>
                    <Col md={12}>
                        <hr />
                        <div className="sectionHeader">
                            <h3>Interesting Stats</h3>
                            <h4>about {this.state.character.name}</h4>
                        </div>
                        <hr />
                        <CharacterDetailsStats data={this.state} />
                    </Col>
                </Row>}
                <hr />
                <Row>
                    <Col md={12}>
                        <div className="sectionHeader">
                            <h3 style={{marginBottom: "35px"}}>Follow {this.state.character.name} in the books</h3>
                        </div>
                        <hr />
                        <div id="characterMap">
                            <MapComp character={[this.props.params.id]} />
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={12}>
                        <hr />
                        <div className="sectionHeader">
                            <h3>Machine Learning</h3>
                            <h4>predicting life and death in Westeros</h4>
                        </div>
                        <hr />
                        <div className="card">
                            <h3>Character Death & Longevity</h3>
                            <p>Our in-house developed machine learning algorithm predicts
                                two different values: <b>predicted likelihood of death</b> in season 8 of the TV show or the next book, and the <b>character longevity</b> prediction
                                between the years 300 to 320 AC.</p>
                            <p>We do this based on various features that we extracted for each character from the first five books of the <i>A&nbsp;Song of&nbsp;Ice
                                and&nbsp;Fire series</i> by George R.&nbsp;R. Martin and the first seven seasons of the TV show <i>Game of&nbsp;Thrones</i> by HBO.</p>
                            <a href="/machine-learning-algorithm-predicts-death-game-of-thrones" className="readMore">Read more</a>
                        </div>
                    </Col>
                </Row>
            </div>
          </Grid>
        );
    }
}
Character.propTypes = { params: React.PropTypes.object };

import React from 'react';
let {
  Component
} = React;
import {
  browserHistory
} from 'react-router';

import './MapComp.css';

import map from "gotmap";
import "jquery-ui";

export default class MapComp extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    map.init();
  }

  componentDidMount() {
    this.initMap();
  }

  handleCityClick(modal, city) {
    var link = 'https://awoiaf.westeros.org/index.php/' + city.name;

    var bodyEl = modal.find('.modal-body'); // Body Container
    // Show Spinner
    bodyEl.html("<span class='glyphicon glyphicon-cog glyph-spin glyph-big'></span>").addClass('text-center');

    bodyEl.html("<iframe style='width: 100%;height: 60vh; overflow: hidden;' src='"+link+"'/>");
  }

  initMap() {
    let url = "https://api.got.show/api";
    let config = {
      'apiLocation': url,
      'personImageBaseUrl': process.env.__PROTOCOL__ + process.env.__API__,
      'characterDataSource': '/characters',
      'cityDataSource': '/cities',
      'realmDataSource': '/regions',
      'pathDataSource': '/characters/paths',
      'episodeDataSource': '/episodes',
      'pinDataSource': '/characters/locations',
      'characterBox': '#characters',
      'timeline': '#timeline',
      'filter': '#filter input',
      'bgTiles': process.env.__PROTOCOL__ + 'tiles.got.show/bg/{z}/y{y}x{x}.png',
      'labelTiles': process.env.__PROTOCOL__ + 'tiles.got.show/labels/{z}/y{y}x{x}.png',
      'errorTile': process.env.__PROTOCOL__ + 'tiles.got.show/blank.png',
      'characterDetails': function(modal, character) {
        browserHistory.push('/characters/' + character.name);
        $("body").removeClass("modal-open");
        $(".gotmap-modal").remove();
        $(".modal-backdrop").remove();
      },
      'cityDetails': this.handleCityClick
    };
    
    var mymap = gotmap('#map', config); /*eslint no-undef:0*/


    var range = this.props.begintimeline !== undefined ? this.parseRange() : [1, 50];

    mymap.updateMap(range);
    mymap.getMap().zoomIn(1);
    if (this.props.pagex !== '/map') {
      mymap.getMap().scrollWheelZoom.disable();
    }
    for (let i of this.props.character) {
      setTimeout(function() { /*eslint no-undef:0*/
        let character = mymap.searchCharacter(i.toLowerCase());
        mymap.addCharacter(character[0]);
      }, 5000);
    }
  }

  parseRange() {
    let patt = /s([0-9]{2}|[0-9]{1})e([0-9]{2}|[0-9]{1})/i;
    let begin = this.props.begintimeline;
    if (patt.test(begin)) {
      begin = (patt.exec(begin)[1]) * patt.exec(begin)[2];
    } else {
      begin = 1;
    }
    let end = this.props.endtimeline;
    if (patt.test(end)) {
      end = (patt.exec(end)[1]) * patt.exec(end)[2];
    } else {
      end = 50;
    }
    return [parseInt(begin), parseInt(end)];
  }


  render() {
    return ( <div className = "map-wrapper" >
      <div id = "map" >
      </div> <div id = "sidebar" >
      <form id = "filter" >
      <div className = "input-group" >
      <input type = "text"
      className = "form-control"
      placeholder = "Search for character..." /><i className = "glyphicon glyphicon-search form-control-feedback" > </i> </div> </form> 
      <div id = "characters" > </div> </div> <div id = "timeline" > </div> </div>
    );
  }
}
MapComp.propTypes = {
  pagex: React.PropTypes.string,
  character: React.PropTypes.array,
  location: React.PropTypes.object,
  begintimeline: React.PropTypes.string,
  endtimeline: React.PropTypes.string
};

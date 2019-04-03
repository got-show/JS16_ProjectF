import React from 'react';
let {Component} = React;

export default class HousesTop5 extends Component {

  getHardcodedHousesTop5() {
    return [
      {
        name: 'House Tully'
      }, {
        name: 'House Clegane'
      }, {
        name: 'House Velaryon'
      }, {
        name: 'House Seaworth'
      }, {
        name: 'House Nymeros'
      }, {
        name: 'House Targaryen'
      }, {
        name: 'House Oakheart'
      }, {
        name: 'House Greyjoy'
      }, {
        name: 'House Lannister'
      }, {
        name: 'House Westerling'
      }
    ];
  }

  render() {
    return (<div>
      <h2 className="text-center ranking-title">Most dangerous Houses
      </h2>
      <ul>
        {
          this.getHardcodedHousesTop5().map((house) => {
            return <li key={house.name}>
              <h4>
                <a target="_blank" href={"https://awoiaf.westeros.org/index.php/" + house.name}>{house.name}</a>
              </h4>
            </li>;
          })
        }
      </ul>
    </div>);
  }
}

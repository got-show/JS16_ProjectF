import React from 'react';
let {Component} = React;

import {Link} from 'react-router';

export default class Ranking extends Component {
  getHardcodedSurvivors() {
    return [
      {
        name: 'Sansa Stark',
        plod: '3.9'
      }, {
        name: 'Jon Snow',
        plod: '11.6'
      }, {
        name: 'Cersei Lannister',
        plod: '16.6'
      }, {
        name: 'Mace Tyrell',
        plod: '18.7'
      }, {
        name: 'Roose Bolton',
        plod: '28.9'
      }
    ];
  }
  render() {
    return (<div>
      <h2 className="text-center ranking-title">Top Survivors<br />&nbsp;</h2>
      <table>
        <tbody>
        {
          this.getHardcodedSurvivors().map((char) => {
            return <tr key={char.name}>
            <td>
              <h4>
                <Link to={'/characters/' + char.name}>
                  {char.name}
                  
                </Link>
              </h4>
            </td>
            <td><h4>{parseInt(char.plod)}%</h4></td>
          </tr>;
          })
        }
        </tbody>
      </table>
      <p className="see-more">
        <Link to={'/characters/?search=&page=1&sort=plod&order=1'}>See more</Link>
      </p>
    </div>);
  }

  
}

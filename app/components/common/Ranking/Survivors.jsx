import React from 'react';
let {Component} = React;

import {Link} from 'react-router';
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';

export default class Ranking extends Component {

  constructor(props) {
    super(props);

    this.state = {
      characters: Store.getShowCharacters(),
      ranking: []
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    Store.addChangeListener(this._onChange);
    if (Store.getShowCharacters().length === 0) {
      Actions.loadCharacterShowDataForStatictics();
    }
  }

  componentWillUnmount(){
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    let characters = Store.getShowCharacters();
    let ranking = [];

    if (characters.length >= 5) {
      for (let i = 0; i < characters.length; i++) {
        let char = characters[i];

        if (char.pagerank.rank > 400) {
          ranking.push({name: char.name, plod: (100 * char.plodB).toFixed(1)});
        }

        if (ranking.length === 5) {
          break;
        }
      }
    }

    this.setState({
      characters: characters,
      ranking: ranking
    });
  }

  getRanking() {
    if (this.state.ranking.length > 0) {
      return this.state.ranking;
    } else {
      return [];
    }
  }

  render() {
    return (<div>
      <h2 className="text-center ranking-title">Top Survivors<br />&nbsp;</h2>
      <table>
        <tbody>
        {
          this.getRanking().map((char) => {
            return <tr key={char.name}>
            <td>
              <h4>
                <Link to={'/characters/' + char.name}>
                  {char.name}
                </Link>
              </h4>
            </td>
            <td><h4>{char.plod}%</h4></td>
          </tr>;
          })
        }
        </tbody>
      </table>
      <p className="see-more">
        <Link to={'/characters/?match=&page=1&sort=plod&order=1&show=true'}>See more</Link>
      </p>
    </div>);
  }
}

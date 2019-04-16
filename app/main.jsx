/*eslint-env browser*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import 'file?name=favicon.png!./favicon.png';
import { Router, Route, IndexRoute } from 'react-router';
// import Config from 'json!../config/config.json';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './components/app/App.jsx';
import About from './components/public/About/About.jsx';
import Ranking from './components/public/Ranking/Ranking.jsx';
import Map from './components/public/Map/Map.jsx';
import Start from './components/public/Start/Start.jsx';
import Statistics from './components/public/Statistics/Statistics.jsx';
import Attributions from './components/public/Attributions/Attributions.jsx';
import Contribute from './components/public/Contribute/Contribute.jsx';
import Credits from './components/public/Credits/Credits.jsx';
import EpisodesRecap from './components/public/EpisodesRecap/EpisodesRecap.jsx';
import Characters from './components/public/Characters/Characters.jsx';
import CharacterListPage from 'components/public/CharacterListPage/CharacterListPage.jsx';
import Site404 from './components/public/404/404.jsx';
import Imprint from './components/public/Imprint/Imprint.jsx';
import PrivacyPolicy from './components/public/PrivacyPolicy/PrivacyPolicy.jsx';
import PlodDescription from './components/public/PlodDescription/PlodDescription.jsx';
import OutcomesTable from './components/common/OutcomesSeason8/OutcomesTable.jsx';

import ga from 'ga-react-router';
import { browserHistory } from 'react-router';

browserHistory.listen(location => {
    ga('send', 'page', location.pathname);
    ga('send', 'pageview');
});

function scrollBack() {
  history.scrollRestoration = 'manual';
  if (!window.location.href.includes("/characters?")||window.location.href.includes("page=1")) {
    window.scrollTo(0, 0);
  }
}

ReactDOM.render(
  <Router onUpdate={scrollBack} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Start}/>
      <Route path="/ranking" component={Ranking}/>
      <Route path="/imprint" component={Imprint}/>
      <Route path="/about" component={About} />
      <Route path="/credits" component={Credits} />
      <Route path="/episodes-recap" component={EpisodesRecap}/>
      <Route path="/contribute" component={Contribute} />
      <Route path="/privacy" component={PrivacyPolicy}/>
      <Route path="/machine-learning-algorithm-predicts-death-game-of-thrones" component={PlodDescription}/>
      <Route path="/statistics" component={Statistics} />
      <Route path="/attributions" component={Attributions} />
      <Route path="/characters">
        <IndexRoute component={CharacterListPage}/>
        <Route path="/characters/:id" component={Characters}/>
      </Route>
      <Route path="/dead-characters-table" component={OutcomesTable}/>
    </Route>
    <Route path="/map" component={Map}/>
    <Route path="*" component={Site404}/>
  </Router>
, document.getElementById('root'));

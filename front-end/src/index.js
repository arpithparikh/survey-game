import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import $ from 'jquery';
import App from './App';
import TVApp from './TVApp';
import config from './config';
import './index.css';

// set browser id
const id = localStorage.getItem("browser_id") ? localStorage.getItem("browser_id") : uuid();
localStorage.setItem("browser_id", id);


// grab the current survey
function getCurrentSurvey() {
  return $.get(config.server + "/current-question");
}

function renderTVApp() {
  ReactDOM.render(
    <TVApp />,
    document.getElementById('root')
  );
}

function renderQuestion(question) {
  ReactDOM.render(
    <App clientId={id} question={question}/>,
    document.getElementById('root')
  );
}

function loop() {
  getCurrentSurvey(id).done(function (data) {
    renderQuestion(data.question);
  });
}

if (window.location.hash === "#tv") {
  renderTVApp();
} else {
  loop();
  window.setInterval(loop, 1000);
}



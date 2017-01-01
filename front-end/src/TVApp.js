import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import config from './config';
import './App.css';

class TVApp extends Component {
  constructor() {
    super();
    this.state = {
      question: "",
      result: 0
    };
    this.questionUpdated = this.questionUpdated.bind(this);
    this.reveal = this.reveal.bind(this);
  }
  questionUpdated(event) {
    this.setState({question: event.target.value});
  }
  static submitQuestion(question) {
    $.post(config.server + "/current-question", {question: question})
  }
  reveal() {
    let question = this.state.question;
    let that = this;
    $.get(config.server + "/answers").done(function (results) {
      let r = 0;
      for (let id in results) {
        if (results[id].answer === "yes") {
          r += 1;
        }
      }
      console.log(results);
      console.log(r);
      that.setState({
        question: question,
        result: r
      })
    });
  }
  render() {
    return (
      <div className="App TVApp">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Survey Game</h2>
        </div>
        <div className="App-intro">
            <input type="text" value={this.state.question} onChange={this.questionUpdated} placeholder="Enter your question here" />
            <button type="button" onClick={TVApp.submitQuestion(this.state.question)}>Enter</button>
        </div>
        <div className="result">
          <div id="question">
            {this.state.question}
          </div>
          <div id="result">{this.state.result}</div>
          <button type="button" onClick={this.reveal}>Reveal</button>
        </div>
      </div>
    );
  }
}


export default TVApp;

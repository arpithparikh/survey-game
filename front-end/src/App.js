import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import config from './config';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Survey Game</h2>
        </div>
        <div className="App-intro">
          <Question question={this.props.question} />
          <Buttons question={this.props.question} clientId={this.props.clientId} />
        </div>
      </div>
    );
  }
}

class Question extends Component {
   static renderQuestion(question) {
    return (
      <div className="question">
        {question}
      </div>
    )
  }
  render() {
    return Question.renderQuestion(this.props.question);
  }
}


class Buttons extends Component {
  constructor() {
    super();
    this.state = {
      answer: null
    };
  }
  setAnswer(answer) {
    let a = answer;

    if (this.state.answer === answer) {
      this.setState({answer: null});
      a = null;
    } else {
      this.setState({answer: answer});
    }

    const payload = {
      question: this.props.question,
      clientId: this.props.clientId,
      answer: a
    };
    $.post(config.server + "/answer", payload);
  }
  render() {
    return (
      <div className="Buttons">
        <div className={this.state.answer === "yes" ? "yes" : "off"} onClick={() => this.setAnswer("yes")}>YES</div>
        <div className={this.state.answer === "no" ? "no" : "off"} onClick={() => this.setAnswer("no")}>NO</div>
      </div>
    );
  }
}



export default App;

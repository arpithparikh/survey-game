const express = require('express');
const bodyParser = require('body-parser');


const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);


var currentQuestion = {
  question: "난 내가 좀 잘 생겼다고 생각한다"
};

var questions = [
  "나는 우리 가족이 좀 덜 먹었으면 좋겠다"
  ,"2016년에 우리 가족 중 자랑스러웠던 가 있었다"
  ,"2016년에 우리 가족 중 창피했던 멤버가 있었다"
  ,"난 지난 1년동안 책을 한 권도 읽지 않았다"
  ,"난 내 배우자가 덜 생겼다고 생각 될때가 있었다"
  ,"난 다시 태어 난다면 다른 일을 해보고 싶다"
  ,"난 다시 태어 난다면 다른 사람과 결혼해 보고 싶다"
  ,"난 내가 좀 잘 났다고 생각한다"
  ,"난 내가 좀 잘 생겼다고 생각한다"
  ,"난 나의 결혼에 있어서 내가 좀 아깝다고 생각한다"
  ,"우리 가족이 좀 멀리 살아도 괜찮을것 같다"
  ,"(본인을 제외한) 좀 살 좀 뺐으면 한다"
];

var answers = {};

var aggregateVotes = function(question, votes) {
  return votes.filter(function (vote) {
    return vote.question === question && vote.answer === "yes";
  });
};

app.post('/answer', function (req, res) {
  var answer = req.body;
  if (answer.answer === 'yes' || answer.answer === 'no') {
    answers[answer.clientId] = answer;
  } else {
    delete answers[answer.clientId];
  }
  res.json(answer);
});

app.get('/answers', function (req, res) {
  res.json(answers);
});

app.post('/current-question', function (req, res) {
  var newQuestion = req.body;
  currentQuestion = {
    question: newQuestion.question
  };
  answers = {};
  res.json(currentQuestion);
});

app.get('/current-question', function (req, res) {
  res.json(currentQuestion);
});

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
});


// ROOT FUNCTIONS
// Generate an equation and pass it as a question
var limit = 10;
var operators = ['+'];
function randomNumber(limit) {
  return Math.floor(Math.max(Math.random()*limit));
}
function Question() {
  num1 = parseInt(randomNumber(limit));
  num2 = parseInt(randomNumber(limit));
  operator = 0; //0:+,1:-,2:*,3:/
  result = calc(num1,num2,operator);
  return({num1,num2,operator,result});
}
function calc(num1,num2,operator) {
  if( operator == 0 ) {
    return parseInt(num1)+parseInt(num2);
  }
}
// App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: {
        blueTeam:0,
        redTeam:0
      }
    }
  }
  scored(team) {
    let theScore = this.state.score;
    theScore[team]++;
    this.setState({
      score: theScore
    });
  }
  render() {
    return(
      <div>
        <div id="top_container">
          <Teams score={this.state.score}/>
        </div>
        <div id="equation">
          <Equation scored={(team)=>this.scored(team)}/>
        </div>
      </div>
    );
  }
}
// Scoreboard
class Teams extends React.Component {
  render() {
    return(
      <div className="scoreboard">
        <div className="left-pane">
          <BlueTeam name="Blue Team" score={this.props.score.blueTeam} />
        </div>
        <div className="right-pane">
          <RedTeam name="Red Team" score={this.props.score.redTeam} />
        </div>
      </div>
    );
  }
}
class BlueTeam extends React.Component {
  render() {
    return (
      <span>
        <p>{this.props.name}</p>
        <span id="me_score">{this.props.score}</span>
      </span>
    );
  }
}
class RedTeam extends React.Component {
  render() {
    return (
      <span>
        <p>{this.props.name}</p>
        <span id="you_score">{this.props.score}</span>
      </span>
    );
  }
}
// Equation
class Equation extends React.Component {
  constructor(props) {
    super(props);
    let q = new Question();
    this.state = {
      num1: q.num1,
      num2: q.num2,
      operator: operators[q.operator],
      result: q.result,
      givenAnswer: 0
    }
  }
  newQuestion() {
    let q = new Question();
    q.operator = operators[q.operator];
    q.givenAnswer = '';
    return q;
  } 
  givenAnswer(n) {
    this.setState({
      givenAnswer: n
    });
  }
  handleClick() {
    let answer = this.state.result;
    let givenAnswer = this.state.givenAnswer;
    if( givenAnswer == answer ) {
        alert('Correct answer!');
        let newQ = this.newQuestion();
        this.setState(newQ);
        document.getElementById('result').value = '';
        this.props.scored('blueTeam');
       } else {
         alert('Wrong. The answer is '+answer+'. Try again.');
         document.getElementById('result').value = '';
         this.props.scored('redTeam');         
       }
  }
  render() {
    return(
      <div>
        <span> <Number id="num1" value={this.state.num1}/> </span>
        <span> <Operator value={this.state.operator}/> </span>
        <span> <Number id="num2" value={this.state.num2} /> </span>
        <span> = </span>
        <span> <Result onChange={e=>this.givenAnswer(e.target.value)}/> </span>
        
        <span><CheckButton id="resultBtn"
                onClick={()=>this.handleClick()}
                /></span>
      </div>
    );
  }
}
function Number(props) {
  return(
    <span id={props.id}>{props.value}</span>
  );
}
function Operator(props) {
  return(
    <span id="operator">{props.value}</span>
  );
}
function Result(props) {
  return(
    <input type="text" id="result" onChange={props.onChange}/>
  );
}
function CheckButton(props) {
  return(
    <button id={props.id} onClick={props.onClick}>
      Check
    </button>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('container')
);

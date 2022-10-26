const operators = ["+", "-"];

const limit = 10;

function randomNumber(limit = 10) {
  return Math.floor(Math.max(Math.random() * limit));
}

function Number(props) {
  return <span id={props.id}>{props.value}</span>;
}
function Operator(props) {
  return <span id="operator">{props.value}</span>;
}
function Result(props) {
  return (
    <input
      type="text"
      id="result"
      onChange={props.onChange}
      value={props.value}
    />
  );
}
function CheckButton(props) {
  return (
    <button id={props.id} onClick={props.onClick}>
      Check
    </button>
  );
}
export {
  operators,
  limit,
  randomNumber,
  Number,
  Operator,
  Result,
  CheckButton,
};

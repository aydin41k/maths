const operators = ["+", "-"];

function randomNumber(max) {
  return Math.floor(Math.max(Math.random() * max));
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
export { operators, randomNumber, Number, Operator, Result, CheckButton };

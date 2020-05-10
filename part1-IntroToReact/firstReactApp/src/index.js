import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name}! You are {props.age} years old.</p>
    </>
  )
}
const App = () => {
  const now = new Date();
  const a = 10
  const b = 20
  return(
    <div>
      <h1>Greeting</h1>
      <Hello name="Steven" age={10+12}/>
      <Hello name="Martha" age={a}/>
      <Hello />
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
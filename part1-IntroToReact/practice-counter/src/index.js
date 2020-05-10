import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Display = ({counter}) => <h1>{counter}</h1>


const Button = ({text, handleClick}) =>{
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  // setTimeout(
  //   () => setCounter(counter+1),
  //   1000
  // )

  const increaseCounter = () => setCounter(counter + 1)
  const decreaseCounter = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button text="Add" handleClick={increaseCounter} />
      <Button text="Decrement" handleClick={decreaseCounter} />
      <Button text="Reset" handleClick={resetCounter} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
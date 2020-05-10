import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const handleUpvote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const handleClick = () => {
    const randomValue = Math.floor(Math.random() * 6)
    setSelected(randomValue)
  }

  let mostVotesIndex = 0
  for(let i = 0; i < votes.length; i++){
    if(votes[i] > votes[mostVotesIndex]){
      mostVotesIndex = i
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdote[selected]}</div>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleClick}>Random Quote</button>
      <h1>Anecdotes with most upvotes</h1>
      <div>{props.anecdote[mostVotesIndex]}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdote={anecdotes}/>, document.getElementById('root'))
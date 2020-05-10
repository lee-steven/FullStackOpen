import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({goodStats, neutralStats, badStats}) => {
  const total = goodStats + neutralStats + badStats
  if(total === 0){
    return (
      <div>
        <h2>Statistics</h2>
        <p>Currently no feedback</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table style={{textAlign:'left'}}>
        <tbody>
        <Statistic statisticName="Good" statistic={goodStats}/>
        <Statistic statisticName="Neutral" statistic={neutralStats}/>
        <Statistic statisticName="Bad" statistic={badStats}/>
        <Statistic statisticName="Total" statistic={total}/>
        <Statistic statisticName="Average" statistic={(goodStats-badStats)/total}/>
        <Statistic statisticName="Positive" statistic={(goodStats/total)*100 + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({statisticName, statistic}) => <tr><th>{statisticName}</th><th>{statistic}</th></tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Please provide your feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <Statistics 
        goodStats={good} 
        neutralStats={neutral}
        badStats={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

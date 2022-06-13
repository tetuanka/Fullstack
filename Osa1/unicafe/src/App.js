import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => { 
  return (
    <>
    <p>{props.text} {props.value}</p>
    </>
  )
}

const Statistics = (props) => {
  if (props.all===0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <table>
    <tr>
      <td><StatisticsLine text="good"/></td> 
      <td><StatisticsLine value={props.good}/></td>
    </tr>
    <tr>
      <td><StatisticsLine text="neutral"/></td> 
      <td><StatisticsLine value={props.neutral}/></td>
    </tr>
    <tr>
      <td><StatisticsLine text="bad"/></td> 
      <td><StatisticsLine value={props.bad}/></td>
    </tr>
    <tr>
      <td><StatisticsLine text="all"/></td> 
      <td><StatisticsLine value={props.all}/></td>
    </tr>
    <tr>
      <td><StatisticsLine text="average"/></td> 
      <td><StatisticsLine value={props.average}/></td>
    </tr>
    <tr>
      <td><StatisticsLine text="positive "/></td> 
      <td><StatisticsLine value={props.positive + ' %'}/></td>
    </tr>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)

  return (
    <div>
        <h1>give feegback</h1>
        <Button handleClick={() => {setGood(good + 1)
                                    setSum(sum + 1)}} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => {setBad(bad + 1)
                                    setSum(sum - 1)}} text="bad" />
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={good+bad+neutral} average={sum/(good+bad+neutral)} positive={good/(good+bad+neutral)*100}/>
      </div>    
  )
}

export default App
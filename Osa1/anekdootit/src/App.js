import { useState } from 'react'

const Button = (props) => ( 
  <button onClick={props.handleClick}>
    {props.text}
  </button>
 )



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])
  const [vote, setVote] = useState(0)
  const [maxm, setMaxm] = useState({votes: 0, number:0})
 
  const showMax = () => {
    if(votes[selected]>maxm.votes){
      setMaxm({votes: votes[selected], number: selected})
    }
    return <>{anecdotes[maxm.number]}<br></br>
             has {[maxm.votes]} votes</>
  }
   return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>anecdot number {selected}</p>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => setVote(votes[selected] +=1 )} text="vote" />
      <Button handleClick={() => {setSelected(Math.floor(Math.random() * anecdotes.length))
                                  console.log("vote=" + vote)}} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>
      {showMax()}
      </p>
    </div>
  )
  
}

export default App


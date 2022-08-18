import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList  = () => {
const dispatch = useDispatch()

const anecdotes = useSelector(state=> {
    const anecs = [...state.anecdotes]
    anecs.sort((function(a,b){
        return b.votes - a.votes
      }))
    if(state.filter.filter==='' || state.filter.filter===undefined){
        return anecs
    }
    else {return anecs.filter(anec => anec.content.includes(state.filter.filter))}
})


return ( 
<div>
{
anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => {dispatch(voteAnecdote(anecdote.id, anecdote))
                                dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
                                } }>vote</button>
      </div>
    </div>
  )
}
  </div>
)
}

export default AnecdoteList
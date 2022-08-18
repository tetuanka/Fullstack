import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes+1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote 
      )
    case 'SET_ANECDOTES':
      return action.data.content
    case 'APPEND_ANECDOTE':
      return [...state, action.data]
      default: return state
      }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const anecdoteToVote = anecdote
    const votedAnecdote = { 
      ...anecdoteToVote, 
      votes: anecdoteToVote.votes+1}
    await anecdoteService.vote(id, votedAnecdote)
    dispatch(vote(id))
  }
}


export const vote = (id) => {
  return{
    type: 'VOTE',
    data: { id }
  }
}

export const appendAnecdote = (content) => {
  return{
    type: 'APPEND_ANECDOTE',
    data: {
      content: content.content,
      id: content.id,
      votes: 0
    }
  }
}

export const setAnecdotes = (content) => {
  return{
    type: 'SET_ANECDOTES',
    data: { content }
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteReducer

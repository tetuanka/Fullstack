import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)

    props.setNotification(`you created '${content}'`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
    <h2>create new</h2>
    <div>
      <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    noteification: state.noteification
  }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdotes

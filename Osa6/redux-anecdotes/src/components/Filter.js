import { createFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    props.createFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapStateToProps = (state) => {
    return {
      filter: state.filter
    }
  }
  
  const mapDispatchToProps = {
    createFilter
  }
  
  const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filter)
  
  export default ConnectedFilter

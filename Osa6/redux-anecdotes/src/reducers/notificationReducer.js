import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
var timeoutID = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      if(state!==''){clearTimeout(timeoutID)}
      const content = action.payload
      return content
    },
    removeNotification(state) {
        state = ''
        return state
      }
  },
})

export const setNotification = (content, time) => {
    return async dispatch => {
        await dispatch(createNotification(`${content}`))
        timeoutID = setTimeout(function(){
          dispatch(removeNotification())
        }, time*1000)
       
    }
}


export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
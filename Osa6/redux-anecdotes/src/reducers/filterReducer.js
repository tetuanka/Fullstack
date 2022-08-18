import { createSlice } from '@reduxjs/toolkit'

const initialState = ''


const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      return {filter: action.payload}
    }
  },
})


export const { createFilter } = filterSlice.actions
export default filterSlice.reducer


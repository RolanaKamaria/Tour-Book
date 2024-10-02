// this slice belong to map configuration -- it is just to update the current location
import { createSlice } from '@reduxjs/toolkit'

export const coordinateSlice = createSlice({
  name: 'coordinate',
  initialState: {
    position: [ 34.7207443,36.7173883],
  },
  reducers: {
    setPosition: (state,action) => {
      state.position = action.payload
    }
  },
})
export const { setPosition } = coordinateSlice.actions

export default coordinateSlice.reducer
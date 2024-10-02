import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../features/user/userSlice";
import orgnizerSlice from "../features/orgnizer/orgnizerSlice";
import presenterSlice from "../features/presenter/presenterSlice";
import clientSlice from "../features/client/clientSlice";
import coordinateSlice from "../assets/map/coordinateSlice"
//the local storage for the website each slice is custmize for specific type of users except coordinate slice this for map configuration
export const store = configureStore({
  reducer: {
    user: userSlice,
    orgnizer: orgnizerSlice,
    presenter : presenterSlice,
    client : clientSlice,
    coordinate : coordinateSlice,
  },
})
import { configureStore } from '@reduxjs/toolkit'
import  bookReducer  from './bookReducer'
import todoReducer from './todoReducer'

export const store = configureStore({
  reducer: {
    todo : todoReducer,
    books : bookReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
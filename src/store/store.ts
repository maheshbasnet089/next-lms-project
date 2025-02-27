
import {configureStore} from '@reduxjs/toolkit'
import categorySlice from './category/categorySlice'
import courseSlice from './courses/courseSlice'
import lessonSlice from './lessons/lessonSlice'


export const makeStore = () => {
    return configureStore({
      reducer: {
        categories : categorySlice, 
        courses : courseSlice, 
        lessons : lessonSlice
      },
    })
  }

  // Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
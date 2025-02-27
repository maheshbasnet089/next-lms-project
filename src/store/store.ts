
import {configureStore} from '@reduxjs/toolkit'
import categorySlice from './category/categorySlice'
import courseSlice from './courses/courseSlice'
import lessonSlice from './lessons/lessonSlice'
import studentSlice from './students/studentSlice'
import enrollmentSlice from './enrollments/enrollmentSlice'


export const makeStore = () => {
    return configureStore({
      reducer: {
        categories : categorySlice, 
        courses : courseSlice, 
        lessons : lessonSlice, 
        students : studentSlice, 
        enrollments : enrollmentSlice
      },
    })
  }

  // Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
import {configureStore} from '@reduxjs/toolkit'
import data from '../features/data'

const store = configureStore({
    reducer: {
        data
    }
})

export default store;
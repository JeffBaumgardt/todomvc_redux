import {configureStore} from '@reduxjs/toolkit'

import todoReducer from './todoSlice'

export function createStore(preloadedState) {
    return configureStore({
        reducer: {
            todo: todoReducer
        },
        devTools: true,
        preloadedState
    })
}

const store = createStore()

export default store
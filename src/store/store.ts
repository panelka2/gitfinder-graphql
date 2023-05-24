import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gitReducer from './gitReducer/gitSlice'
import repoSlice from './repoReducer/repoSlice'

const rootReducer = combineReducers({
    gitReducer,
    repoSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
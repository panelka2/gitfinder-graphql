import { RootState } from '../store';
import {createSelector} from '@reduxjs/toolkit'

const getGitStore = (state:RootState) => {
    return state.gitReducer
}

export const getGitItems = createSelector(getGitStore, ({
    items
}) => items)

export const getIsLoading = createSelector(getGitStore, ({
    isLoading
}) => isLoading)
 
export const getError = createSelector(getGitStore, ({
    error
}) => error)
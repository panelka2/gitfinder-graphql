import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit'

const getGitStore = (state: RootState) => {
    return state.repoSlice
}

export const getGitRepo = createSelector(getGitStore, ({
    repo
}) => repo)

export const getIsLoading = createSelector(getGitStore, ({
    isLoading
}) => isLoading)

export const getError = createSelector(getGitStore, ({
    error
}) => error)

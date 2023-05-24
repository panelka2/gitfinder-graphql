import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGit } from "../../types/IGit";
import { getRepo } from "./actions";

interface RepoState {
    repo: IGit
    isLoading: boolean
    error: string,
}
export const initialState: RepoState = {
    repo: {
        name: "",
        stargazerCount: 0,
        updatedAt: "",
        url: "",
        owner: {
            login: "",
            url: "",
            avatarUrl: "",
        },
        defaultBranchRef: {
            name: "",
        },
        forkCount: 0,
        watchers: {
            totalCount: 0,
        },
        languages: {
            nodes: [],
        },
        description: "",
    },
    isLoading: false,
    error: '',
}

const NAME = 'repo'

export const repoSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRepo.pending, (state) => {
            state.isLoading = true;
            state.error = ''
        })
            .addCase(getRepo.fulfilled,
                (state, action: PayloadAction<IGit>) => {
                    state.isLoading = false;
                    state.error = '';
                    state.repo = action.payload
                })
            .addCase(getRepo.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to fetch repo'
            })
    },
})

export default repoSlice.reducer

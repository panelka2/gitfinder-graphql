import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchRepos } from "./action";

const NAME = 'git'

interface Repository {
  id: string;
  name: string;
  url: string;
  defaultBranchRef: {
    target: {
      committedDate: string;
    };
  };
  stargazers: {
    totalCount: number
  }
}
const initialState = {
  error: '',
  isLoading: false, 
  items:[] as Repository[]
}

export const gitSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchRepos.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchRepos.fulfilled,
        (state, action: PayloadAction<Repository[]>) => {
          state.isLoading = false;
          state.error = "";
          state.items = action.payload;
        }
      )
      .addCase(fetchRepos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch repos";
      });  
    },
  });
  
  
  export default gitSlice.reducer
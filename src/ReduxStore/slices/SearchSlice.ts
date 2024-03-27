import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TFilter {
    search: string;
}

const initialState: TFilter = {
    search: '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        searchTask: (state, action) => {
            state.search = action.payload
        }
    }

})
export const selectSearch = (state: RootState) => state.filter.search;
export const { searchTask } = filterSlice.actions;
export default filterSlice.reducer
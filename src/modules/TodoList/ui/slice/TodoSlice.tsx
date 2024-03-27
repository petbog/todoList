import { Todo } from "../../../../pages/MainPage/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../../components/helpers/axios'
import { RootState } from "../../../../ReduxStore/store";


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
interface TTodo {
    items: Todo[],
    status: Status,
    updateTodo: Todo
}
const initialState: TTodo = {
    items: [],
    status: Status.LOADING,
    updateTodo: {
        name: "",
        _id: "",
        tasks: [],
        data: "",
        deadline: ""
    }
}
export const fetchTodo = createAsyncThunk('todo/fetchTodo', async (searchTerm?: string) => {
    try {
        const { data } = searchTerm
            ? await axios.get(`/todo?searchTerm=${searchTerm}`)
            : await axios.get(`/todo`)
        return data
    } catch (error) {
        console.log(error)
    }

})
export const fetchTodoComplited = createAsyncThunk('todo/fetchTodoCompleted', async () => {
    try {
        const { data } = await axios.get(`/todo/completed`)
        return data
    } catch (error) {
        console.log(error)
    }

})
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateTodo: (state, action) => {
            state.updateTodo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
            state.status = Status.LOADING
            state.items = [];
        })
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload;
        })
        builder.addCase(fetchTodo.rejected, (state) => {
            state.status = Status.ERROR
            state.items = [];
        })
        //загрузка старых
        builder.addCase(fetchTodoComplited.pending, (state) => {
            state.status = Status.LOADING
            state.items = [];
        })
        builder.addCase(fetchTodoComplited.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload;
        })
        builder.addCase(fetchTodoComplited.rejected, (state) => {
            state.status = Status.ERROR
            state.items = [];
        })
    }
})

export const selectTask = (state: RootState) => state.todo;
export const { updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
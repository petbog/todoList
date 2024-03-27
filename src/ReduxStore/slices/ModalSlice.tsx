import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface TModal {
    isOpenModal: boolean,
    toggle: boolean,
    edit: boolean
}

const initialState: TModal = {
    isOpenModal: false,
    toggle: false,
    edit: false
}

const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalIsOpenSet: (state) => {
            state.isOpenModal = !state.isOpenModal
        },
        toggleSet: (state) => {
            state.toggle = !state.toggle
        },
        editSet: (state) => {
            state.edit = true
        },
        editCloseSet: (state) => {
            state.edit = false
        }
    }

})
export const selectIsOpenModal = (state: RootState) => state.modal
export const { modalIsOpenSet, toggleSet, editSet, editCloseSet } = ModalSlice.actions;
export default ModalSlice.reducer
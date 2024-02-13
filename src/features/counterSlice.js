import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name:"counter",
    initialState:{
        counter: 1
    },
    reducers:{
        increment: (state) => {
            state.counter += 1
        },
        decrement: (state) => {
            if (state.counter > 1) {
                state.counter -= 1
            }
        },
        reset: (state) => {
            state.counter = 1
        }
    }
})
export const {increment, decrement, reset} = counterSlice.actions

export default counterSlice.reducer
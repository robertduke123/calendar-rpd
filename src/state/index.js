import { createSlice } from "@reduxjs/toolkit"
import { startOfToday } from "date-fns"

let today = startOfToday()

const initialState = {
    user: {
        name: 'rob',
        age: '27'
    },
    selectedDay: today,
    currentMonth: ''
}

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setSelectedDay: (state, action) => {
            state.selectedDay = action.payload
        },
        // setCurrentMonth: (state, action) => {
        //     state.user = action.payload
        // }
    }
})

export const {
    setUser,
    setSelectedDay,
    // setCurrentMonth
} = storeSlice.actions

export default storeSlice.reducer
import { createSlice } from "@reduxjs/toolkit"
import { startOfToday } from "date-fns"

let today = startOfToday()

const initialState = {
    user: {
        name: 'rob',
        age: '27'
    },
    selectedDay: today,
    items: [
        {
            name: 'You have a meeting',
            details: 'meeting with the new ceo',
            dates: ['Mon Dec 04 2023', 'Tue Dec 05 2023'],
            time: '09:00',
            Sun: false,
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
            Sat: false
        },
        {
            name: 'Staff Part',
            details: 'staff party with the fuel',
            dates: [],
            time: '09:00',
            Sun: true,
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: true,
            Sat: false
        }
    ],
    selectedEvent: {}
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
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload
        }
    }
})

export const {
    setUser,
    setSelectedDay,
    setSelectedEvent
} = storeSlice.actions

export default storeSlice.reducer
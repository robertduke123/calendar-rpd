import { createSlice } from "@reduxjs/toolkit"
import { startOfToday } from "date-fns"

let date = new Date()

const initialState = {
    user: {
        name: 'rob',
        age: '27'
    },
    selectedDay: '',
    time: date,
    items: [
        {
            name: 'You have a meeting',
            details: 'meeting with the new ceo',
            dates: ['Mon Dec 04 2023', 'Sat Dec 09 2023'],
            location: 'some random place',
            time: '15:07:00',
            period: 'PM',
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
            location: 'a shithole in the middle of knowhere',
            dates: [],
            time: '11:00',
            time: 'AM',
            Sun: false,
            Mon: true,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: true,
            Sat: false
        }
    ],
    selectedEvent: {},
    eventAlarm: false
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
        setTime: (state, action) => {
            state.time = action.payload
        },
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload
        },
        setEventAlarm: (state, action) => {
            state.eventAlarm = action.payload
        }
    }
})

export const {
    setUser,
    setSelectedDay,
    setTime,
    setSelectedEvent,
    setEventAlarm
} = storeSlice.actions

export default storeSlice.reducer
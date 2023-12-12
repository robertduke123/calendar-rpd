import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        name: 'rob',
        age: '27'
    },
    selectedDay: '',
    showAdd: false,
    items: [
        // {
        //     name: 'Staff Part',
        //     details: 'staff party with the fuel',
        //     location: 'a shithole in the middle of knowhere',
        //     dates: [],
        //     time: '06:12:10',
        //     period: 'PM',
        //     Sun: true,
        //     Mon: true,
        //     Tue: true,
        //     Wed: true,
        //     Thu: true,
        //     Fri: true,
        //     Sat: true
        // },
        // {
        //     name: 'You have a meeting',
        //     details: 'meeting with the new ceo',
        //     dates: ['Mon Dec 11 2023', 'Mon Dec 04 2023', 'Sun Jan 10 2023'],
        //     location: 'some random place',
        //     time: '06:44:30',
        //     period: 'PM',
        //     Sun: false,
        //     Mon: false,
        //     Tue: false,
        //     Wed: false,
        //     Thu: false,
        //     Fri: false,
        //     Sat: false
        // },
        // {
        //     name: 'You',
        //     details: 'meeting with the new ceo',
        //     dates: ['Mon Jun 21 2024', 'Mon Apr 04 2024', 'Sun Feb 15 2026'],
        //     location: 'some random place',
        //     time: '06:44:30',
        //     period: 'PM',
        //     Sun: false,
        //     Mon: false,
        //     Tue: false,
        //     Wed: false,
        //     Thu: false,
        //     Fri: false,
        //     Sat: false
        // },
        
    ],
    selectedEvent: false,
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
        setShowAdd: (state) => {
            state.showAdd = !state.showAdd
        },
        setTime: (state, action) => {
            state.time = action.payload
        },
        addEvent: (state, action) => {
            action.payload.dates.length > 0 ?
            state.items.push(action.payload) :
            state.items.unshift(action.payload)
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
    setShowAdd,
    setTime,
    addEvent,
    setSelectedEvent,
    setEventAlarm
} = storeSlice.actions

export default storeSlice.reducer
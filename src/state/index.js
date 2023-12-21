import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    userInput: 'sign',
    selectedDay: '',
    showAdd: false,
    items: [
        // {
        //     name: 'Staff Part',
        //     details: 'staff party with the fuel',
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
        //     dates: ['Mon Dec 18 2023', 'Mon Dec 25 2023', 'Sun Jan 07 2024'],
        //     time: '06:44:30',
        //     period: 'PM',
        //     Sun: false,
        //     Mon: false,
        //     Tue: false,
        //     Wed: false,
        //     Thu: false,
        //     Fri: false,
        //     Sat: false
        // }     
    ],
    selectedEvent: false,
    editEvent: false,
    eventAlarm: false
}

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        showUserInput: (state, action) => {
            state.userInput = action.payload
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
        setEditEvent: (state, action) => {
            state.editEvent = action.payload
        },
        submitEditEvent: (state, action) => {
            let index = state.items.findIndex(item => item.name === state.editEvent.name)
            state.items[index] = action.payload
        },
        deleteEvent: (state) => {
            let index = state.items.findIndex(item => item.name === state.editEvent.name)
            state.items.splice(index, 1)
        },
        setEventAlarm: (state, action) => {
            state.eventAlarm = action.payload
        }
    }
})

export const {
    setUser,
    showUserInput,
    setSelectedDay,
    setShowAdd,
    setTime,
    addEvent,
    setSelectedEvent,
    setEditEvent,
    submitEditEvent,
    deleteEvent,
    setEventAlarm
} = storeSlice.actions

export default storeSlice.reducer
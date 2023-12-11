import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        name: 'rob',
        age: '27'
    },
    selectedDay: '',
    showAdd: false,
    items: [
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
            state.items.push(action.payload)
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
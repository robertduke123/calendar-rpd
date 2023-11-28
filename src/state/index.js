import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        name: 'rob',
        age: '27'
    },
    months: {
        January: 31,
        February: 28, 
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31
    }
}

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {
    setUser
} = storeSlice.actions

export default storeSlice.reducer
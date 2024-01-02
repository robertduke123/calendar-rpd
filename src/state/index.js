import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	userInput: "sign",
	switch: false,
	selectedDay: "",
	showAdd: false,
	items: [],
	selectedEvent: false,
	editEvent: false,
	eventAlarm: false,
};

export const storeSlice = createSlice({
	name: "store",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		showUserInput: (state, action) => {
			state.userInput = action.payload;
		},
		setSwitch: (state, action) => {
			state.switch = action.payload;
		},
		setSelectedDay: (state, action) => {
			state.selectedDay = action.payload;
		},
		setShowAdd: (state) => {
			state.showAdd = !state.showAdd;
		},
		setTime: (state, action) => {
			state.time = action.payload;
		},
		addEvent: (state, action) => {
			action.payload.dates?.length > 0
				? state.items.push(action.payload)
				: state.items.unshift(action.payload);
		},
		setSelectedEvent: (state, action) => {
			state.selectedEvent = action.payload;
		},
		setEditEvent: (state, action) => {
			state.editEvent = action.payload;
		},
		submitEditEvent: (state, action) => {
			let index = state.items.findIndex(
				(item) => item.name === state.editEvent.name
			);
			state.items[index] = action.payload;
		},
		deleteEvent: (state) => {
			let index = state.items.findIndex(
				(item) => item.name === state.editEvent.name
			);
			state.items.splice(index, 1);
		},
		emptyEvent: (state) => {
			state.items = [];
		},
		setEventAlarm: (state, action) => {
			state.eventAlarm = action.payload;
		},
	},
});

export const {
	setUser,
	showUserInput,
	setSwitch,
	setSelectedDay,
	setShowAdd,
	setTime,
	addEvent,
	setSelectedEvent,
	setEditEvent,
	submitEditEvent,
	deleteEvent,
	emptyEvent,
	setEventAlarm,
} = storeSlice.actions;

export default storeSlice.reducer;

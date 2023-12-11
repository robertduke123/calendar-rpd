import React, { useEffect } from "react";
import Calendar from "./components/calendar/Calendar";
import Details from "./components/details/Details";
import Event from "./components/event/Event";
import FullYear from "./components/fullYear/FullYear";
import Alarm from "./components/alarm/Alarm";
import AddEvent from "./components/addEvent/AddEvent";

import { setEventAlarm } from "./state";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";


function App() {
const dispatch = useDispatch()
const items = useSelector(state => state.store.items)
const eventAlarm = useSelector(state => state.store.eventAlarm)
const showAdd = useSelector(state => state.store.showAdd)
const selectedEvent = useSelector(state => state.store.selectedEvent)

// console.log(items);

const alarm = () => {
  let time = new Date()
  items.forEach((item) => {
    item.dates.length > 0 ?
    item.dates.forEach((date) => {
      if(date === format(time, 'E MMM dd yyyy')) {
        let eventTime = item.time
        if(item.period === 'PM') eventTime = `${String(parseInt(item.time[0] + item.time[1]) + 12)}:${item.time[3] + item.time[4]}:${item.time[6] + item.time[7]}`
        // console.log(eventTime, format(time, 'kk:mm:ss'));
        if(eventTime == format(time, 'kk:mm:ss')) {
          dispatch(setEventAlarm(item))          
        }
      }
    }):
    item.Sun && format(time, 'E') && item.time == format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Mon && format(time, 'E') && item.time == format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Tue && format(time, 'E') && item.time == format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Wed && format(time, 'E') && item.time == format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Thu && format(time, 'E') && item.time == format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Fri && format(time, 'E') && item.time == format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Sat && format(time, 'E') && item.time == format(time, 'kk:mm:ss') && dispatch(setEventAlarm(item))
  })
}

useEffect(() => {
  setInterval(() => {
    alarm()
  }, 1000)
}, [])




  return (
    
    <div>
      {eventAlarm && <Alarm/>} 
      {showAdd && <AddEvent/>}        
      <div className="app">        
        <div className="containers" style={{justifyContent: selectedEvent ? "space-around" : "flex-start"}}>
          <Details/>
           {selectedEvent && <Event/>}   
        </div>
        <div className="containers">
          <Calendar/>
          <FullYear/>
        </div>      
      </div>
    </div>
    
  );
}

export default App;

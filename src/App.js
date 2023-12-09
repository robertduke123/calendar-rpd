import React, { useEffect } from "react";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Calendar from "./components/calendar/Calendar";
import Details from "./components/details/Details";
import Event from "./components/event/Event";
import FullYear from "./components/fullYear/FullYear";
import Alarm from "./components/alarm/Alarm";

import { setTime, setEventAlarm } from "./state";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";


function App() {
const dispatch = useDispatch()
// const navigate = useNavigate()
// const time = useSelector(state => state.store.time)
const items = useSelector(state => state.store.items)
const eventAlarm = useSelector(state => state.store.eventAlarm)
// const alarmElement = document.querySelector('.alarm')

// console.log(alarmElement);

const alarm = () => {
  let time = new Date()
  items.forEach((item) => {
    item.dates.forEach((date) => {
      if(date === format(time, 'E MMM dd yyyy')) {
        let eventTime = item.time
        console.log(eventTime,format(time, 'kk:mm:ss'));
        // if (item.period === 'PM') eventTime = String(parseInt(item.time[0] + item.time[1]) + 12) + ':' + item.time[3] + item.time[4] + ':' + item.time[6] + item.time[7]
        if(eventTime == format(time, 'kk:mm:ss')) {
          dispatch(setEventAlarm(item))          
        }
      }
    })
  })
}

// console.log(items[0].time === format(time, 'kk:mm:ss'));

useEffect(() => {
  setInterval(() => {
    // let date = new Date()
    // dispatch(setTime(date))
    // console.log(date);
    alarm()
  }, 1000)
}, [])




  return (
    
    <div>
      {eventAlarm && <Alarm/>}         
      <div className="app">
        
        <div className="containers">
          <Details/>
          <Event/>
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

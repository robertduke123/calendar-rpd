import React, { useEffect, useState } from "react";
import Calendar from "./components/calendar/Calendar";
import Details from "./components/details/Details";
import Event from "./components/event/Event";
import FullYear from "./components/fullYear/FullYear";
import Alarm from "./components/alarm/Alarm";
import AddEvent from "./components/addEvent/AddEvent";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";

import { setUser, addEvent, setEventAlarm, showUserInput } from "./state";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


function App() {
const dispatch = useDispatch()
const userInput = useSelector(state => state.store.userInput)
const user = useSelector(state => state.store.user)
const items = useSelector(state => state.store.items)
const eventAlarm = useSelector(state => state.store.eventAlarm)
const showAdd = useSelector(state => state.store.showAdd)
const selectedEvent = useSelector(state => state.store.selectedEvent)
const [width, setWidth] = useState(window.innerWidth)
const [minWidth, setMinWidth] = useState(false)

useEffect(() => {
            function handleResize() {
                setWidth(window.innerWidth)
            }

            window.addEventListener('resize', handleResize)

            handleResize()
            return () => {
            window.removeEventListener('resize', handleResize)
            console.log(width);
            width < 1250 ? setMinWidth(true) : setMinWidth(false)
          }
})




const alarm = () => {
  let time = new Date()
  items.forEach((item) => {
    item.dates.length > 0 ?
    item.dates.forEach((date) => {
      if(date === format(time, 'E MMM dd yyyy')) {
        let eventTime = item.time
        if(item.period === 'PM') eventTime = `${String(parseInt(item.time[0] + item.time[1]) + 12)}:${item.time[3] + item.time[4]}:${item.time[6] + item.time[7]}`
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

useEffect(() => {
  const refresh = localStorage.getItem('refreshToken')

  fetch(
          'http://localhost:4000/token'
        , {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            token: refresh
          })
          
        })
        .then(response => {
          if (response.status !== 403) {
            return response.json()
          }
        })
        .then(data => {
          if(data.length > 15) {
           fetch('http://localhost:4000/post', {
                 headers: {
                    "Authorization": `Bearer ${data}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data[0].id) {
                dispatch(setUser({
                    id: data[0].id,
                    first: data[0].first_name,
                    last: data[0].last_name,
                    email: data[0].email
                })) 
                data[0].event_name.forEach((item, index) => {
                    let dates
                    data[0].event_dates[index] === "" ? dates = [] : 
                    data[0].event_dates[index].length <= 15 ? dates = [data[0].event_dates[index]] : 
                    dates = data[0].event_dates[index].split(', ') 
                    
                    dispatch(addEvent({
                        name: item,
                        details: data[0].event_details[index],
                        dates: dates,
                        time: data[0].event_time[index],
                        period: data[0].event_period[index],
                        Sun: data[0].event_sun[index],
                        Mon: data[0].event_mon[index],
                        Tue: data[0].event_tue[index],
                        Wed: data[0].event_wed[index],
                        Thu: data[0].event_thu[index],
                        Fri: data[0].event_fri[index],
                        Sat: data[0].event_sat[index]
                    }))
                })}
              dispatch(showUserInput('')) 
              })
                }
              })
                .catch(err => console.log(err))
}, [])

const handleSingOut = () => {
   fetch('http://localhost:4000/logout'
        , {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email: user.email
          })          
        })
        .then(response => response.json())
        .then(data => console.log)
  dispatch(setUser({}))
  dispatch(showUserInput('sign'))
}

  return (
    <div>
      {eventAlarm && <Alarm/>} 
      {showAdd && <AddEvent/>}
      {userInput === 'sign' && <SignIn/>}
      {userInput === 'register' && <Register/>}
        
        <div className="app">   
          <div className="containers" style={{justifyContent: selectedEvent ? "space-around" : "flex-start"}}>
            <div style={{display: minWidth && "flex"}}>
            {user.id && <h2 style={{marginTop: '-25px', fontSize: '21px'}}>{`${user.first[0].toUpperCase() + user.first.substring(1)} ${user.last[0].toUpperCase() + user.last.substring(1)}'s Calendar`}</h2>}
            {minWidth && <div className="sign-btn flex-row-cent" onClick={handleSingOut}>Sign Out</div>}
            </div>
            <Details/>
            {selectedEvent && <Event/>}   
          </div>
          {!minWidth &&
          <div className="containers">
              {!minWidth && <div className="sign-btn flex-row-cent" onClick={handleSingOut}>Sign Out</div>}
            <Calendar/>
            <FullYear/>
          </div>
          }
                
        </div>       
      </div>
  );
}

export default App;

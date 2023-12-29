import React, { useEffect, useState } from "react";
import Calendar from "./components/calendar/Calendar";
import Details from "./components/details/Details";
import Event from "./components/event/Event";
import FullYear from "./components/fullYear/FullYear";
import Alarm from "./components/alarm/Alarm";
import AddEvent from "./components/addEvent/AddEvent";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";

import { setUser, addEvent, setEventAlarm, showUserInput, setSwitch, setEditEvent, deleteEvent, submitEditEvent, emptyEvent, setSelectedEvent } from "./state";
import { useDispatch, useSelector } from "react-redux";
import { format, isBefore, parse } from "date-fns";


function App() {
const dispatch = useDispatch()
const userInput = useSelector(state => state.store.userInput)
const user = useSelector(state => state.store.user)
const Switch = useSelector(state => state.store.switch)
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
    width < 1250 ? setMinWidth(true) : setMinWidth(false)
  }
})

const alarm = async () => {
  let time = new Date()
  items.forEach((item) => { 
    let eventTime = item.time
        if(item.period === 'PM') eventTime = `${String(parseInt(item.time[0] + item.time[1]) + 12)}:${item.time[3] + item.time[4]}:${item.time[6] + item.time[7]}`
    item.dates?.length > 0 ?
    item.dates.forEach((date, index) => {
      if(date === format(time, 'E MMM dd yyyy')) {   
        if(eventTime === format(time, 'kk:mm:ss')) {
          dispatch(setEventAlarm(item))
          let editDates = [...item.dates]
          editDates.splice(index, 1)
          if (editDates?.length > 0) {
          dispatch(submitEditEvent({
            ...item,
            dates: editDates
          })) 
        fetch('http://localhost:4000/edit', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: user.email,
                oldName: item.name, 
                newName: item.name, 
                details: item.details, 
                time: item.time, 
                dates: editDates, 
                period: item.period, 
                Sun: item.Sun, 
                Mon: item.Mon, 
                Tue: item.Tue, 
                Wed: item.Wed, 
                Thu: item.Thu, 
                Fri: item.Fri, 
                Sat: item.Sat
            })
        })
        .then(response => response.json())
        .then(data => dispatch(setEditEvent(false)))
      } else {
          dispatch(setEditEvent(item))
          dispatch(deleteEvent({}))

          fetch('http://localhost:4000/del', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: user.email, 
                name: item.name
            })
        })
        .then(response => response.json())
        .then(data => dispatch(setEditEvent(false)))
        }
        }
      }
    }):
    item.Sun && format(time, 'E') && eventTime === format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Mon && format(time, 'E') && eventTime === format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Tue && format(time, 'E') && eventTime === format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Wed && format(time, 'E') && eventTime === format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Thu && format(time, 'E') && eventTime === format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Fri && format(time, 'E') && eventTime === format(time, 'kk:mm:ss') ? dispatch(setEventAlarm(item)) :
    item.Sat && format(time, 'E') && eventTime === format(time, 'kk:mm:ss') && dispatch(setEventAlarm(item))
  })
}

useEffect(() => {
  setInterval(() => {
    alarm()
  }, 1000)
}, [items, ])

useEffect(() => {
  const refresh = localStorage.getItem('refreshToken')

  if(items?.length > 0) {
    items.forEach(item => {
      dispatch(setEditEvent(item))
      dispatch(deleteEvent({}))
    })
  }
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
          if(data?.length > 15) {
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
                    if(dates.length > 0) {
                       let time = new Date()
                        
                          let eventTime = data[0].event_time[index]
                          if(data[0].event_period === 'PM') eventTime = `${String(parseInt(data[0].event_time[index][0] + data[0].event_time[index][1]) + 12)}:${data[0].event_time[index][3] + data[0].event_time[index][4]}:${data[0].event_time[index][6] + data[0].event_time[index][7]}`
                          dates?.length > 0 &&
                          dates.forEach((date, index) => {
                            if(date === format(time, 'E MMM dd yyyy') || isBefore(parse(date, 'E MMM dd yyyy', new Date()), parse(format(time, 'E MMM dd yyyy'), 'E MMM dd yyyy', new Date()))) {   
                              if(isBefore(parse((date + ' ' + eventTime), 'E MMM dd yyyy kk:mm:ss', new Date()), parse(format(time, 'E MMM dd yyyy kk:mm:ss'), 'E MMM dd yyyy kk:mm:ss', new Date()))) {
                                console.log('test');
                                dates.splice(index, 1)
                                console.log(dates);
                                if (dates?.length > 0) {
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

                              fetch('http://localhost:4000/edit', {
                                  method: 'POST',
                                  headers: {"Content-Type": "application/json"},
                                  body: JSON.stringify({
                                      email: data[0].email,
                                      oldName: item, 
                                      newName: item, 
                                      details: data[0].event_details[index], 
                                      time: data[0].event_time[index], 
                                      dates: dates, 
                                      period: data[0].event_period[index],
                                      Sun: data[0].event_sun[index], 
                                      Mon: data[0].event_mon[index], 
                                      Tue: data[0].event_tue[index], 
                                      Wed: data[0].event_wed[index], 
                                      Thu: data[0].event_thu[index], 
                                      Fri: data[0].event_fri[index], 
                                      Sat: data[0].event_sat[index]
                                  })
                              })
                              .then(response => response.json())
                              .then(data => dispatch(setEditEvent(false)))
                            } else {
                                dispatch(setEditEvent(item))
                                dispatch(deleteEvent({}))

                                fetch('http://localhost:4000/del', {
                                  method: 'POST',
                                  headers: {"Content-Type": "application/json"},
                                  body: JSON.stringify({
                                      email: user.email, 
                                      name: item
                                  })
                              })
                              .then(response => response.json())
                              .then(data => dispatch(setEditEvent(false)))
                              }
                              }
                            }
                          
                      }) 
                    } else if(data[0].event_sun || data[0].event_mon || data[0].event_tue || data[0].event_wed || data[0].event_thu || data[0].event_fri || data[0].event_sat)
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
                .catch(err => console.log(err))
            }
            })

}, [])

const handleSingOut = () => {
  dispatch(emptyEvent({}))

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
  dispatch(setSelectedEvent(false))
  dispatch(showUserInput('sign'))
}

  return (
    <div>
      {eventAlarm && <Alarm/>} 
      {showAdd && <AddEvent/>}
      {userInput === 'sign' && <SignIn/>}
      {userInput === 'register' && <Register/>}
        
        <div className="app">   
          {(!minWidth || !Switch) && <div className="containers" style={{justifyContent: !selectedEvent || minWidth ? "flex-start" :  "space-around"}}>
            {user.id && <h2 style={{marginTop: '-25px', marginLeft:  minWidth && '40px', fontSize: '21px'}}>{`${user.first[0].toUpperCase() + user.first.substring(1)} ${user.last[0].toUpperCase() + user.last.substring(1)}'s Calendar`}</h2>}
            {minWidth && 
            <div className="flex-row-around" style={{margin: '10px 0'}}>
              <div className="switch-btn flex-row-cent" style={{width: '150px'}} onClick={() => dispatch(setSwitch(true))}>Calendar</div>
              <div className="sign-btn flex-row-cent" style={{width: '150px', margin: '0'}}  onClick={handleSingOut}>Sign Out</div>
            </div>
            }
            <Details/>
            {selectedEvent && <Event/>}   
          </div>}
          {(!minWidth || Switch) &&
          <div className="containers" style={{justifyContent: minWidth ? "flex-start" :  "space-around"}}>
            {minWidth && user.id && <h2 style={{marginTop: '-25px', marginLeft:  minWidth && '40px', fontSize: '21px'}}>{`${user.first[0].toUpperCase() + user.first.substring(1)} ${user.last[0].toUpperCase() + user.last.substring(1)}'s Calendar`}</h2>}
            {minWidth && 
            <div className="flex-row-around" style={{margin: '10px 0'}}>
              <div className="switch-btn flex-row-cent" style={minWidth && {width: '150px'}} onClick={() => dispatch(setSwitch(false))}>Events</div>
              <div className="sign-btn flex-row-cent" style={{width: '150px', margin: '0'}}  onClick={handleSingOut}>Sign Out</div>
            </div>
            }
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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfToday, isToday, isEqual, parse, add, sub, getDay, startOfWeek } from 'date-fns'
import { setSelectedDay } from '../../../state';


export default function Calendar() {

let today = startOfToday()
const dispatch = useDispatch()
const selectedDay = useSelector(state => state.store.selectedDay)
const items = useSelector(state => state.store.items)



console.log(selectedDay)

// const [selectedDay, setSelectedDay] = useState(today)
const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
 
let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
let days = eachDayOfInterval({start: startOfWeek(firstDayCurrentMonth), end: endOfWeek(endOfMonth(firstDayCurrentMonth))})

 const nextMonth = () => {   
    let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
}

 const prevMonth = () => {   
    let firstDayPrevMonth = sub(firstDayCurrentMonth, {months: 1})
    setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'))
}

return(
    <div className='calendar'>
        <div className="calendar-head">
            <h3>{format(firstDayCurrentMonth, 'MMMM yyyy')}</h3>
            <div className="dir-btn" onClick={prevMonth}>&#10094;</div>            
            <div className="dir-btn" onClick={nextMonth}>&#10095;</div>
        </div>
        <div className="calendar-store">
            <div className="calendar-unit"><h1>S</h1></div>
            <div className="calendar-unit"><h1>M</h1></div>
            <div className="calendar-unit"><h1>T</h1></div>
            <div className="calendar-unit"><h1>W</h1></div>
            <div className="calendar-unit"><h1>T</h1></div>
            <div className="calendar-unit"><h1>F</h1></div>
            <div className="calendar-unit"><h1>S</h1></div>

            {
                days.map((day, dayIndx) => {
                    // console.log(items.map((item) =>  item.dates.includes(format(day, 'E MMM dd yyyy'))))
                    let colorClass = 
                        items.map((item) => item.dates.includes(format(day, 'E MMM dd yyyy'))).includes(true) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && isEqual(day, selectedDay) ||
                        items.map((item) => item[format(day, 'E')]).includes(true) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && isEqual(day, selectedDay) ? 'calendar-unit select-event' :
                        
                        isToday(day) && isSameMonth(day, firstDayCurrentMonth) && isEqual(day, selectedDay) ? 'calendar-unit select-day' :
                        
                        !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && isEqual(day, selectedDay) ? 'calendar-unit select-month' :
                        
                        isToday(day) && isSameMonth(day, firstDayCurrentMonth) ? 'calendar-unit day' :
                        
                        items.map((item) => item.dates.includes(format(day, 'E MMM dd yyyy'))).includes(true) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) ||
                        items.map((item) => item[format(day, 'E')]).includes(true) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) ? 'calendar-unit event' :
                        
                        !isToday(day) && isSameMonth(day, firstDayCurrentMonth) ? 'calendar-unit month' :
                        
                        'calendar-unit'

                        let firstDay = getDay(day)
                    
                    return(                  
                    <div key={day.toString()} className={colorClass} 
                        style={{gridColumnStart: 
                            dayIndx === 0 && firstDay === 0 ? '1' :
                            dayIndx === 0 && firstDay === 1 ? '2' :
                            dayIndx === 0 && firstDay === 2 ? '3' :
                            dayIndx === 0 && firstDay === 3 ? '4' :
                            dayIndx === 0 && firstDay === 4 ? '5' :
                            dayIndx === 0 && firstDay === 5 ? '6' :
                            dayIndx === 0 && firstDay === 6 && '7'
                        }} 
                        onClick={() => dispatch(setSelectedDay(day))}
                    >
                        <p dateTime={format(day, 'yyyy-mm-dd')}>{format(day, 'd')}</p>
                    </div> 
                    )})
            }
        </div>
    </div>
    )
}
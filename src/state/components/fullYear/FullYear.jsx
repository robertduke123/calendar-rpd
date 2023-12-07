import React, { useState } from 'react';
import { eachDayOfInterval, startOfToday, startOfYear, endOfYear, format, isBefore, add, sub, parse } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '../..';

export default function FullYear() {

    let today = startOfToday()
    const [currentYear, setCurrentYear] = useState(format(today, 'yyyy'))
    let firstDayCurrentYear = parse(currentYear, 'yyyy', new Date())
    let days = eachDayOfInterval({start: startOfYear(firstDayCurrentYear), end: endOfYear(firstDayCurrentYear)})
    const items = useSelector(state => state.store.items) 
    const dispatch = useDispatch()

    const nextYear = () => {   
        let nextYear = add(firstDayCurrentYear, {years: 1})
        setCurrentYear(format(nextYear, 'yyyy'))
    }

    const prevYear = () => {   
        let prevYear = sub(firstDayCurrentYear, {years: 1})
        setCurrentYear(format(prevYear, 'yyyy'))
    }

    return(
        <div className="full-year">
            <div className="calendar-head">
                <h3>{currentYear}</h3>
                <div className="dir-btn" onClick={prevYear}>&#10094;</div>            
                <div className="dir-btn" onClick={nextYear}>&#10095;</div>
            </div>
            <div className='full-container'>
            {days.map((day, indx) => {
                return isBefore(day, today) ?
                <div key={'full' + indx} className="full-unit" style={{backgroundColor: 'rgb(164, 237, 199)'}}></div> : 
                format(today, 'dd MMM yyyy') === format(day, 'dd MMM yyyy') ?
                    <div key={'full' + indx} className="full-unit hov" style={{cursor: 'pointer', backgroundColor: 'red'}} onClick={() => dispatch(setSelectedDay(day))}></div> :
                    items.map((item) => item.dates.includes(format(day, 'E MMM dd yyyy'))).includes(true) || items.map((item) => item[format(day, 'E')]).includes(true) ?
                    <div key={'full' + indx} className="full-unit hov" style={{cursor: 'pointer', backgroundColor: 'lightBlue'}} onClick={() => dispatch(setSelectedDay(day))}></div> :
                    <div key={'full' + indx} className="full-unit hov" onClick={() => dispatch(setSelectedDay(day))}></div>
            })}
            </div>
            
        </div>
    )
}
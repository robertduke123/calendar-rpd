import React from 'react';
import { eachDayOfInterval, startOfToday, startOfYear, endOfYear, format, isBefore } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '../..';

export default function FullYear() {

    let today = startOfToday()
    let days = eachDayOfInterval({start: startOfYear(today), end: endOfYear(today)})
    const items = useSelector(state => state.store.items) 
    const dispatch = useDispatch()

    // console.log(days);

    return(
        <div className="full-year">
            {days.map((day, indx) => {
                return isBefore(day, today) ?
                <div key={'full' + indx} className="full-unit" style={{backgroundColor: 'lightGreen'}} onClick={() => dispatch(setSelectedDay(day))}></div> : 
                format(today, 'dd MMM yyyy') === format(day, 'dd MMM yyyy') ?
                    <div key={'full' + indx} className="full-unit" style={{backgroundColor: 'red'}} onClick={() => dispatch(setSelectedDay(day))}></div> :
                    items.map((item) => item.dates.includes(format(day, 'E MMM dd yyyy'))).includes(true) || items.map((item) => item[format(day, 'E')]).includes(true) ?
                    <div key={'full' + indx} className="full-unit" style={{backgroundColor: 'lightBlue'}} onClick={() => dispatch(setSelectedDay(day))}></div> :
                    <div key={'full' + indx} className="full-unit" onClick={() => dispatch(setSelectedDay(day))}></div>
            })}
        </div>
    )
}
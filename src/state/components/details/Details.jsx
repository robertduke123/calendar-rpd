import { format } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '../..';

export default function Details() {

    const selectedDay = useSelector(state => state.store.selectedDay)
    const items = useSelector(state => state.store.items)
    const dispatch = useDispatch()
    // const items = [
    //     {
    //         name: 'You have a meeting',
    //         details: 'meeting with the new ceo',
    //         dates: ['Mon Nov 06 2023'],
    //         time: '09:00',
    //         Sun: false,
    //         Mon: false,
    //         Tue: false,
    //         Wed: false,
    //         Thu: false,
    //         Fri: false,
    //         Sat: false
    //     },
    //     {
    //         name: 'Staff Part',
    //         details: 'staff party with the fuel',
    //         dates: ['Tue Nov 07 2023'],
    //         time: '09:00',
    //         Sun: true,
    //         Mon: false,
    //         Tue: false,
    //         Wed: false,
    //         Thu: true,
    //         Fri: false,
    //         Sat: false
    //     }
    // ]

    return(
        <div className='details flex-col-cent'>
            <h2 style={{margin: '20px 0', cursor: 'pointer'}}>{format(selectedDay, 'd MMMM yyyy')}</h2>
            <div className="details-container flex-col-cent">
                {items?.map((item,index) => {
                    console.log(item[format(selectedDay, 'E')]);
                    if(item.dates.includes(format(selectedDay, 'E MMM dd yyyy')) || item[format(selectedDay, 'E')]) {                     
                    return (
                    <div key={'event' + index} className="event-item" onClick={() => dispatch(setSelectedEvent(item))}>
                        <p>{item.name}</p>
                        <div className="event-info" style={{width: '100%',display: 'flex', justifyContent: 'space-around'}}>
                            <h3>{item.time}</h3>
                            {item.dates.length > 0 ?
                                <p>{item.dates.map((date) => {if (date === format(selectedDay, 'E MMM dd yyyy')) return date})}</p> :
                                <div className='days' style={{width: '150px', display: 'flex', justifyContent: 'space-around'}}>
                                    <p style={{color: item.Sun && 'darkBlue'}}>S</p>
                                    <p style={{color: item.Mon && 'darkBlue'}}>M</p>
                                    <p style={{color: item.Tue && 'darkBlue'}}>T</p>
                                    <p style={{color: item.Wed && 'darkBlue'}}>W</p>
                                    <p style={{color: item.Thu && 'darkBlue'}}>T</p>
                                    <p style={{color: item.Fri && 'darkBlue'}}>F</p>
                                    <p style={{color: item.Sat && 'darkBlue'}}>S</p>
                                </div>
                            }
                            
                            
                        </div>
                    </div>
                )}})}
            </div>
        </div>
    )
}
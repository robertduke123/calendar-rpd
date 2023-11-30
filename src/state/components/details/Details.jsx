import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Details() {

    const selectedDay = useSelector(state => state.store.selectedDay)
    const items = [
        {
            name: 'You have a meeting',
            details: 'meeting with the new ceo',
            dates: ['Mon Nov 06 2023'],
            time: '09:00',
            Sun: false,
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
            Sat: false
        },
        {
            name: 'Staff Part',
            details: 'staff party with the fuel',
            dates: ['Tues Nov 06 2023'],
            time: '09:00',
            Sun: false,
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
            Sat: false
        }
    ]

    return(
        <div className='details'>
            <h2>{format(selectedDay, 'd MMMM yyyy')}</h2>
            <div className="details-container">
                {items.map((item,index) => (
                    <div key={'event' + index} className="event-item">
                        <p>{item.name}</p>
                        <div className="event-info" style={{width: '100%',display: 'flex', justifyContent: 'space-around'}}>
                            <h3>{item.time}</h3>
                            <p>{item.dates[0]}</p>
                            <div className='days' style={{width: '150px', display: 'flex', justifyContent: 'space-around'}}>
                                <p>S</p>
                                <p>M</p>
                                <p>T</p>
                                <p>W</p>
                                <p>T</p>
                                <p>F</p>
                                <p>S</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
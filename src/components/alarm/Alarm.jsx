import React from 'react';
import { setEventAlarm } from '../../state';
import { useDispatch, useSelector } from 'react-redux';

export default function Alarm() {

    const eventAlarm = useSelector(state => state.store.eventAlarm)
    const dispatch = useDispatch()

    return(
        <div className='alarm'>
            <div className="alarm-container flex-col-around">
                <h3>{eventAlarm?.name}</h3>
                <h1>{ 
                eventAlarm.period === 'PM' ?
                `${String(parseInt(eventAlarm.time[0] + eventAlarm.time[1]) - 12)}:${eventAlarm.time[3] + eventAlarm.time[4]} ${eventAlarm?.period}`
                : eventAlarm?.name + ' ' + eventAlarm?.period}</h1>
                <div className='flex-row-around' style={{width: '150px'}}>
                    <p>details</p>
                    <p onClick={() => dispatch(setEventAlarm(false))}>dismiss</p>
                </div>
            </div>
        </div>
    )
}
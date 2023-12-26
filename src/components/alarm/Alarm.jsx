import React from 'react';
import { setEventAlarm, setSelectedEvent } from '../../state';
import { useDispatch, useSelector } from 'react-redux';

export default function Alarm() {

    const eventAlarm = useSelector(state => state.store.eventAlarm)
    const dispatch = useDispatch()

    return(
        <div className='alarm cover'>
            <div className="alarm-container flex-col-around">
                <h3>{eventAlarm?.name}</h3>
                <h1>{parseInt(eventAlarm.time[0] + eventAlarm.time[1]) < 10 ?
                `${eventAlarm.time[1]}:${eventAlarm.time[3]}${eventAlarm.time[4]} ${eventAlarm.period}`  
                :`${eventAlarm.time[0]}${eventAlarm.time[1]}:${eventAlarm.time[3]}${eventAlarm.time[4]} ${eventAlarm.period}`                                
                }</h1>
                <div className='flex-row-around' style={{width: '150px'}}>
                    <p onClick={() => {
                        dispatch(setSelectedEvent(eventAlarm))
                        dispatch(setEventAlarm(false))
                    }}>details</p>
                    <p onClick={() => dispatch(setEventAlarm(false))}>dismiss</p>
                </div>
            </div>
        </div>
    )
}
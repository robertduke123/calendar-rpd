import React from 'react';
import { setEventAlarm } from '../../state';
import { useSelector } from 'react-redux';

export default function Alarm() {

    const eventAlarm = useSelector(state => state.store.eventAlarm)

    return(
        <div className='alarm flex-row-cent'>
            <div className="alarm-container">
                
            </div>
        </div>
    )
}
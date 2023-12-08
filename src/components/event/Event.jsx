import React from 'react';
import { useSelector } from 'react-redux';

export default function Event() {
    const selectedEvent = useSelector(state => state.store.selectedEvent)

    return (
        <div className='event flex-col-cent'>
            <h3>{selectedEvent.name}</h3>
            <p>{selectedEvent.details}</p>
            {selectedEvent.dates?.length > 0 ?
            selectedEvent.dates.map(date => (
                <h3>{date}</h3>
            )) :
            <div>
                <p>{selectedEvent.Sun && 'Sunday'}</p>
                <p>{selectedEvent.Mon && 'Monday'}</p>
                <p>{selectedEvent.Tue && 'Tuesday'}</p>
                <p>{selectedEvent.Wed && 'Wednesday'}</p>
                <p>{selectedEvent.Thu && 'Thursday'}</p>
                <p>{selectedEvent.Fri && 'Friday'}</p>
                <p>{selectedEvent.Sat && 'Saturday'}</p>   
            </div>}            
        </div>
    )
}
import React from 'react';
import { useSelector } from 'react-redux';

export default function Event() {
    const selectedEvent = useSelector(state => state.store.selectedEvent)

    return (
        <div className='event'>
            <h3>{selectedEvent.name}</h3>
            <p>{selectedEvent.details}</p>
            <h3>{selectedEvent.dates}</h3>
        </div>
    )
}
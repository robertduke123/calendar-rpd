import React from 'react';
import { useSelector } from 'react-redux';

export default function Event() {
    const selectedEvent = useSelector(state => state.store.selectedEvent)

    return (
        <div className='event'>
            <h3 className='flex-row-cent'>{selectedEvent.name}</h3> 
            <div className="event-days event-grid">
            {selectedEvent.dates?.length > 0 ?
            selectedEvent.dates.map((date, index) => (
                    <p key={'dates' + index}>{date}</p>
            )) :
            <div className='event-days event-grid'>
                {selectedEvent.Sun && <p>Every Sun</p>}
                {selectedEvent.Mon && <p>Every Mon</p>}
                {selectedEvent.Tue && <p>Every Tue</p>}
                {selectedEvent.Wed && <p>Every Wed</p>}
                {selectedEvent.Thu && <p>Every Thu</p>}
                {selectedEvent.Fri && <p>Every Fri</p>}
                {selectedEvent.Sat && <p>Every Sat</p>}   
            </div>}       
            </div>           
            <div className="event-description">
                <p>{selectedEvent.details}</p>    
            </div>                 
        </div>
    )
}
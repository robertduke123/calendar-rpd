import { format } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent, setSelectedDay, setShowAdd } from './../../state';

export default function Details() {

    const selectedDay = useSelector(state => state.store.selectedDay)
    const items = useSelector(state => state.store.items)
    const dispatch = useDispatch()

    return(
        <div className='details flex-col-cent'>
            <div className='flex-row-around' style={{justifyContent: selectedDay !== '' ? 'flex-end' : 'center', width: '300px'}}>
                <h3 style={{margin: '20px 0', cursor: 'pointer'}}>{selectedDay !== '' ? format(selectedDay, 'E d MMMM yyyy') : 'All Events'}</h3>
                <div className='plus-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => dispatch(setShowAdd({}))}>+</div>
                {selectedDay !== '' && <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => dispatch(setSelectedDay(''))}>X</div>}
            </div>
            
            <div className="details-container flex-col-cent">
                {items?.map((item, index) => {
                    if(selectedDay !== '') {
                        if(item.dates.includes(format(selectedDay, 'E MMM dd yyyy')) || item[format(selectedDay, 'E')]) {                     
                        return (
                        <div key={'event-all' + index + 1} className="event-item" onClick={() => dispatch(setSelectedEvent(item))}>
                            <p>{item.name}</p>
                            <div className="event-info">
                                <h3>{item.period === 'PM' ?
                                 `${String(parseInt(item.time[0] + item.time[1]) - 12)}:${item.time[3] + item.time[4]} ${item?.period}`
                                :`${item.time[0]}${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`                                
                                }</h3>                                
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
                    )}} else {
                        if(item.dates.length > 0) {
                        return item.dates.map((date, indx) => (
                        <div key={'event-dates ' + indx} className="event-item" onClick={() => dispatch(setSelectedEvent(item))}>
                            <p>{item.name}</p>
                            <div className="event-info">
                                <h3>{item.period === 'PM' ?
                                 `${String(parseInt(item.time[0] + item.time[1]) - 12)}:${item.time[3] + item.time[4]} ${item?.period}`
                                :`${item.time[0]}${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`                                
                                }</h3>  
                                    <p>{date}</p>                            
                            </div>
                        </div>   
                         )) } else {
                        return <div key={'event-days' + index} className="event-item" onClick={() => dispatch(setSelectedEvent(item))}>
                            <p>{item.name}</p>
                            <div className="event-info">
                                <h3>{item.period === 'PM' ?
                                 `${String(parseInt(item.time[0] + item.time[1]) - 12)}:${item.time[3] + item.time[4]} ${item?.period}`
                                :`${item.time[0]}${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`                                
                                }</h3> 
                                <div className='days' style={{width: '150px', display: 'flex', justifyContent: 'space-around'}}>
                                    <p style={{color: item.Sun && 'darkBlue'}}>S</p>
                                    <p style={{color: item.Mon && 'darkBlue'}}>M</p>
                                    <p style={{color: item.Tue && 'darkBlue'}}>T</p>
                                    <p style={{color: item.Wed && 'darkBlue'}}>W</p>
                                    <p style={{color: item.Thu && 'darkBlue'}}>T</p>
                                    <p style={{color: item.Fri && 'darkBlue'}}>F</p>
                                    <p style={{color: item.Sat && 'darkBlue'}}>S</p>
                                </div>                                                              
                            </div>
                        </div>
                    }}                    
                    })}
            </div>
        </div>
    )
}
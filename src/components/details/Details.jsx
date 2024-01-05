import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent, setSelectedDay, setShowAdd, setEditEvent } from './../../state';

export default function Details({sorting}) {

    const selectedDay = useSelector(state => state.store.selectedDay)
    const items = useSelector(state => state.store.items)
    const dispatch = useDispatch()
    const [show, setShow] = useState([])

    // let dates =[]
    // items.forEach(item => {
    //     item?.dates?.forEach(date => dates.push(date))
    // })

    // let newDates = sorting(dates)
    useEffect(() => {
        items.forEach((item) => {
            if(item.dates?.length > 0) {
                setShow(prevState => [...prevState,{name : item.name,show: true}])
            }
        })
    }, [items])


    return(
        <div className='details flex-col-cent'>
            <div className='flex-row-around' style={{justifyContent: selectedDay !== '' ? 'flex-end' : 'center', width: '300px'}}>
                <h3 style={{margin: '5px 0 10px', cursor: 'pointer'}}>{selectedDay !== '' ? format(selectedDay, 'E d MMMM yyyy') : 'All Events'}</h3>
                <div className='plus-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => {
                    dispatch(setEditEvent(false))
                    dispatch(setShowAdd({}))}}>+</div>
                {selectedDay !== '' && <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => dispatch(setSelectedDay(''))}>X</div>}
            </div>
            
            <div className="details-container flex-col-cent">
                {items?.map((item, index) => {
                    if(selectedDay !== '') {                        
                        if(item.dates.includes(format(selectedDay, 'E MMM dd yyyy')) || item[format(selectedDay, 'E')]) {                     
                        return (
                        <div key={'event-all' + index + 1} className="event-item">
                            <div className='flex-row-around' style={{width: '65%', marginLeft: '140px', justifyContent: 'space-between'}}>
                                <p onClick={() => dispatch(setSelectedEvent(item))}>{item.name}</p>    
                                <div className="edit flex-row-cent" onClick={() => {
                                    dispatch(setEditEvent(item))
                                    dispatch(setShowAdd())
                                }}>edit</div>
                            </div>
                            
                            <div className="event-info">
                                <h3>{parseInt(item.time[0] + item.time[1]) < 10 ?
                                `${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`  
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
                        if(item.dates?.length > 0) {
                            let itemDates = [...item.dates]
                            let sorted = sorting(itemDates)
                            let index = show.findIndex(showItem => showItem.name === item.name)                            
                            if(show[index]?.show) {
                                return <div key={'event-dates ' + index} className="event-item">
                                    <div className='flex-row-around' style={{width: '65%', marginLeft: '140px', justifyContent: 'space-between'}}>
                                        <p onClick={() => dispatch(setSelectedEvent(item))}>{item.name}</p>    
                                        <div className="edit flex-row-cent" onClick={() => {
                                            dispatch(setEditEvent(item))
                                            dispatch(setShowAdd())
                                        }}>edit</div>
                                    </div>
                                    <div className="event-info">
                                        <h3>{parseInt(item.time[0] + item.time[1]) < 10 ?
                                        `${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`  
                                        :`${item.time[0]}${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`                                
                                        }</h3>   
                                            <p style={{fontSize: '12px', width:'260px'}}>{sorted.map(date => date + ' ')}</p>                            
                                    </div>
                                    {item.dates.length > 1 &&
                                        <div className="arrow" style={{cursor: 'pointer', fontSize: '20px', marginTop: '-20px'}} onClick={() => {
                                        setShow([...show, show[index].show = false])
                                    }}>&#8964;</div>
                                    }
                                </div>
                            } else {
                                return sorted?.map((date, indx) => {
                                return <div key={'event-dates ' + indx} className="event-item" style={{backgroundColor: 'rgb(111, 194, 221)'}}>
                                    <div className='flex-row-around' style={{width: '65%', marginLeft: '140px', justifyContent: 'space-between'}}>
                                        <p onClick={() => dispatch(setSelectedEvent(item))}>{item.name}</p>    
                                        <div className="edit flex-row-cent" onClick={() => {
                                            dispatch(setEditEvent(item))
                                            dispatch(setShowAdd())
                                        }}>edit</div>
                                    </div>
                                    <div className="event-info">
                                        <h3>{parseInt(item.time[0] + item.time[1]) < 10 ?
                                        `${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`  
                                        :`${item.time[0]}${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`                                
                                        }</h3>   
                                            <p>{date}</p>                            
                                    </div>
                                    {indx + 1 === item.dates.length &&
                                        <div className="arrow" style={{cursor: 'pointer', fontSize: '20px', marginBottom: '-10px'}} onClick={() => {
                                            setShow([...show, show[index].show = true])
                                        }}>&#8963;</div>
                                    }                                    
                                </div>   
                            })
                            }                        
                        } else {
                        return <div key={'event-days' + index} className="event-item">
                            <div className='flex-row-around' style={{width: '65%', marginLeft: '140px', justifyContent: 'space-between'}}>
                                <p onClick={() => dispatch(setSelectedEvent(item))}>{item.name}</p>    
                                <div className="edit flex-row-cent" onClick={() => {
                                    dispatch(setEditEvent(item))
                                    dispatch(setShowAdd())
                                }}>edit</div>
                            </div>
                            <div className="event-info">
                                <h3>{parseInt(item.time[0] + item.time[1]) < 10 ?
                                `${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`  
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
                    }}})}
            </div>
        </div>
    )
}
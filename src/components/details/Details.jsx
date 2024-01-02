import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent, setSelectedDay, setShowAdd, setEditEvent } from './../../state';

export default function Details() {

    const selectedDay = useSelector(state => state.store.selectedDay)
    const items = useSelector(state => state.store.items)
    const dispatch = useDispatch()
    const [show, setShow] = useState([])

    let dates =[]
    items.forEach(item => {
        item?.dates?.forEach(date => dates.push(date))
    })

    function sorting(dates){
        dates.sort((a,b) => parseInt(a.slice(11)) - parseInt(b.slice(11)))
        let Jan = []
        let Feb = []
        let Mar = []
        let Apr = []
        let May = []
        let Jun = []
        let Jul = []
        let Aug = []
        let Sep = []
        let Oct = []
        let Nov = []
        let Dec = []
        dates.forEach(date => {
            if( date.slice(4, 7) === 'Jan') {
                Jan.push(date)
                Jan.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Feb') {
                Feb.push(date)
                Feb.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Mar') {
                Mar.push(date)
                Mar.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Apr') {
                Apr.push(date)
                Apr.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'May') {
                May.push(date)
                May.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Jun') {
                Jun.push(date)
                Jun.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Jul') {
                Jul.push(date)
                Jul.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Aug') {
                Aug.push(date)
                Aug.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Sep') {
                Sep.push(date)
                Sep.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Oct') {
                Oct.push(date)
                Oct.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Nov') {
                Nov.push(date)
                Nov.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            } 
            if (date.slice(4, 7) === 'Dec') {
                Dec.push(date)
                Dec.sort((a,b) => parseInt(a.slice(8,10)) - parseInt(b.slice(8,10)))
            }
       })
        let newDate = Jan.concat(Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec)    
        newDate.sort((a,b) => parseInt(a.slice(11)) - parseInt(b.slice(11)))
        return newDate    
    }

    let newDates = sorting(dates)

    useEffect(() => {
        items.forEach((item) => {
            console.log(item.dates.length > 0);
            if(item.dates?.length > 0) {
                setShow(prevState => [...prevState,{name : item.name,show: true}])
            }
        })
        console.log(show);
    }, [items])
    console.log(show);

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
                {
                 items?.map((item, index) => {
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
                            let index = show.findIndex(showItem => showItem.name === item.name)                            
                            if(show[index]?.show) {
                                console.log(show[index]);
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
                                            <p style={{fontSize: '12px', width:'260px'}}>{item.dates.map(date => date + ' ')}</p>                            
                                    </div>
                                    {item.dates.length > 1 &&
                                        <div className="arrow" style={{cursor: 'pointer', fontSize: '20px', marginTop: '-20px'}} onClick={() => {
                                        setShow([...show, show[index].show = false])
                                    }}>&#8964;</div>
                                    }
                                </div>
                            } else {
                                return newDates?.map((newDate, indx) => {
                                return item.dates.map((date) => {
                                if(date === newDate) {
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
                                }})})
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
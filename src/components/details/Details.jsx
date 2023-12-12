import { format } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent, setSelectedDay, setShowAdd } from './../../state';

export default function Details() {

    const selectedDay = useSelector(state => state.store.selectedDay)
    const items = useSelector(state => state.store.items)
    const dispatch = useDispatch()

    let dates =[]
    items.forEach(item => {
        item.dates.forEach(date => dates.push(date))
    })

    function sorting(dates){
        dates.sort((a,b) => parseInt(a.slice(11)) - parseInt(b.slice(11)))
        console.log(dates);
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
                console.log(Dec);
            }
       })
        let newDate = Jan.concat(Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec)    
        newDate.sort((a,b) => parseInt(a.slice(11)) - parseInt(b.slice(11)))
        console.log(newDate);
        return newDate    
    }

    let newDates = sorting(dates)

    return(
        <div className='details flex-col-cent'>
            <div className='flex-row-around' style={{justifyContent: selectedDay !== '' ? 'flex-end' : 'center', width: '300px'}}>
                <h3 style={{margin: '20px 0', cursor: 'pointer'}}>{selectedDay !== '' ? format(selectedDay, 'E d MMMM yyyy') : 'All Events'}</h3>
                <div className='plus-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => dispatch(setShowAdd({}))}>+</div>
                {selectedDay !== '' && <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => dispatch(setSelectedDay(''))}>X</div>}
            </div>
            
            <div className="details-container flex-col-cent">
                {
                 items?.map((item, index) => {
                    if(selectedDay !== '') {                        
                        if(item.dates.includes(format(selectedDay, 'E MMM dd yyyy')) || item[format(selectedDay, 'E')]) {                     
                        return (
                        <div key={'event-all' + index + 1} className="event-item" onClick={() => dispatch(setSelectedEvent(item))}>
                            <p>{item.name}</p>
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
                        if(item.dates.length > 0) {
                        return newDates?.map(newDate => {
                        return item.dates.map((date, indx) => {
                        if(date === newDate) {
                        return <div key={'event-dates ' + indx} className="event-item" onClick={() => dispatch(setSelectedEvent(item))}>
                            <p>{item.name}</p>
                            <div className="event-info">
                                <h3>{parseInt(item.time[0] + item.time[1]) < 10 ?
                                `${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`  
                                :`${item.time[0]}${item.time[1]}:${item.time[3]}${item.time[4]} ${item.period}`                                
                                }</h3>   
                                    <p>{date}</p>                            
                            </div>
                        </div>   
                         }})})} else {
                        return <div key={'event-days' + index} className="event-item" onClick={() => dispatch(setSelectedEvent(item))}>
                            <p>{item.name}</p>
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
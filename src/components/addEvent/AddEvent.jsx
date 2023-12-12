import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowAdd, addEvent } from '../../state';
import { eachDayOfInterval, endOfMonth, format, startOfToday, parse, add, sub, getDay, isBefore} from 'date-fns'

export default function AddEvent() {
    let today = startOfToday()
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    let days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfMonth(firstDayCurrentMonth)})

    const dispatch = useDispatch()
    const [change, setChange] = useState(true)
    const [hour, setHour] = useState(1)
    const [minute, setMinute] = useState(0)
    const [period,setPeriod] = useState(true)
    const [date, setDate] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [sun, setSun] = useState(false)
    const [mon, setMon] = useState(false)
    const [tue, setTue] = useState(false)
    const [wed, setWed] = useState(false)
    const [thu, setThu] = useState(false)
    const [fri, setFri] = useState(false)
    const [sat, setSat] = useState(false)
    

    // console.log(format(date[0], 'yyyy'));

    const nextMonth = () => {   
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const prevMonth = () => {   
        let firstDayPrevMonth = sub(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'))
    }   

    return(
        <div className="add cover">
            <div className="add-container flex-col-cent">
                <div className="add-head flex-row-cent">
                    <h3>Add Event</h3>   
                    <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => dispatch(setShowAdd({}))}>X</div>
                </div>

                <div className="add-time flex-row-cent">
                    <div className="add-changer flex-col-cent">
                        <button className="up flex-row-cent" unselectable='on' onClick={() => {
                            hour < 12 ? setHour(hour + 1) :
                            hour === 12 && setHour(1) 
                            hour === 11 && setPeriod(!period)
                        }}>&#8963;</button>
                        <div className='flex-row-cent'>
                          {hour < 10 && <p>0</p>}  
                          <p>{hour}</p>  
                        </div>                        
                        <button className="down flex-row-cent"  unselectable='on'onClick={() => {
                            hour > 1 ? setHour(hour - 1) :
                            hour === 1 && setHour(12)
                            hour === 12 && setPeriod(!period)
                        }}>&#8964;</button>
                    </div>
                    <p>:</p>
                    <div className="add-changer flex-col-cent">
                        <button className="up flex-row-cent" unselectable='on' onClick={() => {
                            minute < 59 ? setMinute(minute + 1) :
                            minute === 59 && setMinute(0)
                        }}>&#8963;</button>
                        <div className='flex-row-cent'>
                          {minute < 10 && <p>0</p>}  
                          <p>{minute}</p>  
                        </div>                        
                        <button className="down flex-row-cent" unselectable='on' onClick={() => {
                            minute > 0 ? setMinute(minute - 1) :
                            minute === 0 && setMinute(59)
                        }}>&#8964;</button>
                    </div>
                    <div className="add-changer flex-col-cent">
                        <button className="up flex-row-cent" unselectable='on' onClick={() => setPeriod(!period)}>&#8963;</button>
                        <div className='flex-row-cent'>
                          <p>{period ? 'AM' : 'PM'}</p>  
                        </div>                        
                        <button className="down flex-row-cent" unselectable='on' onClick={() => setPeriod(!period)}>&#8964;</button>
                    </div>
                </div>

                {change ? 
                <div className='calendar flex-col-cent' style={{width: '285px', height: '295px', margin: '0', color: 'black', fontSize: '14px'}}>
                    <div className="calendar-head" style={{margin: '5px'}}>
                        <h3 style={{margin: '0'}}>{format(firstDayCurrentMonth, 'MMMM yyyy')}</h3>
                        <div className="dir-btn" onClick={prevMonth}>&#10094;</div>            
                        <div className="dir-btn" onClick={nextMonth}>&#10095;</div>
                        <div className='change flex-row-cent' onClick={() => {
                            setChange(!change)
                            setDate([])
                        }}>C</div>
                    </div>
                    <div className="calendar-store">
                        <div className="calendar-unit" style={{margin: '0'}}><h1>M</h1></div>
                        <div className="calendar-unit" style={{margin: '0'}}><h1>T</h1></div>
                        <div className="calendar-unit" style={{margin: '0'}}><h1>W</h1></div>
                        <div className="calendar-unit" style={{margin: '0'}}><h1>T</h1></div>
                        <div className="calendar-unit" style={{margin: '0'}}><h1>F</h1></div>
                        <div className="calendar-unit" style={{margin: '0'}}><h1>S</h1></div>
                        <div className="calendar-unit" style={{margin: '0'}}><h1>S</h1></div>

                        {days.map((day, dayIndx) => {
                                let firstDay = getDay(day)

                                console.log(format(today, 'MMM dd yyyy') === format(day, 'MMM dd yyyy'));

                                let colorClass =  
                                format(today, 'MMM dd yyyy') === format(day, 'MMM dd yyyy') && date.includes(format(day, 'E MMM dd yyyy')) ? 'calendar-unit add' :
                                format(today, 'MMM dd yyyy') === format(day, 'MMM dd yyyy') ? 'calendar-unit day' :
                                date.includes(format(day, 'E MMM dd yyyy')) ? 'calendar-unit add'  :'calendar-unit month'
                                
                                
                                return isBefore(day, today) ?
                                <div key={day.toString()} className='calendar-unit' 
                                    style={{gridColumnStart: 
                                        dayIndx === 0 && firstDay === 0 ? '1' :
                                        dayIndx === 0 && firstDay === 1 ? '2' :
                                        dayIndx === 0 && firstDay === 2 ? '3' :
                                        dayIndx === 0 && firstDay === 3 ? '4' :
                                        dayIndx === 0 && firstDay === 4 ? '5' :
                                        dayIndx === 0 && firstDay === 5 ? '6' :
                                        dayIndx === 0 && firstDay === 6 && '7',
                                        margin: '0'
                                    }} 
                                >
                                    <p dateTime={format(day, 'yyyy-mm-dd')}>{format(day, 'd')}</p>
                                </div>                  
                                :
                                <div key={day.toString()} className={colorClass} 
                                    style={{gridColumnStart: 
                                        dayIndx === 0 && firstDay === 0 ? '1' :
                                        dayIndx === 0 && firstDay === 1 ? '2' :
                                        dayIndx === 0 && firstDay === 2 ? '3' :
                                        dayIndx === 0 && firstDay === 3 ? '4' :
                                        dayIndx === 0 && firstDay === 4 ? '5' :
                                        dayIndx === 0 && firstDay === 5 ? '6' :
                                        dayIndx === 0 && firstDay === 6 && '7',
                                        margin: '0'
                                    }} 
                                    onClick={() => {
                                        date.includes(format(day, 'E MMM dd yyyy')) ? 
                                        setDate(date.filter(d => d !== format(day, 'E MMM dd yyyy')))
                                        : setDate(prevState => [...prevState, format(day, 'E MMM dd yyyy')])
                                    }}>
                                            
                                    <p dateTime={format(day, 'yyyy-mm-dd')}>{format(day, 'd')}</p>
                                </div>})}
                    </div>
                </div> :
                <div className='add-week'>
                    <div className="calendar-head" style={{margin: '5px'}}>
                        <h3>Every Week</h3>
                        <div className='change flex-row-cent' style={{marginRight: '-67px'}} onClick={() => {
                            setChange(!change)
                            setSun(false)
                            setMon(false)
                            setTue(false)
                            setWed(false)
                            setThu(false)
                            setFri(false)
                            setSat(false)
                        }}>C</div>
                    </div>
                    <div className='flex-row-around' style={{margin: '25px 0'}}>
                        <div className={sun ? 'add-day-on flex-row-cent' : "add-day-btn flex-row-cent"} onClick={() => setSun(!sun)}>S</div>
                        <div className={mon ? 'add-day-on flex-row-cent' : "add-day-btn flex-row-cent"} onClick={() => setMon(!mon)}>M</div>
                        <div className={tue ? 'add-day-on flex-row-cent' : "add-day-btn flex-row-cent"} onClick={() => setTue(!tue)}>T</div>
                        <div className={wed ? 'add-day-on flex-row-cent' : "add-day-btn flex-row-cent"} onClick={() => setWed(!wed)}>W</div>
                        <div className={thu ? 'add-day-on flex-row-cent' : "add-day-btn flex-row-cent"} onClick={() => setThu(!thu)}>T</div>
                        <div className={fri ? 'add-day-on flex-row-cent' : "add-day-btn flex-row-cent"} onClick={() => setFri(!fri)}>F</div>
                        <div className={sat ? 'add-day-on flex-row-cent' : "add-day-btn flex-row-cent"} onClick={() => setSat(!sat)}>S</div>
                    </div>
                </div>
                }
                

                <div className="add-inputs flex-col-cent">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="description">Description</label>
                    <textarea name='description' onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="add-btn flex-row-cent" onClick={() => {
                    let h = String(hour)
                    if(hour < 10) h = '0' + h
                    let m = String(minute)
                    if(minute < 10) m = '0' + m

                    dispatch(addEvent({                        
                        name: name,
                        details: description,
                        // location: 'a shithole in the middle of knowhere',
                        dates: date.sort(),
                        time: h + ':' + m + ':00',
                        period: period ? 'AM' : 'PM',
                        Sun: sun,
                        Mon: mon,
                        Tue: tue,
                        Wed: wed,
                        Thu: thu,
                        Fri: fri,
                        Sat: sat        
                    }))
                    dispatch(setShowAdd({}))
                }}>Confirm</div>

            </div>
        </div>
    )
}
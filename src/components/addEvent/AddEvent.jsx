import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowAdd } from '../../state';

export default function AddEvent() {

    const dispatch = useDispatch()
    const [hour, setHour] = useState(1)
    const [minute, setMinute] = useState(0)
    const [period,setPeriod] = useState(true)

    return(
        <div className="add cover">
            <div className="add-container">
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

            </div>
        </div>
    )
}
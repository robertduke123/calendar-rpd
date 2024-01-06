import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, addEvent, showUserInput, setEditEvent} from "../../state";
import { format, isBefore, parse } from "date-fns";

export default function SignIn() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (ver) => {
    if(ver === 'demo' || email !== '' && password !== '') {        
        await fetch(
        "https://calendar-api-8mck.onrender.com/log"
        //   'http://localhost:4000/log'
        , {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email: ver === 'demo' ? 'Demo' : email,
            password: ver === 'demo' ? 'Demo' : password
          })
          
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('refreshToken', data.refreshToken)
           fetch(
            "https://calendar-api-8mck.onrender.com/post"
            // 'http://localhost:4000/post'
            , {
                 headers: {
                    "Authorization": `Bearer ${data.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then((data) => {
                if (data[0].id) {
                    dispatch(
                        setUser({
                            id: data[0].id,
                            first: data[0].first_name,
                            last: data[0].last_name,
                            email: data[0].email,
                        })
                    );
                    data[0].event_name.forEach((item, index) => {
                        let dates;
                        data[0].event_dates[index] === ""
                            ? (dates = [])
                            : data[0].event_dates[index].length <= 15
                            ? (dates = [data[0].event_dates[index]])
                            : (dates = data[0].event_dates[index].split(", "));
                        if (dates.length > 0) {
                            let time = new Date();
                            let eventTime = data[0].event_time[index];
                            if (data[0].event_period === "PM")
                                eventTime = `${String(
                                    parseInt(
                                        data[0].event_time[index][0] +
                                            data[0].event_time[index][1]
                                    ) + 12
                                )}:${
                                    data[0].event_time[index][3] +
                                    data[0].event_time[index][4]
                                }:${
                                    data[0].event_time[index][6] +
                                    data[0].event_time[index][7]
                                }`;
                            let count = 0;
                            dates.forEach((date) => {
                                if (
                                    (date === format(time, "E MMM dd yyyy") &&
                                        isBefore(
                                            parse(
                                                date + " " + eventTime,
                                                "E MMM dd yyyy kk:mm:ss",
                                                new Date()
                                            ),
                                            parse(
                                                format(time, "E MMM dd yyyy kk:mm:ss"),
                                                "E MMM dd yyyy kk:mm:ss",
                                                new Date()
                                            )
                                        )) ||
                                    isBefore(
                                        parse(date, "E MMM dd yyyy", new Date()),
                                        parse(
                                            format(time, "E MMM dd yyyy"),
                                            "E MMM dd yyyy",
                                            new Date()
                                        )
                                    )
                                ) {
                                    count++;
                                }
                            });

                            dates.splice(0, count);
                            if (dates?.length > 0) {
                                dispatch(
                                    addEvent({
                                        name: item,
                                        details: data[0].event_details[index],
                                        dates: dates,
                                        time: data[0].event_time[index],
                                        period: data[0].event_period[index],
                                        Sun: data[0].event_sun[index],
                                        Mon: data[0].event_mon[index],
                                        Tue: data[0].event_tue[index],
                                        Wed: data[0].event_wed[index],
                                        Thu: data[0].event_thu[index],
                                        Fri: data[0].event_fri[index],
                                        Sat: data[0].event_sat[index],
                                    })
                                );

                                fetch(
                                    "https://calendar-api-8mck.onrender.com/edit"
                                    // "http://localhost:4000/edit"
                                    , {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        email: data[0].email,
                                        oldName: item,
                                        newName: item,
                                        details: data[0].event_details[index],
                                        time: data[0].event_time[index],
                                        dates: dates,
                                        period: data[0].event_period[index],
                                        Sun: data[0].event_sun[index],
                                        Mon: data[0].event_mon[index],
                                        Tue: data[0].event_tue[index],
                                        Wed: data[0].event_wed[index],
                                        Thu: data[0].event_thu[index],
                                        Fri: data[0].event_fri[index],
                                        Sat: data[0].event_sat[index],
                                    }),
                                })
                                    .then((response) => response.json())
                                    .then((data) => dispatch(setEditEvent(false)));
                            } else {
                                fetch(
                                    "https://calendar-api-8mck.onrender.com/del"
                                    // "http://localhost:4000/del"
                                    , {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        email: data[0].email,
                                        name: item,
                                    }),
                                })
                                    .then((response) => response.json())
                                    .then((data) => dispatch(setEditEvent(false)));
                            }
                        } else {
                            dispatch(
                                addEvent({
                                    name: item,
                                    details: data[0].event_details[index],
                                    dates: dates,
                                    time: data[0].event_time[index],
                                    period: data[0].event_period[index],
                                    Sun: data[0].event_sun[index],
                                    Mon: data[0].event_mon[index],
                                    Tue: data[0].event_tue[index],
                                    Wed: data[0].event_wed[index],
                                    Thu: data[0].event_thu[index],
                                    Fri: data[0].event_fri[index],
                                    Sat: data[0].event_sat[index],
                                })
                            );
                        }
                    });
                }
                dispatch(showUserInput(""));
            })
        })            
        }
    }

    return(
        <div className='sign-in cover' style={{justifyContent: 'flex-start'}}>
            <div className="sign-container flex-col-around">
                <div className="add-head flex-row-cent">
                    <h3>Sign In</h3>   
                    {/* <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => {
                        dispatch(showUserInput(''))
                    }}>X</div> */}
                </div>

                <div className='flex-row-between' style={{width: '80%'}} >
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id='email' onChange={(e) => setEmail(e.target.value)}/>    
                </div>
                
                <div className='flex-row-between'  style={{width: '80%'}}> 
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id='password' onChange={(e) => setPassword(e.target.value)}/>    
                </div>   

                <div className="add-btn flex-row-cent" style={{color: 'white'}} onClick={() => handleSubmit('log')}>Confirm</div>
                
                <p className='sign-switch' onClick={() => dispatch(showUserInput('register'))}>register</p>  
                <p className='sign-switch' onClick={() => handleSubmit('demo')}>demo</p>  
            </div>
        </div>
    )
}
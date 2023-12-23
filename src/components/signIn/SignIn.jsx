import React, { useState } from 'react';
import { setUser, showUserInput, addEvent } from '../../state';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector(state => state.store.user)
    const items = useSelector(state => state.store.items)

    console.log(items);

    const handleSubmit = async () => {
    if(email !== '' && password !== '') {        
        await fetch(
          'http://localhost:4000/log'
        , {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email: email,
            password: password
          })
          
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('refreshToken', data.refreshToken)
           fetch('http://localhost:4000/post', {
                 headers: {
                    "Authorization": `Bearer ${data.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data[0].id) {
                dispatch(setUser({
                    id: data[0].id,
                    first: data[0].first_name,
                    last: data[0].last_name,
                    email: data[0].email
                })) 
                data[0].event_name.forEach((item, index) => {
                    let dates
                    console.log(data[0].event_dates[index].length);
                    data[0].event_dates[index] === "" ? dates = [] : 
                    data[0].event_dates[index].length <= 15 ? dates = [data[0].event_dates[index]] : 
                    dates = data[0].event_dates[index].split(', ')       
                    
                    dispatch(addEvent({
                        name: item,
                        details: data[0].event_details[index],
                        // dates: dates,
                        time: data[0].event_time[index],
                        period: data[0].event_period[index],
                        Sun: data[0].event_sun[index],
                        Mon: data[0].event_mon[index],
                        Tue: data[0].event_tue[index],
                        Wed: data[0].event_wed[index],
                        Thu: data[0].event_thu[index],
                        Fri: data[0].event_fri[index],
                        Sat: data[0].event_sat[index]
                    }))
                })
            dispatch(showUserInput(''))              
          }
            })
          
          
        })
    }
}
console.log(user);

    return(
        <div className='sign-in cover' style={{justifyContent: 'flex-start'}}>
            <div className="sign-container flex-col-around">
                <div className="add-head flex-row-cent">
                    <h3>Sign In</h3>   
                    <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => {
                        dispatch(showUserInput(''))
                    }}>X</div>
                </div>

                <div className='flex-row-between' style={{width: '80%'}} >
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id='email' onChange={(e) => setEmail(e.target.value)}/>    
                </div>
                
                <div className='flex-row-between'  style={{width: '80%'}}> 
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id='password' onChange={(e) => setPassword(e.target.value)}/>    
                </div>   

                <div className="add-btn flex-row-cent" style={{color: 'white'}} onClick={handleSubmit}>Confirm</div>
                
                <p className='sign-switch' onClick={() => dispatch(showUserInput('register'))}>register</p>  
            </div>
        </div>
    )
}
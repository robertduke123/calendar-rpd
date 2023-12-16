import React, { useState } from 'react';
import { ShowUserInput } from '../../state';
import { useDispatch } from 'react-redux';

export default function SignIn() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div className='sign-in cover' style={{justifyContent: 'flex-start'}}>
            <div className="sign-container flex-col-around">
                <div className="add-head flex-row-cent">
                    <h3>Sign In</h3>   
                    <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => {
                        dispatch(ShowUserInput(''))
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

                <div className="add-btn flex-row-cent" style={{color: 'white'}}>Confirm</div>
                
                <p className='sign-switch' onClick={() => dispatch(ShowUserInput('register'))}>register</p>  
            </div>
        </div>
    )
}
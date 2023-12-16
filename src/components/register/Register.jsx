import React, { useState } from 'react';
import { ShowUserInput } from '../../state';
import { useDispatch } from 'react-redux';

export default function Register() {

    const dispatch = useDispatch()
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    return(
        <div className='register cover' style={{justifyContent: 'flex-start'}}>
            <div className="register-container flex-col-around">
                <div className="add-head flex-row-cent">
                    <h3>Register</h3>   
                    <div className='x-btn flex-row-cent' style={{marginLeft: '10px'}} onClick={() => {
                        dispatch(ShowUserInput(''))
                    }}>X</div>
                </div>

                <div className='flex-row-between' style={{width: '80%'}} >
                    <label htmlFor="first">First Name</label>
                    <input type="text" name="first" id='first' onChange={(e) => setFirst(e.target.value)}/>    
                </div>

                <div className='flex-row-between' style={{width: '80%'}} >
                    <label htmlFor="last">Last Name</label>
                    <input type="text" name="last" id='last' onChange={(e) => setLast(e.target.value)}/>    
                </div>

                <div className='flex-row-between' style={{width: '80%'}} >
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id='email' onChange={(e) => setEmail(e.target.value)}/>    
                </div>
                
                <div className='flex-row-between'  style={{width: '80%'}}> 
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id='password' onChange={(e) => setPassword(e.target.value)}/>    
                </div>   

                <div className='flex-row-between'  style={{width: '80%'}}> 
                    <label htmlFor="confpassword">Confirm</label>
                    <input type="password" name="confpassword" id='confpassword' onChange={(e) => setConfPassword(e.target.value)}/>    
                </div>   

                <div className="add-btn flex-row-cent" style={{color: 'white'}}>Confirm</div>
                
                <p className='sign-switch' onClick={() => dispatch(ShowUserInput('sign'))}>sign in</p>  
            </div>
        </div>
    )
}
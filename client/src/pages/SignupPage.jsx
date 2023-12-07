import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './signup.css'

function SignupPage() {
    const [user, setUser] = useState({name:"",email:"", password:"", confirmPassword:"",photo:""});
    const navigate = useNavigate();
    let name, value;

    const handleInputs = (event) =>{
        // console.log(event)
        name = event.target.name;
        value = event.target.value;
        setUser({...user, [name]:value})
    }

    const userCredentials = async (event)=>{
        event.preventDefault();
        const {name, email, password, confirmPassword, photo} = user
       const res= await fetch('/api/v1/users/login',
       {
       method: 'POST',
       headers: {
        "Content-Type": "application/json"
       },
       body:JSON.stringify({email,password})})
       const data = await res.json()
       if(data.token)
       {

        // const token = `Bearer ${data.token}`
        // const token = data.token
        // document.cookie=`token=${token}`;
        // setAuthenticated(true)
        console.log("Login successful")
        navigate('/products')
       }
    }




  return (
    <div className='signup-container'>
        <div className='form-container'>
            
        <form className='signup-form' method='POST' onSubmit={userCredentials}>
        <div className='input-wrapper'>
                <label htmlFor='name'>Email</label>
                <input 
                id='name' 
                className='product-input'
                name='name' 
                type="text" 
                placeholder='Name'
                value={user.name}
                onChange={handleInputs}       
                />
        </div>
       
       <div className='input-wrapper'>
                <label htmlFor='email'>Email</label>
                <input 
                id='email' 
                className='product-input'
                name='email' 
                type="email" 
                placeholder='Email'
                value={user.email}
                onChange={handleInputs}       
                />
        </div>
        <div className='input-wrapper'>
                <label htmlFor='password' >Password</label>
                <input 
                id='password' 
                className='product-input'
                name='password' 
                type="password" 
                placeholder='Password'
                value={user.password}
                onChange={handleInputs}        
                />
        </div>

        <div className='input-wrapper'>
                <label htmlFor='confirm-password' >Password</label>
                <input 
                id='confirm-password' 
                className='product-input'
                name='confrimPassword' 
                type="password" 
                placeholder='Confirm Password'
                value={user.confirmPassword}
                onChange={handleInputs}        
                />
        </div>
        {/* <div className='input-wrapper'>
                <label htmlFor='input-cover-image' >Upload Profile Image</label>
                <input id='input-cover-image' className='product-input' name='coverImage' type="file" placeholder='Cover Image'/>
        </div> */}
        
        <div>
                <button type='submit' className='login-button'>Login</button>
            </div>
            </form>

        </div>
    </div>
  )
}

export default SignupPage
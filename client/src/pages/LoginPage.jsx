import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'
function LoginPage() {
    const [user, setUser] = useState({email:"", password:""});
    const [isAuthenticated, setAuthenticated] = useState(false);
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
        const {email, password} = user
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
        setAuthenticated(true)
        console.log("Login successful")
        navigate('/products')
       }
    }

  return (
    <div>
    <div>
      <form method='POST' onSubmit={userCredentials}>
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
        
        <div>
                <button type='submit' className='login-button'>Login</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
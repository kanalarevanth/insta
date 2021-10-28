import './signup.css'
import {useState} from 'react';
import {Link} from 'react-router-dom'
function SignUp() {
  const [loginmsg, setmsg] = useState('') 
  const signup = async e => {
    try{ 
      e.preventDefault();
      const response = await fetch('http://localhost:5000/signup',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: e.target.name.value,
            email: e.target.email.value,
            password:e.target.password.value
        })
      })
      const data = await response.json();
      setmsg(data.message) 

    }catch(e){
      console.log(e)
    }
   }
    return (
    <div className="signupcontainer">
      <div className="signup">
        <div className="signuplogo">
          <h1 className="signupinsta">Signup</h1>
        </div>
        <div className="signupstatus">
            <h3 className="signmsg">{loginmsg}</h3>
        </div>
      <form onSubmit={e => signup(e)} className="signupform">
      <label>UserName :</label>
      <input type="name" name="name"></input>
      <label>Email :</label> 
      <input type="email" name="email"></input> 
      <label>Password :</label>
      <input type="password" name="password"></input>
      <button type="submit" className="signupbtn">SignUp</button>
      </form>
      <div className="signupbutton">
      <p className="text1">Already have an account ?</p> 
      <Link to={'./login'}><p className="sintolog">Login</p></Link> 
      </div>
    </div>
    </div>
    ) 
  } 
export default  SignUp;
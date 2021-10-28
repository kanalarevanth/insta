import './login.css'
import {setToken} from "../authentication/auth"
import {useHistory} from 'react-router-dom'
import {useState} from 'react';
import {Link} from 'react-router-dom'
function Login() {
  let history = useHistory()
  const [loginmsg, setmsg] = useState('') 
  const login = async e => {
    try{
      e.preventDefault();
      const response = await fetch('http://localhost:5000/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: e.target.email.value,
          password:e.target.password.value
        }) 
      }) 
      const data = await response.json();
      if (data.data === "error"){
        setmsg(data.message) 
      } 
      else{ 
        setToken(data.data) 
        history.push('./post') 
      } 

    }catch(e){ 
      console.log(e) 
    } 
   }
    return (
    <div className="logincontainer">
    <div className="login">
    <div className="loginlogo">
        <h1 className="logininsta">Login</h1>
      </div>
      <div className="status">
          <h3 className="msg">{loginmsg}</h3>
        </div>
      <form onSubmit={e => login(e)}  className="form">
      <label className="email" >Email :</label>
      <input type="email" name="email" className="emailinput" ></input>
      <label className="password">Password :</label>
      <input type="password" name="password" className="passwordinput" ></input>
      <button type="submit" className="loginbtn">Login</button>
      </form>
      <div className="btn">
      <p className="sbtn">Don't have account ?</p><Link to={'./signup'}><p className="sup">signup</p></Link>
      </div>
    </div>   
    </div>
    ) 
  } 
export default  Login;
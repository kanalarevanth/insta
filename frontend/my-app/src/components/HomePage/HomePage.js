import './HomePage.css'
import {Link} from 'react-router-dom'
function HomePage() {
    return (
    <div className="HomePagecontainer">
    <div className="HomePage">
      <div className="logo">
        <h1 className="instalogo"><i class="fab fa-gg-circle"></i></h1>
        <h1 className="insta">Instaclone</h1>
      </div>
      <div className="LS"> 
        <Link to={'./login'}><button className="button">Login</button></Link>
        <Link to={'./SignUp'}><button className="button">SignUp</button></Link>
      </div>   
    </div>
    </div>
    ) 
  } 
export default  HomePage;
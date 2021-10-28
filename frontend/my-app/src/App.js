import './App.css'
// import HomePage from './components/HomePage/HomePage';
import Post from './components/Post/Post';
import login from './components/HomePage/login'
import signup from './components/HomePage/SignUp'
import createpost from './components/CreatePost/CreatePost'
import Landingpage from './components/LandingPage/LandingPage'
import userpost from './components/myposts/mypost'
import { BrowserRouter,Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/authentication/PrivateRout';
function App() {
  return(
    <BrowserRouter> 
    <div className="App" >
        <Switch> 
        <Route exact path="/" component={Landingpage} />
          {/* <Route exact path="/" component={HomePage} /> */}
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
          <PrivateRoute exact path="/post" component={Post}/>
          <Route exact path="/post/createpost" component={createpost}/>
          <PrivateRoute exact path="/post/userpost" component={userpost}/>
        </Switch> 
      </div>
      </BrowserRouter> 
)
}

export default App;

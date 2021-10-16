import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';
import keys from './key/accessKey';
import SignIn from './Components/Sign In/SignIn';
import SignUp from './Components/Sign Up/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Videos from './Components/Authentications/Authentication';


function App() {

  // const [videos, setVideos] = useState([])


  // useEffect(() => {
  //   axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=valorant&key=${keys.ytKey}`)
  //   .then(res => {
  //     setVideos(res.data)
  //   }) 
  // }, [])








  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

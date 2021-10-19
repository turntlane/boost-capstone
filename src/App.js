import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import SignIn from './Components/Sign In/SignIn';
import SignUp from './Components/Sign Up/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import SkillSelect from './Components/Skill Select/SkillSelect';
import ProfilePage from './Components/Profile Page/ProfilePage';



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
          <Route path='/skillselect' component={SkillSelect} />
          <Route path='/profilepage' component={ProfilePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

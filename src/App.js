
import './App.css';
import axios from 'axios';
import keys from './key/accessKey';
import SignIn from './Components/Sign In/SignIn';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {



  // const handleCall = () => {
  //   axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=valorant&key=${keys.ytKey}`)
  //   .then(res => {
  //     console.log(res.data)
  //   })  
  // }




  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={SignIn}/>
        </Switch>
      </Router>
        {/* <SignIn /> */}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../Firebase/firebase";
import NavBar from "../Nav Bar/NavBar";
import firebase from "firebase";
import Globe from "../Globe/Globe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";


function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard-container">
      <NavBar />
      <Globe />
      <div className='dashboard-main'>
        <h1 className='whatisboost'>What is Boost?</h1>
        {
          <Link className="boost-btn1 boost-dashboard-btn" to="/skillselect">
            Get Started
          </Link>
        }
                {
          <Link className="boost-btn2 boost-dashboard-btn" to="/profilepage">
            Profile Page
          </Link>
        }
                {
          <a href='#info' className="boost-btn3 boost-dashboard-btn">
            How it works
          </a>
        }
      </div>
      <a className='dashboard-anchor' href='#info'>{<FontAwesomeIcon size='4x' icon={faArrowDown} />}</a>

      <div id='info' className="dashboard-info-container">
        <p style={{textAlign: 'center'}}>
          Boost is an aid to help you reach your maximum potential. You have the
          ability to choose what skill to advance in. Whether it be a hobby or a
          skill you need at your job, Boost is here to help. Input your desired
          task and current skill level, and let Boost organize a unique set of
          informational videos catering to your desired needs.
        </p>
        <h1 className="dashboard-instructions">Instructions</h1>
        <ul className='instructions-container'>

          <li className='dashboard-list'> Select a skill you are looking to improve.</li>
          <li className='dashboard-list'>Select your current experience with desired skill.</li>
          <li className='dashboard-list'>Let Boost do the rest!</li>
        </ul>

      </div>
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../Firebase/firebase";
import NavBar from "../Nav Bar/NavBar";
import firebase from "firebase";
import Globe from "../Globe/Globe";

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
        {/* <div className="dashboard-header">Welcome, {name}!</div> */}
        {/* <button className="dashboard-btn" onClick={logout}>
          Logout
        </button> */}

        <div className='dashboard-img-container'>
        {/* <div className='dashboard-img'>
        <h1>Hello</h1>
          <img src='./images/milky-way.jpeg' alt='image' />
        </div>
        <div className='dashboard-img'>
        <h1>Hello</h1>
          <img src='./images/milky-way.jpeg' alt='image' />
        </div>
        <div className='dashboard-img'>
        <h1>Hello</h1>
          <img src='./images/milky-way.jpeg' alt='image' />
        </div> */}
        <Globe />

        </div>
        <div className='dashboard-info-container'>
        <h1>What is Boost?</h1>
        <p>
          Boost is an aid to help you reach your maximum potential. You have the
          ability to choose what skill to advance in. Whether it be a hobby or a
          skill you need at your job, Boost is here to help. Input your desired
          task and current skill level, and let Boost organize a unique set of
          informational videos catering to your desired needs.
        </p>
        </div>
          {<Link className="boost-dashboard-btn" to="/skillselect">Get Started</Link>}
      </div>
  );
}

export default Dashboard;
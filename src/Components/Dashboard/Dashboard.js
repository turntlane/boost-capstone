import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db, logout } from "../Firebase/firebase";

import Authentication from "../Authentications/Authentication";

function Dashboard() {
  const [videos, setVideos] = useState([])
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
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
    <div className="dashboard">
      <div className="dashboard-container">
        <div>Welcome, {name}!</div>
        <button className="dashboard-btn" onClick={logout}>
          Logout
        </button>
      </div>
        {/* <button onClick={Authentication}>Get data</button> */}
    </div>
  );
}

export default Dashboard
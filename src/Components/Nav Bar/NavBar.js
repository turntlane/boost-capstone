import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../Firebase/firebase";
import "./NavBar.css";
import ProfileDropDown from "../Profile Dropdown/ProfileDropDown";


function NavBar(props) {
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
    <nav>
      <Link className="nav-link" name={name} to="/dashboard">
        Home
      </Link>
      <Link className="nav-link" name={name} to="/skillselect">
        Skill Select
      </Link>
      <Link className="nav-link" to="/profilepage">
        Profile Page
      </Link>
      <p className="nav-name">
        {name}
      </p>
      {/* <button onClick={logout}>
          Logout
        </button> */}
      <ProfileDropDown
      />
    </nav>
  );
}

export default NavBar;

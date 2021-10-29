import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../Firebase/firebase";
import "./NavBar.css";
import ProfileDropDown from "../Profile Dropdown/ProfileDropDown";
import logo2 from "../../images/boostlogo4.svg";

function NavBar() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = query.docs[0].data();
      setName(data.name);
      setPhoto(data.photoURL);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName();
    updatePic();
  }, [user, loading]);

  const updatePic = async (pic) => {
    setPhoto(pic);
    try {
      await db.collection("users").doc(user.uid).update({
        photoURL: pic,
      });
      console.log(photo);
      console.log("it worked");
    } catch (err) {
      console.error(err);
    }
  };

  const setOpen = () => {
    setIsOpen(true)
  }



  return (
    <nav>
      <img className="nav-logo" src={logo2} alt="logo" />
      <Link className="nav-link" name={name} to="/dashboard">
        Home
      </Link>
      <Link className="nav-link" name={name} to="/skillselect">
        Skill Select
      </Link>
      <Link className="nav-link" to="/profilepage">
        Profile Page
      </Link>
      <p className="nav-name">{name}</p>
      <img onClick={setOpen} className="profile-pic" src={photo} alt="profile" />
      <ProfileDropDown logout={logout} />

      {isOpen ? (
        <div className='profilepic-container'>
        <input placeholder='Image Address Link' className='profilepic-input' onChange={(e) => updatePic(e.target.value)}></input>
        <button className='profilepic-submit' onClick={() => setIsOpen(false)}>Change Pic</button>
        </div>
      ) : null}
    </nav>
  );
}

export default NavBar;

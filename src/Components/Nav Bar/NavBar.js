import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../Firebase/firebase";
import "./NavBar.css";
import ProfileDropDown from "../Profile Dropdown/ProfileDropDown";
import logo2 from "../../images/boostlogo4.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

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
    } catch (err) {
      console.error(err);
    }
  };

  const setOpen = () => {
    setIsOpen(true);
  };

  return (
    <nav>
            <Link className="" name={name} to="/dashboard">
            <img className="nav-logo" src={logo2} alt="logo" />
      </Link>
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
      <img
        onClick={setOpen}
        className="profile-pic"
        src={photo}
        alt="profile"
      />
      <ProfileDropDown logout={logout} />

      {isOpen ? (
        <div className="profilepic-container">
          <input
            placeholder="Image Address Link"
            className="profilepic-input"
            onChange={(e) => updatePic(e.target.value)}
          ></input>
          <button
            className="profilepic-submit"
            onClick={() => setIsOpen(false)}
          >
            {<FontAwesomeIcon icon={faPlus} />}
          </button>
          {
            <FontAwesomeIcon
              onClick={() => setIsOpen(false)}
              className="profilepic-exit"
              size="3x"
              icon={faTimes}
            />
          }
        </div>
      ) : null}
    </nav>
  );
}

export default NavBar;

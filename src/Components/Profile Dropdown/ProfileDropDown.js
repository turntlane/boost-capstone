import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../Firebase/firebase";
import { Link } from "react-router-dom";

import "./ProfileDropDown.css";

function ProfileDropDown() {
  const [showMenu, setShowMenu] = useState("");

  const menu = () => {
    setShowMenu(true);
  };

  return (
    <>
    <div className="dropdown">
      {
        <FontAwesomeIcon
          onMouseOver={menu}
          className="dropbtn"
          icon={faCaretDown}
        />
      }

      {showMenu ? (
        <div className="dropdown-content">
          <Link className='nav-dashboard' to="/dashboard">Home</Link>
          <Link className='nav-dashboard' to="/skillselect">Skill Select</Link>
          <Link to="/profilepage">Profile Page</Link>
          <a onClick={logout}>Logout</a>
        </div>
      ) : null}


</div>


    </>
  );
}

export default ProfileDropDown;

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
          <Link to="/profilepage">Profile Page</Link>
          <a onClick={logout}>Logout</a>
        </div>
      ) : null}
    </div>
  );
}

export default ProfileDropDown;

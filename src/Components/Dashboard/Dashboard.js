import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import NavBar from "../Nav Bar/NavBar";
import Globe from "../Globe/Globe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <NavBar />
      <Globe />
      <div className="dashboard-main">
        <h1 className="whatisboost">What is Boost?</h1>
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
          <a href="#info" className="boost-btn3 boost-dashboard-btn">
            How it works
          </a>
        }
      </div>
      <a className="dashboard-anchor" href="#info">
        {<FontAwesomeIcon size="4x" icon={faArrowDown} />}
      </a>

      <div id="info" className="dashboard-info-container">
        <p style={{ textAlign: "center" }}>
          Boost is an aid to help you reach your maximum potential. You have the
          ability to choose what skill to advance in. Whether it be a hobby or a
          skill you need at your job, Boost is here to help. Input your desired
          task and current skill level, and let Boost organize a unique set of
          informational videos catering to your desired needs.
        </p>
        <h1 className="dashboard-instructions">Instructions</h1>
        <ul className="instructions-container">
          <li className="dashboard-list">
            {" "}
            Select a skill you are looking to improve.
          </li>
          <li className="dashboard-list">
            Select your current experience with desired skill.
          </li>
          <li className="dashboard-list">Let Boost do the rest!</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

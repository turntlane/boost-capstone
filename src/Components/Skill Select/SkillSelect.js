import React, { useState } from "react";
import "./SkillSelect.css";
import axios from "axios";
import { auth, db } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import NavBar from "../Nav Bar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

function SkillSelect() {
  const [value, setValue] = useState("");
  const [skill, setSkill] = useState("");
  const [videos, setVideos] = useState([]);
  const [user] = useAuthState(auth);
  const [maxResults, setMaxResults] = useState(6);
  const [isOn, setIsOn] = useState(false);
  const [newPageToken, setNewPageToken] = useState("");
  const [prevPageToken, setPrevPageToken] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [newPageWasClicked, setNewPageWasClicked] = useState(false);

  const handleSubmit = async () => {
    setIsOn(true);
    setSubmitClicked(true)
    try {
      await axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value} ${skill} tutorial&key=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          setVideos(res.data.items.map((item) => item.id.videoId));
          setNewPageToken(res.data.nextPageToken);
          setIsOn(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const newPage = async () => {
    setIsOn(true);
    try {
      await axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&pageToken=${newPageToken}&q=${value} ${skill} tutorial&key=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          setNewPageToken(res.data.nextPageToken);
          setPrevPageToken(res.data.prevPageToken);
          setVideos(res.data.items.map((item) => item.id.videoId));
          setIsOn(false);
        });
    } catch (err) {
      console.error(err);
    }
    setNewPageWasClicked(true);
  };

  const previousPage = async () => {
    setIsOn(true);
    try {
      await axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&pageToken=${prevPageToken}&q=${value} ${skill} tutorial&key=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          setPrevPageToken(res.data.prevPageToken);
          setVideos(res.data.items.map((item) => item.id.videoId));
          setIsOn(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const addVideos = async (user, videos) => {
    setIsOn(true);
    try {
      await db
        .collection("users")
        .doc(user.uid)
        .update({
          likedVideos: firebase.firestore.FieldValue.arrayUnion(videos),
        });
      setIsOn(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="skillselect-container">
      {isOn ? (
        <div
          className="loading-screen"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ClipLoader css={override} size={100} />
        </div>
      ) : (
        ""
      )}
      <NavBar />
      <div className="skillselect-select">
        <select
          className="skillselect-dropdown"
          onChange={(e) => setValue(e.target.value)}
        >
          <option className="skillselect-option" defaultValue="">
            Choose Skill Level
          </option>
          <option className="skillselect-option" value="Beginner">
            Beginner
          </option>
          <option className="skillselect-option" value="Intermediate">
            Intermediate
          </option>
          <option className="skillselect-option" value="Advanced">
            Advanced
          </option>
        </select>
        <input
          className="skillselect-input"
          placeholder="Skill"
          onChange={(e) => setSkill(e.target.value)}
        />
        <button className="skillselect-callbtn" onClick={handleSubmit}>
          <FontAwesomeIcon className="skillselect-search" color='black' icon={faSearch} />
        </button>
        <select
          className="skillselect-results"
          onChange={(e) => setMaxResults(e.target.value)}
        >
          <option defaultValue="">Results Per Page</option>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </div>
      <div style={!videos.length < 1 ? {padding: '0 5% 5% 5%'} : {padding: '0'}} className="skillselect-list-container">
        {videos.map((video, i) => (
          <div key={i}>
            <li className="skillselect-list" key={i}>
              <iframe
                key={i}
                className="skillselect-videos"
                title="video"
                src={`https://www.youtube.com/embed/${video}`}
              ></iframe>
            </li>
            <button
              className="skillselect-add-btn"
              onClick={() => addVideos(user, video)}
            >
              Add to favorites {<FontAwesomeIcon color='black' icon={faPlus} />}
            </button>
          </div>
        ))}
        {newPageWasClicked ? (
          <button className="skillselect-prevpage" onClick={previousPage}>
            {<FontAwesomeIcon size="2x" icon={faArrowLeft} />}
          </button>
        ) : null}
        {submitClicked ?
          <button className="skillselect-newpage" onClick={newPage}>
            {<FontAwesomeIcon size="2x" icon={faArrowRight} />}
          </button>
        : null}
      </div>
    </div>
  );
}

export default SkillSelect;

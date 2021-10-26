import React, { useState } from "react";
import "./SkillSelect.css";
import axios from "axios";
import keys from "../../key/accessKey";
import { auth, db, logout } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import NavBar from "../Nav Bar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const [isFetching, setIsFetching] = useState(false)

  const handleSubmit = async () => {
    setIsOn(true);
    setIsFetching(true)
    try {
      axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&pageToken=CBAQAA&q=${value} ${skill} tutorial&key=${keys.ytKey}`
      )
      .then((res) => {
        console.log(res.data)
        setVideos(res.data.items.map((item) => item.id.videoId));
        setIsOn(false);
      });
    } catch (err) {
      console.error(err)
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
          {isOn ? 
      <div className='loading-screen' style={{flex : 1, justifyContent: 'center', alignItems: 'center',}}>

        <ClipLoader  css={override} size={100} /> 
      </div>
      : ""}
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
            <FontAwesomeIcon className='skillselect-search' icon={faSearch} />
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
        <div className="skillselect-list-container">
        {videos.map((video, i) => (
              <div key={i}>
                <li className="skillselect-list" key={i}>
                  <iframe key={i}
                  className='skillselect-videos'
                    title="video"
                    src={`https://www.youtube.com/embed/${video}`}
                  ></iframe>
                </li>
                <button className='skillselect-add-btn' onClick={() => addVideos(user, video)}>Add to favorites {<FontAwesomeIcon icon={faPlus} />}</button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default SkillSelect;

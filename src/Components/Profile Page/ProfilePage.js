import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/firebase";
import firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import NavBar from "../Nav Bar/NavBar";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const back = css`
filter: drop-shadow(0 1rem 1.5rem blue);
`;



function ProfilePage() {
  const [user] = useAuthState(auth);
  const [videos, setVideos] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [items, setItems] = useState(9);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try { 
       db.collection("users")
        .where("uid", "==", user?.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setVideos(doc.data().likedVideos.map((video) => video));
          });
        });
    }
     catch (err) {
      console.error(err);
    }
  });


  const moreItems = async () => {
    if (items <= 9) {
      setIsOn(true);
      setItems(items.length);
      setExpanded(true);
      setIsOn(false);
    } else {
      setIsOn(true);
      setItems(9);
      setExpanded(false);
      setIsOn(false);
    }
  };

  const deleteData = async (user, videos) => {
    setIsOn(true);
    try {
      await db
        .collection("users")
        .doc(user.uid)
        .update({
          likedVideos: firebase.firestore.FieldValue.arrayRemove(videos),
        });
      setIsOn(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div
      style={videos.length <= 5 ? { height: "150vh" } : { height: "auto" }}
      className="profilepage-container"
    >
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
      <h1 className="profilepage-header">
        Favorites {<FontAwesomeIcon icon={faThumbsUp} />}
      </h1>
      <div className="profilepage-content">
        {videos.length < 1 ? <h1>List is empty</h1> : ""}
        {videos.slice(0, items).map((video, i) => (
          <div>
            <li className="profilepage-list" key={i}>
              <iframe
                allowFullScreen
                className="profilepage-videos"
                title="video"
                src={`https://www.youtube.com/embed/${video}`}
              ></iframe>
            </li>
            <button
              className="profilepage-deletebtn"
              onClick={() => deleteData(user, video)}
            >
              Delete from favorites {<FontAwesomeIcon color='black' icon={faTrashAlt} />}
            </button>
          </div>
        ))}
      </div>
      <div className="showmore-container">
        <button className="showmore" onClick={moreItems}>
          {expanded ? (
            <span className="showmore">
              Show Less {<FontAwesomeIcon color='black' icon={faArrowUp} />}
            </span>
          ) : (
            <span className="showmore">
              Show All {<FontAwesomeIcon color='black' icon={faArrowDown} />}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;

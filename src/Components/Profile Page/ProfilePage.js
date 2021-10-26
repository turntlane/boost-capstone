import React, {  useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../Firebase/firebase";
import firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import NavBar from "../Nav Bar/NavBar";
import './ProfilePage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faThumbsUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const override = css`
  postion: absolute;
  top: 0;
  border-color: green;
  color: green;
`;

function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [videos, setVideos] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [showMore, setShowMore] = useState(false)
  const [items, setItems] = useState(6)
  const [expanded, setExpanded] = useState(false)

  

  // const getData = async () => {
  //   await db
  //     .collection("users")
  //     .where("uid", "==", user?.uid)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.data().likedVideos.map((video) => video));

  //         setVideos(doc.data().likedVideos.map((video) => video));
  //       });
  //     });
  // };

  useEffect(() => {
    try {
      db
     .collection("users")
     .where("uid", "==", user?.uid)
     .get()
     .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         setVideos(doc.data().likedVideos.map((video) => video));
       });
     });
    }
    catch (err) {
      console.error(err)
    }
  },)

  const moreItems = async () => {
    setIsOn(true)
     if (items <= 6) {
      setItems(items.length)
      setExpanded(true)
    } else {
      setItems(6)
      setExpanded(false)
    }
      setIsOn(false);
  }

  const deleteData = async (user, videos) => {
    // setIsOn(true);
    try {
      await db
        .collection("users")
        .doc(user.uid)
        .update({
          likedVideos: firebase.firestore.FieldValue.arrayRemove(videos),
        });
          // setIsOn(false);
      // getData();
      console.log("deleted");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div style={videos.length < 5 ? {height: '100vh'} : {height: 'auto'}} className='profilepage-container'>
                {isOn ? 
      <div className='loading-screen' style={{flex : 1, justifyContent: 'center', alignItems: 'center',}}>

        <ClipLoader  css={override} size={100} /> 
      </div>
      : ""}
      <NavBar />
      <h1 className='profilepage-header'>Favorites {<FontAwesomeIcon icon={faThumbsUp} />}</h1>
      <div className='profilepage-content'>
      {videos.length < 1 ? <h1>List is empty</h1> : ''}
      {videos.slice(0, items).map((video, i) => (
        <div>
        <li className="profilepage-list" key={i}>
          <iframe
          allowFullScreen
          className='profilepage-videos'
            title="video"
            src={`https://www.youtube.com/embed/${video}`}
          ></iframe>
        </li>
          <button className='profilepage-deletebtn' onClick={() => deleteData(user, video)}>Delete from favorites {<FontAwesomeIcon icon={faTrashAlt} />}</button>
          </div>
      ))}

      </div>
        <div className='showmore-container'>

        <button className='showmore' onClick={moreItems}>
        {expanded ? <span className='showmore'>
          Show Less {<FontAwesomeIcon icon={faArrowUp} />}
        </span> :
        <span className='showmore'>
          Show All {<FontAwesomeIcon icon={faArrowDown} />}
        </span>
        }
      </button>

        </div>
    </div>
  );
}

export default ProfilePage;

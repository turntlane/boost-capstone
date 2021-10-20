import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../Firebase/firebase";
import firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
  postion: absolute;
  top: 0;
  border-color: green;
  color: green;
`;

function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [isOn, setIsOn] = useState(false);
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

  const getData = async () => {
    await db
      .collection("users")
      .where("uid", "==", user?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().likedVideos.map((video) => video));

          setVideos(doc.data().likedVideos.map((video) => video));
        });
      });
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
      getData();
      console.log("deleted");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="dashboard-header">Welcome, {name}!</div>
      <button onClick={logout}>Logout</button>
      <button onClick={getData}>get data</button>
      {videos.length < 1 ? <h1>List is empty</h1> : ''}
      {videos.map((video, i) => (
        <li className="skillselect-list" key={i}>
          <iframe
            title="video"
            src={`https://www.youtube.com/embed/${video}`}
          ></iframe>
          <button onClick={() => deleteData(user, video)}>-</button>
        </li>
      ))}
      {isOn ? <ClipLoader css={override} size={20} /> : ""}
      <Link to="skillselect">Skill Select</Link>
    </div>
  );
}

export default ProfilePage;

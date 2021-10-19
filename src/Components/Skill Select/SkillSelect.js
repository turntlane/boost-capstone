import React, { useEffect, useState } from "react";
import axios from "axios";
import keys from "../../key/accessKey";
import { auth, db, logout } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import firebase from "firebase";
import {Link} from 'react-router-dom'

function SkillSelect() {
  const [value, setValue] = useState("");
  const [skill, setSkill] = useState("");
  const [videos, setVideos] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
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

  const handleSubmit = async () => {
    await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${value} ${skill} tutorial&key=${keys.ytKey}`
      )
      .then((res) => {
        res.data.items.map((item) => console.log(item.id.videoId));
        setVideos(res.data.items.map((item) => item.id.videoId));
      });
  };

  const addVideos = async (user, videos) => {
    try {
      await db
        .collection("users")
        .doc(user.uid)
        .update({
          likedVideos: firebase.firestore.FieldValue.arrayUnion(videos),
        });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="dashboard-header">Welcome, {name}!</div>
      <button className="dashboard-btn" onClick={logout}>
        Logout
      </button>
      <select onChange={(e) => setValue(e.target.value)}>
        <option defaultValue="">Choose Skill Level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <input placeholder="Skill" onChange={(e) => setSkill(e.target.value)} />
      <button onClick={handleSubmit}>Get call</button>
      {videos.map((video, i) => (
        <li className="skillselect-list" key={i}>
          <iframe
            title="video"
            src={`https://www.youtube.com/embed/${video}`}
          ></iframe>
          <button onClick={() => addVideos(user, { video })}>+</button>
        </li>
      ))}
      <Link to='profilepage'>Profile Page</Link>
    </div>
  );
}

export default SkillSelect;

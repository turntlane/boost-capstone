import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../Firebase/firebase";

function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const [videos, setVideos] = useState([]);

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
          console.log(doc.data().likedVideos.map((video) => video.video));

          setVideos(doc.data().likedVideos.map((video) => video.video));
        });
      });
  };

  return (
    <div>
      <div className="dashboard-header">Welcome, {name}!</div>
      <button onClick={logout}>Logout</button>
      <button onClick={getData}>get data</button>
      {videos.map((video, i) => (
        <li className="skillselect-list" key={i}>
          <iframe
            title="video"
            src={`https://www.youtube.com/embed/${video}`}
          ></iframe>
        </li>
      ))}
      <Link to="skillselect">Skill Select</Link>
    </div>
  );
}

export default ProfilePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import keys from "../../key/accessKey";
import { auth, db, logout } from "../Firebase/firebase";



function SkillSelect(props) {
  const [value, setValue] = useState("");
  const [skill, setSkill] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSubmit = async () => {
    await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${value} ${skill} tutorial&key=${keys.ytKey}`
      )
      .then((res) => {
        // console.log(res.data.items)
        res.data.items.map(item => console.log(item.id.videoId))
        setVideos(res.data.items.map(item => item.id.videoId))
        // setVideos(res.data.items[0].snippet.thumbnails.default.url);
        // setVideos(res.data.items.id.videoId)
      });
  };

  return (
    <div>
        <div  className="dashboard-header">Welcome, {db.name}!</div>
      <select
        value="Current Skill Level"
        onChange={(e) => setValue(e.target.value)}
      >
        <option defaultValue="">Choose Skill Level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <h2>{value}</h2>

      <input placeholder="Skill" onChange={(e) => setSkill(e.target.value)} />
      <button onClick={handleSubmit}>Get call</button>
      {/* <iframe src={`https://www.youtube.com/embed/${videos}`}></iframe> */}
      {videos.map((video, i) => 
      <li key={i}>
        <iframe src={`https://www.youtube.com/embed/${video}`}></iframe>
      </li>
        // <iframe key={video.videoId} src={`https://www.youtube.com/embed/${videos}`}></iframe>

        )}
    </div>
  );
}

export default SkillSelect;

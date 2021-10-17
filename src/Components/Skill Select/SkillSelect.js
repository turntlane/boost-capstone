import React, { useEffect, useState } from "react";
import axios from "axios";
import keys from "../../key/accessKey";
function SkillSelect(props) {
  const [value, setValue] = useState("");
  const [skill, setSkill] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSubmit = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${value} ${skill} tutorial&key=${keys.ytKey}`
      )
      .then((res) => {
        setVideos(res.data.items[0].snippet.title);
      });
  };

  return (
    <div>
        <div  className="dashboard-header">Welcome, {props.name}!</div>
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
      <h1>{videos}</h1>
    </div>
  );
}

export default SkillSelect;

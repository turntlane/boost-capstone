// import React, { useEffect, useState } from "react";
// import keys from "../../key/accessKey";
// import AddVideo from "../Add Video Button/AddVideo";
// import axios from "axios";

// function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [maxResults, setMaxResults] = useState(5);
//   const [value, setValue] = useState("");
//   const [skill, setSkill] = useState("");

//   const handleSubmit = async () => {
//     axios
//       .get(
//         `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value} ${skill} tutorial&key=${keys.ytKey}`
//       )
//       .then((res) => {
//         res.data.items.map((item) => console.log(item.id.videoId));
//         setVideos(res.data.items.map((item) => item.id.videoId));
//       });
//   };

//   return (
//     <div>
//       <select onChange={(e) => setValue(e.target.value)}>
//         <option defaultValue="">Choose Skill Level</option>
//         <option value="Beginner">Beginner</option>
//         <option value="Intermediate">Intermediate</option>
//         <option value="Advanced">Advanced</option>
//       </select>
//       <select onChange={(e) => setMaxResults(e.target.value)}>
//         <option defaultValue="">Results Per Page</option>
//         <option value="5">5</option>
//         <option value="10">10</option>
//         <option value="15">15</option>
//       </select>
//       <input placeholder="Skill" onChange={(e) => setSkill(e.target.value)} />
//       <button onClick={handleSubmit}>Get call</button>
//       {videos.map((video, i) => (
//         <li className="skillselect-list" key={i}>
//           <iframe
//             title="video"
//             src={`https://www.youtube.com/embed/${video}`}
//           ></iframe>
//           {/* <button
//             onClick={() => addVideos(user, video)}
//           >
//             +
//           </button> */}
//       <AddVideo key={i} videos={videos} video={video} setvideos={setVideos} />
//         </li>
//       ))}
//     </div>
//   );
// }

// export default VideoList;

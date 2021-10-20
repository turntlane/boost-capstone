// import { CircleLoader } from "react-spinners";
// import React, { useEffect, useState } from "react";
// import { auth, db } from "../Firebase/firebase";
// import firebase from "firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useHistory } from "react-router";

// function AddVideo(props) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [user, loading] = useAuthState(auth);
//   const history = useHistory();

//     const { videos, setVideos } = props;

//   const fetchUserName = async () => {
//     try {
//       await db
//         .collection("users")
//         .where("uid", "==", user?.uid)
//         .get();
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching user data");
//     }
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (!user) return history.replace("/");
//     fetchUserName();
//   }, [user, loading]);

//   const addVideos = async (user, videos) => {
//     try {
//       await db
//         .collection("users")
//         .doc(user.uid)
//         .update({
//           likedVideos: firebase.firestore.FieldValue.arrayUnion(videos),
//         });
//       console.log("hello");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   return (
//     <div>
//       <button setvideos={setVideos} onClick={() => addVideos(user, video)}>
//         +
//       </button>
//     </div>
//   );
// }

// export default AddVideo;

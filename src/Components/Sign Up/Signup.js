import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase/firebase";
import "./Signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) {
      alert("Please enter name");
    }
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign up for Boost.</h1>
        <input
          className="signup-firstname signup-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
        />
        <input
          className="signup-email signup-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="signup-password signup-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={register} className="signup-btn signup-submit">
          Sign Up
        </button>
        <button className="signup-google signup-submit" onClick={signInWithGoogle}>
          Sign up with Google
        </button>
        <p className="signup-signin">
          Already have an account?
          <Link className="signup-link" to="/">
            {" "}
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

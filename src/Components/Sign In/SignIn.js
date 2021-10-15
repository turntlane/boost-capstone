import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div className="signin-container">
      <div className="signin-content">
        <form className="signin-form" action="">
          <h2>Sign in to enjoy Boost.</h2>
          <input
            className="signin-username signin-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signin-password signin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="signin-btn signin-input"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Sign In
          </button>
          <button
            className="signin-google signin-input"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
          <p>
            Dont have an account?
            <Link to="/Signup">Sign up</Link>
          </p>
        </form>

        <div className="signin-logo-container">
          <div className="signin-logo">Boost</div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

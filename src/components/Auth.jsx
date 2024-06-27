import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email)

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div>
        <label>Email</label>
        <input
          value={email}
          type="email"
          placeholder="enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>password</label>
        <input
          value={password}
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={signIn}>
          Login
        </button>
        <button type="button" onClick={logout}>
          Log out
        </button>
      </div>
      <div>
        <button type="button" onClick={signInWithGoogle}>
          sign in with google
        </button>
      </div>
    </div>
  );
}

export default Auth;

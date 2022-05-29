import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../../firebase";
import "./index.css";

function Index() {
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    } else return true;
  }

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setLoading(false);
        console.log(res);
        history.push("/");
        // return (
        //   <>

        //   </>
        // );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSignIn = async(e) => 
  {
    e.preventDefault();
    setError();
    console.log('In ssignIn button'+ email + password);
    setLoading(true);
    if (email === "" || password === "") {
      console.log("empty email");
      setError("Required field is missing");
      setLoading(false);
    } else if (!validateEmail(email)) {
      console.log("invalid email");
      setError("Email is malformed");
      setLoading(false);
    } else {
      const check = await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
          setLoading(false);
        });
        console.log(check);
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    setError("");
    setLoading(false);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing.");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
     await createUserWithEmailAndPassword(auth, email, password)
        .then( (res) => {
         let user= auth.currentUser;

          // Passing user's object as first param and updating it
            updateProfile(user, {
              'displayName': username,
          })
          console.log(res);
         setRegister(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <p>Add another way to log in using any of the following services. </p>
        <div className="sign-options">
          <div onClick={handleGoogleSignIN} className="single-option">
            <img
              alt="google"
              src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-teams-slug.flaticon.com%2Fgoogle.jpg&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Fauthors%2Fgoogle&tbnid=r7jpcM1WRW_P8M&vet=12ahUKEwioq5ryqPD3AhX7k9gFHQWmDKEQMygBegUIARDeAQ..i&docid=KKReSPDy_9t4xM&w=300&h=300&q=google%20icon&ved=2ahUKEwioq5ryqPD3AhX7k9gFHQWmDKEQMygBegUIARDeAQ"
            />
            <p>{loading ? "Signing in..." : "Login with Google"}</p>
          </div>
          <div className="single-option">
            <img
              alt="github"
              src="https://image.flaticon.com/icons/png/512/270/270798.png"
            />
            <p>Login with Github</p>
          </div>
          <div className="single-option">
            <img
              alt="facebook"
              src="https://image.flaticon.com/icons/png/512/733/733547.png"
            />
            <p>Login with Facebook</p>
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                {" "}
                <div className="input-field">
                  <p>Username</p>
                  <input
                  name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                  name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                  name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input type="text"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   name="email"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input type="password"
                   value={password}
                   name="password"
                   onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            )}

            <p
              onClick={() => setRegister(!register)}
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#0095ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {register ? "Login" : "Register"} ?
            </p>
          </div>
        </div>
        {error !== "" && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Index;
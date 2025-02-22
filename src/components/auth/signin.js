import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import logo from "../../img/logo.png";

import { auth, db } from "../../firebase/firebase";

function SignIn() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  let navigate = useNavigate();
  function goToLogin() {
    navigate("/login");
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    if (name && username && phone && email && pass && confirmPass) {
      if (pass === confirmPass) {
        auth
          .createUserWithEmailAndPassword(email, pass)
          .then((res) => {
            if (res) {
              db.collection("users").doc(res.user.uid).set({
                uid: res.user.uid,
                name: name,
                username: username,
                email: email,
                phone: phone,
                profilePhoto:
                  "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
                dateJoined: firebase.firestore.FieldValue.serverTimestamp(),
                location: "",
                address,
                dob: "",
              });
            }
          })
          .then(() => {
            goToLogin();
          })
          .catch((er) => {
            console.log(er);
            alert(er);
          });
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Enter all the fields");
    }
  };

  return (
    <div className="loginSignin">
      <div
        className="ls__left"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/home">
            <img src={logo} style={{height: "100px", width:"130px"}} alt="logo" />
        </Link>
      </div>
      <div className="ls__right">
        <div className="ls__right_container">
          <form className="loginSignin__form" onSubmit={handleOnClick}>
            <h1>Register</h1>
            <div className="ls_input_row">
              <div className="ls_input_container">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="ls_input"
                />
              </div>
              <div className="ls_input_container">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="ls_input"
                />
              </div>
            </div>
            <div className="ls_input_row">
              <div className="ls_input_container">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="ls_input"
                />
              </div>
              <div className="ls_input_container">
                <label>Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="Phone"
                  className="ls_input"
                />
              </div>
            </div>
            <div className="ls_input_row">
              <div className="ls_input_container">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="ls_input"
                />
              </div>
            </div>
            <div className="ls_input_row">
              <div className="ls_input_container">
                <label>Password</label>
                <input
                  type="password"
                  value={pass}
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                  className="ls_input"
                />
              </div>
              <div className="ls_input_container">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="ls_input"
                />
              </div>
            </div>

            <div className="ls_input_submit">
              <button type="submit">Create Account</button>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

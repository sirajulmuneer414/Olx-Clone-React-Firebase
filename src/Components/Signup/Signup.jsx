import React, { useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { collection, addDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { app, firestore } = useContext(FirebaseContext)
  const auth = getAuth();
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault();

    if (username === '' || username.trim === '') {
      setError(true);
      setErrorMessage('Username should not be empty')
      return;
    }
    else if (email === '' || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setError(true);
      setErrorMessage('email should be valid')
      return;
    }
    else if (phoneNumber.length !== 10) {
      setError(true);
      setErrorMessage('Phone Number should be valid')
      return;
    }
    else if (password.length < 6 || password.length > 20) {
      setError(true);
      setErrorMessage('password should be valid')
      return;
    }
    else {
      setError(false)
    }

    console.log(app)
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile(result.user, { displayName: username }).then(() => {
        try {
          const docRef = addDoc(collection(firestore, "users"), {
            id: result.user.uid,
            username: username,
            phone: phoneNumber
          });
          console.log("Document written with ID: ", docRef.id);
          navigate('/login')
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
    })
  }

  return (
    <div>
      {error && <div className='errorBox'>{errorMessage}</div>}
      <div className="signupParentDiv">
        <Link to={'/'}><img width="200px" height="200px" src={Logo}></img></Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          ></input>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <Link to={'/login'} style={{ textDecoration: 'none' }}>Login</Link>
      </div>
    </div>
  );
}

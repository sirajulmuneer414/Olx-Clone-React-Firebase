import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { app, firestore } = useContext(FirebaseContext)
  const auth = getAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '' || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setError(true);
      setErrorMessage('email should be valid')
      return;
    } else if (password.length < 6 || password.length > 20) {
      setError(true);
      setErrorMessage('password should be valid')
      return;
    }
    else {
      setError(false)
    }
    signInWithEmailAndPassword(auth, email, password).then((credentials) => {


      alert('User LoggedIn')
      navigate('/')
    }).catch((err) => {
      alert(err.message)
    })

  }

  return (
    <div>
      {error && <div className='errorBox'>{errorMessage}</div>}
      <div className="loginParentDiv">
        <Link to={'/'}><img width="200px" height="200px" src={Logo}></img></Link>
        <form onSubmit={handleLogin}>
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
          <button>Login</button>
        </form>
        <Link to={'/signup'} style={{ textDecoration: 'none' }}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;

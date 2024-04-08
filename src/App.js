import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import View from './Pages/ViewPost'
import Create from './Pages/Create'
import { AuthContext } from './store/Context';
import Post from './store/PostContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function App() {

  const { setUser } = useContext(AuthContext)
  const auth = getAuth()

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  })
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route exact path='/' Component={Home}>
            </Route>
            <Route path='/signup' Component={Signup}>
            </Route>
            <Route path='/login' Component={Login}>
            </Route>
            <Route path='/create' Component={Create}>
            </Route>
            <Route path='/view' Component={View}>
            </Route>
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;

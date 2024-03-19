import React from 'react'
import { BrowserRouter as Router, Route,Routes,Link } from 'react-router-dom'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import Login from './pages/Login'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import UserLiked from './pages/UserLiked'

function App() {
  return (
    <Router>

    <Routes>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/signup' element={<Signup />}/>
        <Route exact path='/player' element={<Player />}/>
        <Route exact path='/movies' element={<Movies />}/>
        <Route exact path='/tv' element={<TvShows />}/>
        <Route exact path='/mylist' element={<UserLiked />}/>
        <Route exact path='/' element={<Netflix />}/>
    </Routes>
    </Router>
  )
}

export default App

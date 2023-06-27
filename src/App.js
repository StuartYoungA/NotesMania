import './App.css';
import React, { Component,useEffect,useState } from 'react'
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoteState from "./Context/Notes/NoteState"
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
   
        <NoteState>                                   {/*    //now each component will have access to context  */}

      <BrowserRouter>
        <Navbar />
        <div className="container">
        <Routes>

        <Route exact path='/' element={<Home/>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>} />

        </Routes>
        </div>
      </BrowserRouter>
      
      </NoteState> 
      
    </>
  );
}

export default App;

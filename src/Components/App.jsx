import React, { useContext } from "react";
import {  BrowserRouter as Router,  Routes, Route,  Navigate,} from "react-router-dom";
import { AuthContext } from "../Context-authentication/AuthContext";


import "react-lazy-load-image-component/src/effects/blur.css";
import Explore from "../Pages/Explore";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import Post from "../Pages/Post"; 


const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RequireAuth> <Home /></RequireAuth>} />
          <Route path="/explore"element={<RequireAuth> <Explore /></RequireAuth> }/>
          <Route path="/:username" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />  
          <Route path="/p/:id" element={<Post />} />
          </Routes>     
      </Router>
      </>
  );   
};       
      

  
       

          
               
         
     
      
         
      


export default App;

import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Review,Login} from "./pages";
/*
When it's time, we can do:
import { Home, Page1, Page2, Page 3 } from "./pages";
 */

const App = () => {
    return (
    <Router>
    
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="review" element={<Review />} />
      </Routes>
    </Router>
    )
}

export default App;
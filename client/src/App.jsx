import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home} from "./pages";
/*
When it's time, we can do:
import { Home, Page1, Page2, Page 3 } from "./pages";
 */

const App = () => {
    return (
    <Router>
      
      
      
      <div className="bg">
      <Routes>
        <Route path="/" /*element={<Layout />}*/>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
      </div>
      {/*<div className="footer">
      <Footer />
    </div>*/}
    </Router>
    )
}

export default App;
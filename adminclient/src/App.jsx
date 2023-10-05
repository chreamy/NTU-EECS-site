import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Protected,Header} from './components';
import {Review,Log,Login,Create,Page403,Home,Details,Edit,Users} from "./pages";
/*
When it's time, we can do:
import { Home, Page1, Page2, Page 3 } from "./pages";
 */

const App = () => {
  const logout =()=>{
  localStorage.removeItem('user')
  window.location.replace('/login');
}
    return (
      
    <Router>
    
      <Routes>
      <Route path="/403" element={<Page403 />} />
      <Route path='/review'
         element={
           <Protected minauth={2}>
            <Header/>
             <Review />
           </Protected>
         }
       />
       <Route path='/log'
         element={
           <Protected minauth={2}>
            <Header/>
             <Log />
           </Protected>
         }
       />
       <Route path="/review/:id" element={
           <Protected minauth={2}>
            <Header/>
             <Details />
           </Protected>
         }/>
         <Route path="/edit/:id" element={
           <Protected minauth={2}>
            <Header/>
             <Edit />
           </Protected>
         }/>
       <Route path='/create'
         element={
           <Protected minauth={2}>
            <Header/>
             <Create />
           </Protected>
         }
       />
       <Route path='/users'
         element={
           <Protected minauth={0}>
            <Header/>
             <Users />
           </Protected>
         }
       />
       <Route path='/'
         element={
           <Protected minauth={3}>
            <Header/>
             <Home />
           </Protected>
         }
       />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    )
}

export default App;
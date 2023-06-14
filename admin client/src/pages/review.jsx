import React, { useState,Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import './style.css'
import { Container, Grid,Divider } from '@mui/material';
export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {posts:[]};
  } 
  async updatePosts(){
    const storage = await JSON.parse(localStorage.getItem('user'))
    const token = storage.token
    await axios.get('http://localhost:8080/post',{headers: {Authorization : `Bearer ${token}`}})
        .then((res) =>{
          this.setState({
            posts:res.data
          })
        }).catch(err=>{console.log(err.response||err)})
  }
  getPosts() {
    console.log('get')
    return this.state.posts
  }
  componentDidMount(){
    this.updatePosts()
  }
  render(){
  return (
    <div className='bg-dark text-white pb-5 '>
      <div className='d-flex mb-3 pt-2 justify-content-center container'><h1>Review Posts Dashboard</h1></div>
      <div className='d-flex container row justify-content-center'>
        {this.getPosts().length!=0? this.getPosts().map((post) => (
          <div key={post._id} className='col-3 bg-white text-dark rounded m-2 postreview'>
          <div className='justify-content-center d-flex'><h1>{post.title}</h1></div>
          <div className='justify-content-center d-flex'><h2>Author:{post.author}</h2></div>
          </div>
      )):<div><h1 style={{fontSize:'200px'}}>403</h1><h1 style={{fontSize:'50px'}}>You don't have access to this page</h1></div>}</div></div>
    
  )}
}

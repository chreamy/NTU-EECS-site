import { useState } from "react"
import axios from "axios"
import "./style.css"
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errmsg, setErr] = useState('')
  function login(username, password){
    axios.post('http://localhost:8080/user/login',{username:username,password:password}).then(async res=>{
       console.log(res)
       if (res.status==200) {
        const user = await JSON.stringify(res.data)
        await localStorage.setItem('user', user)
        const json = await JSON.parse(localStorage.getItem('user'))
        console.log(json)
        window.location.href = '/review';
    }}).catch(async err=>{setErr(err.response.data);})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Username:</label>
      <input 
        type="username" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button>Log in</button>
      {errmsg?<label style={{color:'red'}}>{errmsg}</label>:<></>}
    </form>
  )
}

export default Login
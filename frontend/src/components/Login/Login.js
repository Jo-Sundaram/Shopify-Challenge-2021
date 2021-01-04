import React, { useEffect, useState } from "react";
import {ENDPOINT} from "../../constants.js";
import axios from 'axios';

const Login = () => {

  const [user,setUser] = useState({email:" ", password: " ", name: " "});

  const onSetUser=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }
  
  const onRegister = (e) => {
    axios({
      method: 'post',
      url: ENDPOINT.USERS+'/register', 
      data: user
     })
    .then((res) => {

        if(res.status===200){
          alert("You can now log in");
        }
    })
    .catch((err) => {
        console.log("???");
        console.error(err);
        alert("Error registering please try again");
    });
  };


  const onLogin= (e)=>{
    axios({
      method: 'post',
      url: ENDPOINT.USERS+'/login', 
      data: user
   
    }).then((res) => {
        if(res.status===200){
          localStorage.setItem('token', res.data.token);
          window.location = "/Upload"
        }
    })
    .catch((err) => {
        alert("Error logging in please try again");
    });
  }


  const onLogout=(e)=>{
    axios({
      method: 'post',
      url: ENDPOINT.USERS+'/logout', 
      data: user,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
     }).then((res) => {
          if(res.status===200){
            localStorage.removeItem('token');
          }
      
          alert("Successfully logged out");

      })
      .catch((err) => {
          console.error(err);
          alert("Error logging out, or you are already logged out");
      });
  }


  return <main id="mainContent">
    <div className="container">
      <div className="row justify-content-center mt-5 p-0">
        <h3>Login / Register</h3>
      </div>
      <form onSubmit={onLogin}>

            <div className="formgroup">
                <label className="text"><b>Name</b></label><br></br>
                <input name="name" type="name" class="logregfield" placeholder="Enter Name" onChange={onSetUser}></input>
            </div>
            
            <div className="formgroup">
                <label className="text"><b>Email</b></label><br></br>
                <input name="email" type="email" class="logregfield" placeholder="Enter Email" onChange={onSetUser}></input>
            </div>

            <div className="formgroup">
                <label className="text"><b>Password</b></label><br></br>
                <input name = "password" type="password" class="logregfield" placeholder="Enter Password" onChange={onSetUser}></input>
            </div>

            <input type="submit" class="submitform" value='Login'></input>
          </form>
        <button onClick = {onRegister}>Register</button>
      <button onClick = {onLogout}>Logout</button>
    </div>
  </main>;
}
export default Login;

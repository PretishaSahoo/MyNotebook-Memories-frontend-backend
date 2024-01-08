import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const buttonStyle = {
    background: '#FF6F61' ,
    color: 'white', // Text color
    padding: '10px 20px', // Adjust padding as needed
    borderRadius: '8px', // Rounded border radius
    cursor: 'pointer', // Cursor pointer on hover
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    border: 'none', // Remove border
    outline: 'none', // Remove outline on focus
  };

  const [formData, setformData] = useState({name:"",email:"",password:"",cpassword:""})

  const navigate = useNavigate();

  const redirect=()=>{
    navigate("/");
  }


  const handleOnChange=(e)=>{
  setformData({...formData, [e.target.name]:e.target.value,} )
  }

  const handleSubmit=async(e)=>{

    e.preventDefault();
    const {name,email,password,cpassword}=formData

    try {
      if (cpassword!==password){
        props.showAlert("Password does not match!", "warning")
        return;
      }
      const response= await fetch('http://localhost:5000/api/auth/createuser', 
        {method: 'POST',
         headers:{
          "Content-Type":'application/json',
         },
         body:JSON.stringify({name,email,password})
        }
      )

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        // save the authtoken
        localStorage.setItem('token', json.authtoken);
        // redirect
        redirect();
        props.showAlert("Account created successfully!","success")
      } 
      
      else{
        props.showAlert("Invalid credentials", "danger" )
      }
      
      
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  }

  return (
    <div className= "d-flex justify-content-center align-items-center vh-100" style={{ background : 'linear-gradient(to right, #ffe4e1, #ffffff)'}}>
      <form className="container my-4" style={{width:"35rem",backgroundColor:"white", padding:"10vh" ,borderRadius:"4%"}} onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 fst-normal">Signup</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control "
            id="name"
            name="name"
            placeholder="Your Name"
            onChange={handleOnChange}
            style={{background:"transparent",border:"none"}}
          />
          <hr />
          <label htmlFor="floatingInput">User Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control "
            id="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleOnChange}
            style={{background:"transparent",border:"none"}}
          />
          <hr />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            style={{background:"transparent", border:"none"}}
          />
          <hr />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Password"
            onChange={handleOnChange}
            style={{background:"transparent",border:"none"}}
          />
          <hr />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <button className="btn  w-100 py-2 my-3"  style={buttonStyle} type="submit">
          Signup
        </button>
      </form>
    </div>
  )
}

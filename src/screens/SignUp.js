import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function () {
  let navigate=useNavigate();
    const [credential,setcredential]=useState({
        name:"",
        email:"",
        password:"",
        location:""
    })
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch("http://localhost:5000/api/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password,location:credential.location})});
            const json_data=await res.json();
            console.log(json_data);
            if(!json_data.success)
            {
                alert("Enter valid Credentials");
            }
            else
            {
              localStorage.setItem("authtoken",json_data.authtoken);
              navigate("/login");
            }
    }
    const on_change=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className='container'>
    <form onSubmit={handlesubmit}>
    <div className="form-group mb-3">
    <label htmlFor="username">Name</label>
    <input type="text" className="form-control" id="username" placeholder="Enter username" value={credential.name} name="name" onChange={on_change}/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name='email' value={credential.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={on_change}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} placeholder="Enter Password" onChange={on_change}/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="address">Address</label>
    <input type="text" className="form-control" id="address" name='location' value={credential.location} placeholder="Enter Address" onChange={on_change}/>
  </div>
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
</form>
</div>
    </>
  )
}

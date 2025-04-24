import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
export default function Login() {
  const [credential,setcredential]=useState({
          email:"",
          password:""
      })
  let navigate=useNavigate();
      const handlesubmit=async(e)=>{
          e.preventDefault();
          const res=await fetch("http://localhost:5000/api/loginuser",{
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({email:credential.email,password:credential.password})});
              const json_data=await res.json();
              console.log(json_data);
              if(!json_data.success)
              {
                  alert("Enter valid Credentials");
              }
              if(json_data.success)
              {
                localStorage.setItem("useremail",credential.email);
                localStorage.setItem("authtoken",json_data.authtoken);
                console.log(localStorage.getItem("authtoken"));
                navigate("/");
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
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" name='email' value={credential.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={on_change}/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} placeholder="Enter Password" onChange={on_change}/>
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
      <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user!</Link>
    </form>
    </div>
    </>
  )
}

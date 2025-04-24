import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './Contextreducer'
export default function Navbar() 
{
  let data=useCart();
  const [cartview,setcartview]=useState(false);
  const reqnavigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem("authtoken");
    reqnavigate("/login");
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{"height":"60px"}}>
  <div className="container-fluid">
    <Link className="navbar-brand fs-2 fst-italic fw-bold" to="/">FoodOnWay</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authtoken"))?
        <li className="nav-item">
        <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
      </li>:""}
      </ul>
      {(!localStorage.getItem("authtoken"))?
      <div className='d-flex'>
          <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
      </div>:
      <div>
      <div className="btn bg-white text-success mx-1" onClick={()=>{setcartview(true)}}>
        My Cart {" "}
        <Badge pill bg="danger">{data.length}</Badge>
      </div>
      {cartview? <Modal onClose={()=>{setcartview(false)}}><Cart /></Modal>:""}
      <div className="btn bg-white text-danger mx-1" onClick={handlelogout}>Logout</div>
      </div>}
    </div>
  </div>
</nav>
    </div>
  )
}

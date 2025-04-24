import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'
export default function Home() {
  const [search,setsearch]=useState("");
  const [foodcart,setfoodcart]=useState([]);
  const [fooditem,setfooditem]=useState([]);
  const loaddata=async()=>{
    let res=await fetch("http://localhost:5000/api/fooddata",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      }
    });
    res=await res.json();
    setfooditem(res[0]);
    setfoodcart(res[1]);
    // console.log(res[0],res[1]);
  }
  useEffect(()=>{
    loaddata();
  },[])
  return (
    <div>
        <div><Navbar/></div>
        <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner">
        <div className='carousel-caption' style={{"z-index":"10"}}>
        <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
        setsearch(e.target.value);
      }}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
        </div>
      <div className="carousel-item active">
        <img src="/burger.jpg" className="d-block w-100" alt="..." style={{filter:"brightness(30%)",width:"900px", height:"500px"}}/>
      </div>
      <div className="carousel-item">
        <img src="/cake.jpg" className="d-block w-100" alt="..." style={{filter:"brightness(30%)",width:"900px", height:"500px"}}/>
      </div>
      <div className="carousel-item">
        <img src="/pizza.jpg" className="d-block w-100" alt="..." style={{filter:"brightness(30%)",width:"900px", height:"500px"}}/>
      </div>
      <div className="carousel-item">
        <img src="/pannertikka.jpg" className="d-block w-100" alt="..." style={{filter:"brightness(30%)",width:"900px", height:"500px"}}/>
      </div>
      <div className="carousel-item">
        <img src="/biryani.jpg" className="d-block w-100" alt="..." style={{filter:"brightness(30%)",width:"900px", height:"500px"}}/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div></div>
        <div className='container'>
          {
            foodcart.length!==0?foodcart.map((data)=>{
              return(
              <div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
              <hr/>
              {fooditem.length!==0?fooditem.filter((item)=>item.CategoryName===data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
              .map(filteritem=>{
                return(
                  <div key={filteritem._id} className='ms-5 col-12 col-md-6 col-lg-3'>
                    <Card fooditems={filteritem} options={filteritem.options[0]}/>
                  </div>
                )
              })
              :<div>No data found</div>}
              </div>
              )
            })
            :""
          }
        </div>
        <div><Footer/></div>
    </div>
  )
}

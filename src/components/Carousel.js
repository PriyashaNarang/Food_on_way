import React from 'react'

export default function Carousel() {
  return (
    <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner">
        <div className='carousel-caption' style={{"z-index":"10"}}>
        <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
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
  )
}

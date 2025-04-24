import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
export default function MyOrders() {
    const [orderData, setorderData] = useState({})
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('useremail'))
        await fetch("http://localhost:5000/api/myorderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('useremail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })}
        useEffect(() => {
            fetchMyOrder()
        }, [])
  return (
    <>
    <div>
        <div>
            <Navbar />
        </div>
        <div className='container'>
            <div className='row'>
                {orderData.length!==0 ? Array(orderData).map(data => {
                    return (
                        data.orderData ?
                                data.orderData.order_lst.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Orderdate ? <div className='m-auto mt-5'>
                                                        {data = arrayData.Orderdate}
                                                        <hr />
                                                    </div> :
                                                    <div className='col-12 col-md-6 col-lg-3' >
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                            <div className="card-body">
                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>{arrayData.qty}</span>
                                                                    <span className='m-1'>{arrayData.size}</span>
                                                                    <span className='m-1'>{data}</span>
                                                                    <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            )
                                        })
                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    </>
  )
}

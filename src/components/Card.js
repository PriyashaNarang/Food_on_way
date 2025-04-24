import React, { useEffect, useRef, useState } from 'react'
import { useCart,useDispatch } from './Contextreducer';
export default function Card(props) {
  let data=useCart();
  let dispatch=useDispatch();
  let options=props.options;
  const priceRef=useRef();
  let priceoptions=Object.keys(options);
  const [qty,setqty]=useState(1);
  const [size,setsize]=useState("");
  const handleaddtocart=async()=>{
    let food = []
    for (const item of data) {
      if (item.id === props.fooditems._id) {
        food = item;
        break;
      }
    }
    if(food.length!==0)
    {
      if(food.size===size)
      {
        await dispatch({type:"UPDATE",id:props.fooditems._id,price:finalPrice,qty:qty})
        return
      }
      else if(food.size!==size)
      {
        await dispatch({type:"ADD",id:props.fooditems._id,name:props.fooditems.name,price:finalPrice,qty:qty,size:size});
        return
      }
      return
    }
    await dispatch({type:"ADD",id:props.fooditems._id,name:props.fooditems.name,price:finalPrice,qty:qty,size:size});
    console.log(data);
  }
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[]);
  let finalPrice=qty*parseInt(options[size]);
  return (
    <div>
        <div className="card mt-3" style={{"width": "19rem" ,"maxHeight":"400px"}}>
          <img src={props.fooditems.img} className="card-img-top" alt="..." style={{"objectFit":"fill" ,"height":"120px"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.fooditems.name}</h5>
            <p className="card-text">{props.fooditems.description}</p>
            <div className='container w-100'>
              <select className='m-2 h-100 bg-success rounded' onChange={(e)=>{
                setqty(e.target.value);
              }}>
                {Array.from(Array(6),(e,i)=>{
                  return(
                    <option key={i+1} value={i+1}>{i+1}</option>
                  )
                })}
              </select>
              <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>{
                setsize(e.target.value);
              }}>
                {priceoptions.map((data)=>{
                  return(
                    <option key={data} value={data}>{data}</option>
                  )
                })}
              </select>
              <div className='d-inline h-100 fs-5'>
                ₹{finalPrice}/-
              </div>
              <hr>
              </hr>
              <button className="btn btn-success justify-center ms-2" onClick={handleaddtocart}>Add To Cart</button>
            </div>
          </div>
        </div>
    </div>
  )
}

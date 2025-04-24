import React from 'react'
import { useCart, useDispatch } from '../components/Contextreducer'
import DeleteIcon from '@mui/icons-material/Delete';
export default function Cart() {
    let data=useCart();
    let dispatch=useDispatch();
    if(!data.length)
    {
        return(
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
            </div>
        )
    }
    const handlecheckout=async()=>{
        let useremail=localStorage.getItem("useremail");
        let res=await fetch("http://localhost:5000/api/orderdata",
            {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    orderdata: data,
                    email: useremail,
                    orderdate: new Date().toDateString()
                })
            }
        );
        console.log(res);
        if(res.status===200)
        {
            dispatch({type:"DROP"})
        }
    }
    let totalprice=data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody className='text-white'>
                    {data.map((food,index)=>{
                        return(
                        <tr>
                            <th scope='row'>{index+1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td>
                            <button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> 
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <div>
                <h1 className='fs-2'>Total Price: {totalprice}/-</h1>
            </div>
            <div>
                <button className='btn bg-success mt-5' onClick={handlecheckout}>Check Out</button>
            </div>
        </div>
    </div>
  )
}

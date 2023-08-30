import {useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"

import React from "react"
interface courses{
    id:string,
    title:string,
    image:string,
    description:string,
    price:number

}
interface course{
    _id:string,
    title:string,
    image:string,
    description:string,
    price:number

}
function CoursesComponent(props:courses){
    const navigate=useNavigate()
    return(
    
            <div className=" flex content-center self-center flex-col my-10 bg-white p-2 rounded-lg shadow shadow-blue-300 w-72">
                <img src={props.image} alt="" className="w-64 h-52 mt-1 self-center rounded-md" />
                <p className="mt-1 flex justify-center bg-white  text-lg font-bold capitalize ">{props.title}</p>
                <p className="mt-1 px-2 flex justify-center bg-white self-start  ">{props.description}</p>
                <p className="mt-1 px-2 flex justify-center bg-white self-start text-lg font-bold capitalize ">{props.price}</p>
                <button
                onClick={()=>{navigate('/Updatecourse/'+props.id)}}
                className="m-2 bg-blue-600 text-white text-lg font-semibold border-2 rounded-md outline-blue-400 p-2 hover:bg-blue-700"
                >Update</button>
            </div>
    
    )
}
export default function Courses(){
    const [Data,setData]=useState([])
    useEffect(()=>{
        const token=localStorage.getItem("token")
        fetch("http://localhost:3000/admin/courses",
        {method:"GET",
            headers:{
                "Authorization":`${token}`
            }
        }
        ).then(
            (res)=>res.json()
            ).then(
                (data)=>{
                setData(data.courses)})
            }
        ,[])
        return(
            <div className=" grid grid-cols-4 p-3 place-items-center overflow-hidden">
            {Data.map((ele:course)=>{
                return <CoursesComponent id={ele._id} title={ele.title} description={ele.description} image={ele.image} price={ele.price} ></CoursesComponent>
            })}
            </div>
        )
    }
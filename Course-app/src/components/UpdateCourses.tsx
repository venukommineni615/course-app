import { useParams } from 'react-router-dom'
import axios from "axios"
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import React from "react"

export default function Updatecourse(){
    const [title,setTitle]=useState('')
        const [description,setDescription]=useState('')
        const [image,setImage]=useState('')
        const [price,setPrice]=useState('')
    
    let {courseId}=useParams<{ courseId?: string }>()
    useEffect(()=>{
        axios.get('https://course-app-z6ch.onrender.com/admin/course/'+courseId,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((resp)=>{
            setTitle(resp.data.title)
            console.log(title)
            setDescription(resp.data.description)
            setImage(resp.data.image)
            setPrice(resp.data.price)
            console.log(resp.data)

        })

            

    },[])
    return(
        <>
        <div className="flex justify-center m-2">
            <div className=" flex content-center flex-col my-10 bg-white p-2 rounded-lg shadow shadow-blue-300 w-80">
                <img src={image} alt="" className="w-80 h-60" />
                <p className="my-1 flex justify-center bg-white p-2 text-lg font-bold capitalize ">{title}</p>
                <p className="my-1 flex justify-center bg-white p-2  ">{description}</p>
                <p className="my-1 flex justify-center bg-white p-2 text-lg font-bold capitalize ">{price}</p>
            </div>
        </div>
        <EditCourse
         title={title}
         setTitle={setTitle}
         description={description}
         setDescription={setDescription}
         image={image}
         setImage={setImage}
         price={price}
         setPrice={setPrice}
         courseId={courseId}

         ></EditCourse>
        </>

    )
}
interface objects{
title:string,

description:string,
setDescription:Function,
image:string,
setImage:Function,
setTitle:Function,
price:string,
setPrice:Function,
courseId:string|undefined

}
function EditCourse({title,setTitle,description,setDescription,image,setImage,price,setPrice,courseId}:objects){
        const navigate=useNavigate()
        return(
            <div className="flex justify-center">
                <div className=" flex flex-col my-10 bg-white p-2 rounded-lg shadow shadow-blue-300">
                    <input 
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    type="text" name="title" id="title" className="m-2 border-2 rounded-md p-2 outline-blue-300 hover:border-blue-200" placeholder="Title" />
                    <input
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    type="text" name="description" id="description" className="m-2 outline-blue-400 border-2 p-2 rounded-md hover:border-blue-200" placeholder="Description" />
                    <input
                    onChange={(e)=>{
                        setImage(e.target.value)
                    }}
                    type="text" name="imageLink" id="imageLink" className="m-2 border-2 p-2 rounded-md outline-blue-400 hover:border-blue-200" placeholder="Image link"/>
                    <input
                    onChange={(e)=>{
                        setPrice(e.target.value)
                    }}
                    type="text" name="price" id="price" className="m-2 border-2 rounded-md outline-blue-400 p-2 hover:border-blue-200" placeholder="Price"/>
                    <button 
                    onClick={async()=>{
                        const update=await axios.put("https://course-app-z6ch.onrender.com/admin/courses/"+courseId,{title:title,
                        description:description,
                        image:image,
                        price:price
                    },
                    {headers:{
                        "Authorization":localStorage.getItem("token")
                    }});
                        alert(update)
                        navigate("/courses")
                    }}
    
                    type="submit" className="m-2 bg-blue-600 text-white text-lg font-semibold border-2 rounded-md outline-blue-400 p-2 hover:bg-blue-700">Publish</button>
                </div>
            </div>
        )
    }
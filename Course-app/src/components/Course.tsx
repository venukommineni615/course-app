
import React from 'react';
import { useState } from 'react';
export default function Course(){
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')
    const [price,setPrice]=useState('')
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
                onClick={()=>{
                    const token = localStorage.getItem('token');
                    const headers: HeadersInit = {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                      };
                    fetch("http://localhost:3000/admin/course",
                    {method:"POST",
                     body:JSON.stringify({
                        title:title,
                        image:image,
                        description:description,
                        price:price
                     }),
                    headers:new Headers(headers),},
                    )
                }}
                type="submit" className="m-2 bg-blue-600 text-white text-lg font-semibold border-2 rounded-md outline-blue-400 p-2 hover:bg-blue-700">Publish</button>
            </div>
        </div>
    )
}
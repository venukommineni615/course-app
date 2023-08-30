import React from "react"
import {userState} from "../states/states"
import {
    useRecoilValue,
  } from 'recoil'
import {useNavigate} from "react-router-dom"

export default function NavBar(){
    const navigate=useNavigate()
    const user=useRecoilValue(userState)
    return(
        <div className='bg-blue-700 w-screen p-2 flex justify-between '>
           <div className="p-2 text-white">
            <p className="font-bold">COURSE APP</p>
           </div>
            <div className="flex content-center">
                <button className="text-white p-2 font-medium text-sm hover:font-bold mx-1" 
                onClick={()=>{
                    if(!user){
                        navigate("/signin")
                    }
            }}
                >{user?<div className="avatar placeholder">
                <div className="bg-white text-neutral-content rounded-full w-8">
                  <span className="text-2xl font-semibold text-blue-800">{user.slice(0,1)}</span>
                </div>
              </div>:<p>SIGN IN</p>}</button>
                <button  className="text-white p-2 font-medium text-sm mr-4 hover:font-bold mx-1" 
                onClick={()=>{
                    if(user){
                        window.location.href="/signup"
                        localStorage.clear()
                    }
                    else{
                        navigate("/signup")
                    }
                }}
                >{user?<p>LOG OUT</p>:<p>SIGN UP</p>}</button>
            </div>
        </div>
    )
}
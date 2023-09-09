import React from "react"
import {useEffect} from "react"
import { useLocation } from "react-router-dom"
import {userState} from "../states/states"
import {
    useRecoilValue,
  } from 'recoil'
import {useNavigate} from "react-router-dom"
import { useSetRecoilState } from "recoil"

export default function NavBar(){
    const location=useLocation()
    const navigate=useNavigate()
    const setUser = useSetRecoilState(userState)
    const user=useRecoilValue(userState)
    let handleClick=()=>{
        navigate("/")
    }
    useEffect(()=>{
          const token=localStorage.getItem("token")
          fetch("https://course-app-z6ch.onrender.com/admin/get/me",{
            headers:{
              "Authorization":`${token}`
            }
          }).then((res) => res.json())
          .then((data) => {
            setUser(data.admins.username);
          })
        },[location])
    return(
        <div className='bg-body w-screen p-2 flex justify-between '>
           <div className="p-2">
            <button onClick={handleClick} className=" mx-4 font-bold text-blue-700">COURSE APP</button>
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
              </div>:<p className="text-blue-700">SIGN IN</p>}</button>
                <button  className="text-white p-2 font-medium text-sm mr-4 hover:font-bold mx-1" 
                onClick={()=>{
                    if(user){
                        navigate("/")
                        localStorage.clear()
                        setUser("")

                    }
                    else{
                        navigate("/signup")
                    }
                }}
                >{user?<p className="text-blue-700">LOG OUT</p>:<p className="text-blue-700">SIGN UP</p>}</button>
            </div>
        </div>
    )
}
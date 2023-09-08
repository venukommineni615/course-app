import React from "react"
import {userState} from "../states/states"
import {
    useRecoilValue,
  } from 'recoil'
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"

export default function NavBar(){
    const navigate=useNavigate()
    const user=useRecoilValue(userState)
    let location=useLocation()
    let handleClick=()=>{
        navigate("/")
    }
    if( location.pathname==="/signin" || location.pathname==="/signup"){
        return(
        
            <div className='bg-body w-screen p-2 flex justify-between '>
               <div className="p-2">
                <button className=" mx-4 font-bold text-blue-700" onClick={handleClick}>COURSE APP</button>
               </div>
                <div className="flex content-center">
                    <button className="text-white p-2 font-medium text-sm hover:font-bold mx-1" 
                    onClick={()=>{
                        if(!user){
                            navigate("/signin")
                        }
                }}
                    >{<p className="text-blue-700">SIGN IN</p>}</button>
                    <button  className="text-white p-2 font-medium text-sm mr-4 hover:font-bold mx-1" 
                    onClick={()=>{
                            navigate("/signup")
                    }}
                    >{<p className="text-blue-700">SIGN UP</p>}</button>
                </div>
            </div>
            
            
        )
    }
    else if (location.pathname==="/"){
        if(!user){
            return(
            <div className='bg-body w-screen p-2 flex justify-between '>
               <div className="p-2">
                <button className=" mx-4 font-bold text-blue-700" onClick={handleClick}>COURSE APP</button>
               </div>
                <div className="flex content-center">
                    <button className="text-white p-2 font-medium text-sm hover:font-bold mx-1" 
                    onClick={()=>{
                        if(!user){
                            navigate("/signin")
                        }
                }}
                    >{<p className="text-blue-700">SIGN IN</p>}</button>
                    <button  className="text-white p-2 font-medium text-sm mr-4 hover:font-bold mx-1" 
                    onClick={()=>{
                            navigate("/signup")
                    }}
                    >{<p className="text-blue-700">SIGN UP</p>}</button>
                </div>
            </div>

            )
        }
        else{
            <div className='bg-body w-screen p-2 flex justify-between '>
                <div className="p-2">
                    <button className=" mx-4 font-bold text-blue-700" onClick={handleClick}>COURSE APP</button>
                </div>
                <div className="flex content-center">
                <div className="avatar placeholder bg-blue-700 text-neutral-content border-blue-700 border-2 rounded-full  flex justify-center items-center w-8 h-8 mt-1">
                    
                        <span className="text-2xl text-center font-semibold text-white pb-2">{user.slice(0,1)}</span>
                    
                </div>
                <button className="text-white p-2 font-medium text-sm mr-4 hover:font-bold mx-1"  onClick={()=>{
                    window.location.href="/"
                    localStorage.clear()
                }}><p className="text-blue-700 font-semibold">LOG OUT</p></button>
                </div>
            </div>
        
        }
    }
    return(
        <nav>
        <div className='bg-body w-screen p-2 flex justify-between '>
            <div className="p-2">
                <button className=" mx-4 font-bold text-blue-700" onClick={handleClick}>COURSE APP</button>
            </div>
            <div className="flex content-center">
            <div className="avatar placeholder bg-blue-700 text-neutral-content border-blue-700 border-2 rounded-full  flex justify-center items-center w-8 h-8 mt-1">
               
                    <span className="text-2xl text-center font-semibold text-white pb-2">{user.slice(0,1)}</span>
                </div>
            
            <button className="text-white p-2 font-medium text-sm mr-4 hover:font-bold mx-1"  onClick={()=>{
                window.location.href="/"
                localStorage.clear()
            }}><p className="text-blue-700 font-semibold">LOG OUT</p></button>
            </div>
        </div>
    </nav>
    )
}



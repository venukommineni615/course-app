import React from "react"
import student from "../assets/student.png"
import { useNavigate } from "react-router-dom"
export default function LandingPage(){
    const Navigate=useNavigate()
   let handleClick=()=>{
        Navigate("/courses")
    }
    return(
        <div className="grid grid-cols-2 gap-4 bg-body m-8">
            <div className="flex flex-col justify-center ">
                <h2 className="font-bold text-4xl">Take learning experience to the next level</h2>
                <p className="text-left">Course app is a platform to learn different technologies</p>
                <button className="text-white p-2 font-medium text-sm mr-4 hover:font-bold mx-1"  onClick={handleClick}>Courses</button>

            </div>
            <div><img src={student} alt="image" /></div>
        </div>
    )
}
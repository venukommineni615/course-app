import React from "react"
import student from "../assets/student.png"
import { useNavigate } from "react-router-dom"
import {userState} from "../states/states"
import {
    useRecoilValue,
  } from 'recoil'
export default function LandingPage(){
    const Navigate=useNavigate()
    const user=useRecoilValue(userState)
    let addCourse=()=>{
        if(user){

            Navigate("/course")
        }
        else{
            alert("Please signin before Adding the course")
        }   
    }
   let handleClick=()=>{
    if(user){

        Navigate("/courses")
    }
    else{
        alert("Please signin before visiting the courses")
    }
    }
    return(
        <div className="grid grid-cols-2 gap-4 bg-body m-8">
            <div className="flex flex-col justify-center ">
                <h2 className="font-bold text-4xl">Take learning experience to the next level</h2>
                <p className="text-left">Course app is a platform to learn different technologies</p>
                <div className="flex justify-start py-4">
                    <button className="bg-blue-700 text-white p-2 font-bold text-sm mr-4 hover:font-bold mx-1 my-4 w-28 rounded-md"  onClick={handleClick}>Courses</button>
                    <button className="bg-blue-700 text-white p-2 font-bold text-sm mr-4 hover:font-bold mx-1 my-4 w-28 rounded-md"  onClick={addCourse}>Add Course</button>
                </div>

            </div>
            <div><img src={student} alt="image" /></div>
        </div>
    )
}
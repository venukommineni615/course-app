import React from "react"
import student from "../assets/student.png"
export default function LandingPage(){
    return(
        <div className="grid grid-cols-2 gap-4 bg-body m-8">
            <div className="flex flex-col justify-center ">
                <h2 className="font-bold text-4xl">Take learning experience to the next level</h2>
                <p className="text-left">Course app is a platform to learn different technologies</p>

            </div>
            <div><img src={student} alt="image" /></div>
        </div>
    )
}
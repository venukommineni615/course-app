import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import React from "react"
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
export default function SignIn(){
    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate()
    return(
        <>
        <center className="mt-56">
        <Card variant="outlined"
        style={{width:"300px",
    padding:"20px",
}}
        >
        <TextField 
        onChange={(e)=>{
            setUserName(e.target.value)
        }}
        id="outlined-basic" label="Email" variant="outlined"
        required />
        <br />
        <br />
        <TextField
         onChange={(e)=>{
            setPassword(e.target.value)
        }}
        id="outlined" label="Password"
        type="password" variant="outlined"
        required />
        <br />
        <br />
        <Button 
        onClick={()=>{
            
            fetch("http://localhost:3000/admin/login",{
                method:"POST",
                body:JSON.stringify({
                    username:userName,
                    password:password
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => res.json()).then(data => {console.log(data);
                if(data.token){
                    navigate('/courses')
                }
                else{
                    alert(data.message)
                }
            localStorage.setItem("token","Bearer "+data.token)}).catch(error => console.log("THIS IS THE ERROR "+error))
            
            
        }}
        variant="contained"
        >Sign in</Button>
        </Card>
        </center>
        
        </>
    )
    
    }

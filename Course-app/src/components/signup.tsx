import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function SignUp(){
    const navigate=useNavigate()
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
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
        }}id="email" label="Email" variant="outlined"
        required />
        <br />
        <br />
        <TextField 
        onChange={(e)=>{
            setPassword(e.target.value)
        }} id="password" label="Password"
        type="password" variant="outlined"
        required />
        <br />
        <br />
        <Button 
        variant="contained"
        sized="large"
        onClick={async()=>
        {try{

            const res=await axios.post("http://localhost:3000/admin/signup",{
                username:userName,
                password:password
            }
            )
            alert(res.data.message) 
            localStorage.setItem("token","Bearer "+res.data.token)
            navigate('/courses')
        }
        catch(err){
            alert("Admin already exists. Please sign in")
        }
            
        }
        }
        >Sign up</Button>
        </Card>
        </center>
        
        </>
    )
    
    }

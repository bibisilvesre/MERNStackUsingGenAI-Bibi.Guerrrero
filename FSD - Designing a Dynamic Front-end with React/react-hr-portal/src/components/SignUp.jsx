import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {

let [emailId,setEmailId]=useState("");
let [department,setDepartment]=useState("");
let [age,setAge]=useState("");
let [password,setPassword]=useState("");
let [id,setId]=useState("");
let [flag,setFlag]=useState(true);

let EMPLOYEE_URL="http://localhost:3000/employees";
let LOGIN_URL="http://localhost:3000/logins";

let verifyEmailId = async(event)=> {
    event.preventDefault();

    let employees = await axios.get(EMPLOYEE_URL);

    let employeePresent = employees.data.find(
        employee => employee.emailId === emailId
    );

    if(employeePresent==undefined){
        alert("You are not a part of the organization");
        setEmailId("");
    } else {
        setFlag(false);
        setId(employeePresent.id);
        setDepartment(employeePresent.department);
        setEmailId(employeePresent.emailId);
    }
}

let signUp = async (event)=> {
    event.preventDefault();

    let existingEmployee = {emailId,password,department,age};
    let loginDetails = {emailId,password,typeOfUser:"employee"};

    await axios.patch(EMPLOYEE_URL+"/"+id,existingEmployee);
    await axios.post(LOGIN_URL,loginDetails);

    alert("Sign Up Done Successfully");

    setFlag(true);
    setEmailId("");
    setDepartment("");
    setPassword("");
    setAge("");
}

return(
    <div className="signup-container">
        <h3>Employee Sign Up</h3>

        {
            flag
            ?
            <form onSubmit={verifyEmailId}>
                <label>Registered Email</label>   
                <input 
                    type="email"
                    value={emailId}
                    onChange={(e)=>setEmailId(e.target.value)}
                    placeholder="Enter your company email"
                />
                <input type="submit" value="Verify Email"/> 
            </form>

            :
            <form onSubmit={signUp}>

                <label>EmailId</label>   
                <input type="email" value={emailId} readOnly/>

                <label>Password</label>   
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <label>Department</label>   
                <input type="text" value={department} readOnly/>

                <label>Age</label>   
                <input 
                    type="text"
                    value={age}
                    onChange={(e)=>setAge(e.target.value)}
                />

                <input type="submit" value="Complete Sign Up"/> 
            </form>
        }

        <Link to="/">Sign In</Link>
    </div>
)
}

export default SignUp;
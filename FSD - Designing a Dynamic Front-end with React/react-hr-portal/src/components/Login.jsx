import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
let [emailId,setEmailId]=useState("");
let [password,setPassword]=useState("");
let [typeofUser,setTypeofUser]=useState("");
let [msg,setMsg]=useState("");
let LOGIN_URL="http://localhost:3000/logins";
let navigate = useNavigate(); 

let signIn = async(event)=> {
    setMsg("")
    event.preventDefault();
    if(emailId.length==0 || password.length==0){
        setMsg("All fields are required")
        return;
    }

    let login = {emailId,password,typeofUser}
    let loginDb = await axios.get(LOGIN_URL);

    let result = loginDb.data.find(ll=>
        ll.emailId==login.emailId && 
        ll.password===login.password && 
        ll.typeOfUser===login.typeofUser);

    if(result==undefined){
        setMsg("Invalid Email Id or password or wrong type of user")
    } else {
        if(login.typeofUser==="hr"){
            alert("hr login successfully")
            navigate("/hrHome")
        } else if(login.typeofUser==="employee"){
            sessionStorage.setItem("emailId",login.emailId);
            alert("employee login successfully")
            navigate("/employeeHome")
        }
    }
    setEmailId("")
    setPassword(""); 
}

return(
    <div className="login-container">
        <h3>Login</h3>
        <form onSubmit={signIn}>
            <label>Email</label>
            <input type="email"
                value={emailId}
                onChange={(e)=>setEmailId(e.target.value)}
                placeholder="Enter email"
            />

            <label>Password</label>
            <input type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter password"
            />

            <label>User Type</label>
            <div className="radio-group">
                <input type="radio" name="typeOfUser"
                    value="hr"
                    onChange={(e)=>setTypeofUser(e.target.value)}
                /> Hr

                <input type="radio" name="typeOfUser"
                    value="employee"
                    onChange={(e)=>setTypeofUser(e.target.value)}
                /> Employee
            </div>

            <input type="submit" value="Sign In"/>
        </form>

        <Link to="signUp">Sign Up</Link>

        <span className="error-msg">{msg}</span>
    </div>
)
}

export default Login;
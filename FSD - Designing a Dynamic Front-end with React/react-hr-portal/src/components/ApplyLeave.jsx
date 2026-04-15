import axios from "axios";
import { useState } from "react";
import "./ApplyLeave.css";

function ApplyLeave() {

let [reason,setReason]=useState("");
let [numberOfDays,setNumberOfDays]=useState("");
let [status,setStatus]=useState("Pending");
let [msg,setMessage]=useState("");

let LEAVE_INFO_URL = "http://localhost:3000/leaveInformation";
let emailId = sessionStorage.getItem("emailId");

let applyLeaveDetails = async(event)=> {
    event.preventDefault();

    let newLeaveInfo = {emailId,reason,numberOfDays,status};

    await axios.post(LEAVE_INFO_URL,newLeaveInfo);

    setMessage("Leave applied successfully");

    setReason("");
    setNumberOfDays("");
}

return(
    <>
        <h3 className="form-title">Apply Leave</h3>

        <form className="form-container" onSubmit={applyLeaveDetails}>
            
            <label>Reason for Leave</label>
            <input 
                type="text"
                value={reason}
                onChange={(e)=>setReason(e.target.value)}
                placeholder="Enter reason for leave"
            />

            <label>Number of Days</label>
            <input 
                type="number"
                value={numberOfDays}
                onChange={(e)=>setNumberOfDays(e.target.value)}
                placeholder="Enter number of days"
            />

            <input type="submit" value="Apply Leave"/>
        </form>

        <span className="success-msg">{msg}</span>
    </>
)
}

export default ApplyLeave;
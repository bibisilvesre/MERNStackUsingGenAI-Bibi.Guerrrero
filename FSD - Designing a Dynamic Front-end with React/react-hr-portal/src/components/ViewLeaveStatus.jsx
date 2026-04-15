import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewLeaveStatus.css";

function ViewLeaveStatus() {

let [leaveInfo,setLeaveInfo]=useState([]);
let LEAVE_INFO_URL = "http://localhost:3000/leaveInformation";
let emailId = sessionStorage.getItem("emailId");

useEffect(()=> {
    viewLeaveInfo();
},[])

let viewLeaveInfo = async()=> {
    let allLeaveInfo = await axios.get(LEAVE_INFO_URL);
    let leaveStatus = allLeaveInfo.data.filter(ll => ll.emailId === emailId);
    setLeaveInfo(leaveStatus);
}

let getStatusClass = (status) => {
    if(status === "Pending") return "status-badge status-pending";
    if(status === "Approved") return "status-badge status-approved";
    if(status === "Denied") return "status-badge status-denied";
    return "status-badge";
}

return(
    <div className="leave-status-container">
        <h3 className="form-title">Your Leave Status</h3>

        {leaveInfo.length === 0 
            ? <p>No leave requests found.</p>
            : leaveInfo.map(ll => (
                <div className="leave-status-item" key={ll.id}>
                    
                    <div><span className="leave-status-label">Reason:</span> {ll.reason}</div>
                    <div><span className="leave-status-label">Number of Days:</span> {ll.numberOfDays}</div>
                    <div>
                        <span className="leave-status-label">Status:</span> 
                        <span className={getStatusClass(ll.status)}>{ll.status}</span>
                    </div>
                </div>
            ))
        }
    </div>
)
}

export default ViewLeaveStatus;
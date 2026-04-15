import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewAllLeaveInfo.css";

function ViewAllLeaveInfo() {

let [leaveInfo,setLeaveInfo]=useState([]);
let [msg,setMsg]=useState("");

let LEAVE_INFO_URL = "http://localhost:3000/leaveInformation";

useEffect(()=> {
    allLeaveDetails();
},[msg])

let allLeaveDetails = async()=> {
    let allLeaveInfo = await axios.get(LEAVE_INFO_URL);

    let pendingLeaveInfo = allLeaveInfo.data.filter(
        ll => ll.status === "Pending"
    );

    setLeaveInfo(pendingLeaveInfo);
}

let changeStatus = (ll,status)=> {
    setMsg("");
    ll.status = status;
    axios.patch(LEAVE_INFO_URL+"/"+ll.id,ll);
    setMsg("Status updated successfully");
}

return(
    <div className="leave-container">
        <h3 className="form-title">Pending Leave Requests</h3>

        {leaveInfo.length === 0 
            ? <p>No pending leave requests</p> 
            : leaveInfo.map(ll => (
                <div className="leave-item" key={ll.id}>
                    <div><b>Email:</b> {ll.emailId}</div>
                    <div><b>Reason:</b> {ll.reason}</div>
                    <div><b>Number of Days:</b> {ll.numberOfDays}</div>

                    <div className="leave-actions">
                        <label>
                            <input 
                                type="radio" 
                                name={`leaveStatus-${ll.id}`} 
                                onClick={()=>changeStatus(ll,"Approved")}
                            /> Approved
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name={`leaveStatus-${ll.id}`} 
                                onClick={()=>changeStatus(ll,"Denied")}
                            /> Denied
                        </label>
                    </div>
                </div>
            ))
        }

        {msg && <p style={{color: "green", marginTop: "10px", textAlign:"center"}}>{msg}</p>}
    </div>
)
}

export default ViewAllLeaveInfo;
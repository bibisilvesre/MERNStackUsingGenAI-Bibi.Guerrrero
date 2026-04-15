import { Link, Outlet, useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {

let emailId = sessionStorage.getItem("emailId");

let navigate = useNavigate();

let logout = ()=> {
    sessionStorage.removeItem("emailId");
    navigate("/")
}

return(
    <div className="emp-container">

        {/* Header */}
        <div className="emp-header">
            <h3>Welcome {emailId}</h3>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        {/* Navigation */}
        <div className="emp-nav">
            <Link to="viewEmployee">View Profile</Link> |
            <Link to="applyLeave">Apply Leave</Link> |
            <Link to="viewLeaveStatus">Leave Status</Link>
        </div>

        <hr/>

        {/* Content */}
        <div className="emp-content">
            <Outlet/>
        </div>

    </div>
)
}

export default EmployeeDashboard;
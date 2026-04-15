import { Link, Outlet, useNavigate } from "react-router-dom";
import "./HrDashboard.css";

function HrDashboard() {

let navigate = useNavigate();

let logout = ()=> {
    navigate("/")
}

return(
    <div className="hr-container">
        
        {/* Header */}
        <div className="hr-header">
            <h3>HR Home Page</h3>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        {/* Navigation */}
        <div className="hr-nav">
            <Link to="addEmployee">Add Employee</Link> |
            <Link to="viewEmployees">View Employees</Link> |
            <Link to="viewAllLeaveInfo">View Leave Information</Link>
        </div>

        <hr/>

        {/* Content */}
        <div className="hr-content">
            <Outlet/>
        </div>

    </div>
)
}

export default HrDashboard;
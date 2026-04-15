import axios from "axios";
import { useEffect, useState } from "react";
import "./EmployeeView.css";

function EmployeeView() {

let [employee,setEmployee]=useState({});

let EMPLOYEE_URL="http://localhost:3000/employees";

useEffect(()=> {
    viewEmployees();
},[])

let viewEmployees = async()=> {
    let allEmployees = await axios.get(EMPLOYEE_URL);
    let emailId = sessionStorage.getItem("emailId");

    let employeeInfo = allEmployees.data.find(
        employee => employee.emailId === emailId
    );

    setEmployee(employeeInfo || {});
}

return(
    <>
        <h3 className="form-title">Your Profile Info</h3>

        <div className="profile-container">
            <div className="profile-row">
                <span className="profile-label">Email: </span>
                {employee.emailId}
            </div>

            <div className="profile-row">
                <span className="profile-label">Age: </span>
                {employee.age}
            </div>

            <div className="profile-row">
                <span className="profile-label">Department: </span>
                {employee.department}
            </div>
        </div>
    </>
)
}

export default EmployeeView;
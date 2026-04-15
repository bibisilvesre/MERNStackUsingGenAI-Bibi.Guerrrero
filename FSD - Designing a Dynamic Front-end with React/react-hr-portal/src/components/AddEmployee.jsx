import axios from "axios";
import { useState } from "react";
import "./AddEmployee.css";

function AddEmployee() {

let [emailId,setEmailId]=useState("");
let [department,setDepartment]=useState("");

let EMPLOYEE_URL="http://localhost:3000/employees";

let addEmployee = async(event)=> {
    event.preventDefault();

    let newEmployee = {emailId,department};

    let allEmployees = await axios.get(EMPLOYEE_URL);

    let employeePresent = allEmployees.data.find(
        employee => employee.emailId == newEmployee.emailId
    );

    if(employeePresent==undefined){
        await axios.post(EMPLOYEE_URL,newEmployee);
        alert("Employee added successfully")
    } else {
        alert("Employee already present");
    }

    setEmailId("")
    setDepartment("");
}

return(
    <>
        <h3 className="form-title">Add Employee</h3>

        <form className="form-container" onSubmit={addEmployee}>
            
            <label>Email</label>
            <input 
                type="email"
                value={emailId}
                onChange={(e)=>setEmailId(e.target.value)}
                placeholder="Enter employee email"
            />

            <label>Department</label>
            <input 
                type="text"
                value={department}
                onChange={(e)=>setDepartment(e.target.value)}
                placeholder="Enter department"
            />

            <input type="submit" value="Add Employee"/>
        </form>
    </>
)
}

export default AddEmployee;
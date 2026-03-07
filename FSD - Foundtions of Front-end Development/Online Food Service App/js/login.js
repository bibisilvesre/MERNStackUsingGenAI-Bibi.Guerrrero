function checkInfo(){
    const email = document.getElementById("emailId").value;
    const password = document.getElementById("password").value;

    // logic 
    
    if(password.length < 5){
        alert("Password must be at least 5 characters long");
        return false;
    }else {
        localStorage.setItem("user", email);   // email id set in local storage
        return true;
    }  
}
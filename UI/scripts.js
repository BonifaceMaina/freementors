const regForm = document.regform
const validateRegister = () => {
    // check for whitespaces
    const { fname, lname, email, pass, pass2, address, bio, occupation, expertise } = document.regform
    const errArr = [fname, lname, email, pass, pass2, address, bio, occupation, expertise];
    errArr.forEach(function(element){
        if(element.value.trim() == ""){
            event.preventDefault();
           element.style.border = "1px solid red";
           alert("No empty strings allowed");
            return false;
        }
    });  

    // compare passwords
    if (pass.value  !== pass2.value){
        event.preventDefault();
        pass2.style.border = "1px solid red";
        pass.style.border = "1px solid red";
        alert("Passwords do not match");
        return false;
    }
}

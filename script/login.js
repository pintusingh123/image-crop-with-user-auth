
window.onload =()=>{
  const user = localStorage.getItem("isLogin");
  if(user){
    window.location.replace("profile.html")
  }
}


function loginUser(e) {
  e.preventDefault();
  validation("email", "email-error");
  validation("password", "password-error");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const emailError = document.getElementById("email-error");

  const passwordError = document.getElementById("password-error");

  const user = localStorage.getItem(email); //it return string obj
  console.log(email, password);

  if (user) {
    //agar user he to true agr user nahi hai to null return hoga aur condition false hogi
    const userOBj = JSON.parse(user);
 
     if(userOBj.password == password){
          //sab kuch sahi hone par  user data ko profile page pr bhejenge 
          //dedirect krenge using js

          // window.location.href="profile.html" 
           //ise use krne sse ye previous history ko browser me store kr ke rkhta hai jse agr ham back btn pr click krenge to waps login page open hoga 

           //isliye ham ye use krenge => 
            window.location.replace("profile.html") 

           localStorage.setItem("isLogin", true);
           localStorage.setItem("currentUser", email);
        
     }else{
     passwordError.classList.remove('hidden')
     passwordError.innerHTML="Incorrect password"
     }

  } else {
    emailError.classList.remove("hidden");
    emailError.innerHTML = "User Doesn't exist please try to signUp";
  }
}

//input fields error sms fun
function validation(inputId, errorId) {
  const input = document.getElementById(inputId);
  const label = document.getElementById(errorId);
  // console.log(input,label);

  const value = input.value.trim();

  if (value.length === 0) {
    label.classList.remove("hidden");
    label.innerHTML = `  ${input.name} is required`;
    throw new Error(`${input.name} is required`); // { here i write a logic for if any field is empty then form is not submited }
  } else {
    label.classList.add("hidden");
  }
}

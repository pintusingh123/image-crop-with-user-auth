window.onload = () => {
  const user = localStorage.getItem("isLogin");
  if (user) {
    window.location.replace("profile.html");
  }
};

function createUser(event) {
  event.preventDefault(); //its imp for stop page reloading when we submit form

  //submit karte time ham validation ko call krenge manually for checking any field is empty or not if empty then form data are not submited =>
  validation("fullname", "fullname-error");
  validation("email", "email-error");
  validation("password", "password-error");

  //here we write singup code or logic

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const userData = {
    //if property and value both name are same then we write shortcut ,single value
    fullname,
    email,
    password,
  };
  //we dont store obj directly in localstorage so we convert obj to str =>
  const payload = JSON.stringify(userData);

  //for uniqeu key name so we use Date.now()=>
  const key = email; //email islye kyoki email har signup user ki agar agar hogi

  localStorage.setItem(key, payload);

  // reset form data after submited
  const form = event.target;
  form.reset();

  Swal.fire({
    icon: "success",
    title: "SignUp Successfully",
    toast: true,
    timer: 1000,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  setTimeout(() => {
    localStorage.setItem("isLogin", true);
    localStorage.setItem("currentUser", email);
    window.location.replace("profile.html");
  }, 1000);
}

//input fields error sms fun
function validation(inputId, errorId) {
  const input = document.getElementById(inputId);
  const label = document.getElementById(errorId);
  // console.log(input,label);

  const value = input.value.trim();

  if (value.length === 0) {
    label.classList.remove("hidden");
    throw new Error(`${input.name} is required`); // { here i write a logic for if any field is empty then form is not submited }
  } else {
    label.classList.add("hidden");
  }
}

//show password funtinality =>
function showpasswordbtn() {
  const input = document.getElementById("password");
  const passwordicon = document.getElementById("eye-icon");

  if (input.type == "password") {
    input.type = "text";
    passwordicon.className = "ri-eye-off-line";
  } else if (input.type == "text") {
    input.type = "password";
    passwordicon.className = "ri-eye-line";
  }
}

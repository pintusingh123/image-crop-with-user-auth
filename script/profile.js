 
window.onload = () => {
  const user = localStorage.getItem("isLogin");
  if (!user) {
    window.location.replace("login.html");
  }
userData()
   
};

//user details shows funtinality => 
  function userData(){

    const currentUserEmail = localStorage.getItem('currentUser');
    const profileImg = localStorage.getItem('profile-img');

    if(profileImg){
      let profileAvatar = document.getElementById("profile-avatar")
      profileAvatar.src = profileImg;
    }
    if (currentUserEmail) {
      const userData = JSON.parse(localStorage.getItem(currentUserEmail));
      if (userData) {
        document.getElementById("user-name").textContent = userData.fullname;
        document.getElementById("user-email").textContent = userData.email;
      }
    }
  }



function logOut() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("currentUser");
  setTimeout(() => {
    window.location.replace("login.html");
  }, 1000);
}

function uploadImg(event) {
  const fileInput = event ? event.target : document.getElementById("file-input") || document.getElementById("avatar-file-input");
  const file = fileInput.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const imgData = event.target.result;
    const avatar = document.getElementById("profile-avatar");
    const editImg = document.getElementById("edit-img");

    avatar.src = imgData;
    editImg.src = imgData;

    const userData = getCurrentUserData() || {};
    userData.profileImage = imgData;
    setCurrentUserData(userData);
  };
  reader.readAsDataURL(file);
}

let Croper = null;

function loadCropper() {
  const downloadButton = document.getElementById("download-button");
  if (!Croper) {
    const picture = document.getElementById("edit-img");
    Croper = new Cropper(picture, {
      // aspectRatio: 1,
      viewMode: 1,
    });
    downloadButton.classList.remove("hidden");
  } 
  else {
    Croper.destroy();
    Croper = null;
    downloadButton.classList.add("hidden");
  }
}

function DownloadImg() {
  let canvas = Croper.getCroppedCanvas();
  const imageString = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = imageString;
  a.download = "croppedimg.png";
  a.click();
  a.remove();
}

//profile img 

function uploadProfileimg(){
  let profileImgInput = document.getElementById("avatar-file-input")
let profileImgAdded = document.getElementById("profile-avatar")
  let file = profileImgInput.files[0];
  
  
  // good way for image,audio,video urls=>
  const fileReader =  new FileReader(); //api for file read 
  fileReader.readAsDataURL(file)

  fileReader.onload = (e) =>{
    const filestring = e.target.result
    console.log(filestring);
    profileImgAdded.src=filestring
    localStorage.setItem("profile-img", filestring)
  }

  // //jo file mili hai uska url return krna hai temp url 
  // let url = URL.createObjectURL(file); //temp url gerater krata hai
 
}
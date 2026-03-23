 
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

function uploadImg() {
  let fileInput = document.getElementById("file-input");
  const editImg = document.getElementById("edit-img");

  let file = fileInput.files[0]; //it return img  file Array
  // console.log(file);
  const imgUrl = URL.createObjectURL(file); //it used for make url of img file
  // console.log(imgURl);
  editImg.src = imgUrl;

  // alert("sdfd")
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

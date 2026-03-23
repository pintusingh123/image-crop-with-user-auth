window.onload = () => {
  checkAuthStatus();
};

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLogin");
  const authButtons = document.getElementById("auth-buttons");
  const profileSection = document.getElementById("profile-section");

  if (isLoggedIn) {
    // User is logged in - show profile section
    authButtons.classList.add("hidden");
    profileSection.classList.remove("hidden");

    // Load user data for navbar
    const currentUserEmail = localStorage.getItem("currentUser");
    if (currentUserEmail) {
      const userData = JSON.parse(localStorage.getItem(currentUserEmail));
      if (userData) {
        document.getElementById("navbar-username").textContent = userData.fullname || "User";
        const navbarAvatar = document.getElementById("navbar-avatar");
        if (userData.profileImage) {
          navbarAvatar.src = userData.profileImage;
        }
      }
    }
  } else {
    // User not logged in - show auth buttons
    authButtons.classList.remove("hidden");
    profileSection.classList.add("hidden");
  }
}
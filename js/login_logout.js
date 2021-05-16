//Function Login
function start_quantxi_btn() {  
  
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (width < 1200) {
      open("img/ailogo2.png","_self");
  }
  
  
  }
  
//Function Logout
function logout_btn() {
  sessionStorage.removeItem("api");
  open("index.html","_self");
}
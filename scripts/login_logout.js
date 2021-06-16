//Function Login
function start_quantxi_btn() {  
  
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (width < 1200) {
      open("images/ailogo2.png","_self");
  }
  
  var api_key = $("#api_key").val();
    $.ajax({
        type: "GET",
        url: "https://api.quantxi.com/user?api="+api_key,
        dataType: 'json',
        success: function(result){
        if (result.status == "success") {
            alert(`selamat datang `+result.data.nama); //setting diserver u/tampilkan message data user
            sessionStorage.setItem("api", api_key);
            open("dashboard.html","_self");
        } else {
            alert(`gagal koneksi, periksa api key anda`);
            return false;
          }
        },
        error: function() {
            alert(`gagal koneksi, periksa api key anda`);
            return false;
        }
    })
  }
  
//Function Logout
function logout_btn() {
  sessionStorage.removeItem("api");
  open("index.html","_self");
}
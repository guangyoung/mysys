//Function Reset Test
async function reset_test() {
   await $.ajax({
     type: "DELETE",
     url: "https://api.quantxi.com/reset?api_key="+sessionStorage.getItem("api"),    
    //  dataType: 'json',
     success: function(result){
      if (result.status == "success") {
        
        $('#setting_button, #data_button, #play_button, #viewpost_button, #trade_report_button, #chart_button').attr('disabled',false);
        $('#refresh_button').attr('disabled',true);
        
               
        
        $("#progress_bar_value").html("0%"); 
        $("#progress_bar").css("width","0%")

        account_trade_summary = [];
        asset_trade_details = [];
        $("#account_trade_summary_tbl>tbody").empty();
        $("#pagination_trade_summary").twbsPagination("destroy");

        performance_chart.destroy();

      } else {
        alert(`gagal koneksi, periksa api key anda`);
        return false;
      }
     },
     error: function() {      
       alert(`koneksi ke server gagal, coba beberapa saat lagi`);
       return false;
     }
   })  
}
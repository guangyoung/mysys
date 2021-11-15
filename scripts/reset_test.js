//STEP 4. RESET TEST
//Ini adalah step reset test ..........................,.............................
//...................................................................................
//...................................................................................

async function reset_test() {
  var x = 1;
  var y = 2;
  var signal_output_arr = new Array();
  var signal_output = {
    data_id: 2,
    stock01_signal_position: "BUY",
    signalSize_stock1: 100,
    stock02_signal_position: "SELL",
    signalSize_stock2: 200
};
signal_output_arr.push(signal_output);//save data to array signal_output_history 
console.log(eval(`signal_output.signalSize_stock`+x));
console.log(eval(`signal_output.signalSize_stock`+y));
 
autorun();
return false;
   await $.ajax({
     type: "DELETE",
     url: "https://api.quantxi.com/reset?api_key="+localStorage.getItem("apiKey"),    
     dataType: 'json',
     success: function(result){
      if (result.status == "success") {
        
        $('#setting_button, #data_button, #play_button, #viewpost_button, #trade_report_button, #chart_button').attr('disabled',false);
        $('#refresh_button').attr('disabled',true);        
        $("#progress_bar_value").html("0%"); 
        $("#progress_bar").css("width","0%");
        account_trade_summary = [];
        asset_trade_details = [];
        $("#account_trade_summary_tbl>tbody").empty();
        $("#pagination_trade_summary").twbsPagination("destroy");
        // performance_chart = new Chart();
        $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));
        $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));
        $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));
        $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));

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
//Function Reset Test
async function reset_test() {
   await $.ajax({
     type: "DELETE",
     url: "https://api.quantxi.com/reset?api="+sessionStorage.getItem("api"),    
     dataType: 'json',
     success: function(result){
      if (result.status == "success") {
        
        $('#setting_button, #data_button, #start_date, #play_button, #viewpost_button, #trade_report_button, #chart_button, #statistik_button').attr('disabled',false);
        $('#refresh_button').attr('disabled',true);
        
        $('#data_id_input, #equity_balance, #asset1_price, #asset1_position_size, #asset2_price, #asset2_position_size, #asset3_price, #asset3_position_size, #asset4_price, #asset4_position_size, #asset5_price, #asset5_position_size').html(0);
        $('#asset6_price, #asset6_position_size, #asset7_price, #asset7_position_size, #asset8_price, #asset8_position_size, #asset9_price, #asset9_position_size, #asset10_price, #asset10_position_size').html(0);
        $('#asset11_price, #asset11_position_size, #asset12_price, #asset12_position_size, #asset13_price, #asset13_position_size, #asset14_price, #asset14_position_size, #asset15_price, #asset15_position_size').html(0);
        $('#asset16_price, #asset16_position_size, #asset17_price, #asset17_position_size, #asset18_price, #asset18_position_size, #asset19_price, #asset19_position_size, #asset20_price, #asset20_position_size').html(0);
        $('#asset21_price, #asset21_position_size, #asset22_price, #asset22_position_size, #asset23_price, #asset23_position_size, #asset24_price, #asset24_position_size, #asset25_price, #asset25_position_size').html(0);
        $('#asset26_price, #asset26_position_size, #asset27_price, #asset27_position_size, #asset28_price, #asset28_position_size, #asset29_price, #asset29_position_size, #asset30_price, #asset30_position_size').html(0);
      
        $('#data_id_output, #asset_signal_created, #asset1_signal_position, #asset1_signal_size, #asset2_signal_position, #asset2_signal_size, #asset3_signal_position, #asset3_signal_size, #asset4_signal_position, #asset4_signal_size, #asset5_signal_position, #asset5_signal_size').html(0);
        $('#asset6_signal_position, #asset6_signal_size, #asset7_signal_position, #asset7_signal_size, #asset8_signal_position, #asset8_signal_size, #asset9_signal_position, #asset9_signal_size, #asset10_signal_position, #asset10_signal_size').html(0);
        $('#asset11_signal_position, #asset11_signal_size, #asset12_signal_position, #asset12_signal_size, #asset13_signal_position, #asset13_signal_size, #asset14_signal_position, #asset14_signal_size, #asset15_signal_position, #asset15_signal_size').html(0);
        $('#asset16_signal_position, #asset16_signal_size, #asset17_signal_position, #asset17_signal_size, #asset18_signal_position, #asset18_signal_size, #asset19_signal_position, #asset19_signal_size, #asset20_signal_position, #asset20_signal_size').html(0);
        $('#asset21_signal_position, #asset21_signal_size, #asset22_signal_position, #asset22_signal_size, #asset23_signal_position, #asset23_signal_size, #asset24_signal_position, #asset24_signal_size, #asset25_signal_position, #asset25_signal_size').html(0);
        $('#asset26_signal_position, #asset26_signal_size, #asset27_signal_position, #asset27_signal_size, #asset28_signal_position, #asset28_signal_size, #asset29_signal_position, #asset29_signal_size, #asset30_signal_position, #asset30_signal_size').html(0);
        
        $('#tested_data_period').val('No Data Tested');
        $("#progress_bar_value").html("0%"); 
        $("#progress_bar").css("width","0%")

        account_trade_summary = [];
        $("#account_trade_summary_tbl>tbody").empty();
        $("#pagination_trade_summary").twbsPagination("destroy");

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
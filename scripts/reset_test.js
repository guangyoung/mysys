//STEP 4. RESET TEST
//Ini adalah step reset test ..........................,.............................
//...................................................................................
//...................................................................................

async function reset_test() {

  await $.ajax({
    type: "DELETE",
    url: "https://api.quantxi.com/reset_data?api_key=" + localStorage.getItem("apiKey"),
    dataType: 'json',
    success: function (result) {
      if (result.status == "success") {

        Swal.fire(
          'Reset Data Success !',
          'Please click Market Data and Create It',
          'success'
      )

        // $(':button').prop('disabled', false); //Enable All Button 
        $("#setting_button").prop("disabled", false); //Enable Setting Button
        $("#data_button").prop("disabled", false); //Enable Market Data Button
        $("#play_button").prop("disabled", false); //Enable Play Button
        // account_trade_summary = [];
        // asset_trade_details = [];
        // $("#account_trade_summary_tbl>tbody").empty();
        // $("#pagination_trade_summary").twbsPagination("destroy");
        // performance_chart = new Chart();
        $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
        $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
        $('#maintenance_margin_req').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#excess_liquidity').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
        $('#regT_margin_req').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#excess_equity').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));

        $('#quantxi_equity').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#buyhold_equity').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#quantxi_total_return').html(parseFloat(0).toFixed(2) + "%");
        $('#buyhold_total_return').html(parseFloat(0).toFixed(2) + "%");
        $('#quantxi_cagr').html(parseFloat(0).toFixed(2) + "%");
        $('#buyhold_cagr').html(parseFloat(0).toFixed(2) + "%");

        $('#total_request').html(0);
        
        $('#data_input_id').html("-");
        for(i=1; i<=30; i++){
            $("#price_stock"+i).html("-");
            $("#position_stock"+i).html("-");
        }

        $('#data_output_id').html("-");
        for(i=1; i<=30; i++){
            $("#signal_position_stock"+i).html("-");
            $("#signal_size_stock"+i).html("-");
        }  
        

      } else {
        alert(`gagal koneksi, periksa api key anda`);
        return false;
      }
    },
    error: function () {
      alert(`koneksi ke server gagal, coba beberapa saat lagi`);
      return false;
    }
  })
}
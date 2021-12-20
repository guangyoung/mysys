//STEP 4. RESET TEST
//Ini adalah step reset test ..........................,.............................
//...................................................................................
//...................................................................................

async function reset_test() {

  //-------------------------------------------------------------
  //   var x = 1;
  //   var y = 2;
  //   var signal_output_arr = new Array();
  //   var signal_output = {
  //     data_id: 2,
  //     stock01_signal_position: "BUY",
  //     signalSize_stock1: 100,
  //     stock02_signal_position: "SELL",
  //     signalSize_stock2: 200
  // };
  // signal_output_arr.push(signal_output);//save data to array signal_output_history 
  // console.log(eval(`signal_output.signalSize_stock`+x));
  // console.log(eval(`signal_output.signalSize_stock`+y));
  //----------------------------------------------------------------

  // let csvContent = "data:text/csv;charset=utf-8,"
  //   + array_test_data.map(e => e.join(",")).join("\n");

  // var encodedUri = encodeURI(csvContent);
  // var link = document.createElement("a");
  // link.setAttribute("href", encodedUri);
  // link.setAttribute("download", "my_data.csv");
  // // document.body.appendChild(link); // Required for FF

  // link.click(); // This will download the data file named "my_data.csv".

  //------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------
 
  // let ur = "https://api.quantxi.com/reset?api_key=" + localStorage.getItem("apiKey");

  // await $.ajax({
  //   type: "DELETE",
  //   url: ur,
  //   dataType: 'json',
  //   success: function (result) {
  //     if (result.status == "success") {

  //       // alert("reset sukses");

  //       Swal.fire(
  //         'Reset Data Success !',
  //         'Please click Market Data and Create It',
  //         'success'
  //     )

  //       // $(':button').prop('disabled', false); //Enable All Button 
  //       $("#setting_button").prop("disabled", false); //Enable Setting Button
  //       $("#data_button").prop("disabled", false); //Enable Market Data Button
  //       $("#play_button").prop("disabled", false); //Enable Play Button
  //       // account_trade_summary = [];
  //       // asset_trade_details = [];
  //       // $("#account_trade_summary_tbl>tbody").empty();
  //       // $("#pagination_trade_summary").twbsPagination("destroy");
  //       // performance_chart = new Chart();
  //       $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
  //       $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
  //       $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
  //       $('#maintenance_margin_reserved').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
  //       $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
  //       $('#initial_margin_reserved').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
  //       $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
  //       $('#margin_buying_power').html(Intl.NumberFormat().format(parseFloat(2000000).toFixed(0)));

  //       $('#quantxi_total_return').html(parseFloat(0).toFixed(2) + "%");
  //       $('#buyandhold_total_return').html(parseFloat(0).toFixed(2) + "%");
  //       $('#quantxi_cagr').html(parseFloat(0).toFixed(2) + "%");
  //       $('#buyandhold_cagr').html(parseFloat(0).toFixed(2) + "%");
  //       $('#quantxi_maxdd').html(parseFloat(0).toFixed(2) + "%");
  //       $('#buyandhold_maxdd').html(parseFloat(0).toFixed(2) + "%");
  //       $('#quantxi_sharpe').html(parseFloat(0).toFixed(2) + "%");
  //       $('#buyandhold_sharpe').html(parseFloat(0).toFixed(2) + "%");
  //       $('#quantxi_sortino').html(parseFloat(0).toFixed(2) + "%");
  //       $('#buyandhold_sortino').html(parseFloat(0).toFixed(2) + "%");

  //       $('#total_request').html(0);

        
  //       $('#data_input_id').html("-");
  //       $('#margin_buyingPower').html("-");
  //       for(i=1; i<=30; i++){
  //           $("#price_stock"+i).html("-");
  //           $("#position_stock"+i).html("-");
  //       }

  //       $('#data_output_id').html("-");
  //       $('#signaltimestamp').html("-");
  //       for(i=1; i<=30; i++){
  //           $("#signal_position_stock"+i).html("-");
  //           $("#signal_size_stock"+i).html("-");
  //       }  
        

  //     } else {
  //       alert(`gagal koneksi, periksa api key anda`);
  //       return false;
  //     }
  //   },
  //   error: function () {
  //     alert(`koneksi ke server gagal, coba beberapa saat lagi`);
  //     return false;
  //   }
  // })

  autorun();

  Swal.fire(
            'Reset Data Success !',
            'Please click Market Data and Create It',
            'success'
        )
  
}
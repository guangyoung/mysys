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

        $(':button').prop('disabled', false); //Enable All Button 

        let account_trade_summary_row = 
          `<tr style="height: 295px">
              <td colspan="20" style="text-align: center">
                  <h1>No Data</h1>
              </td>
          </tr>`
        $("#account_trade_summary_tbl>tbody").empty();
        $("#account_trade_summary_tbl>tbody").append(account_trade_summary_row);

         var request_element =
        `<tr style="height: 364px">
            <td style="text-align: center">
                <h1>No Data</h1>
            </td>
            <td style="text-align: center; border-left: 1px #c0c0c0 solid">
                <h1>No Data</h1>
            </td>
        </tr>`
        $("#allpost_tbl>tbody").empty();
        $("#allpost_tbl>tbody").append(request_element);

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
        $('#buying_power').html(Intl.NumberFormat().format(parseFloat(2000000).toFixed(0)));

        $('#quantxi_equity').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#buyhold_equity').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#quantxi_total_return').html(parseFloat(0).toFixed(2) + "%");
        $('#buyhold_total_return').html(parseFloat(0).toFixed(2) + "%");
        $('#quantxi_cagr').html(parseFloat(0).toFixed(2) + "%");
        $('#buyhold_cagr').html(parseFloat(0).toFixed(2) + "%");

        $('#total_request').html(0);
        
        $('#data_input_id').html("-");
        $('#buyingPower').html("-");
        for(i=1; i<=30; i++){
            $("#price_stock"+i).html("-");
            $("#position_stock"+i).html("-");
        }

        $('#data_output_id').html("-");
        $('#signaltimestamp').html("-");
        for(i=1; i<=30; i++){
            $("#signal_position_stock"+i).html("-");
            $("#signal_size_stock"+i).html("-");
        }  

        portfolio_data = [];
        test_data = [];
        ticker_list = [];
        exchange_choose_current_manual = "";
        exchange_choose_previous_manual = "";
        exchange_choose_current_random = "";
        exchange_choose_previous_random = "";
        

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
  window.location.href;
}
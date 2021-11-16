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
 
// autorun();
window.open(downloadableCSV(test_data));

function autorun() {     
  Papa.parse("dataset/yahoo_tickers_list.csv", {
      download: true,
      header: true,
      complete: function(result) {
          // var arr = [];
          // let i = 0;     
          for (let i = 0; i < 5; i++) {
              setTimeout(function timer() {
                  console.log(i);
                  // var r = Math.floor(Math.random() * 1000) + 1;
                  // if(arr.indexOf(r) === -1) {
                      let dat = new Array();
                      let ticker= result.data[i].Symbol;
                      let description= result.data[i].Description;
                      let exchange= result.data[i].Exchange;
                      let country= result.data[i].Country; 
                      const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                      const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=9999999999&interval=1d";
                      $.getJSON(proxyurl+urls, function(data){ 
                          if(data.chart.result !== null) {                                
                              if(data.chart.result[0].timestamp !== undefined) {
                                  let sd = data.chart.result[0].timestamp[0];
                                  dat.push({date: data.chart.result[0].timestamp, price: data.chart.result[0].indicators.adjclose[0].adjclose});
                                  historical_data = {
                                      ticker: ticker,
                                      description: description,
                                      exchange: exchange,
                                      country: country,
                                      startdate: sd,                                        
                                      data: JSON.stringify(dat)
                                  } 
                                  console.log(dat);
                                  // $.ajax({
                                  //     type: "POST",
                                  //     url: "https://api.quantxi.com/add_data",
                                  //     data: historical_data,             
                                  //     dataType: 'json'
                                  // })
                                  // dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
                                  // stock_data.push({exchange: exchange, ticker: ticker, description: description, data: dat});
                                  // console.log(stock_data[stock_data.length-1].exchange);
                                  // console.log(stock_data[stock_data.length-1].ticker);
                                  // console.log(stock_data[stock_data.length-1].description);
                                  // console.log(stock_data[stock_data.length-1].data[0].length);
                                  // console.log(stock_data.length);
                              }                        
                          } 
                      }); 
                      
              }, i * 500);           
          } 
      }
  });   
}
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
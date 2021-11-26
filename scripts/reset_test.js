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

  // autorun();

  //---------------------------------------------------------------------

  // let csvContent = "data:text/csv;charset=utf-8,"
  //   + array_test_data.map(e => e.join(",")).join("\n");

  // var encodedUri = encodeURI(csvContent);
  // var link = document.createElement("a");
  // link.setAttribute("href", encodedUri);
  // link.setAttribute("download", "my_data.csv");
  // document.body.appendChild(link); // Required for FF

  // link.click(); // This will download the data file named "my_data.csv".

  //-------------------------------------------------------------------------------

  // function autorun() {     
  //   Papa.parse("dataset/yahoo_tickers_list.csv", {
  //       download: true,
  //       header: true,
  //       complete: function(result) {
  //           // var arr = [];
  //           // let i = 0;     
  //           for (let i = 0; i < 5; i++) {
  //               setTimeout(function timer() {
  //                   console.log(i);
  //                   // var r = Math.floor(Math.random() * 1000) + 1;
  //                   // if(arr.indexOf(r) === -1) {
  //                       let dat = new Array();
  //                       let ticker= result.data[i].Symbol;
  //                       let description= result.data[i].Description;
  //                       let exchange= result.data[i].Exchange;
  //                       let country= result.data[i].Country; 
  //                       const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
  //                       const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=9999999999&interval=1d";
  //                       $.getJSON(proxyurl+urls, function(data){ 
  //                           if(data.chart.result !== null) {                                
  //                               if(data.chart.result[0].timestamp !== undefined) {
  //                                   let sd = data.chart.result[0].timestamp[0];
  //                                   dat.push({date: data.chart.result[0].timestamp, price: data.chart.result[0].indicators.adjclose[0].adjclose});
  //                                   historical_data = {
  //                                       ticker: ticker,
  //                                       description: description,
  //                                       exchange: exchange,
  //                                       country: country,
  //                                       startdate: sd,                                        
  //                                       data: JSON.stringify(dat)
  //                                   } 
  //                                   console.log(dat);
  //                                   // $.ajax({
  //                                   //     type: "POST",
  //                                   //     url: "https://api.quantxi.com/add_data",
  //                                   //     data: historical_data,             
  //                                   //     dataType: 'json'
  //                                   // })
  //                                   // dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
  //                                   // stock_data.push({exchange: exchange, ticker: ticker, description: description, data: dat});
  //                                   // console.log(stock_data[stock_data.length-1].exchange);
  //                                   // console.log(stock_data[stock_data.length-1].ticker);
  //                                   // console.log(stock_data[stock_data.length-1].description);
  //                                   // console.log(stock_data[stock_data.length-1].data[0].length);
  //                                   // console.log(stock_data.length);
  //                               }                        
  //                           } 
  //                       }); 

  //               }, i * 500);           
  //           } 
  //       }
  //   });   
  // }

  let ur = "https://api.quantxi.com/reset?api_key=" + localStorage.getItem("apiKey");

  // var dataReset = {
  //   data_id: 0,
  //   margin_available: 0,
  //   stock1: {
  //     price: 0,
  //     position_size: 0
  //   },
  //   stock2: {
  //     price: stock_price[1],
  //     position_size: stock_position_size[1]
  //   },
  //   stock3: {
  //     price: stock_price[2],
  //     position_size: stock_position_size[2]
  //   },
  //   stock4: {
  //     price: stock_price[3],
  //     position_size: stock_position_size[3]
  //   },
  //   stock5: {
  //     price: stock_price[4],
  //     position_size: stock_position_size[4]
  //   },
  //   stock6: {
  //     price: stock_price[5],
  //     position_size: stock_position_size[5]
  //   },
  //   stock7: {
  //     price: stock_price[6],
  //     position_size: stock_position_size[6]
  //   },
  //   stock8: {
  //     price: stock_price[7],
  //     position_size: stock_position_size[7]
  //   },
  //   stock9: {
  //     price: stock_price[8],
  //     position_size: stock_position_size[8]
  //   },
  //   stock10: {
  //     price: stock_price[9],
  //     position_size: stock_position_size[9]
  //   },
  //   stock11: {
  //     price: stock_price[10],
  //     position_size: stock_position_size[10]
  //   },
  //   stock12: {
  //     price: stock_price[11],
  //     position_size: stock_position_size[11]
  //   },
  //   stock13: {
  //     price: stock_price[12],
  //     position_size: stock_position_size[12]
  //   },
  //   stock14: {
  //     price: stock_price[13],
  //     position_size: stock_position_size[13]
  //   },
  //   stock15: {
  //     price: stock_price[14],
  //     position_size: stock_position_size[14]
  //   },
  //   stock16: {
  //     price: stock_price[15],
  //     position_size: stock_position_size[15]
  //   },
  //   stock17: {
  //     price: stock_price[16],
  //     position_size: stock_position_size[16]
  //   },
  //   stock18: {
  //     price: stock_price[17],
  //     position_size: stock_position_size[17]
  //   },
  //   stock19: {
  //     price: stock_price[18],
  //     position_size: stock_position_size[18]
  //   },
  //   stock20: {
  //     price: stock_price[19],
  //     position_size: stock_position_size[19]
  //   },
  //   stock21: {
  //     price: stock_price[20],
  //     position_size: stock_position_size[20]
  //   },
  //   stock22: {
  //     price: stock_price[21],
  //     position_size: stock_position_size[21]
  //   },
  //   stock23: {
  //     price: stock_price[22],
  //     position_size: stock_position_size[22]
  //   },
  //   stock24: {
  //     price: stock_price[23],
  //     position_size: stock_position_size[23]
  //   },
  //   stock25: {
  //     price: stock_price[24],
  //     position_size: stock_position_size[24]
  //   },
  //   stock26: {
  //     price: stock_price[25],
  //     position_size: stock_position_size[25]
  //   },
  //   stock27: {
  //     price: stock_price[26],
  //     position_size: stock_position_size[26]
  //   },
  //   stock28: {
  //     price: stock_price[27],
  //     position_size: stock_position_size[27]
  //   },
  //   stock29: {
  //     price: stock_price[28],
  //     position_size: stock_position_size[28]
  //   },
  //   stock30: {
  //     price: stock_price[29],
  //     position_size: stock_position_size[29]
  //   }
  // };

  await $.ajax({
    type: "DELETE",
    url: ur,
    // contentType: 'application/json',
    // dataType: 'json',
    success: function (result) {
      if (result.status == "success") {

        alert("reset sukses");

        $(':button').prop('disabled', false); //Enable All Button 
        // account_trade_summary = [];
        // asset_trade_details = [];
        // $("#account_trade_summary_tbl>tbody").empty();
        // $("#pagination_trade_summary").twbsPagination("destroy");
        // performance_chart = new Chart();
        $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
        $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
        $('#maintenance_margin_reserved').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));
        $('#initial_margin_reserved').html(Intl.NumberFormat().format(parseFloat(0).toFixed(0)));
        $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(1000000).toFixed(0)));

        $('#quantxi_total_return').html(parseFloat(0).toFixed(2) + "%");
        $('#buyandhold_total_return').html(parseFloat(0).toFixed(2) + "%");
        $('#quantxi_cagr').html(parseFloat(0).toFixed(2) + "%");
        $('#buyandhold_cagr').html(parseFloat(0).toFixed(2) + "%");
        $('#quantxi_maxdd').html(parseFloat(0).toFixed(2) + "%");
        $('#buyandhold_maxdd').html(parseFloat(0).toFixed(2) + "%");
        $('#quantxi_sharpe').html(parseFloat(0).toFixed(2) + "%");
        $('#buyandhold_sharpe').html(parseFloat(0).toFixed(2) + "%");
        $('#quantxi_sortino').html(parseFloat(0).toFixed(2) + "%");
        $('#buyandhold_sortino').html(parseFloat(0).toFixed(2) + "%");

        $('#total_request').html(0);

        let input_element =
          `<tr>
              <td colspan="3"
                  style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Data ID</td>
              <td colspan="3"
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td colspan="3"
                  style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Margin Available</td>
              <td colspan="3"
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock #</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 43px">
                  Stock<br>&nbsp;&nbsp;&nbsp;Price&nbsp;&nbsp;&nbsp;</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 55px">
                  Position<br>Size</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock #</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 43px">
                  Stock<br>&nbsp;&nbsp;&nbsp;Price&nbsp;&nbsp;&nbsp;</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 55px">
                  Position<br>Size</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;1</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;16</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;2</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;17</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;3</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;18</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;4</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;19</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;5</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;20</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;6</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;21</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;7</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;22</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;8</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;23</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;9</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;24</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;10</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;25</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;11</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;26</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;12</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;27</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;13</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;28</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;14</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;29</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;15</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;30</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>`

        $("#inputElement").html(input_element);

        let output_element =
          `<tr>
              <td colspan="3"
                  style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Data ID</td>
              <td colspan="3"
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td colspan="3"
                  style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Total Signal</td>
              <td colspan="3"
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock #</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 45px">
                  Signal<br>&nbsp;Position&nbsp;</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 53px">
                  Signal<br>&nbsp;Size&nbsp;</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock #</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 45px">
                  Signal<br>&nbsp;Position&nbsp;</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 53px">
                  Signal<br>&nbsp;Size&nbsp;</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;1</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;16</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;2</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;17</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;3</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;18</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;4</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;19</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;5</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;20</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;6</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;21</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;7</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;22</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;8</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;23</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;9</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;24</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;10</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;25</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;11</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;26</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;12</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;27</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;13</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;28</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;14</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;29</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>
          <tr>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;15</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">
                  Stock&nbsp;30</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
              <td
                  style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">-</td>
          </tr>`

        $("#outputElement").html(output_element);

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
 //RUN TEST -------------------------------------------------------------------------------
 //GLOBAL VARIABLE
 var tradeTesting_report = new Array();
 
 async function run_test() {
   //-----------------------------------------------------------------------------------
    var startDate = $("#test_startdate").val();
    var endDate = $("#test_enddate").val();
    var date;

     //trade details variable
     var price = new Array();
     var preTrade_positionSize = new Array();
     var preTrade_marketValue = new Array();
     var buy_filledOrder = new Array();
     var buy_filledPrice = new Array();
     var buy_tradeValue = new Array();
     var buy_commision = new Array();
     var sell_filledOrder = new Array();
     var sell_filledPrice = new Array();
     var sell_tradeValue = new Array();
     var sell_commision = new Array();
     var postTrade_positionSize = new Array();
     var postTrade_marketValue = new Array();

     for (i=1;i<=30;i++) {
      price[i] = 0;
      preTrade_positionSize[i] = 0;
      preTrade_marketValue[i] = 0;
      buy_filledOrder[i] = 0;
      buy_filledPrice[i] = 0;
      buy_tradeValue[i] = 0;
      buy_commision[i] = 0;
      sell_filledOrder[i] = 0;
      sell_filledPrice[i] = 0;
      sell_tradeValue[i] = 0;
      sell_commision[i] = 0;
      postTrade_positionSize
      postTrade_marketValue[i] = 0;
     }
     
     //account & trade summary variable  
     var preTrade_cashBalance = initial_equity;
     var preTrade_mtd_acruedInterest = 0;
     var preTrade_long_marketValue = 0;
     var preTrade_equity_with_loanValue = 0;
     var preTrade_net_liquidationValue = 0;
     var preTrade_maintenanceMargin = 0;
     var preTrade_regT_marginReq = 0;
     var preTrade_excessLiquidity = 0;
     var preTrade_sma_excessEquity = 0;
     var preTrade_buyingPower = 0;
     var postTrade_cashBalance = 0;
     var postTrade_mtd_acruedInterest = 0;
     var postTrade_long_marketValue = 0;
     var postTrade_equity_with_loanValue = 0;
     var postTrade_net_liquidationValue = 0;
     var postTrade_maintenanceMargin = 0;
     var postTrade_regT_marginReq = 0;
     var postTrade_excessLiquidity = 0;
     var postTrade_sma_excessEquity = 0;
     var postTrade_buyingPower = 0; 

     //Buy & Hold Variable
     var stock_buyHold = new Array();
     for(i=1;i<=30;i++) {
      stock_buyHold[i] = initial_equity/30;
     } 

   //------------------------------------------------------------------------------------------------------------  
   //cek test setting

   //cek test data
   if (port_data.length < 1000) {
     alert(`tidak ada data atau data kurang untuk test `);
     return false;
   } else {    
    var idx_start = port_data[0].indexOf(startDate);
    var idx_end = port_data[0].indexOf(endDate);
    var data_length = port_data[0].length;
    var test_length = idx_end-idx_start;    
   }

   //Disable Button
  $('#setting_button').attr('disabled',true);
  $('#data_button').attr('disabled',true);
  $('#play_button').attr('disabled',true);
  $('#refresh_button').attr('disabled',true);
  $('#viewpost_button').attr('disabled',true);
  $('#trade_report_button').attr('disabled',true);
  $('#chart_button').attr('disabled',true);

   //PROSES DATA
    //  async function proses() {
       while (data_id <= test_length) { //sbelumnya if bukan while
          
       date = port_data[0][(idx_start+(data_id-1))];
           
       //PRE TRADE POSITION          
         //stocks price & position size
         for (i=1;i<=30;i++) {  
            price[i]                        = parseFloat(port_data[i][(idx_start+(data_id-1))]);
            preTrade_positionSize[i]        = postTrade_positionSize[i]               
            preTrade_marketValue[i]         = preTrade_positionSize[i]  * price[i];            
         }
         //account summary
            preTrade_cashBalance          = cash - margin_used + margin_back - trade_cost_summary - daily_interest;                             
         
            market_value_summary          = market_value.reduce(function (accumulator, current) { return accumulator + current; });
         
            margin_loan_balance_summary   = margin_loan_balance.reduce(function (accumulator, current) { return accumulator + current; });
         
            equity                        = cash + market_value_summary - margin_loan_balance_summary;
            
            maintenance_margin            = market_value_summary * maintmargin_rate;

            regT_margin_req               = market_value_summary * regTmargin_rate;

            margin_available              = equity - regT_margin_req;

       //POST REST API 
            var dataInput = 
            {
              data_id: data_id,
              timeStamp: timeStamp,
              buyingPower: preTrade_buyingPower,
              stock1_price: price[1],
              stock2_price: price[2],
              stock3_price: price[3],
              stock4_price: price[4],
              stock5_price: price[5],
              stock6_price: price[6],
              stock7_price: price[7],
              stock8_price: price[8],
              stock9_price: price[9],
              stock10_price: price[10],
              stock11_price: price[11],
              stock12_price: price[12],
              stock13_price: price[13],
              stock14_price: price[14],
              stock15_price: price[15],
              stock16_price: price[16],
              stock17_price: price[17],
              stock18_price: price[18],
              stock19_price: price[19],
              stock20_price: price[20],
              stock21_price: price[21],
              stock22_price: price[22],
              stock23_price: price[23],
              stock24_price: price[24],
              stock25_price: price[25],
              stock26_price: price[26],
              stock27_price: price[27],
              stock28_price: price[28],
              stock29_price: price[29],
              stock30_price: price[30]
            };

         var post_process = "run";

         while (post_process == "run") {
          
          await $.ajax({
            type: "POST",
            url: "https://api.quantxi.com/post?api="+sessionStorage.getItem("api"),
            data: data_input,             
            dataType: 'json',
            success: function(result){                 
                
            if (result.status == "success") {
              
              post_process = "stop";  

              signal_output.push(
                result.dataID,
                result.timeStamp,
                result.totalSignal_output,
                result.stock1_signal_size,
                result.stock2_signal_size,
                result.stock3_signal_size,
                result.stock4_signal_size,
                result.stock5_signal_size,
                result.stock6_signal_size,
                result.stock7_signal_size,
                result.stock8_signal_size,
                result.stock9_signal_size,
                result.stock10_signal_size,
                result.stock11_signal_size,
                result.stock12_signal_size,
                result.stock13_signal_size,
                result.stock14_signal_size,
                result.stock15_signal_size,
                result.stock16_signal_size,
                result.stock17_signal_size,
                result.stock18_signal_size,
                result.stock19_signal_size,
                result.stock20_signal_size,
                result.stock21_signal_size,
                result.stock22_signal_size,
                result.stock23_signal_size,
                result.stock24_signal_size,
                result.stock25_signal_size,
                result.stock26_signal_size,
                result.stock27_signal_size,
                result.stock28_signal_size,
                result.stock29_signal_size,
                result.stock30_signal_size
              );
              }         
            }
          })
         }         
       
        //  if(signal_output.length > 0) { 
         //TRADE ---------------------------------------------------------------------
           //asset trade details          
           for (i=1, x=3; i<=30 && x<33; i++, x++) {  

            if(signal_output[x] > 0) {
              buy_filledOrder[i]  = parseInt(signal_output[x]);
              buy_filledPrice[i]  = price[i] * (1+bidaskspread);
              buy_tradeValue[i] = buy_filledOrder[i] * buy_filledPrice[i];
              buy_commision[i] = buy_tradeValue[i] * commisionshare;
              sell_filledOrder[i]  = 0;
              sell_filledPrice[i]  = 0;
              sell_tradeValue[i] = 0;
              sell_commision[i] = 0;
            
            } else if(signal_output[x] < 0) {
              buy_filledOrder[i]  = 0;
              buy_filledPrice[i]  = 0;
              buy_tradeValue[i] = 0;
              buy_commision[i] = 0; 
              sell_filledOrder[i]  = parseInt(signal_output[x]);
              sell_filledPrice[i]  = price[i] * (1+bidaskspread);
              sell_tradeValue[i] = sell_filledOrder[i] * sell_filledPrice[i];
              sell_commision[i] = sell_tradeValue[i] * commisionshare;           
            
            } else if(signal_output[x] == 0){
              buy_filledOrder[i]  = 0;
              buy_filledPrice[i]  = 0;
              buy_tradeValue[i] = 0;
              buy_commision[i] = 0;
              sell_filledOrder[i]  = 0;
              sell_filledPrice[i]  = 0;
              sell_tradeValue[i] = 0;
              sell_commision[i] = 0; 
            }
           }  

        //POST TRADE POSITION         
            //stocks price & position size
         for (i=1;i<=30;i++) { 
          postTrade_positionSize[i]        = preTrade_positionSize[i] + buy_filledOrder[i] - sell_filledOrder[i];              
          postTrade_marketValue[i]         = postTrade_positionSize[i]  * price[i];            
       }
       //account summary
          preTrade_cashBalance          = cash - margin_used + margin_back - trade_cost_summary - daily_interest;                             
       
          market_value_summary          = market_value.reduce(function (accumulator, current) { return accumulator + current; });
       
          margin_loan_balance_summary   = margin_loan_balance.reduce(function (accumulator, current) { return accumulator + current; });
       
          equity                        = cash + market_value_summary - margin_loan_balance_summary;
          
          maintenance_margin            = market_value_summary * maintmargin_rate;

          regT_margin_req               = market_value_summary * regTmargin_rate;

          margin_available              = equity - regT_margin_req;

           //trade summary
           margin_used    = buy_trade_margin_used.reduce(function (accumulator, current) { return accumulator + current; });
           margin_back    = sell_trade_margin_back.reduce(function (accumulator, current) { return accumulator + current; });
           loan_used      = buy_trade_margin_loan.reduce(function (accumulator, current) { return accumulator + current; });
           loan_back      = sell_trade_loan_back.reduce(function (accumulator, current) { return accumulator + current; });
           trade_cost_summary  = buy_trade_cost.reduce(function (accumulator, current) { return accumulator + current; })+
                                sell_trade_cost.reduce(function (accumulator, current) { return accumulator + current; });
           daily_interest = (margin_loan_balance_summary + loan_used - loan_back) * interest_rate;//cek lagi rumus dan posisi kolom
        //-------------------------------------------------------------   
         
        //post request response ----------------------------------------------
          data_input_array.push(data_input);//diatur lagi susunan jsonnya
          signal_output_array.push(signal_output);//diatur lagi susunan jsonnya
          //---------------------------------------------------------------
           
          // TRADE REPORT ---------------------------------------------------------------
           //asset trade details array
           var trade_details = new Array();
           for(i=1;i<=30;i++) {             
            trade_details.push({
              stocks : stock1,
              price : price[i],
              pretrade_position_size : pretrade_position_size[i],
              pretrade_market_value : pretrade_market_value[i],
              buy_filled_order : buy_filled_order[i],
              buy_filled_price : buy_filled_price[i],
              buy_trade_value : buy_trade_value[i],
              buy_commision : buy_commision[i],
              sell_filled_order : sell_filled_order[i],
              sell_filled_price : sell_filled_price[i],
              sell_trade_value : sell_trade_value[i],
              sell_commision : sell_commision[i],
              posttrade_position_size : posttrade_position_size[i],
              posttrade_market_value : posttrade_market_value[i]
             })
           }

           var account_summary = new Array();           
           //acount summary array
           account_summary.push({
            //Pre Trade Account Position
            pretrade_cash_balance : pretrade_cash_balance,
            pretrade_mtd_acrued_interest : pretrade_mtd_acrued_interest,
            pretrade_long_market_value : pretrade_long_market_value,
            pretrade_equity_with_loan_value : pretrade_equity_with_loan_value,
            pretrade_net_liquidation_value : pretrade_net_liquidation_value,
            pretrade_maintenance_margin : pretrade_maintenance_margin,
            pretrade_regT_margin_req : pretrade_regT_margin_req,
            pretrade_excess_liquidity : pretrade_excess_liquidity,
            pretrade_sma_excess_equity : pretrade_sma_excess_equity,
            pretrade_buying_power : pretrade_buying_power, 
            //Post Trade Account Position
            posttrade_cash_balance : posttrade_cash_balance,
            posttrade_mtd_acrued_interest : posttrade_mtd_acrued_interest,
            posttrade_long_market_value : posttrade_long_market_value,
            posttrade_equity_with_loan_value : posttrade_equity_with_loan_value,
            posttrade_net_liquidation_value : posttrade_net_liquidation_value,
            posttrade_maintenance_margin : posttrade_maintenance_margin,
            posttrade_regT_margin_req : posttrade_regT_margin_req,
            posttrade_excess_liquidity : posttrade_excess_liquidity,
            posttrade_sma_excess_equity : posttrade_sma_excess_equity,
            posttrade_buying_power : posttrade_buying_power    
           });

           tradeTesting_report.push({date: date, trade_details: trade_details, account_summary: account_summary});
           //-------------------------------------------------------------------
           // view....---------------------------------------------------------------------
          $('#total_post').html(data_id); 
          $("#tested_data_period").val(port_data[0][idx_start]+' - '+port_data[0][(idx_start+(data_id-1))]);
          $("#progress_bar_value").html(parseFloat((data_id/data_length)*100).toFixed(2)+"%"); 
          $("#progress_bar").css("width",parseFloat((data_id/data_length)*100).toFixed(2)+"%");           
          //----------------------------------------------------------------------------------
           
           //Performance Comparison --------------------------------------------------------
          var period = new Date(new Date(port_data[0][(idx_start+(data_id-1))])-new Date(port_data[0][idx_start])).getUTCFullYear() - 1970;
          console.log(period);
           var quantxi_equity = equity;

           var asset_equity_buyandhold = [];
           for(i=1;i<31;i++) {
              asset_equity_buyandhold[i] = (stock_invest[i]/parseFloat(port_data[i][idx_start]))*parseFloat(port_data[i][(idx_start+(data_id-1))]); 
           }
           
           var buyandhold_equity = asset_equity_buyandhold.reduce(function (accumulator, current) { return accumulator + current; });           
           var quantxi_total_return = equity/initial_equity;
           var buyandhold_total_return = buyandhold_equity/equity;
           var quantxi_cagr = ((quantxi_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
           var buyandhold_cagr = ((buyandhold_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
           var quantxi_maxdd = (
              1
           );
           var buyandhold_maxdd = (
             1
           );
           var quantxi_mar_ratio = (
            1
           );
           var buyandhold_mar_ratio = (
            1
           );
           var quantxi_sharpe_ratio = (
            1
           );
           var buyandhold_sharpe_ratio = (
            1
           );
           var quantxi_treynor_ratio = (
            1
           );
           var buyandhold_treynor_ratio = (
            1
           );

           $('#quantxi_equity').html(Intl.NumberFormat().format(parseFloat(quantxi_equity).toFixed(0))); 
           $('#buyandhold_equity').html(Intl.NumberFormat().format(parseFloat(buyandhold_equity).toFixed(0))); 
           $('#quantxi_total_return').html(parseFloat((quantxi_total_return)*100).toFixed(2)+"%"); 
           $('#buyandhold_total_return').html(parseFloat((buyandhold_total_return)*100).toFixed(2)+"%");
           $('#quantxi_cagr').html(parseFloat((quantxi_cagr)*100).toFixed(2)+"%"); 
           $('#buyandhold_cagr').html(parseFloat((buyandhold_cagr)*100).toFixed(2)+"%");
           $('#quantxi_maxdd').html(parseFloat((quantxi_maxdd)*100).toFixed(2)+"%"); 
           $('#buyandhold_maxdd').html(parseFloat((buyandhold_maxdd)*100).toFixed(2)+"%"); 
           $('#quantxi_mar_ratio').html(parseFloat((quantxi_mar_ratio)*100).toFixed(2)+"%"); 
           $('#buyandhold_mar_ratio').html(parseFloat((buyandhold_mar_ratio)*100).toFixed(2)+"%");
           $('#quantxi_sharpe_ratio').html(parseFloat((quantxi_sharpe_ratio)*100).toFixed(2)+"%"); 
           $('#buyandhold_sharpe_ratio').html(parseFloat((buyandhold_sharpe_ratio)*100).toFixed(2)+"%");
           $('#quantxi_treynor_ratio').html(parseFloat((quantxi_treynor_ratio)*100).toFixed(2)+"%"); 
           $('#buyandhold_treynor_ratio').html(parseFloat((buyandhold_treynor_ratio)*100).toFixed(2)+"%");     
            //--------------------------------------------------------------------
            //Performance Chart ---------------------------------------------
            date_array.push(date);
            quantxi_equity_array.push(parseFloat(equity).toFixed(0));    
            buyandhold_equity_array.push(parseFloat(buyandhold_equity).toFixed(0));            
            //------------------------------------------------------------------
           //add data ID -------------------------------------------------------
           data_id++; // lanjut id berikutnya, cek lagi posisi tambah id ini ?  
           //-----------------------------------------------------------     
        //  }     
       } 

      //performance chart
      var performance_chart;

      chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)' };

      var config = {
      type: 'line',
      data: {
          labels: date_array,
          datasets: [{
          label: 'Quantxi',
          pointRadius: 1,
          borderWidth: 1,
          backgroundColor: chartColors.red,
          borderColor: chartColors.red,
          data: quantxi_equity_array,
          fill: false },
          {
          label: 'Buy & Hold',
          pointRadius: 1,
          borderWidth: 1,
          backgroundColor: chartColors.blue,
          borderColor: chartColors.blue,
          data: buyandhold_equity_array,
          fill: false}
          ]},
      options: {

      responsive: true,
      legend: {
          display: true
      },
      title: {
      display: true,
      text: 'Performance Comparison' },
      tooltips: {
          mode: 'index',
          intersect: true },
      hover: {
      mode: 'nearest',
      intersect: true },
      // events:[],
      scales: {
      xAxes: [{
          display: true,
          scaleLabel: {
          display: true,
          labelString: 'Years' } }],

      yAxes: [{
      display: true,
      ticks: {
          callback: function(value, index, values) {
          return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
          }
      },
      scaleLabel: {
          display: true,
          labelString: 'Equity' } }] } } };

      if(performance_chart!=null){
          performance_chart.destroy();
      }
      var ctx = document.getElementById('performance_chart').getContext('2d');
      performance_chart = new Chart(ctx, config);
       
      //  else {
        //Enable Button
        $('#setting_button').attr('disabled',false);
        $('#data_button').attr('disabled',false);
        $('#start_date').val('');
        $('#play_button').attr('disabled',true);
        $('#pause_button').attr('disabled',true);
        $('#refresh_button').attr('disabled',false);
        $('#viewpost_button').attr('disabled',false);
        $('#trade_report_button').attr('disabled',false);
        $('#chart_button').attr('disabled',false);
        $('#statistik_button').attr('disabled',false);
     
        alert(`data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
        return false;   
 }
 //RUN TEST -------------------------------------------------------------------------------
 //GLOBAL VARIABLE
 var asset_trade_details = new Array();
 var account_trade_summary = new Array();
 
 async function run_test() {
   //-----------------------------------------------------------------------------------
      
    var date_array = new Array();
    var quantxi_equity_array = new Array();
    var buyandhold_equity_array = new Array();
    // var data_input_array = new Array();
    // var signal_output_array = new Array();

    //  var start_date = $('#test_startdate').val().split("-")[1] + '/' + $('#test_startdate').val().split("-")[2] + '/' + $('#test_startdate').val().split("-")[0];
     //cek lagi stardate diatas
     
    //  var data_id = 1;
     
     var date;

     //trade details variable
     var price = new Array();
     var pretrade_position_size = new Array();
     var pretrade_market_value = new Array();
     var buy_quantxi_signal = new Array();
     var buy_filled_order = new Array();
     var buy_filled_price = new Array();
     var buy_trade_value = new Array();
     var buy_commision = new Array();
     var sell_quantxi_signal = new Array();
     var sell_filled_order = new Array();
     var sell_filled_price = new Array();
     var sell_trade_value = new Array();
     var sell_commision = new Array();
     var posttrade_position_size = new Array();
     var posttrade_market_value = new Array();

     for (i=1;i<=30;i++) {
      price[i] = 0;
      pretrade_position_size[i] = 0;
      pretrade_market_value[i] = 0;
      buy_quantxi_signal[i] = 0;
      buy_filled_order[i] = 0;
      buy_filled_price[i] = 0;
      buy_trade_value[i] = 0;
      buy_commision[i] = 0;
      sell_quantxi_signal[i] = 0;
      sell_filled_order[i] = 0;
      sell_filled_price[i] = 0;
      sell_trade_value[i] = 0;
      sell_commision[i] = 0;
      posttrade_position_size
      posttrade_market_value[i] = 0;
     }
     
     //account & trade summary variable  
     var pretrade_cash_balance = initial_equity;
     var pretrade_mtd_acrued_interest = 0;
     var pretrade_long_market_value = 0;
     var pretrade_equity_with_loan_value = 0;
     var pretrade_net_liquidation_value = 0;
     var pretrade_maintenance_margin = 0;
     var pretrade_regT_margin_req = 0;
     var pretrade_excess_liquidity = 0;
     var pretrade_sma_excess_equity = 0;
     var pretrade_buying_power = 0;
     var posttrade_cash_balance = 0;
     var posttrade_mtd_acrued_interest = 0;
     var posttrade_long_market_value = 0;
     var posttrade_equity_with_loan_value = 0;
     var posttrade_net_liquidation_value = 0;
     var posttrade_maintenance_margin = 0;
     var posttrade_regT_margin_req = 0;
     var posttrade_excess_liquidity = 0;
     var posttrade_sma_excess_equity = 0;
     var posttrade_buying_power = 0; 

     //Buy & Hold Variable
     var stock_invest = new Array();
     for(i=1;i<=30;i++) {
      stock_invest[i] = initial_equity/30;
     } 

   //------------------------------------------------------------------------------------------------------------  
   //cek test setting

   //cek test data
   if (port_data.length < 1000) {
     alert(`tidak ada data untuk test atau data kurang`);
     return false;
   } else {    
    var idx_start = port_data[0].indexOf(start_date);
    console.log(idx_start);
    var data_length = port_data[0].length;    
   }

   //Disable Button
  $('#setting_button').attr('disabled',true);
  $('#data_button').attr('disabled',true);
  $('#start_date').val('');
  $('#play_button').attr('disabled',true);
  $('#pause_button').attr('disabled',false);
  $('#refresh_button').attr('disabled',true);
  $('#viewpost_button').attr('disabled',true);
  $('#trade_report_button').attr('disabled',true);
  $('#chart_button').attr('disabled',true);
  // $('#statistik_button').attr('disabled',true);
  // $('#logout_button').attr('disabled',true);

   //PROSES DATA
    //  async function proses() {
       while (data_id <= (data_length-idx_start)) { //sbelumnya if bukan while
       
      //  var data_input;
       var signal_output = new Array();
      
       date = port_data[0][(idx_start+(data_id-1))];
           
       //PRE TRADE POSITION          
         //asset trade details
         for (i=1;i<=30;i++) {  
            price[i]                = parseFloat(port_data[i][(idx_start+(data_id-1))]);
            position_size[i]        = position_size[i] + buy_trade_size[i] - sell_trade_size[i];              
            market_value[i]         = position_size[i] * price[i];
            margin_loan_balance[i]  = margin_loan_balance[i] + buy_trade_margin_loan[i] - sell_trade_loan_back[i];            
         }
         //account summary
            cash                          = cash - margin_used + margin_back - trade_cost_summary - daily_interest;                             
         
            market_value_summary          = market_value.reduce(function (accumulator, current) { return accumulator + current; });
         
            margin_loan_balance_summary   = margin_loan_balance.reduce(function (accumulator, current) { return accumulator + current; });
         
            equity                        = cash + market_value_summary - margin_loan_balance_summary;
            
            maintenance_margin            = market_value_summary * maintmargin_rate;

            regT_margin_req               = market_value_summary * regTmargin_rate;

            margin_available              = equity - regT_margin_req;

       //POST REST API 
         var data_input = 
                  {
                    data_id: data_id,
                    equity_balance: equity,
                    asset1_price: price[1],
                    asset1_position_size: position_size[1],
                    asset2_price: price[2],
                    asset2_position_size: position_size[2],
                    asset3_price: price[3],
                    asset3_position_size: position_size[3],
                    asset4_price: price[4],
                    asset4_position_size: position_size[4],
                    asset5_price: price[5],
                    asset5_position_size: position_size[5],
                    asset6_price: price[6],
                    asset6_position_size: position_size[6],
                    asset7_price: price[7],
                    asset7_position_size: position_size[7],
                    asset8_price: price[8],
                    asset8_position_size: position_size[8],
                    asset9_price: price[9],
                    asset9_position_size: position_size[9],
                    asset10_price: price[10],
                    asset10_position_size: position_size[10],
                    asset11_price: price[11],
                    asset11_position_size: position_size[11],
                    asset12_price: price[12],
                    asset12_position_size: position_size[12],
                    asset13_price: price[13],
                    asset13_position_size: position_size[13],
                    asset14_price: price[14],
                    asset14_position_size: position_size[14],
                    asset15_price: price[15],
                    asset15_position_size: position_size[15],
                    asset16_price: price[16],
                    asset16_position_size: position_size[16],
                    asset17_price: price[17],
                    asset17_position_size: position_size[17],
                    asset18_price: price[18],
                    asset18_position_size: position_size[18],
                    asset19_price: price[19],
                    asset19_position_size: position_size[19],
                    asset20_price: price[20],
                    asset20_position_size: position_size[20],
                    asset21_price: price[21],
                    asset21_position_size: position_size[21],
                    asset22_price: price[22],
                    asset22_position_size: position_size[22],
                    asset23_price: price[23],
                    asset23_position_size: position_size[23],
                    asset24_price: price[24],
                    asset24_position_size: position_size[24],
                    asset25_price: price[25],
                    asset25_position_size: position_size[25],
                    asset26_price: price[26],
                    asset26_position_size: position_size[26],
                    asset27_price: price[27],
                    asset27_position_size: position_size[27],
                    asset28_price: price[28],
                    asset28_position_size: position_size[28],
                    asset29_price: price[29],
                    asset29_position_size: position_size[29],
                    asset30_price: price[30],
                    asset30_position_size: position_size[30]
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
              let asset_signal_size = new Array(); 
              asset_signal_size.push(
                result.data.asset1_signal_size,
                result.data.asset2_signal_size,
                result.data.asset3_signal_size,
                result.data.asset4_signal_size,
                result.data.asset5_signal_size,
                result.data.asset6_signal_size,
                result.data.asset7_signal_size,
                result.data.asset8_signal_size,
                result.data.asset9_signal_size,
                result.data.asset10_signal_size,
                result.data.asset11_signal_size,
                result.data.asset12_signal_size,
                result.data.asset13_signal_size,
                result.data.asset14_signal_size,
                result.data.asset15_signal_size,
                result.data.asset16_signal_size,
                result.data.asset17_signal_size,
                result.data.asset18_signal_size,
                result.data.asset19_signal_size,
                result.data.asset20_signal_size,
                result.data.asset21_signal_size,
                result.data.asset22_signal_size,
                result.data.asset23_signal_size,
                result.data.asset24_signal_size,
                result.data.asset25_signal_size,
                result.data.asset26_signal_size,
                result.data.asset27_signal_size,
                result.data.asset28_signal_size,
                result.data.asset29_signal_size,
                result.data.asset30_signal_size
              );
              signal_output.push({data_id: result.data.data_id});
              signal_output.push({signal_timestamp: result.data.signal_timestamp});
              signal_output.push({asset_signal_size: asset_signal_size});
              }         
            }
          })
         }         
       
        //  if(signal_output.length > 0) { 
         //TRADE ---------------------------------------------------------------------
           //asset trade details          
           for (i=1, x=0; i<=30, x<30; i++, x++) {  

            if(signal_output[2].asset_signal_position[x] == "BUY") {
              buy_trade_size[i]  = parseInt(signal_output[3].asset_signal_size[x]);
              sell_trade_size[i] = 0;
            
            } else if(signal_output[2].asset_signal_position[x] == "SELL") {
              buy_trade_size[i] = 0;
              sell_trade_size[i] = parseInt(signal_output[3].asset_signal_size[x]);              
            
            } else if(signal_output[2].asset_signal_position[x] == "HOLD"){
              buy_trade_size[i] = 0;
              sell_trade_size[i] = 0;
            }

            buy_trade_value[i]        = buy_trade_size[i] * price[i];        
            buy_trade_margin_used[i]   = buy_trade_value[i] * regTmargin_rate;
            buy_trade_margin_loan[i]  = buy_trade_value[i] - buy_trade_margin_used[i];
            buy_trade_cost[i]         = (buy_trade_value[i] * bidask_spread) + (buy_trade_value[i] * commision_share);
            
            sell_trade_value[i]        = sell_trade_size[i] * price[i];    
            avg_buy_price[i]            = price[i] * sell_trade_size[i];//dicek lagi rumus ini, hanya sementara saja    
            sell_trade_loan_back[i]   = (avg_buy_price[i] * sell_trade_size[i]) * regTmargin_rate;
            sell_trade_margin_back[i]  = sell_trade_value[i] - sell_trade_loan_back[i];
            sell_trade_cost[i]         = (sell_trade_value[i] * bidask_spread) + (sell_trade_value[i] * commision_share);

           }  

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
           var asset_trade = new Array();
           for(i=1;i<=30;i++) {             
             asset_trade.push({
               price : price[i],
               pretrade_position_size : pretrade_position_size[i],
               pretrade_market_value : pretrade_market_value[i],
               buy_quantxi_signal : buy_quantxi_signal[i],
               buy_filled_order : buy_filled_order[i],
               buy_filled_price : buy_filled_price[i],
               buy_trade_value : buy_trade_value[i],
               buy_commision : buy_commision[i],
               sell_quantxi_signal : sell_quantxi_signal[i],
               sell_filled_order : sell_filled_order[i],
               sell_filled_price : sell_filled_price[i],
               sell_trade_value : sell_trade_value[i],
               sell_commision : sell_commision[i],
               posttrade_position_size : posttrade_position_size[i],
               posttrade_market_value : posttrade_market_value[i]
             })
           }
           asset_trade_details.push({date: date, trade_details: asset_trade});
           
           //acount summary array
           account_trade_summary.push({
            date : date,
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
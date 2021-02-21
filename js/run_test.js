//array
var asset_trade_details = new Array();
var account_trade_summary = new Array();  
 //RUN TEST -------------------------------------------------------------------------------
 async function run_test() {
   //-----------------------------------------------------------------------------------
     //test setting variable
     var initial_equity = parseFloat($("#initial_equity").val());
     var bidask_spread = parseFloat($("#bid_ask_spread").val());
     var commision_share = parseFloat($("#commision_share").val());
     var interest_rate = parseFloat($("#interest_rate").val());
     var riskfree_rate = parseFloat($("#risk_free_rate").val());
     var regTmargin_rate = parseFloat($("#regT_margin").val());
     var maintmargin_rate = parseFloat($("#maint_margin").val());
     var mindata = parseInt($("#min_data").val());
     var maxdata = parseInt($("#max_data").val());
     // var portfoliosize = parseInt($("#portfolio_size").val());

     var data_id = 1;

     //trade details variable
     var asset_price = [];
     var asset_position_size_pretrade = [];
     var asset_market_value_pretrade = [];
     var asset_margin_loan_balance_pretrade = [];
     var asset_trade_position = [];
     var asset_trade_size = [];
     var asset_trade_value = [];
     var asset_trade_margin_req = [];
     var asset_trade_margin_loan = [];
     var asset_trade_cost = [];
     var asset_position_size_posttrade = [];
     var asset_market_value_posttrade = [];
     var asset_margin_loan_balance_posttrade = [];

     for (i=1;i<=30;i++) {
       asset_price[i] = 0;      
       asset_position_size_pretrade[i] = 0;
       asset_market_value_pretrade[i] = 0; 
       asset_margin_loan_balance_pretrade[i] = 0;
       asset_trade_position[i] = "HOLD";
       asset_trade_size[i] = 0;
       asset_trade_value[i] = 0;
       asset_trade_margin_req[i] = 0;
       asset_trade_margin_loan[i] = 0;
       asset_trade_cost[i] = 0; 
       asset_position_size_posttrade[i] = 0;
       asset_market_value_posttrade[i] = 0;
       asset_margin_loan_balance_posttrade[i] = 0;      
     }
     
     //account & trade summary variable
     var cash_pretrade = initial_equity;
     var market_value_pretrade = 0;
     var margin_loan_balance_pretrade = 0;
     var equity_pretrade = cash_pretrade + market_value_pretrade - margin_loan_balance_pretrade;            
     var maintenance_margin = market_value_pretrade * maintmargin_rate;
     var regT_margin_req = market_value_pretrade * regTmargin_rate;
     var margin_available = equity_pretrade - regT_margin_req;
     var buy_trade_value = 0;
     var buy_trade_margin_req = 0;
     var buy_trade_margin_loan = 0;
     var buy_trade_cost = 0;
     var sell_trade_value = 0;
     var sell_trade_margin_req = 0;
     var sell_trade_margin_loan = 0;
     var sell_trade_cost = 0;  
     var cash_posttrade = cash_pretrade - buy_trade_margin_req - buy_trade_cost + sell_trade_margin_req - sell_trade_cost;
     var market_value_posttrade = asset_market_value_posttrade.reduce(function (accumulator, current) { return accumulator + current; });
     var margin_loan_balance_posttrade = asset_margin_loan_balance_posttrade.reduce(function (accumulator, current) { return accumulator + current; });
     var equity_posttrade = cash_posttrade + market_value_posttrade - margin_loan_balance_posttrade;
     var daily_interest = 0;     

    
   //------------------------------------------------------------------------------------------------------------  
   
   //cek test data
   if (port_data.length == 0) {
     alert(`tidak ada data untuk test`);
     return false;
   }
   
   var data_length = port_data[0].length;
    
   if (data_length < 30) { //30 ganti jadi mindata
     alert(`data test anda kurang dari `+mindata+` data baris`);
     return false;
   }
   
   if (data_length > maxdata) {
     alert(`data test anda lebih dari `+maxdata+` data baris`);
     return false;
   }  

   //reset your previous portfolio data in quantxi
   await $.ajax({
     type: "POST",
     url: "http://localhost/rasio_server/api/reset.php",
     headers:{
       "Content-Type": "application/json",
       "X-API-KEY": sessionStorage.getItem("api")
     },
     dataType: 'json',
     success: function(result){
       console.log(result);
       //disable button
       $('#setting_button').attr('disabled',true);
       $('#data_button').attr('disabled',true);
       $('#start_date').attr('disabled',true);
       $('#change_period_btn').attr('disabled',true);
       $('#play_button').attr('disabled',true);
       $('#viewpost_button').attr('disabled',true);
       $('#trade_report_button').attr('disabled',true);
       $('#chart_button').attr('disabled',true);
       $('#statistik_button').attr('disabled',true);
     },
     error: function() {      
       alert(`koneksi ke server gagal, coba beberapa saat lagi`);
       return false;
     }
   })

   //PROSES DATA
     async function proses() {
       if (data_id <= data_length) {
       
       var data_input;
       var signal_output = new Array();
           
       //PRE TRADE
         //asset trade details
         for (i=1;i<=30;i++) {  
             asset_price[i]                        = parseFloat(port_data[i][data_id-1]);
             asset_position_size_pretrade[i]       = asset_position_size_posttrade[i]                
             asset_market_value_pretrade[i]        = asset_position_size_pretrade[i] * asset_price[i]; 
             asset_margin_loan_balance_pretrade[i] = asset_margin_loan_balance_posttrade[i];                
         }
         //account & trade summary
         cash_pretrade                 = cash_posttrade - daily_interest;           
         
         market_value_pretrade         = asset_market_value_pretrade.reduce(function (accumulator, current) { return accumulator + current; });
         
         margin_loan_balance_pretrade  = asset_margin_loan_balance_pretrade.reduce(function (accumulator, current) { return accumulator + current; });
         
         equity_pretrade               = cash_pretrade + market_value_pretrade - margin_loan_balance_pretrade;
         
         maintenance_margin            = market_value_pretrade * maintmargin_rate;

         regT_margin_req               = market_value_pretrade * regTmargin_rate;

         margin_available              = equity_pretrade - regT_margin_req;

       //POST REST API 
         data_input = {
           data_id: data_id,
           equity_balance: equity_pretrade,
           asset1_price: asset_price[1],
           asset1_position_size: asset_position_size_pretrade[1],
           asset2_price: asset_price[2],
           asset2_position_size: asset_position_size_pretrade[2],
           asset3_price: asset_price[3],
           asset3_position_size: asset_position_size_pretrade[3],
           asset4_price: asset_price[4],
           asset4_position_size: asset_position_size_pretrade[4],
           asset5_price: asset_price[5],
           asset5_position_size: asset_position_size_pretrade[5],
           asset6_price: asset_price[6],
           asset6_position_size: asset_position_size_pretrade[6],
           asset7_price: asset_price[7],
           asset7_position_size: asset_position_size_pretrade[7],
           asset8_price: asset_price[8],
           asset8_position_size: asset_position_size_pretrade[8],
           asset9_price: asset_price[9],
           asset9_position_size: asset_position_size_pretrade[9],
           asset10_price: asset_price[10],
           asset10_position_size: asset_position_size_pretrade[10],
           asset11_price: asset_price[11],
           asset11_position_size: asset_position_size_pretrade[11],
           asset12_price: asset_price[12],
           asset12_position_size: asset_position_size_pretrade[12],
           asset13_price: asset_price[13],
           asset13_position_size: asset_position_size_pretrade[13],
           asset14_price: asset_price[14],
           asset14_position_size: asset_position_size_pretrade[14],
           asset15_price: asset_price[15],
           asset15_position_size: asset_position_size_pretrade[15],
           asset16_price: asset_price[16],
           asset16_position_size: asset_position_size_pretrade[16],
           asset17_price: asset_price[17],
           asset17_position_size: asset_position_size_pretrade[17],
           asset18_price: asset_price[18],
           asset18_position_size: asset_position_size_pretrade[18],
           asset19_price: asset_price[19],
           asset19_position_size: asset_position_size_pretrade[19],
           asset20_price: asset_price[20],
           asset20_position_size: asset_position_size_pretrade[20],
           asset21_price: asset_price[21],
           asset21_position_size: asset_position_size_pretrade[21],
           asset22_price: asset_price[22],
           asset22_position_size: asset_position_size_pretrade[22],
           asset23_price: asset_price[23],
           asset23_position_size: asset_position_size_pretrade[23],
           asset24_price: asset_price[24],
           asset24_position_size: asset_position_size_pretrade[24],
           asset25_price: asset_price[25],
           asset25_position_size: asset_position_size_pretrade[25],
           asset26_price: asset_price[26],
           asset26_position_size: asset_position_size_pretrade[26],
           asset27_price: asset_price[27],
           asset27_position_size: asset_position_size_pretrade[27],
           asset28_price: asset_price[28],
           asset28_position_size: asset_position_size_pretrade[28],
           asset29_price: asset_price[29],
           asset29_position_size: asset_position_size_pretrade[29],
           asset30_price: asset_price[30],
           asset30_position_size: asset_position_size_pretrade[30]
         }

         $('#data_id_input').html(data_id);
         $('#equity_balance').html(Intl.NumberFormat().format(parseFloat(equity_pretrade).toFixed(2)));
         $('#asset1_price').html(Intl.NumberFormat().format(parseFloat(asset_price[1]).toFixed(2)));
         $('#asset1_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[1]).toFixed(2)));
         $('#asset2_price').html(Intl.NumberFormat().format(parseFloat(asset_price[2]).toFixed(2)));
         $('#asset2_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[2]).toFixed(2)));
         $('#asset3_price').html(Intl.NumberFormat().format(parseFloat(asset_price[3]).toFixed(2)));
         $('#asset3_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[3]).toFixed(2)));
         $('#asset4_price').html(Intl.NumberFormat().format(parseFloat(asset_price[4]).toFixed(2)));
         $('#asset4_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[4]).toFixed(2)));
         $('#asset5_price').html(Intl.NumberFormat().format(parseFloat(asset_price[5]).toFixed(2)));
         $('#asset5_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[5]).toFixed(2)));
         $('#asset6_price').html(Intl.NumberFormat().format(parseFloat(asset_price[6]).toFixed(2)));
         $('#asset6_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[6]).toFixed(2)));
         $('#asset7_price').html(Intl.NumberFormat().format(parseFloat(asset_price[7]).toFixed(2)));
         $('#asset7_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[7]).toFixed(2)));
         $('#asset8_price').html(Intl.NumberFormat().format(parseFloat(asset_price[8]).toFixed(2)));
         $('#asset8_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[8]).toFixed(2)));
         $('#asset9_price').html(Intl.NumberFormat().format(parseFloat(asset_price[9]).toFixed(2)));
         $('#asset9_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[9]).toFixed(2)));
         $('#asset10_price').html(Intl.NumberFormat().format(parseFloat(asset_price[10]).toFixed(2)));
         $('#asset10_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[10]).toFixed(2)));
         $('#asset11_price').html(Intl.NumberFormat().format(parseFloat(asset_price[11]).toFixed(2)));
         $('#asset11_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[11]).toFixed(2)));
         $('#asset12_price').html(Intl.NumberFormat().format(parseFloat(asset_price[12]).toFixed(2)));
         $('#asset12_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[12]).toFixed(2)));
         $('#asset13_price').html(Intl.NumberFormat().format(parseFloat(asset_price[13]).toFixed(2)));
         $('#asset13_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[13]).toFixed(2)));
         $('#asset14_price').html(Intl.NumberFormat().format(parseFloat(asset_price[14]).toFixed(2)));
         $('#asset14_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[14]).toFixed(2)));
         $('#asset15_price').html(Intl.NumberFormat().format(parseFloat(asset_price[15]).toFixed(2)));
         $('#asset15_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[15]).toFixed(2)));
         $('#asset16_price').html(Intl.NumberFormat().format(parseFloat(asset_price[16]).toFixed(2)));
         $('#asset16_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[16]).toFixed(2)));
         $('#asset17_price').html(Intl.NumberFormat().format(parseFloat(asset_price[17]).toFixed(2)));
         $('#asset17_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[17]).toFixed(2)));
         $('#asset18_price').html(Intl.NumberFormat().format(parseFloat(asset_price[18]).toFixed(2)));
         $('#asset18_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[18]).toFixed(2)));
         $('#asset19_price').html(Intl.NumberFormat().format(parseFloat(asset_price[19]).toFixed(2)));
         $('#asset19_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[19]).toFixed(2)));
         $('#asset20_price').html(Intl.NumberFormat().format(parseFloat(asset_price[20]).toFixed(2)));
         $('#asset20_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[20]).toFixed(2)));
         $('#asset21_price').html(Intl.NumberFormat().format(parseFloat(asset_price[21]).toFixed(2)));
         $('#asset21_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[21]).toFixed(2)));
         $('#asset22_price').html(Intl.NumberFormat().format(parseFloat(asset_price[22]).toFixed(2)));
         $('#asset22_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[22]).toFixed(2)));
         $('#asset23_price').html(Intl.NumberFormat().format(parseFloat(asset_price[23]).toFixed(2)));
         $('#asset23_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[23]).toFixed(2)));
         $('#asset24_price').html(Intl.NumberFormat().format(parseFloat(asset_price[24]).toFixed(2)));
         $('#asset24_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[24]).toFixed(2)));
         $('#asset25_price').html(Intl.NumberFormat().format(parseFloat(asset_price[25]).toFixed(2)));
         $('#asset25_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[25]).toFixed(2)));
         $('#asset26_price').html(Intl.NumberFormat().format(parseFloat(asset_price[26]).toFixed(2)));
         $('#asset26_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[26]).toFixed(2)));
         $('#asset27_price').html(Intl.NumberFormat().format(parseFloat(asset_price[27]).toFixed(2)));
         $('#asset27_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[27]).toFixed(2)));
         $('#asset28_price').html(Intl.NumberFormat().format(parseFloat(asset_price[28]).toFixed(2)));
         $('#asset28_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[28]).toFixed(2)));
         $('#asset29_price').html(Intl.NumberFormat().format(parseFloat(asset_price[29]).toFixed(2)));
         $('#asset29_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[29]).toFixed(2)));
         $('#asset30_price').html(Intl.NumberFormat().format(parseFloat(asset_price[30]).toFixed(2)));
         $('#asset30_position_size').html(Intl.NumberFormat().format(parseFloat(asset_position_size_pretrade[30]).toFixed(2)));
         
         await $.ajax({
           type: "POST",
           url: "http://localhost/rasio_server/api/post.php",
           headers:{
             "Content-Type": "application/x-www-form-urlencoded",
             "X-API-KEY": sessionStorage.getItem("api")
           },
           data: data_input,             
           dataType: 'json',
           success: function(result){                 
               
           if (result.status == "success") {

             $('#total_post').html(data_id); 
             
             let asset_signal_position = new Array();
             let asset_signal_size = new Array();                    
             asset_signal_position.push(
               result.data.asset1_signal_position,
               result.data.asset2_signal_position,
               result.data.asset3_signal_position,
               result.data.asset4_signal_position,
               result.data.asset5_signal_position,
               result.data.asset6_signal_position,
               result.data.asset7_signal_position,
               result.data.asset8_signal_position,
               result.data.asset9_signal_position,
               result.data.asset10_signal_position,
               result.data.asset11_signal_position,
               result.data.asset12_signal_position,
               result.data.asset13_signal_position,
               result.data.asset14_signal_position,
               result.data.asset15_signal_position,
               result.data.asset16_signal_position,
               result.data.asset17_signal_position,
               result.data.asset18_signal_position,
               result.data.asset19_signal_position,
               result.data.asset20_signal_position,
               result.data.asset21_signal_position,
               result.data.asset22_signal_position,
               result.data.asset23_signal_position,
               result.data.asset24_signal_position,
               result.data.asset25_signal_position,
               result.data.asset26_signal_position,
               result.data.asset27_signal_position,
               result.data.asset28_signal_position,
               result.data.asset29_signal_position,
               result.data.asset30_signal_position
             );
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
             signal_output.push({total_signal_proccessed: result.data.total_signal_proccessed});
             signal_output.push({asset_signal_position: asset_signal_position});
             signal_output.push({asset_signal_size: asset_signal_size});

             $('#data_id_output').html(signal_output[0].data_id);
             $('#asset_signal_created').html(signal_output[1].total_signal_proccessed);
             $('#asset1_signal_position').html(signal_output[2].asset_signal_position[0]);
             $('#asset1_signal_size').html(signal_output[3].asset_signal_size[0]); 
             $('#asset2_signal_position').html(signal_output[2].asset_signal_position[1]);
             $('#asset2_signal_size').html(signal_output[3].asset_signal_size[1]); 
             $('#asset3_signal_position').html(signal_output[2].asset_signal_position[2]);
             $('#asset3_signal_size').html(signal_output[3].asset_signal_size[2]); 
             $('#asset4_signal_position').html(signal_output[2].asset_signal_position[3]);
             $('#asset4_signal_size').html(signal_output[3].asset_signal_size[3]); 
             $('#asset5_signal_position').html(signal_output[2].asset_signal_position[4]);
             $('#asset5_signal_size').html(signal_output[3].asset_signal_size[4]); 
             $('#asset6_signal_position').html(signal_output[2].asset_signal_position[5]);
             $('#asset6_signal_size').html(signal_output[3].asset_signal_size[5]); 
             $('#asset7_signal_position').html(signal_output[2].asset_signal_position[6]);
             $('#asset7_signal_size').html(signal_output[3].asset_signal_size[6]); 
             $('#asset8_signal_position').html(signal_output[2].asset_signal_position[7]);
             $('#asset8_signal_size').html(signal_output[3].asset_signal_size[7]); 
             $('#asset9_signal_position').html(signal_output[2].asset_signal_position[8]);
             $('#asset9_signal_size').html(signal_output[3].asset_signal_size[8]); 
             $('#asset10_signal_position').html(signal_output[2].asset_signal_position[9]);
             $('#asset10_signal_size').html(signal_output[3].asset_signal_size[9]);
             $('#asset11_signal_position').html(signal_output[2].asset_signal_position[10]);
             $('#asset11_signal_size').html(signal_output[3].asset_signal_size[10]); 
             $('#asset12_signal_position').html(signal_output[2].asset_signal_position[11]);
             $('#asset12_signal_size').html(signal_output[3].asset_signal_size[11]); 
             $('#asset13_signal_position').html(signal_output[2].asset_signal_position[12]);
             $('#asset13_signal_size').html(signal_output[3].asset_signal_size[12]); 
             $('#asset14_signal_position').html(signal_output[2].asset_signal_position[13]);
             $('#asset14_signal_size').html(signal_output[3].asset_signal_size[13]); 
             $('#asset15_signal_position').html(signal_output[2].asset_signal_position[14]);
             $('#asset15_signal_size').html(signal_output[3].asset_signal_size[14]); 
             $('#asset16_signal_position').html(signal_output[2].asset_signal_position[15]);
             $('#asset16_signal_size').html(signal_output[3].asset_signal_size[15]); 
             $('#asset17_signal_position').html(signal_output[2].asset_signal_position[16]);
             $('#asset17_signal_size').html(signal_output[3].asset_signal_size[16]); 
             $('#asset18_signal_position').html(signal_output[2].asset_signal_position[17]);
             $('#asset18_signal_size').html(signal_output[3].asset_signal_size[17]); 
             $('#asset19_signal_position').html(signal_output[2].asset_signal_position[18]);
             $('#asset19_signal_size').html(signal_output[3].asset_signal_size[18]); 
             $('#asset20_signal_position').html(signal_output[2].asset_signal_position[19]);
             $('#asset20_signal_size').html(signal_output[3].asset_signal_size[19]); 
             $('#asset21_signal_position').html(signal_output[2].asset_signal_position[20]);
             $('#asset21_signal_size').html(signal_output[3].asset_signal_size[20]); 
             $('#asset22_signal_position').html(signal_output[2].asset_signal_position[21]);
             $('#asset22_signal_size').html(signal_output[3].asset_signal_size[21]); 
             $('#asset23_signal_position').html(signal_output[2].asset_signal_position[22]);
             $('#asset23_signal_size').html(signal_output[3].asset_signal_size[22]); 
             $('#asset24_signal_position').html(signal_output[2].asset_signal_position[23]);
             $('#asset24_signal_size').html(signal_output[3].asset_signal_size[23]); 
             $('#asset25_signal_position').html(signal_output[2].asset_signal_position[24]);
             $('#asset25_signal_size').html(signal_output[3].asset_signal_size[24]); 
             $('#asset26_signal_position').html(signal_output[2].asset_signal_position[25]);
             $('#asset26_signal_size').html(signal_output[3].asset_signal_size[25]); 
             $('#asset27_signal_position').html(signal_output[2].asset_signal_position[26]);
             $('#asset27_signal_size').html(signal_output[3].asset_signal_size[26]); 
             $('#asset28_signal_position').html(signal_output[2].asset_signal_position[27]);
             $('#asset28_signal_size').html(signal_output[3].asset_signal_size[27]); 
             $('#asset29_signal_position').html(signal_output[2].asset_signal_position[28]);
             $('#asset29_signal_size').html(signal_output[3].asset_signal_size[28]); 
             $('#asset30_signal_position').html(signal_output[2].asset_signal_position[29]);
             $('#asset30_signal_size').html(signal_output[3].asset_signal_size[29]); 
             }         
           }
         })
       
         if(signal_output.length > 0) { 
         //TRADE 
           //asset trade details
           for (i=1, x=0;i<=30, x<30;i++, x++) {  
               asset_trade_position[i]     = signal_output[2].asset_signal_position[x];
               asset_trade_size[i]         = parseInt(signal_output[3].asset_signal_size[x]);
               asset_trade_value[i]        = asset_trade_size[i] * asset_price[i];        
               asset_trade_margin_req[i]   = asset_trade_value[i] * regTmargin_rate;
               asset_trade_margin_loan[i]  = asset_trade_value[i] - asset_trade_margin_req[i];
               asset_trade_cost[i]         = (asset_trade_value[i] * bidask_spread) + (asset_trade_value[i] * commision_share);
           }        
           //trade summary
           buy_trade_value = 0;
           buy_trade_margin_req = 0;
           buy_trade_margin_loan = 0;
           buy_trade_cost = 0;
           sell_trade_value = 0;
           sell_trade_margin_req = 0;
           sell_trade_margin_loan = 0;
           sell_trade_cost = 0;
           for (i=1; i<=30; i++) {
             if(asset_trade_position[i] == "BUY") {
               buy_trade_value += asset_trade_value[i]; 
               buy_trade_margin_req += asset_trade_margin_req[i];
               buy_trade_margin_loan += asset_trade_margin_loan[i];
               buy_trade_cost += asset_trade_cost[i];     
             } else if(asset_trade_position[i] == "SELL") {
               sell_trade_value += asset_trade_value[i];
               sell_trade_margin_req += asset_trade_margin_req[i];
               sell_trade_margin_loan += asset_trade_margin_loan[i];
               sell_trade_cost += asset_trade_cost[i];  
             } 
           }    
           
         //POST TRADE
           //asset trade details
           for(i=1;i<=30;i++) {
             if(asset_trade_position[i] == "BUY") {
               asset_position_size_posttrade[i]        = asset_position_size_pretrade[i] + asset_trade_size[i];
               asset_market_value_posttrade[i]         = asset_position_size_posttrade[i] * asset_price[i];
               asset_margin_loan_balance_posttrade[i]  = asset_margin_loan_balance_pretrade[i] + asset_trade_margin_loan[i];            
             } else if(asset_trade_position[i] == "SELL") {
               asset_position_size_posttrade[i]        = asset_position_size_pretrade[i] - asset_trade_size[i];
               asset_market_value_posttrade[i]         = asset_position_size_posttrade[i] * asset_price[i];
               asset_margin_loan_balance_posttrade[i]  = asset_margin_loan_balance_pretrade[i] - asset_trade_margin_loan[i]; 
             }            
           }          
           //account & trade summary
           cash_posttrade                  = cash_pretrade - buy_trade_margin_req - buy_trade_cost + sell_trade_margin_req - sell_trade_cost;
           market_value_posttrade          = asset_market_value_posttrade.reduce(function (accumulator, current) { return accumulator + current; });
           margin_loan_balance_posttrade   = asset_margin_loan_balance_posttrade.reduce(function (accumulator, current) { return accumulator + current; });
           equity_posttrade                = cash_posttrade + market_value_posttrade - margin_loan_balance_posttrade;
           daily_interest                  = 0; //cek lagi rumus ini ?????        
           
           $("#tested_data_period").val(port_data[0][0]+' - '+port_data[0][data_id-1]);
           $("#progress_bar_value").html(parseFloat((data_id/data_length)*100).toFixed(2)+"%"); 
           $("#progress_bar").css("width",parseFloat((data_id/data_length)*100).toFixed(2)+"%")

           //asset trade details array
           var asset_trade = new Array();
           for(i=1;i<=30;i++) {             
             asset_trade.push({
               asset_price : asset_price[i],
               asset_position_size_pretrade : asset_position_size_pretrade[i],
               asset_market_value_pretrade : asset_market_value_pretrade[i],
               asset_margin_loan_balance_pretrade : asset_margin_loan_balance_pretrade[i],
               asset_trade_position : asset_trade_position[i],
               asset_trade_size : asset_trade_size[i],
               asset_trade_value : asset_trade_value[i],
               asset_trade_margin_req : asset_trade_margin_req[i],
               asset_trade_margin_loan : asset_trade_margin_loan[i],
               asset_trade_cost : asset_trade_cost[i],
               asset_position_size_posttrade : asset_position_size_posttrade[i],
               asset_market_value_posttrade : asset_market_value_posttrade[i],
               asset_margin_loan_balance_posttrade : asset_margin_loan_balance_posttrade[i]
             })
           }
           asset_trade_details.push(asset_trade);
           
           //acount trade summary array
           account_trade_summary.push({
             date : 1,
             cash_pretrade : cash_pretrade,
             market_value_pretrade : market_value_pretrade,
             margin_loan_balance_pretrade : margin_loan_balance_pretrade,
             equity_pretrade : equity_pretrade,
             maintenance_margin : maintenance_margin,
             regT_margin_req : regT_margin_req,
             margin_available : margin_available,
             buy_trade_value : buy_trade_value,
             buy_trade_margin_req : buy_trade_margin_req,
             buy_trade_margin_loan : buy_trade_margin_loan,
             buy_trade_cost : buy_trade_cost,
             sell_trade_value : sell_trade_value,
             sell_trade_margin_req : sell_trade_margin_req,
             sell_trade_margin_loan : sell_trade_margin_loan,
             sell_trade_cost : sell_trade_cost,
             cash_posttrade : cash_posttrade,
             market_value_posttrade : market_value_posttrade,
             margin_loan_balance_posttrade : margin_loan_balance_posttrade,
             equity_posttrade : equity_posttrade,
             daily_interest : daily_interest      
           });           

           //add data ID
           data_id++; // lanjut id berikutnya, cek lagi posisi tambah id ini ?       
         }           
       
   
       } else {
         $('#setting_button').attr('disabled',false);
         $('#data_button').attr('disabled',false);
         $('#refresh_button').attr('disabled',false);
         $('#statistik_button').attr('disabled',false);
         $('#logout_button').attr('disabled',false);
         $('#viewpost_button').attr('disabled',false);
         $('#chart_button').attr('disabled',false);
         $('#trade_report_button').attr('disabled',false);
         // $('#assets_details_button').attr('disabled',false);
     
         clearTimeout();

         console.log(account_trade_summary);

         //test history array
     
         alert(`data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
         return false;
       }
       setTimeout(proses, 1/1000);
     }

   proses(); 
   
 }
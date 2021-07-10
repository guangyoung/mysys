 //RUN TEST -------------------------------------------------------------------------------
 //GLOBAL VARIABLE
 var asset_trade_details = new Array();
 var account_trade_summary = new Array();
 var data_input_array = new Array();
 var signal_output_array = new Array();
 var date_array = new Array();
 var quantxi_equity_array = new Array();
 var buyandhold_equity_array = new Array();
 
 async function run_test() {
   //-----------------------------------------------------------------------------------
      
     var start_date = $('#test_startdate').val().split("-")[1] + '/' + $('#test_startdate').val().split("-")[2] + '/' + $('#test_startdate').val().split("-")[0];
     //cek lagi stardate diatas
     
     var data_id = 1;
     
     var date;

     //trade details variable
     var price = [];
     var position_size = [];
     var market_value = [];
     var margin_loan_balance = [];
     var buy_trade_size = [];
     var buy_trade_value = [];
     var buy_trade_margin_used = [];
     var buy_trade_margin_loan = [];
     var buy_trade_cost = [];
     var sell_trade_size = [];
     var sell_trade_value = [];
     var avg_buy_price = [];
     var sell_trade_loan_back = [];
     var sell_trade_margin_back = [];
     var sell_trade_cost = [];

     for (i=1;i<=30;i++) {
      price[i] = 0;
      position_size[i] = 0;
      market_value[i] = 0;
      margin_loan_balance[i] = 0;
      buy_trade_size[i] = 0;
      buy_trade_value[i] = 0;
      buy_trade_margin_used[i] = 0;
      buy_trade_margin_loan[i] = 0;
      buy_trade_cost[i] = 0;
      sell_trade_size[i] = 0;
      sell_trade_value[i] = 0;
      avg_buy_price[i] = 0;
      sell_trade_loan_back[i] = 0;
      sell_trade_margin_back[i] = 0;
      sell_trade_cost[i] = 0;     
     }
     
     //account & trade summary variable
     var cash = initial_equity;
     var market_value_summary = 0;
     var margin_loan_balance_summary = 0;
     var equity = cash + market_value_summary - margin_loan_balance_summary;            
     var maintenance_margin = market_value_summary * maintmargin;
     var regT_margin_req = market_value_summary * regTmargin;
     var margin_available = equity - regT_margin_req;
     var margin_used = 0;
     var margin_back = 0;
     var loan_used = 0;
     var loan_back = 0;
     var trade_cost_summary = 0;
     var daily_interest = 0;  
     
     //Buy & Hold Variable
     var asset_invest = [];
     for(i=1;i<=30;i++) {
      asset_invest[i] = initial_equity/30;
     } 
    //  console.log(asset_invest);   

   //------------------------------------------------------------------------------------------------------------  
   
   //cek test data
   if (port_data.length == 0) {
     alert(`tidak ada data untuk test`);
     return false;
   } else {
    
    var idx_start = port_data[0].indexOf(start_date);
    console.log(idx_start);
    var data_length = port_data[0].length;

    if (data_length < 1000) { //30 ganti jadi mindata
      alert(`data test anda kurang dari `+mindata+` data baris`);
      return false;
    } else {
      if (data_length > 7830) {
        alert(`data test anda lebih dari `+maxdata+` data baris`);
        return false;
      }  
    }
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

         $('#data_id_input').html(data_id);
         $('#equity_balance').html(Intl.NumberFormat().format(parseFloat(equity).toFixed(2)));
         $('#asset1_price').html(Intl.NumberFormat().format(parseFloat(price[1]).toFixed(2)));
         $('#asset1_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[1]).toFixed(2)));
         $('#asset2_price').html(Intl.NumberFormat().format(parseFloat(price[2]).toFixed(2)));
         $('#asset2_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[2]).toFixed(2)));
         $('#asset3_price').html(Intl.NumberFormat().format(parseFloat(price[3]).toFixed(2)));
         $('#asset3_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[3]).toFixed(2)));
         $('#asset4_price').html(Intl.NumberFormat().format(parseFloat(price[4]).toFixed(2)));
         $('#asset4_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[4]).toFixed(2)));
         $('#asset5_price').html(Intl.NumberFormat().format(parseFloat(price[5]).toFixed(2)));
         $('#asset5_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[5]).toFixed(2)));
         $('#asset6_price').html(Intl.NumberFormat().format(parseFloat(price[6]).toFixed(2)));
         $('#asset6_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[6]).toFixed(2)));
         $('#asset7_price').html(Intl.NumberFormat().format(parseFloat(price[7]).toFixed(2)));
         $('#asset7_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[7]).toFixed(2)));
         $('#asset8_price').html(Intl.NumberFormat().format(parseFloat(price[8]).toFixed(2)));
         $('#asset8_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[8]).toFixed(2)));
         $('#asset9_price').html(Intl.NumberFormat().format(parseFloat(price[9]).toFixed(2)));
         $('#asset9_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[9]).toFixed(2)));
         $('#asset10_price').html(Intl.NumberFormat().format(parseFloat(price[10]).toFixed(2)));
         $('#asset10_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[10]).toFixed(2)));
         $('#asset11_price').html(Intl.NumberFormat().format(parseFloat(price[11]).toFixed(2)));
         $('#asset11_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[11]).toFixed(2)));
         $('#asset12_price').html(Intl.NumberFormat().format(parseFloat(price[12]).toFixed(2)));
         $('#asset12_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[12]).toFixed(2)));
         $('#asset13_price').html(Intl.NumberFormat().format(parseFloat(price[13]).toFixed(2)));
         $('#asset13_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[13]).toFixed(2)));
         $('#asset14_price').html(Intl.NumberFormat().format(parseFloat(price[14]).toFixed(2)));
         $('#asset14_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[14]).toFixed(2)));
         $('#asset15_price').html(Intl.NumberFormat().format(parseFloat(price[15]).toFixed(2)));
         $('#asset15_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[15]).toFixed(2)));
         $('#asset16_price').html(Intl.NumberFormat().format(parseFloat(price[16]).toFixed(2)));
         $('#asset16_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[16]).toFixed(2)));
         $('#asset17_price').html(Intl.NumberFormat().format(parseFloat(price[17]).toFixed(2)));
         $('#asset17_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[17]).toFixed(2)));
         $('#asset18_price').html(Intl.NumberFormat().format(parseFloat(price[18]).toFixed(2)));
         $('#asset18_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[18]).toFixed(2)));
         $('#asset19_price').html(Intl.NumberFormat().format(parseFloat(price[19]).toFixed(2)));
         $('#asset19_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[19]).toFixed(2)));
         $('#asset20_price').html(Intl.NumberFormat().format(parseFloat(price[20]).toFixed(2)));
         $('#asset20_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[20]).toFixed(2)));
         $('#asset21_price').html(Intl.NumberFormat().format(parseFloat(price[21]).toFixed(2)));
         $('#asset21_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[21]).toFixed(2)));
         $('#asset22_price').html(Intl.NumberFormat().format(parseFloat(price[22]).toFixed(2)));
         $('#asset22_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[22]).toFixed(2)));
         $('#asset23_price').html(Intl.NumberFormat().format(parseFloat(price[23]).toFixed(2)));
         $('#asset23_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[23]).toFixed(2)));
         $('#asset24_price').html(Intl.NumberFormat().format(parseFloat(price[24]).toFixed(2)));
         $('#asset24_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[24]).toFixed(2)));
         $('#asset25_price').html(Intl.NumberFormat().format(parseFloat(price[25]).toFixed(2)));
         $('#asset25_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[25]).toFixed(2)));
         $('#asset26_price').html(Intl.NumberFormat().format(parseFloat(price[26]).toFixed(2)));
         $('#asset26_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[26]).toFixed(2)));
         $('#asset27_price').html(Intl.NumberFormat().format(parseFloat(price[27]).toFixed(2)));
         $('#asset27_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[27]).toFixed(2)));
         $('#asset28_price').html(Intl.NumberFormat().format(parseFloat(price[28]).toFixed(2)));
         $('#asset28_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[28]).toFixed(2)));
         $('#asset29_price').html(Intl.NumberFormat().format(parseFloat(price[29]).toFixed(2)));
         $('#asset29_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[29]).toFixed(2)));
         $('#asset30_price').html(Intl.NumberFormat().format(parseFloat(price[30]).toFixed(2)));
         $('#asset30_position_size').html(Intl.NumberFormat().format(parseFloat(position_size[30]).toFixed(2)));
         
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
              signal_output.push({signal_timestamp: result.data.signal_timestamp});
              signal_output.push({asset_signal_position: asset_signal_position});
              signal_output.push({asset_signal_size: asset_signal_size});
 
              $('#data_id_output').html(signal_output[0].data_id);
              $('#asset_signal_created').html(signal_output[1].signal_timestamp);
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
               date : date,
               price : price[i],
               position_size : position_size[i],
               market_value : market_value[i],
               margin_loan_balance : margin_loan_balance[i],
               buy_trade_size : buy_trade_size[i],
               buy_trade_value : buy_trade_value[i],
               buy_trade_margin_used : buy_trade_margin_used[i],
               buy_trade_margin_loan : buy_trade_margin_loan[i],
               buy_trade_cost : buy_trade_cost[i],
               sell_trade_size : sell_trade_size[i],
               sell_trade_value : sell_trade_value[i],
               avg_buy_price : avg_buy_price[i],
               sell_trade_loan_back : sell_trade_loan_back[i],
               sell_trade_margin_back : sell_trade_margin_back[i],
               sell_trade_cost : sell_trade_cost[i]
             })
           }
           asset_trade_details.push(asset_trade);
           
           //acount summary array
           account_trade_summary.push({
             date : date,
             //Pre Trade Account Position
             cash : cash,
             market_value_summary : market_value_summary,
             margin_loan_balance_summary : margin_loan_balance_summary,
             equity : equity,
             //Pre Trade Margin Position
             maintenance_margin : maintenance_margin,
             regT_margin_req : regT_margin_req,
             margin_available : margin_available,
             //Trade Summary
             margin_used : margin_used,
             margin_back : margin_back,
             loan_used : loan_used,
             loan_back : loan_back,
             trade_cost_summary : trade_cost_summary,
             //Daily Interest
             daily_interest : daily_interest      
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
              asset_equity_buyandhold[i] = (asset_invest[i]/parseFloat(port_data[i][idx_start]))*parseFloat(port_data[i][(idx_start+(data_id-1))]); 
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
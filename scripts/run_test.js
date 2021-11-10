 //STEP 4. RESET TEST
//Ini adalah step reset test ..........................,.............................
//...................................................................................
//...................................................................................

    //Global Variables
    var margin_trade_report_details = new Array();
    var performance_comparison_details = new Array();
    var test_history_and_statistic = new Array();
    var all_request_inJSON_format = new Array();
 
    async function run_test() {        
        //-----------------------------------------------------------------------------------
            if (test_data.length == 0) {
                Swal.fire(
                    'No Test Data !',
                    'Please click Market Data and Create It',
                    'warning'
                )
            return false;
            }

            Swal.fire({
                title: 'Connect to Quantxi AI',
                text: 'You will be connected to the Quantxi AI Engine Version 1.1.5, although this is a simulation, you are connected to the same Quantxi intelligence.',
                imageUrl: 'https://www.fundcalibre.com/wp-content/uploads/2020/04/AdobeStock_323829966-956x377.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            })

            //Disable Button
            $(':button').prop('disabled', true); 
      

        //variable
        var data_id = 0;
        var date;
        var stock_price = new Array();
        var stock_position_size = new Array();

        for (i=0;i<30;i++) {
            stock_price[i] = 0;
            stock_position_size[i] = 0;
        }

        var daily_Interest = 0;
        var cash_balance = initial_equity;    
        var market_value = 0;
        var equity_with_loanValue = cash_balance + market_value;
        var maintenance_margin_reserved = market_value * 0.30;
        var maintenance_margin_available = equity_with_loanValue -  maintenance_margin_reserved;
        var initial_margin_reserved = market_value * 0.50;
        var initial_margin_available = equity_with_loanValue - initial_margin_reserved;
        var total_trade_value;
        var total_commission;
        var total_initial_margin;

        //Post Request & Response
        var data_input = new Array();
        var signal_output = new Array();

        var stock_buyHold = new Array();
        // for(i=1;i<=30;i++) {
        // stock_buyHold[i] = initial_equity/30;
        // } 

        while (data_id < test_data.length) { 

            data_id++;

            date = test_data[data_id][0];

            for (i=0;i<30;i++) {  
                stock_price[i] = parseFloat(test_data[i+1][1]);                    
            }

    //PRE TRADE POSITION CALCULATION
    // ----------------------------------------------------------------------------------
            if(cash_balance < 0) {
                daily_Interest = cash_balance * (interest_rate/360); //cek lagi rumusnya
            } else {
                daily_Interest = 0;
            }           

            cash_balance -= daily_Interest;

            for (i=0;i<30;i++) {  
                market_value += (stock_position_size[i] * stock_price[i]);                  
            }

            equity_with_loanValue = cash_balance + market_value;

            maintenance_margin_reserved = market_value * 0.30;

            maintenance_margin_available = equity_with_loanValue - maintenance_margin_reserved;

            initial_margin_reserved = market_value * 0.50;

            initial_margin_available = equity_with_loanValue - initial_margin_reserved;

            //save data to array

            data_input = {
                data_id: data_id,
                stock01_price: stock01_price,
                stock01_positionSize: stock01_positionSize,
                stock02_price: stock02_price,
                stock02_positionSize: stock02_positionSize,          
                stock03_price: stock03_price,
                stock03_positionSize: stock03_positionSize,          
                stock04_price: stock04_price,
                stock04_positionSize: stock04_positionSize,          
                stock05_price: stock05_price,
                stock05_positionSize: stock05_positionSize,          
                stock06_price: stock06_price,
                stock06_positionSize: stock06_positionSize,          
                stock07_price: stock07_price,
                stock07_positionSize: stock07_positionSize,          
                stock08_price: stock08_price,
                stock08_positionSize: stock08_positionSize,          
                stock09_price: stock09_price,
                stock09_positionSize: stock09_positionSize,          
                stock10_price: stock10_price,
                stock10_positionSize: stock10_positionSize, 
                stock11_price: stock11_price,
                stock11_positionSize: stock11_positionSize,
                stock12_price: stock12_price,
                stock12_positionSize: stock12_positionSize,          
                stock13_price: stock13_price,
                stock13_positionSize: stock13_positionSize,          
                stock14_price: stock14_price,
                stock14_positionSize: stock14_positionSize,          
                stock15_price: stock15_price,
                stock15_positionSize: stock15_positionSize,          
                stock16_price: stock16_price,
                stock16_positionSize: stock16_positionSize,          
                stock17_price: stock17_price,
                stock17_positionSize: stock17_positionSize,          
                stock18_price: stock18_price,
                stock18_positionSize: stock18_positionSize,          
                stock19_price: stock19_price,
                stock19_positionSize: stock19_positionSize,          
                stock20_price: stock20_price,
                stock20_positionSize: stock20_positionSize, 
                stock21_price: stock21_price,
                stock21_positionSize: stock21_positionSize,
                stock22_price: stock22_price,
                stock22_positionSize: stock22_positionSize,          
                stock23_price: stock23_price,
                stock23_positionSize: stock23_positionSize,          
                stock24_price: stock24_price,
                stock24_positionSize: stock24_positionSize,          
                stock25_price: stock25_price,
                stock25_positionSize: stock25_positionSize,          
                stock26_price: stock26_price,
                stock26_positionSize: stock26_positionSize,          
                stock27_price: stock27_price,
                stock27_positionSize: stock27_positionSize,          
                stock28_price: stock28_price,
                stock28_positionSize: stock28_positionSize,          
                stock29_price: stock29_price,
                stock29_positionSize: stock29_positionSize,          
                stock30_price: stock30_price,
                stock30_positionSize: stock30_positionSize                    
            };

            data_input.push(data_input);


    //POST DATA TO QUANTXI AND GET SIGNAL FROM QUANTXI 
    // ----------------------------------------------------------------------------------           
        var post_process = "run";

            while (post_process == "run") {
                await $.ajax({
                    type: "POST",
                    url: "https://api.quantxi.com/post?api_key="+localStorage.getItem("apiKey"),
                    data: data_input,           
                    dataType: 'json',
                    success: function(result){ 
                        if (result.status == "success") {

                            post_process = "stop";  

                            signal_output = {
                                data_id: result.data.data_id,
                                stock01_signal_position: result.data.stock01_signal_position,
                                stock01_signal_size: result.data.stock01_signal_size,
                                stock02_signal_position: result.data.stock02_signal_position,
                                stock02_signal_size: result.data.stock02_signal_size,
                                stock03_signal_position: result.data.stock03_signal_position,
                                stock03_signal_size: result.data.stock03_signal_size,
                                stock04_signal_position: result.data.stock04_signal_position,
                                stock04_signal_size: result.data.stock04_signal_size,
                                stock05_signal_position: result.data.stock05_signal_position,
                                stock05_signal_size: result.data.stock05_signal_size,
                                stock06_signal_position: result.data.stock06_signal_position,
                                stock06_signal_size: result.data.stock06_signal_size,
                                stock07_signal_position: result.data.stock07_signal_position,
                                stock07_signal_size: result.data.stock07_signal_size,
                                stock08_signal_position: result.data.stock08_signal_position,
                                stock08_signal_size: result.data.stock08_signal_size,
                                stock09_signal_position: result.data.stock09_signal_position,
                                stock09_signal_size: result.data.stock09_signal_size,
                                stock10_signal_position: result.data.stock10_signal_position,
                                stock10_signal_size: result.data.stock10_signal_size,
                                stock11_signal_position: result.data.stock11_signal_position,
                                stock11_signal_size: result.data.stock11_signal_size,
                                stock12_signal_position: result.data.stock12_signal_position,
                                stock12_signal_size: result.data.stock12_signal_size,
                                stock13_signal_position: result.data.stock13_signal_position,
                                stock13_signal_size: result.data.stock13_signal_size,
                                stock14_signal_position: result.data.stock14_signal_position,
                                stock14_signal_size: result.data.stock14_signal_size,
                                stock15_signal_position: result.data.stock15_signal_position,
                                stock15_signal_size: result.data.stock15_signal_size,
                                stock16_signal_position: result.data.stock16_signal_position,
                                stock16_signal_size: result.data.stock16_signal_size,
                                stock17_signal_position: result.data.stock17_signal_position,
                                stock17_signal_size: result.data.stock17_signal_size,
                                stock18_signal_position: result.data.stock18_signal_position,
                                stock18_signal_size: result.data.stock18_signal_size,
                                stock19_signal_position: result.data.stock19_signal_position,
                                stock19_signal_size: result.data.stock19_signal_size,
                                stock20_signal_position: result.data.stock20_signal_position,
                                stock20_signal_size: result.data.stock20_signal_size,
                                stock21_signal_position: result.data.stock21_signal_position,
                                stock21_signal_size: result.data.stock21_signal_size,
                                stock22_signal_position: result.data.stock22_signal_position,
                                stock22_signal_size: result.data.stock22_signal_size,
                                stock23_signal_position: result.data.stock23_signal_position,
                                stock23_signal_size: result.data.stock23_signal_size,
                                stock24_signal_position: result.data.stock24_signal_position,
                                stock24_signal_size: result.data.stock24_signal_size,
                                stock25_signal_position: result.data.stock25_signal_position,
                                stock25_signal_size: result.data.stock25_signal_size,
                                stock26_signal_position: result.data.stock26_signal_position,
                                stock26_signal_size: result.data.stock26_signal_size,
                                stock27_signal_position: result.data.stock27_signal_position,
                                stock27_signal_size: result.data.stock27_signal_size,
                                stock28_signal_position: result.data.stock28_signal_position,
                                stock28_signal_size: result.data.stock28_signal_size,
                                stock29_signal_position: result.data.stock29_signal_position,
                                stock29_signal_size: result.data.stock29_signal_size,
                                stock30_signal_position: result.data.stock30_signal_position,
                                stock30_signal_size: result.data.stock30_signal_size
                            };
                            signal_output.push(signal_output); 
                        }         
                    }
                })
            } 
           
    // TRADE TRANSACTION 
    // ----------------------------------------------------------------------------------
        var filledOrder = new Array();
        var filledPrice = new Array();
        var tradeValue = new Array();
        var commision = new Array();
        var initialMargin = new Array();

        for (i=0;i<30;i++) {            
            filledOrder[i] = 0;
            filledPrice[i] = 0;
            tradeValue[i] = 0;
            commision[i] = 0;
            initialMargin[i] = 0;
        }
        
            //calculated signal imr
            let imr = 0;            
            for (i=0, x=1; i<30 && x<61; i++, x+2) {
                if(signal_output[x] > 0) {
                    imr+= (parseInt(signal_output[x])*(stock_price[i]*(1+spread_slippage)))*regT_margin;
                } else if(signal_output[x] < 0) {
                    imr+= (parseInt(signal_output[x])*(stock_price[i]*(1-spread_slippage)))*regT_margin;
                } else {
                    imr+= 0;
                } 
            } 

            //calculate filled percentarge   
            //  if(imr)       
            
            
            //TRADE BASED SIGNAL RECEIVE---------------------------------------------------------------------         
            // for (i=1, x=3; i<31 && x<33; i++, x++) {  

            //     if(signal_output[x] > 0) {

            //     buy_filledOrder[i]  = parseInt(signal_output[x]);
            //     buy_filledPrice[i]  = price[i] * (1+bidaskspread);
            //     buy_tradeValue[i] = buy_filledOrder[i] * buy_filledPrice[i];
            //     buy_commision[i] = buy_tradeValue[i] * commisionshare;
            //     sell_filledOrder[i]  = 0;
            //     sell_filledPrice[i]  = 0;
            //     sell_tradeValue[i] = 0;
            //     sell_commision[i] = 0;

            //     } else if(signal_output[x] < 0) {

            //     buy_filledOrder[i]  = 0;
            //     buy_filledPrice[i]  = 0;
            //     buy_tradeValue[i] = 0;
            //     buy_commision[i] = 0; 
            //     sell_filledOrder[i]  = parseInt(signal_output[x]);
            //     sell_filledPrice[i]  = price[i] * (1+bidaskspread);
            //     sell_tradeValue[i] = sell_filledOrder[i] * sell_filledPrice[i];
            //     sell_commision[i] = sell_tradeValue[i] * commisionshare;           
            
            //     } else if(signal_output[x] == 0){
            //     buy_filledOrder[i]  = 0;
            //     buy_filledPrice[i]  = 0;
            //     buy_tradeValue[i] = 0;
            //     buy_commision[i] = 0;
            //     sell_filledOrder[i]  = 0;
            //     sell_filledPrice[i]  = 0;
            //     sell_tradeValue[i] = 0;
            //     sell_commision[i] = 0; 
            //     }
            // }  

            //POST TRADE POSITION ---------------------------------------------------------------------
            // for (i=1;i<31;i++) { 
            //     postTrade_positionSize[i]        = preTrade_positionSize[i] + buy_filledOrder[i] - sell_filledOrder[i];              
            //     postTrade_marketValue[i]         = postTrade_positionSize[i]  * price[i];            
            // }
            // preTrade_cashBalance          = postTrade_cashBalance;                             
                
            // if(preTrade_cashBalance<0) {
            //     preTrade_mtd_acruedInterest = postTrade_mtd_acruedInterest + preTrade_cashBalance*(0.02/360);
            // } else {
            //     preTrade_mtd_acruedInterest = postTrade_mtd_acruedInterest;
            // }

            // preTrade_long_marketValue     = preTrade_marketValue.reduce(function (accumulator, current) { return accumulator + current; });
            
            // preTrade_equity_with_loanValue  = preTrade_cashBalance + preTrade_mtd_acruedInterest + preTrade_long_marketValue;
            
            // preTrade_net_liquidationValue  = preTrade_cashBalance + preTrade_mtd_acruedInterest + preTrade_long_marketValue;
            
            // preTrade_maintenanceMargin     = preTrade_long_marketValue * 0.25;

            // preTrade_regT_marginReq        = preTrade_long_marketValue * 0.50;

            // preTrade_excessLiquidity       = preTrade_equity_with_loanValue - preTrade_maintenanceMargin;

            // preTrade_sma_excessEquity      = preTrade_equity_with_loanValue - preTrade_regT_marginReq;

            // preTrade_buyingPower           = preTrade_sma_excessEquity  * 2;
                
            //run progress -----------------------------

            // $("#progress_bar_value").html(parseFloat((data_id/data_length)*100).toFixed(2)+"%"); 
            // $("#progress_bar").css("width",parseFloat((data_id/data_length)*100).toFixed(2)+"%");    

            //post request response ----------------------------------------------

            // $('#total_post').html(dataID); 
        
            // var input_element =
            // '<pre style="font-size: 11px; color: #70727a; margin-left: 50px; margin-top: 15px;">'
            //     + JSON.stringify(input, null, 4) +
            // '</pre>';
            
            // $("#input").html(input_element);
            // var output_element =
            // '<pre style="font-size: 11px; color: #70727a; margin-left: 50px; margin-top: 15px;">'
            //     + JSON.stringify(input, null, 4) +
            // '</pre>';
            
            // $("#output").html(output_element);
        
            // //Performance Comparison --------------------------------------------------------
            // var period = new Date(new Date(port_data[0][idx_start+data_id])-new Date(port_data[0][idx_start])).getUTCFullYear() - 1970;
            // console.log(period);
            // var quantxi_equity = preTrade_equity_with_loanValue;

            // var asset_equity_buyandhold = [];
            // for(i=1;i<31;i++) {
            //     asset_equity_buyandhold[i] = (stock_invest[i]/parseFloat(port_data[i][idx_start]))*parseFloat(port_data[i][(idx_start+(data_id-1))]); 
            // }
           
            // var buyandhold_equity = asset_equity_buyandhold.reduce(function (accumulator, current) { return accumulator + current; });           
            // var quantxi_total_return = equity/initial_equity;
            // var buyandhold_total_return = buyandhold_equity/equity;
            // var quantxi_cagr = ((quantxi_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
            // var buyandhold_cagr = ((buyandhold_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
            // var quantxi_maxdd = (
            //     1
            // );
            // var buyandhold_maxdd = (
            //     1
            // );
            // var quantxi_mar_ratio = (
            //     1
            // );
            // var buyandhold_mar_ratio = (
            //     1
            // );
            // var quantxi_sharpe_ratio = (
            //     1
            // );
            // var buyandhold_sharpe_ratio = (
            //     1
            // );
            // var quantxi_treynor_ratio = (
            //     1
            // );
            // var buyandhold_treynor_ratio = (
            //     1
            // );

            // $('#quantxi_equity').html(Intl.NumberFormat().format(parseFloat(quantxi_equity).toFixed(0))); 
            // $('#buyandhold_equity').html(Intl.NumberFormat().format(parseFloat(buyandhold_equity).toFixed(0))); 
            // $('#quantxi_total_return').html(parseFloat((quantxi_total_return)*100).toFixed(2)+"%"); 
            // $('#buyandhold_total_return').html(parseFloat((buyandhold_total_return)*100).toFixed(2)+"%");
            // $('#quantxi_cagr').html(parseFloat((quantxi_cagr)*100).toFixed(2)+"%"); 
            // $('#buyandhold_cagr').html(parseFloat((buyandhold_cagr)*100).toFixed(2)+"%");
            // $('#quantxi_maxdd').html(parseFloat((quantxi_maxdd)*100).toFixed(2)+"%"); 
            // $('#buyandhold_maxdd').html(parseFloat((buyandhold_maxdd)*100).toFixed(2)+"%"); 
            // $('#quantxi_mar_ratio').html(parseFloat((quantxi_mar_ratio)*100).toFixed(2)+"%"); 
            // $('#buyandhold_mar_ratio').html(parseFloat((buyandhold_mar_ratio)*100).toFixed(2)+"%");
            // $('#quantxi_sharpe_ratio').html(parseFloat((quantxi_sharpe_ratio)*100).toFixed(2)+"%"); 
            // $('#buyandhold_sharpe_ratio').html(parseFloat((buyandhold_sharpe_ratio)*100).toFixed(2)+"%");
            // $('#quantxi_treynor_ratio').html(parseFloat((quantxi_treynor_ratio)*100).toFixed(2)+"%"); 
            // $('#buyandhold_treynor_ratio').html(parseFloat((buyandhold_treynor_ratio)*100).toFixed(2)+"%");    

            // TRADE TESTING REPORT ---------------------------------------------------------------
       
            // var trade_details = new Array();
            // for(i=1;i<=30;i++) {             
            //     trade_details.push({
            //     stocks : stock1,
            //     price : price[i],
            //     pretrade_position_size : pretrade_position_size[i],
            //     pretrade_market_value : pretrade_market_value[i],
            //     buy_filled_order : buy_filled_order[i],
            //     buy_filled_signal : buy_filled_signal[i],
            //     buy_trade_value : buy_trade_value[i],
            //     buy_commision : buy_commision[i],
            //     sell_filled_order : sell_filled_order[i],
            //     sell_filled_signal : sell_filled_signal[i],
            //     sell_trade_value : sell_trade_value[i],
            //     sell_commision : sell_commision[i],
            //     posttrade_position_size : posttrade_position_size[i],
            //     posttrade_market_value : posttrade_market_value[i]
            //     })
            // }

            // var account_summary = new Array(); 
            // account_summary.push({
            //     //Pre Trade Account Position
            //     pretrade_cash_balance : pretrade_cash_balance,
            //     pretrade_mtd_acrued_interest : pretrade_mtd_acrued_interest,
            //     pretrade_long_market_value : pretrade_long_market_value,
            //     pretrade_equity_with_loan_value : pretrade_equity_with_loan_value,
            //     pretrade_net_liquidation_value : pretrade_net_liquidation_value,
            //     pretrade_maintenance_margin : pretrade_maintenance_margin,
            //     pretrade_regT_margin_req : pretrade_regT_margin_req,
            //     pretrade_excess_liquidity : pretrade_excess_liquidity,
            //     pretrade_sma_excess_equity : pretrade_sma_excess_equity,
            //     pretrade_buying_power : pretrade_buying_power, 
            //     //Post Trade Account Position
            //     posttrade_cash_balance : posttrade_cash_balance,
            //     posttrade_mtd_acrued_interest : posttrade_mtd_acrued_interest,
            //     posttrade_long_market_value : posttrade_long_market_value,
            //     posttrade_equity_with_loan_value : posttrade_equity_with_loan_value,
            //     posttrade_net_liquidation_value : posttrade_net_liquidation_value,
            //     posttrade_maintenance_margin : posttrade_maintenance_margin,
            //     posttrade_regT_margin_req : posttrade_regT_margin_req,
            //     posttrade_excess_liquidity : posttrade_excess_liquidity,
            //     posttrade_sma_excess_equity : posttrade_sma_excess_equity,
            //     posttrade_buying_power : posttrade_buying_power    
            // });

            // tradeTesting_report.push({date: date, trade_details: trade_details, account_summary: account_summary});
                   
            // //Performance Chart ---------------------------------------------
            // date_array.push(date);
            // quantxi_equity_array.push(parseFloat(equity).toFixed(0));    
            // buyandhold_equity_array.push(parseFloat(buyandhold_equity).toFixed(0));            
            // //------------------------------------------------------------------
            // //add data ID -------------------------------------------------------
            // dataID++; // lanjut id berikutnya, cek lagi posisi tambah id ini ?  
            //-----------------------------------------------------------  
        } 

        //trade testing report
        // $("#account_trade_summary_tbl>tbody").empty();
        // $("#pagination_trade_summary").twbsPagination("destroy");
        // if(10 > 0) {
        //     $("#pagination_trade_summary").twbsPagination({
        //         totalPages: Math.ceil(5000/5),
        //         visiblePages: 4,
        //         onPageClick: function (event, page) {
        //             $("#account_trade_summary_tbl>tbody").empty();
        //             for (i=(page*5)-5; i<(page*5) && i<(5000); i++) {
        //                 var account_trade_summary_row =
        //                 `<tr>
        //                     <td>                                    
        //                     <a style="margin-left: 15px; margin-top: 15px; color: #ffffff; font-size: 11px;">Date : 23-01-2001</a>                                    
        //                     <div class="table-hover" style="margin-left: 15px; margin-right: 15px; margin-top: 0px; background-color: #070914; overflow: auto; height: 150px">
        //                         <table>
        //                             <thead style="color:#d2d3d7">
        //                                 <tr>
        //                                     <th class="text-center" rowspan="2" style="width: 6%; position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Portfolio</th>
        //                                     <th class="text-center" rowspan="2" style="width: 6%; position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Price</th>
        //                                     <th class="text-center" colspan="2" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Pre Trade Position</th>
        //                                     <th class="text-center" colspan="4" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Buy Open (Add Position)</th>
        //                                     <th class="text-center" colspan="4" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Sell Close (Reduce Position)</th>
        //                                     <th class="text-center" colspan="2" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Post Trade Position</th>
        //                                 </tr>
        //                                 <tr>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Position Size</th>
        //                                     <th class="text-center" style="width: 10%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Market Value</th>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Order</th>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Price</th>
        //                                     <th class="text-center" style="width: 10%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Trade Value</th>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Commision</th>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Order</th>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Price</th>
        //                                     <th class="text-center" style="width: 10%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Trade Value</th>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Commision</th>
        //                                     <th class="text-center" style="width: 6%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Position Size</th>
        //                                     <th class="text-center" style="width: 10%; position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Market Value</th>
        //                                 </tr>
        //                             </thead>
        //                             <tbody>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset 1</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
        //                                     <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
        //                                 </tr>
        //                             </tbody>
        //                         </table>
        //                     </div>
        //                     <div style="margin-left: 15px; margin-right: 15px; background-color: #1b3636; height: 110px">
        //                         <table id="">
        //                             <tbody>
        //                                 <tr>
        //                                     <td class="text-center" rowspan="2" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 8%"><strong>Account<br>Summary<br>23/01/2001</strong></td>
        //                                     <td class="text-center" colspan="4" style="font-size: 11px; border-left: 1px #070914 solid; border-bottom: 1px #070914 solid; font-family: calibri; color:#d2d3d7; padding: 3px 0 2px 0"><strong>Pre Trade Position</strong></td>
        //                                     <td class="text-center" colspan="2" style="font-size: 11px; border-left: 1px #070914 solid; border-bottom: 1px #070914 solid; font-family: calibri; color:#d2d3d7; padding: 3px 0 2px 0"><strong>Trade Summary</strong></td>
        //                                     <td class="text-center" colspan="4" style="font-size: 11px; border-left: 1px #070914 solid; border-bottom: 1px #070914 solid; font-family: calibri; color:#d2d3d7; padding: 3px 0 2px 0"><strong>Post Trade Position</strong></td>
        //                                 </tr>
        //                                 <tr>
        //                                     <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 13%; padding: 4px 10px 5px 10px">Cash Balance<br>MTD Acrued Interest<br>Long Market Value<br>Equity With Loan Value<br>Net Liquidation Value</td>
        //                                     <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 6%; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
        //                                     <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 12%; padding:  4px 10px 5px 10px">Maintenance Margin<br>Reg.T Margin Req.<br>Excess Liquidity<br>SMA/Excess Equity<br>Buying Power</td>
        //                                     <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 6%; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
        //                                     <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 12%; padding:  4px 10px 5px 10px">Total Buy Trade<br>Total Sell Trade<br>Total Trade<br>Total Commision<br>Initial Margin</td>
        //                                     <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 6%; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
        //                                     <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 13%; padding: 4px 10px 5px 10px">Cash Balance<br>MTD Acrued Interest<br>Long Market Value<br>Equity With Loan Value<br>Net Liquidation Value</td>
        //                                     <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 6%; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
        //                                     <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 12%; padding:  4px 10px 5px 10px">Maintenance Margin<br>Reg.T Margin Req.<br>Excess Liquidity<br>SMA/Excess Equity<br>Buying Power</td>
        //                                     <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 6%; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
        //                                 </tr>
        //                             </tbody>
        //                         </table>
        //                     </div>
        //                 </td>
        //                 </tr>`
        //                 $("#account_trade_summary_tbl>tbody").append(account_trade_summary_row);
        //             }
        //         }
        //     });
        // } 

        // //performance chart

        // chartColors = {
        // red: 'rgb(255, 99, 132)',
        // orange: 'rgb(255, 159, 64)',
        // yellow: 'rgb(255, 205, 86)',
        // green: 'rgb(75, 192, 192)',
        // blue: 'rgb(54, 162, 235)',
        // purple: 'rgb(153, 102, 255)',
        // grey: 'rgb(201, 203, 207)' };

        // var config = {
        // type: 'line',
        // data: {
        //     labels: date_array,
        //     datasets: [{
        //     label: 'Quantxi',
        //     pointRadius: 1,
        //     borderWidth: 1,
        //     backgroundColor: chartColors.red,
        //     borderColor: chartColors.red,
        //     data: quantxi_equity_array,
        //     fill: false },
        //     {
        //     label: 'Buy & Hold',
        //     pointRadius: 1,
        //     borderWidth: 1,
        //     backgroundColor: chartColors.blue,
        //     borderColor: chartColors.blue,
        //     data: buyandhold_equity_array,
        //     fill: false}
        // ]},
        // options: {
        //     responsive: true,
        //     legend: {
        //         display: true
        //     },
        // title: {
        // display: true,
        // text: 'Performance Comparison' },
        // tooltips: {
        //     mode: 'index',
        //     intersect: true },
        // hover: {
        // mode: 'nearest',
        // intersect: true },
        // // events:[],
        // scales: {
        // xAxes: [{
        //     display: true,
        //     scaleLabel: {
        //     display: true,
        //     labelString: 'Years' } }],
        // yAxes: [{
        // display: true,
        // ticks: {
        //     callback: function(value, index, values) {
        //     return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
        //     }
        // },
        // scaleLabel: {
        //     display: true,
        //     labelString: 'Equity' } }] } } };

        // if(performance_chart!=null){
        //     performance_chart.destroy();
        // }
        // var ctx = document.getElementById('performance_chart').getContext('2d');
        // performance_chart = new Chart(ctx, config);

        // //view all post
             
        // //Enable Button
        // $('#setting_button').attr('disabled',false);
        // $('#data_button').attr('disabled',false);
        // $('#start_date').val('');
        // $('#play_button').attr('disabled',true);
        // $('#pause_button').attr('disabled',true);
        // $('#refresh_button').attr('disabled',false);
        // $('#viewpost_button').attr('disabled',false);
        // $('#trade_report_button').attr('disabled',false);
        // $('#chart_button').attr('disabled',false);
        // $('#statistik_button').attr('disabled',false);
     
        // alert(`data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
        // return false;   
    }
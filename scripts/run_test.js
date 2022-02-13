//------------------------------------------------------------------------------------------------------------
// RUN TEST #
//------------------------------------------------------------------------------------------------------------
// Ini adalah step run test ..................................................................................
//............................................................................................................
//............................................................................................................

async function run_test() {

    if (testData.length == 0) {
        Swal.fire(
            'No Test Data !',
            'Please click Market Data and Create It',
            'warning'
        )
        return false;
    } 
        
    //cek last data

    //initialitation portfolio
                
    $(":button").prop("disabled", true); //disable all button
    //initialisation variable 
    var stock_price = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var stock_position_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var stock_market_value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var daily_Interest;
    var cash_balance = initial_equity;
    var market_value;
    var equity_with_loanValue;
    var maintenance_margin_req;
    var excess_liquidity;
    var regT_margin_req;
    var excess_equity;
    var buying_power;
    var quantxi_equity;
    var buyhold_equity;
    var previous_quantxi_equity = initial_equity;
    var previous_buyhold_equity = initial_equity;
    var quantxi_total_return;
    var buyhold_total_return;
    var quantxi_cagr;
    var buyhold_cagr;
    var quantxi_sharpe;
    var buyhold_sharpe;
    var quantxi_sortino;
    var buyhold_sortino;
    var quantxi_equity_peak = 0;
    var quantxi_equity_trough = 0;
    var quantxi_maxDrawDown = 0;
    var buyhold_equity_peak = 0;
    var buyhold_equity_trough = 0;
    var buyhold_maxDrawDown = 0;
    var data_input;
    var signal_output;
    var data_input_output_arr = new Array();
    // var signal_output_arr = new Array();
    var daily_stock_position_transaction_summary = new Array();
    var account_and_trade_summary = new Array();
    var quantxi_equity_array = new Array();
    var buyhold_equity_array = new Array();
    var quantxi_daily_return_array = new Array();
    var buyhold_daily_return_array = new Array();
    var startdateTest = testData[0].date;
    //------------------------------------------------------------------------------------
    // Proses Data #######################################################################
    //------------------------------------------------------------------------------------
    
    var data_idx = 0;
    while(data_idx < 100) {    
        let current_date = testData[data_idx].date;
        let daily_stock_position_transaction_details = new Array();    
        // ----------------------------------------------------------------------------------
        // PRE TRADE POSITION CALCULATION ===================================================
        // ----------------------------------------------------------------------------------
        for (i = 0; i < 30; i++) {
            stock_price[i] = parseFloat(testData[data_idx].price[i]);           
            stock_market_value[i] = stock_price[i] * stock_position_size[i];
        }
        if (cash_balance < 0) {
            if (new Date(current_date).getDay() == 5) {
                daily_Interest = cash_balance * (interest_rate / 360) * 3; //cek lagi rumusnya
            } else {
                daily_Interest = cash_balance * (interest_rate / 360) * 1; //cek lagi rumusnya
            }
        } else {
            daily_Interest = 0;
        }
        cash_balance -= daily_Interest;//cek & tanya cara perhitungan mtd interest            
        market_value = stock_market_value.reduce(function (accumulator, current) { return accumulator + current });
        equity_with_loanValue = cash_balance + market_value;
        maintenance_margin_req = market_value * 0.30;
        excess_liquidity = equity_with_loanValue - maintenance_margin_req;
        regT_margin_req = market_value * 0.50;
        excess_equity = equity_with_loanValue - regT_margin_req;
        if(excess_equity<0) {
            buying_power = 0;
        } else {
            buying_power = excess_equity * 2;
        }
        
        //save daily pretrade stock position to array 
        daily_stock_position_transaction_details.push({
            stock_price,
            stock_position_size,
            stock_market_value
        })            
        
        // ----------------------------------------------------------------------------------  
        // REQUEST SIGNAL TO QUANTXI AI =====================================================
        // ---------------------------------------------------------------------------------- 
        data_input = {
            request_no: data_idx + 1,//ganti jadi data_idx
            buying_power: buying_power,
            stock_price: [
                stock_price[0],
                stock_price[1],
                stock_price[2],
                stock_price[3],
                stock_price[4],
                stock_price[5],
                stock_price[6],
                stock_price[7],
                stock_price[8],
                stock_price[9],
                stock_price[10],
                stock_price[11],
                stock_price[12],
                stock_price[13],
                stock_price[14],
                stock_price[15],
                stock_price[16],
                stock_price[17],
                stock_price[18],
                stock_price[19],
                stock_price[20],
                stock_price[21],
                stock_price[22],
                stock_price[23],
                stock_price[24],
                stock_price[25],
                stock_price[26],
                stock_price[27],
                stock_price[28],
                stock_price[29]                
            ],
            stock_positionSize: [
                stock_position_size[0],
                stock_position_size[1],
                stock_position_size[2],
                stock_position_size[3],
                stock_position_size[4],
                stock_position_size[5],
                stock_position_size[6],
                stock_position_size[7],
                stock_position_size[8],
                stock_position_size[9],
                stock_position_size[10],
                stock_position_size[11],
                stock_position_size[12],
                stock_position_size[13],
                stock_position_size[14],
                stock_position_size[15],
                stock_position_size[16],
                stock_position_size[17],
                stock_position_size[18],
                stock_position_size[19],
                stock_position_size[20],
                stock_position_size[21],
                stock_position_size[22],
                stock_position_size[23],
                stock_position_size[24],
                stock_position_size[25],
                stock_position_size[26],
                stock_position_size[27],
                stock_position_size[28],
                stock_position_size[29]                
            ]
        };
        $('#data_input_id').html(Intl.NumberFormat().format(parseFloat(data_input.request_no).toFixed(0)));
        $('#buyingPower').html(Intl.NumberFormat().format(parseFloat(data_input.buying_power).toFixed(0)));
        for (i = 0; i < 30; i++) {
            $("#price_stock" + (i+1)).html(Intl.NumberFormat().format(parseFloat(data_input.stock_price[i]).toFixed(5)));
            $("#position_stock" + (i+1)).html(Intl.NumberFormat().format(parseFloat(data_input.stock_positionSize[i]).toFixed(0)));
        }
        // data_input_arr.push(data_input); //save data to array data_input_history
        
        // let post_process = "running";
        // while (post_process == "running") {
            await $.ajax({
                type: "POST",
                url: "https://api.quantxi.com/add_data?api_key=" + localStorage.getItem("apiKey"),
                data: data_input,
                dataType: 'json',
                success: function (result) {
                    if (result.status == "success") {
                        signal_output = {
                            response_no: result.data.data_id,//ganti jadi response id
                            signal_timestamp: result.data.signal_timestamp,
                            signal_position: [
                                result.data.signal_position_stock1,
                                result.data.signal_position_stock2,
                                result.data.signal_position_stock3,
                                result.data.signal_position_stock4,
                                result.data.signal_position_stock5,
                                result.data.signal_position_stock6,
                                result.data.signal_position_stock7,
                                result.data.signal_position_stock8,
                                result.data.signal_position_stock9,
                                result.data.signal_position_stock10,
                                result.data.signal_position_stock11,
                                result.data.signal_position_stock12,
                                result.data.signal_position_stock13,
                                result.data.signal_position_stock14,
                                result.data.signal_position_stock15,
                                result.data.signal_position_stock16,
                                result.data.signal_position_stock17,
                                result.data.signal_position_stock18,
                                result.data.signal_position_stock19,
                                result.data.signal_position_stock20,
                                result.data.signal_position_stock21,
                                result.data.signal_position_stock22,
                                result.data.signal_position_stock23,
                                result.data.signal_position_stock24,
                                result.data.signal_position_stock25,
                                result.data.signal_position_stock26,
                                result.data.signal_position_stock27,
                                result.data.signal_position_stock28,
                                result.data.signal_position_stock29,
                                result.data.signal_position_stock30
                            ],
                            signal_size: [
                                result.data.signal_size_stock1,
                                result.data.signal_size_stock2,
                                result.data.signal_size_stock3,
                                result.data.signal_size_stock4,
                                result.data.signal_size_stock5,
                                result.data.signal_size_stock6,
                                result.data.signal_size_stock7,
                                result.data.signal_size_stock8,
                                result.data.signal_size_stock9,
                                result.data.signal_size_stock10,
                                result.data.signal_size_stock11,
                                result.data.signal_size_stock12,
                                result.data.signal_size_stock13,
                                result.data.signal_size_stock14,
                                result.data.signal_size_stock15,
                                result.data.signal_size_stock16,
                                result.data.signal_size_stock17,
                                result.data.signal_size_stock18,
                                result.data.signal_size_stock19,
                                result.data.signal_size_stock20,
                                result.data.signal_size_stock21,
                                result.data.signal_size_stock22,
                                result.data.signal_size_stock23,
                                result.data.signal_size_stock24,
                                result.data.signal_size_stock25,
                                result.data.signal_size_stock26,
                                result.data.signal_size_stock27,
                                result.data.signal_size_stock28,
                                result.data.signal_size_stock29,
                                result.data.signal_size_stock30
                            ]
                        };     
                        $('#total_request').html(parseFloat(signal_output.response_no).toFixed(0));                            
                        $('#data_output_id').html(Intl.NumberFormat().format(parseFloat(signal_output.response_no).toFixed(0)));
                        $('#signaltimestamp').html(new Date(parseInt(signal_output.signal_timestamp)).toISOString());
                        for (i = 0; i < 30; i++) {
                            $("#signal_position_stock" + (i+1)).html(signal_output.signal_position[i]);
                            $("#signal_size_stock" + (i+1)).html(Intl.NumberFormat().format(parseFloat(signal_output.signal_size[i]).toFixed(0)));
                        }
                        // signal_output_arr.push(signal_output); //save data to array signal_output_history
                        // console.log(signal_output);
                        // post_process = "finish";
                    }
                }
            })
        // }            
        // ----------------------------------------------------------------------------------  
        // TRADE TRANSACTION ================================================================
        // ----------------------------------------------------------------------------------
        //calculated estimate total trade value asumsi
        let estimate_tradeValue = 0;
        let estimate_comm = 0;
        for (i = 0; i < 30; i++) {
            if (signal_output.signal_position[i] == "BUY") {
                estimate_tradeValue += (signal_output.signal_size[i] * (stock_price[i] * (1 + spread_slippage)));
                estimate_comm += (signal_output.signal_size[i] * 0.005); //commision per share
            } else if (signal_output.signal_position[i] == "SELL") {
                estimate_tradeValue -= (signal_output.signal_size[i] * (stock_price[i] * (1 - spread_slippage)));
                estimate_comm += (signal_output.signal_size[i] * 0.005); //commision per share
            } else {
                estimate_tradeValue += 0;
                estimate_comm += 0;
            }
        }

        //calculate filled percentarge   
        let filled_percentage;
        if((buying_power/2) > ((estimate_tradeValue/2)+estimate_comm)) {
            filled_percentage = 1;
        } else {
            filled_percentage = (buying_power/2)/((estimate_tradeValue/2)+estimate_comm);
        }

        // console.log(filled_percentage);
        
        //trade transaction   
        let filledOrder = new Array();
        let filledPrice = new Array();
        let tradeValue = new Array();
        let commission_arr = new Array();
        let initialMargin = new Array();
        for (i = 0; i < 30; i++) {
            if (signal_output.signal_position[i] == "BUY") {
                filledOrder[i] = math.floor(parseInt(signal_output.signal_size[i] * filled_percentage));
                filledPrice[i] = stock_price[i] * (1 + spread_slippage);
                tradeValue[i] = filledOrder[i] * filledPrice[i];
                commission_arr[i] = filledOrder[i] * commission_perShare;
                initialMargin[i] = tradeValue[i] * 0.50;
            } else if (signal_output.signal_position[i] == "SELL") {
                filledOrder[i] = math.floor(parseInt(signal_output.signal_size[i] * filled_percentage));
                filledPrice[i] = stock_price[i] * (1 - spread_slippage);
                tradeValue[i] = filledOrder[i] * filledPrice[i];
                commission_arr[i] = filledOrder[i] * commission_perShare;
                initialMargin[i] = tradeValue[i] * 0.50;
            } else {
                filledOrder[i] = 0;
                filledPrice[i] = 0;
                tradeValue[i] = 0;
                commission_arr[i] = 0;
                initialMargin[i] = 0;
            }
        }
        //save daily stock transaction data to array  
        daily_stock_position_transaction_details.push({
            filledOrder,
            filledPrice,
            tradeValue,
            commission_arr,
            initialMargin
        })
        //save daily trade summary data to array
        let total_trade_value = tradeValue.reduce(function (accumulator, current) { return accumulator + current });
        let total_commission = commission_arr.reduce(function (accumulator, current) { return accumulator + current });
        let total_initial_margin = initialMargin.reduce(function (accumulator, current) { return accumulator + current });
        
        // ----------------------------------------------------------------------------------
        // POST TRADE POSITION CALCULATION ==================================================
        // ----------------------------------------------------------------------------------
        for (i = 0; i < 30; i++) {
            stock_position_size[i] += filledOrder[i];
            stock_market_value[i] = stock_price[i] * stock_position_size[i];
        }            
        cash_balance -= (total_trade_value + total_commission);            
        market_value = stock_market_value.reduce(function (accumulator, current) { return accumulator + current });
        equity_with_loanValue = cash_balance + market_value;
        maintenance_margin_req = market_value * 0.30;
        excess_liquidity = equity_with_loanValue - maintenance_margin_req;
        regT_margin_req = market_value * 0.50;
        excess_equity = equity_with_loanValue - regT_margin_req;
        //save daily pretrade stock position to array 
        daily_stock_position_transaction_details.push({
            stock_position_size,
            stock_market_value
        });
        //save daily stock position & transaction details to summary
        daily_stock_position_transaction_summary.push({
            date: current_date,
            data: daily_stock_position_transaction_details
        });
        account_and_trade_summary.push({
            date: current_date,
            preTrade_dailyInterest: daily_Interest,
            preTrade_cashbalance: cash_balance,
            preTrade_marketvalue: market_value,
            preTrade_equitywith_loanValue: equity_with_loanValue,
            preTrade_maintenancemargin_reserved: maintenance_margin_req,
            preTrade_maintenancemargin_available: excess_liquidity,
            preTrade_initialmargin_reserved: regT_margin_req,
            preTrade_initialmargin_available: excess_equity,
            preTrade_buying_power: buying_power,
            totaltrade_value: total_trade_value,
            totalcommission: total_commission,
            totalinitial_margin: total_initial_margin,
            postTrade_cashbalance: cash_balance,
            postTrade_marketvalue: market_value,
            postTrade_equitywith_loanValue: equity_with_loanValue,
            postTrade_maintenancemargin_reserved: maintenance_margin_req,
            postTrade_maintenancemargin_available: excess_liquidity,
            postTrade_initialmargin_reserved: regT_margin_req,
            postTrade_initialmargin_available: excess_equity
        });
        console.log(account_and_trade_summary);

        data_input_output_arr.push({
            input: data_input,
            output: signal_output
        });
        console.log(data_input_output_arr);        

        //View in web account & margin summary
        $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(cash_balance).toFixed(0)));
        $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(market_value).toFixed(0)));
        $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(equity_with_loanValue).toFixed(0)));
        $('#maintenance_margin_req').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_req).toFixed(0)));
        $('#excess_liquidity').html(Intl.NumberFormat().format(parseFloat(excess_liquidity).toFixed(0)));
        $('#regT_margin_req').html(Intl.NumberFormat().format(parseFloat(regT_margin_req).toFixed(0)));
        $('#excess_equity').html(Intl.NumberFormat().format(parseFloat(excess_equity).toFixed(0)));
        $('#buying_power').html(Intl.NumberFormat().format(parseFloat(buying_power).toFixed(0)));
               
        // ----------------------------------------------------------------------------------
        // UPDATE TRADE PERFORMANCE COMPARISON, QUANTXI AI VS BUY AND HOLD ==================
        // ---------------------------------------------------------------------------------- 
        quantxi_equity = equity_with_loanValue;
        quantxi_equity_array.push(quantxi_equity);
        buyhold_equity = stock_price.reduce(function (r, a, i) { return r + a * (initial_equity / 30) / parseFloat(testData[0].price[i]) }, 0);
        buyhold_equity_array.push(buyhold_equity);

        quantxi_total_return = (quantxi_equity - initial_equity) / initial_equity;
        buyhold_total_return = (buyhold_equity - initial_equity) / initial_equity;
        
        quantxi_cagr = ((quantxi_total_return+1) ** (1 / (((new Date(current_date).getTime() - new Date(startdateTest).getTime())/ (1000 * 3600 * 24))/365)))-1;
        buyhold_cagr = ((buyhold_total_return+1) ** (1 / (((new Date(current_date).getTime() - new Date(startdateTest).getTime())/ (1000 * 3600 * 24))/365)))-1;
        
        if (quantxi_equity > quantxi_equity_peak) {
            quantxi_equity_peak = quantxi_equity;
            quantxi_equity_trough = quantxi_equity_peak;
        } else if (quantxi_equity < quantxi_equity_trough) {
            quantxi_equity_trough = quantxi_equity;
            let quantxi_tmpDrawDown = (quantxi_equity_peak - quantxi_equity_trough) / quantxi_equity_peak;
            if (quantxi_tmpDrawDown > quantxi_maxDrawDown)
                quantxi_maxDrawDown = quantxi_tmpDrawDown;
        }

        if (buyhold_equity > buyhold_equity_peak) {
            buyhold_equity_peak = buyhold_equity;
            buyhold_equity_trough = buyhold_equity_peak;
        } else if (buyhold_equity < buyhold_equity_trough) {
            buyhold_equity_trough = buyhold_equity;
            let buyhold_tmpDrawDown = (buyhold_equity_peak - buyhold_equity_trough) / buyhold_equity_peak;
            if (buyhold_tmpDrawDown > buyhold_maxDrawDown)
                buyhold_maxDrawDown = buyhold_tmpDrawDown;
        }

        quantxi_mar = (quantxi_cagr / quantxi_maxDrawDown);
        buyhold_mar = (buyhold_cagr / buyhold_maxDrawDown);

        let quantxi_daily_return = (quantxi_equity - previous_quantxi_equity) / previous_quantxi_equity;
        quantxi_daily_return_array.push(quantxi_daily_return);
        let buyhold_daily_return = (buyhold_equity - previous_buyhold_equity) / previous_buyhold_equity;
        buyhold_daily_return_array.push(buyhold_daily_return);

        // console.log("mean: "+math.mean(quantxi_daily_return_array));
        // console.log("riskfree: "+(risk_freeRate/365));
        // console.log("std: "+math.std(quantxi_daily_return_array));
        // console.log("252: "+math.sqrt(252));

        quantxi_sharpe = (((math.mean(quantxi_daily_return_array)*math.sqrt(252)) - risk_freeRate) / math.std(quantxi_daily_return_array));
        buyhold_sharpe = (((math.mean(buyhold_daily_return_array)*math.sqrt(252)) - risk_freeRate) / math.std(buyhold_daily_return_array));

        quantxi_sortino = (1);
        buyhold_sortino = (1);

        //tampilkan rasio ke halaman web------------------------------
        $('#quantxi_equity').html(Intl.NumberFormat().format(parseFloat(quantxi_equity).toFixed(0)));
        $('#buyhold_equity').html(Intl.NumberFormat().format(parseFloat(buyhold_equity).toFixed(0)));
        $('#quantxi_total_return').html(parseFloat(quantxi_total_return * 100).toFixed(2) + "%");
        $('#buyhold_total_return').html(parseFloat(buyhold_total_return * 100).toFixed(2) + "%");
        $('#quantxi_cagr').html(parseFloat(quantxi_cagr * 100).toFixed(2) + "%");
        $('#buyhold_cagr').html(parseFloat(buyhold_cagr * 100).toFixed(2) + "%");

        data_idx++;
    }
    //-------------------------------------------------------------------------------------
    // TRADE TESTING REPORT ###############################################################
    //-------------------------------------------------------------------------------------

    $('#period_testing').val(account_and_trade_summary[0].date +" - "+ account_and_trade_summary[account_and_trade_summary.length-1].date);
    // account and trade summary table
    $("#pagination_trade_report").twbsPagination("destroy");
    $("#pagination_trade_report").twbsPagination({
        totalPages: math.ceil(account_and_trade_summary.length/25),
        visiblePages: 4,
        onPageClick: function (event, page) {
            $("#account_trade_summary_tbl>tbody").empty();
            for (i = (page - 1) * 25; i < (page * 25) && i < account_and_trade_summary.length; i++) {
                let account_trade_summary_row =
                `<tr>
                <td style="background-color: #555555; text-align: center; position: sticky; left: 0px;">
                    `+ account_and_trade_summary[i].date +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_dailyInterest).toFixed(0)) +`
                </td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_cashbalance).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_marketvalue).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_equitywith_loanValue).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_maintenancemargin_reserved).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_maintenancemargin_available).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_initialmargin_reserved).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_initialmargin_available).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].preTrade_buying_power).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].totaltrade_value).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].totalcommission).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].totalinitial_margin).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].postTrade_cashbalance).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].postTrade_marketvalue).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].postTrade_equitywith_loanValue).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].postTrade_maintenancemargin_reserved).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].postTrade_maintenancemargin_available).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].postTrade_initialmargin_reserved).toFixed(0)) +`</td>
                <td
                    style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                    `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i].postTrade_initialmargin_available).toFixed(0)) +`</td>
            </tr>`
                $("#account_trade_summary_tbl>tbody").append(account_trade_summary_row);
            }
        }
    });

    // all request and response table
    $("#pagination_post_request_response").twbsPagination("destroy");
    $("#pagination_post_request_response").twbsPagination({
        totalPages: math.ceil(data_input_output_arr.length/1),
        visiblePages: 4,
        onPageClick: function (event, page) {
            $("#allpost_tbl>tbody").empty();
            for (i = page - 1; i < page && i < data_input_output_arr.length; i++) {
                let data_input_output_arr_row =
                `<tr>
                    <td style="border-right: 1px #292b43 solid">
                        <pre style="font-size: 11px; color: black; margin-left: 20px; margin-top: 25px; margin-bottom: -15px">` +
                    JSON.stringify(data_input_output_arr[i].input, null, 4) +
                    `
                        </pre>;
                    </td>
                    <td>
                        <pre style="font-size: 11px; color: black; margin-left: 20px; margin-top: 25px; margin-bottom: -15px">` +
                    JSON.stringify(data_input_output_arr[i].output, null, 4) +
                    `
                        </pre>;
                    </td>
                </tr>`
                $("#allpost_tbl>tbody").append(data_input_output_arr_row);
            }
        }
    });

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
    //     data: buyhold_equity_array,
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

    // clearInterval(proccess);

    //Enable All Button
    $(":button").prop("disabled", false); 

    Swal.fire(
        'Test Done',
        'data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya',
        'success'
    )

    $('#test_result').modal('show');
}
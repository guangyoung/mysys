//------------------------------------------------------------------------------------------------------------
// RUN TEST #
//------------------------------------------------------------------------------------------------------------
// Ini adalah step run test ..................................................................................
//............................................................................................................
//............................................................................................................
async function run_test() {
    // Retrieve the array from local storage
    var testData2 = localStorage.getItem('mytestdata');
    // Parse it to something usable in js
    testData2 = JSON.parse(testData2);

    // console.log(testData2);
    // console.log(testData);
    if (testData2.length == 0) {
        Swal.fire(
            'No Test Data !',
            'Please click Market Data and Create It',
            'warning'
        )
        return false;
    } 
        
    //cek last data, jika ada data, reset

    //initialitation portfolio....msh dipikirkan
                
    $(":button").prop("disabled", true); //disable all button
    //initialisation variable \
    var current_date;
    var stock_price = new Array();

    var preTrade_stock_position_size = new Array();
    var postTrade_stock_position_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var preTrade_stock_market_value = new Array();
    var postTrade_stock_market_value = new Array();

    var daily_Interest;
    var preTrade_cash_balance;
    var preTrade_market_value;
    var preTrade_equity_with_loanValue;
    var preTrade_maintenance_margin_req;
    var preTrade_excess_liquidity;
    var preTrade_regT_margin_req;
    var preTrade_excess_equity;
    var preTrade_buying_power;

    var postTrade_cash_balance = initial_equity;
    var postTrade_market_value;
    var postTrade_equity_with_loanValue;
    var postTrade_maintenance_margin_req;
    var postTrade_excess_liquidity;
    var postTrade_regT_margin_req;
    var postTrade_excess_equity;
    var postTrade_buying_power;

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
    var quantxi_equity_array = new Array();
    var buyhold_equity_array = new Array();
    var quantxi_daily_return_array = new Array();
    var buyhold_daily_return_array = new Array();

    var data_input;
    var signal_output;
    var data_input_output_arr = new Array();

    var stock_trade_details = new Array();
    var account_and_trade_summary = new Array();
    
    var startdateTest = testData2[0].date;
    var data_idx_process = 0;
    //------------------------------------------------------------------------------------
    // Proses Data #######################################################################
    //------------------------------------------------------------------------------------    
    while(data_idx_process < 2000) { 
       
        //get test data
        current_date = testData2[data_idx_process].date;
        for (i = 0; i < 30; i++) {
            stock_price[i] = parseFloat(testData2[data_idx_process].price[i]); 
        }

        // ----------------------------------------------------------------------------------
        // PRE TRADE POSITION CALCULATION ===================================================
        // ----------------------------------------------------------------------------------
        for (i = 0; i < 30; i++) {
            preTrade_stock_position_size[i] = postTrade_stock_position_size[i]; 
            preTrade_stock_market_value[i] = stock_price[i] * preTrade_stock_position_size[i];
        }
        if (postTrade_cash_balance < 0) {
            if (new Date(current_date).getDay() == 1) {
                daily_Interest = postTrade_cash_balance * (interest_rate / 360) * 3; //cek lagi rumusnya
            } else {
                daily_Interest = postTrade_cash_balance * (interest_rate / 360) * 1; //cek lagi rumusnya
            }
        } else {
            daily_Interest = 0;
        }
        preTrade_cash_balance = postTrade_cash_balance + daily_Interest;//cek & tanya cara perhitungan mtd interest            
        preTrade_market_value = preTrade_stock_market_value.reduce(function (accumulator, current) { return accumulator + current });
        preTrade_equity_with_loanValue = preTrade_cash_balance + preTrade_market_value;
        preTrade_maintenance_margin_req = preTrade_market_value * 0.30;
        preTrade_excess_liquidity = preTrade_equity_with_loanValue - preTrade_maintenance_margin_req;
        preTrade_regT_margin_req = preTrade_market_value * 0.50;
        preTrade_excess_equity = preTrade_equity_with_loanValue - preTrade_regT_margin_req;
        if(preTrade_excess_equity<0) {
            preTrade_buying_power = 0;
        } else {
            preTrade_buying_power = preTrade_excess_equity * 2;
        }
        
        //View in web account & margin summary
        $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(preTrade_cash_balance).toFixed(0)));
        $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(preTrade_market_value).toFixed(0)));
        $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(preTrade_equity_with_loanValue).toFixed(0)));
        $('#maintenance_margin_req').html(Intl.NumberFormat().format(parseFloat(preTrade_maintenance_margin_req).toFixed(0)));
        $('#excess_liquidity').html(Intl.NumberFormat().format(parseFloat(preTrade_excess_liquidity).toFixed(0)));
        $('#regT_margin_req').html(Intl.NumberFormat().format(parseFloat(preTrade_regT_margin_req).toFixed(0)));
        $('#excess_equity').html(Intl.NumberFormat().format(parseFloat(preTrade_excess_equity).toFixed(0)));
        $('#buying_power').html(Intl.NumberFormat().format(parseFloat(preTrade_buying_power).toFixed(0)));
        
        // ----------------------------------------------------------------------------------  
        // REQUEST SIGNAL TO QUANTXI AI =====================================================
        // ---------------------------------------------------------------------------------- 
        data_input = {
            "dataInput_no": data_idx_process + 1,
            "buying_power": preTrade_buying_power,
            "price_stock_1": stock_price[0],
            "positionSize_stock_1": preTrade_stock_position_size[0],
            "price_stock_2": stock_price[1],
            "positionSize_stock_2": preTrade_stock_position_size[1],
            "price_stock_3": stock_price[2],
            "positionSize_stock_3": preTrade_stock_position_size[2],
            "price_stock_4": stock_price[3],
            "positionSize_stock_4": preTrade_stock_position_size[3],
            "price_stock_5": stock_price[4],
            "positionSize_stock_5": preTrade_stock_position_size[4],
            "price_stock_6": stock_price[5],
            "positionSize_stock_6": preTrade_stock_position_size[5],
            "price_stock_7": stock_price[6],
            "positionSize_stock_7": preTrade_stock_position_size[6],
            "price_stock_8": stock_price[7],
            "positionSize_stock_8": preTrade_stock_position_size[7],
            "price_stock_9": stock_price[8],
            "positionSize_stock_9": preTrade_stock_position_size[8],
            "price_stock_10": stock_price[9],
            "positionSize_stock_10": preTrade_stock_position_size[9],
            "price_stock_11": stock_price[10],
            "positionSize_stock_11": preTrade_stock_position_size[10],
            "price_stock_12": stock_price[11],
            "positionSize_stock_12": preTrade_stock_position_size[11],
            "price_stock_13": stock_price[12],
            "positionSize_stock_13": preTrade_stock_position_size[12],
            "price_stock_14": stock_price[13],
            "positionSize_stock_14": preTrade_stock_position_size[13],
            "price_stock_15": stock_price[14],
            "positionSize_stock_15": preTrade_stock_position_size[14],
            "price_stock_16": stock_price[15],
            "positionSize_stock_16": preTrade_stock_position_size[15],
            "price_stock_17": stock_price[16],
            "positionSize_stock_17": preTrade_stock_position_size[16],
            "price_stock_18": stock_price[17],
            "positionSize_stock_18": preTrade_stock_position_size[17],
            "price_stock_19": stock_price[18],
            "positionSize_stock_19": preTrade_stock_position_size[18],
            "price_stock_20": stock_price[19],
            "positionSize_stock_20": preTrade_stock_position_size[19],
            "price_stock_21": stock_price[20],
            "positionSize_stock_21": preTrade_stock_position_size[20],
            "price_stock_22": stock_price[21],
            "positionSize_stock_22": preTrade_stock_position_size[21],
            "price_stock_23": stock_price[22],
            "positionSize_stock_23": preTrade_stock_position_size[22],
            "price_stock_24": stock_price[23],
            "positionSize_stock_24": preTrade_stock_position_size[23],
            "price_stock_25": stock_price[24],
            "positionSize_stock_25": preTrade_stock_position_size[24],
            "price_stock_26": stock_price[25],
            "positionSize_stock_26": preTrade_stock_position_size[25],
            "price_stock_27": stock_price[26],
            "positionSize_stock_27": preTrade_stock_position_size[26],
            "price_stock_28": stock_price[27],
            "positionSize_stock_28": preTrade_stock_position_size[27],
            "price_stock_29": stock_price[28],
            "positionSize_stock_29": preTrade_stock_position_size[28],
            "price_stock_30": stock_price[29],
            "positionSize_stock_30": preTrade_stock_position_size[29]
        };
        //PASTIKAN FORMAT DATA INPUT INI JSON DAN BISA DIBACA PHP        
        $('#data_input_id').html(Intl.NumberFormat().format(parseFloat(data_input["dataInput_no"].toFixed(0))));
        $('#buyingPower').html(Intl.NumberFormat().format(parseFloat(data_input["buying_power"].toFixed(0))));
        for (stockNo = 0; stockNo <= 30; stockNo++) {
            $("#price_stock"+stockNo).html(Intl.NumberFormat().format(parseFloat(data_input["price_stock_"+stockNo].toFixed(5))));
            $("#position_stock"+stockNo).html(Intl.NumberFormat().format(parseFloat(data_input["positionSize_stock_"+stockNo].toFixed(0))));
        }
     
        let uri = "https://api.quantxi.com/add_data?api_key=" + localStorage.getItem("apiKey");
        // let post_process = "running";
        // while (post_process == "running") {
            await $.ajax({
                type: "POST",
                url: uri,
                data: data_input,
                dataType: 'json',
                success: function (result) {
                    if (result.status == "success") {

                        signal_output = [
                            {"signalOutput_no": result.data.data_id},
                            {"signal_timestamp": result.data.signal_timestamp},
                            {"signalPosition_stock_1": result.data.signal_position_stock1},                            
                            {"signalSize_stock_1": result.data.signal_size_stock1},
                            {"signalPosition_stock_2": result.data.signal_position_stock2},                            
                            {"signalSize_stock_2": result.data.signal_size_stock2},
                            {"signalPosition_stock_3": result.data.signal_position_stock3},                            
                            {"signalSize_stock_3": result.data.signal_size_stock3},
                            {"signalPosition_stock_4": result.data.signal_position_stock4},                            
                            {"signalSize_stock_4": result.data.signal_size_stock4},
                            {"signalPosition_stock_5": result.data.signal_position_stock5},                            
                            {"signalSize_stock_5": result.data.signal_size_stock5},
                            {"signalPosition_stock_6": result.data.signal_position_stock6},                            
                            {"signalSize_stock_6": result.data.signal_size_stock6},
                            {"signalPosition_stock_7": result.data.signal_position_stock7},                            
                            {"signalSize_stock_7": result.data.signal_size_stock7},
                            {"signalPosition_stock_8": result.data.signal_position_stock8},                            
                            {"signalSize_stock_8": result.data.signal_size_stock8},
                            {"signalPosition_stock_9": result.data.signal_position_stock9},                            
                            {"signalSize_stock_9": result.data.signal_size_stock9},
                            {"signalPosition_stock_10": result.data.signal_position_stock10},                            
                            {"signalSize_stock_10": result.data.signal_size_stock10},
                            {"signalPosition_stock_11": result.data.signal_position_stock11},                            
                            {"signalSize_stock_11": result.data.signal_size_stock11},
                            {"signalPosition_stock_12": result.data.signal_position_stock12},                            
                            {"signalSize_stock_12": result.data.signal_size_stock12},
                            {"signalPosition_stock_13": result.data.signal_position_stock13},                            
                            {"signalSize_stock_13": result.data.signal_size_stock13},
                            {"signalPosition_stock_14": result.data.signal_position_stock14},                            
                            {"signalSize_stock_14": result.data.signal_size_stock14},
                            {"signalPosition_stock_15": result.data.signal_position_stock15},                            
                            {"signalSize_stock_15": result.data.signal_size_stock15},
                            {"signalPosition_stock_16": result.data.signal_position_stock16},                            
                            {"signalSize_stock_16": result.data.signal_size_stock16},
                            {"signalPosition_stock_17": result.data.signal_position_stock17},                            
                            {"signalSize_stock_17": result.data.signal_size_stock17},
                            {"signalPosition_stock_18": result.data.signal_position_stock18},                            
                            {"signalSize_stock_18": result.data.signal_size_stock18},
                            {"signalPosition_stock_19": result.data.signal_position_stock19},                            
                            {"signalSize_stock_19": result.data.signal_size_stock19},
                            {"signalPosition_stock_20": result.data.signal_position_stock20},                            
                            {"signalSize_stock_20": result.data.signal_size_stock20},
                            {"signalPosition_stock_21": result.data.signal_position_stock21},                            
                            {"signalSize_stock_21": result.data.signal_size_stock21},
                            {"signalPosition_stock_22": result.data.signal_position_stock22},                            
                            {"signalSize_stock_22": result.data.signal_size_stock22},
                            {"signalPosition_stock_23": result.data.signal_position_stock23},                            
                            {"signalSize_stock_23": result.data.signal_size_stock23},
                            {"signalPosition_stock_24": result.data.signal_position_stock24},                            
                            {"signalSize_stock_24": result.data.signal_size_stock24},
                            {"signalPosition_stock_25": result.data.signal_position_stock25},                            
                            {"signalSize_stock_25": result.data.signal_size_stock25},
                            {"signalPosition_stock_26": result.data.signal_position_stock26},                            
                            {"signalSize_stock_26": result.data.signal_size_stock26},
                            {"signalPosition_stock_27": result.data.signal_position_stock27},                            
                            {"signalSize_stock_27": result.data.signal_size_stock27},
                            {"signalPosition_stock_28": result.data.signal_position_stock28},                            
                            {"signalSize_stock_28": result.data.signal_size_stock28},
                            {"signalPosition_stock_29": result.data.signal_position_stock29},                            
                            {"signalSize_stock_29": result.data.signal_size_stock29},
                            {"signalPosition_stock_30": result.data.signal_position_stock30},                            
                            {"signalSize_stock_30": result.data.signal_size_stock30}
                        ]
                                                    
                        $('#data_output_id').html(Intl.NumberFormat().format(parseFloat(signal_output["signalOutput_no"]).toFixed(0)));
                        $('#signaltimestamp').html(new Date(parseInt(signal_output["signal_timestamp"])).toISOString());
                        for (stockNo = 1; stockNo <= 30; stockNo++) {
                            $("#signal_position_stock"+stockNo).html(signal_output["signalPosition_stock_"+stockNo]);
                            $("#signal_size_stock"+stockNo).html(Intl.NumberFormat().format(parseFloat(signal_output["signalSize_stock_"+stockNo]).toFixed(0)));
                        }

                        $('#total_request').html(parseFloat(signal_output["signalOutput_no"]).toFixed(0));

                        // post_process = "stop";
                    }
                    //pasang logika jika result failed...gimana caranya kembali ke while dataidx process jika failed
                },
                error: function () {
                //   alert(`koneksi ke server gagal, coba beberapa saat lagi`);
                //   return false;
                    // post_process = "running";
                    reset_test();
                }
            })
        // }            
        // ----------------------------------------------------------------------------------  
        // TRADE TRANSACTION ================================================================
        // ----------------------------------------------------------------------------------
        //calculated estimate total trade value asumsi
        let estimate_imr = 0;
        let estimate_comm = 0;
        for (i = 0, stockNo = 1; i < 30, stockNo <= 30; i++, stockNo++) {
            if (signal_output["signalPosition_stock_"+stockNo] == "BUY") {
                estimate_imr += (signal_output["signalSize_stock_"+stockNo] * (stock_price[i] * (1 + spread_slippage)))*0.5;
            } else if (signal_output["signalPosition_stock_"+stockNo] == "SELL") {
                estimate_imr += (signal_output["signalSize_stock_"+stockNo] * (stock_price[i] * (1 - spread_slippage)))*0.5;               
            } else {
                estimate_imr += 0;
            }
            estimate_comm += (math.abs(signal_output["signalSize_stock_"+stockNo]) * 0.005); //commision per share
            // console.log("signal_p :"+signal_output.signal_position[i]);
            // console.log("signal_s :"+signal_output.signal_size[i]);
            // console.log("price :"+stock_price[i]);
            // console.log("estimate_imr :"+estimate_imr);
        }
        // console.log(estimate_imr);
        // console.log(estimate_comm);

        //calculate filled percentarge   
        let filled_percentage;
        if((estimate_imr+estimate_comm) == 0) {
            filled_percentage = 0;
        }else if((estimate_imr+estimate_comm) < 0) {
            filled_percentage = 1;
        } else if(preTrade_excess_equity < 0 && (estimate_imr+estimate_comm) >= 0) {
            filled_percentage = 0;
        } else if(preTrade_excess_equity > (estimate_imr+estimate_comm)) {
            filled_percentage = 1;
        } else {
            filled_percentage = preTrade_excess_equity/(estimate_imr+estimate_comm);
        }

        // console.log(filled_percentage);
        
        //trade transaction   
        let filledOrder = new Array();
        let filledPrice = new Array();
        let tradeValue = new Array();
        let commission_arr = new Array();
        let initialMargin = new Array();
        for (i = 0, stockNo = 1; i < 30, stockNo <= 30; i++, stockNo++) {
            if (signal_output["signalPosition_stock_"+stockNo] == "BUY") {
                filledOrder[i] = (signal_output["signalSize_stock_"+stockNo] * filled_percentage);
                filledPrice[i] = stock_price[i] * (1 + spread_slippage);
            } else if (signal_output["signalPosition_stock_"+stockNo] == "SELL") {
                filledOrder[i] = (signal_output["signalSize_stock_"+stockNo] * filled_percentage);
                filledPrice[i] = stock_price[i] * (1 - spread_slippage);               
            } else {
                filledOrder[i] = 0;
                filledPrice[i] = 0;
            }
            tradeValue[i] = filledOrder[i] * filledPrice[i];
            commission_arr[i] = math.abs(filledOrder[i]) * commission_perShare;
            initialMargin[i] = tradeValue[i] * 0.50;
        }
               
        let total_trade_value = tradeValue.reduce(function (accumulator, current) { return accumulator + current });
        let total_commission = commission_arr.reduce(function (accumulator, current) { return accumulator + current });
        let total_initial_margin = initialMargin.reduce(function (accumulator, current) { return accumulator + current });
                
        // ----------------------------------------------------------------------------------
        // POST TRADE POSITION CALCULATION ==================================================
        // ----------------------------------------------------------------------------------
        for (i = 0; i < 30; i++) {
            postTrade_stock_position_size[i] = preTrade_stock_position_size[i] + filledOrder[i];
            postTrade_stock_market_value[i] = stock_price[i] * postTrade_stock_position_size[i];
        }            
        postTrade_cash_balance = preTrade_cash_balance - (total_trade_value + total_commission);            
        postTrade_market_value = postTrade_stock_market_value.reduce(function (accumulator, current) { return accumulator + current });
        postTrade_equity_with_loanValue = postTrade_cash_balance + postTrade_market_value;
        postTrade_maintenance_margin_req = postTrade_market_value * 0.30;
        postTrade_excess_liquidity = postTrade_equity_with_loanValue - postTrade_maintenance_margin_req;
        postTrade_regT_margin_req = postTrade_market_value * 0.50;
        postTrade_excess_equity = postTrade_equity_with_loanValue - postTrade_regT_margin_req;
        if(postTrade_excess_equity<0) {
            postTrade_buying_power = 0;
        } else {
            postTrade_buying_power = postTrade_excess_equity * 2;
        }

        //View in web account & margin summary
        $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(postTrade_cash_balance).toFixed(0)));
        $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(postTrade_market_value).toFixed(0)));
        $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(postTrade_equity_with_loanValue).toFixed(0)));
        $('#maintenance_margin_req').html(Intl.NumberFormat().format(parseFloat(postTrade_maintenance_margin_req).toFixed(0)));
        $('#excess_liquidity').html(Intl.NumberFormat().format(parseFloat(postTrade_excess_liquidity).toFixed(0)));
        $('#regT_margin_req').html(Intl.NumberFormat().format(parseFloat(postTrade_regT_margin_req).toFixed(0)));
        $('#excess_equity').html(Intl.NumberFormat().format(parseFloat(postTrade_excess_equity).toFixed(0)));
        $('#buying_power').html(Intl.NumberFormat().format(parseFloat(postTrade_buying_power).toFixed(0)));
               
        stock_trade_details.push({
            date: current_date,
            stock_price: stock_price.slice(),
            preTrade_stock_position_size: preTrade_stock_position_size.slice(),
            preTrade_stock_market_value: preTrade_stock_market_value.slice(),
            stock_filled_order: filledOrder,
            stock_filled_price: filledPrice,
            stock_trade_value: tradeValue,
            stock_commission: commission_arr,
            stock_initial_margin: initialMargin,
            postTrade_stock_position_size: postTrade_stock_position_size.slice(),
            postTrade_stock_market_value: postTrade_stock_market_value.slice()
        })
                
        // console.log(stock_trade_details);

        account_and_trade_summary.push([
            current_date,
            daily_Interest,
            preTrade_cash_balance,
            preTrade_market_value,
            preTrade_equity_with_loanValue,
            preTrade_maintenance_margin_req,
            preTrade_excess_liquidity,
            preTrade_regT_margin_req,
            preTrade_excess_equity,
            preTrade_buying_power,
            total_trade_value,
            total_commission,
            total_initial_margin,
            postTrade_cash_balance,
            postTrade_market_value,
            postTrade_equity_with_loanValue,
            postTrade_maintenance_margin_req,
            postTrade_excess_liquidity,
            postTrade_regT_margin_req,
            postTrade_excess_equity,
            postTrade_buying_power
        ]);
        // console.log(account_and_trade_summary);

        data_input_output_arr.push({
            input: data_input,
            output: signal_output
        });
        // console.log(data_input_output_arr); 
               
        // ----------------------------------------------------------------------------------
        // UPDATE TRADE PERFORMANCE COMPARISON, QUANTXI AI VS BUY AND HOLD ==================
        // ---------------------------------------------------------------------------------- 
        quantxi_equity = postTrade_equity_with_loanValue;
        quantxi_equity_array.push(postTrade_equity_with_loanValue);
        buyhold_equity = stock_price.reduce(function (r, a, i) { return r + a * (initial_equity / 30) / parseFloat(testData2[0].price[i]) }, 0);
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

        data_idx_process++;
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
                        `+ account_and_trade_summary[i][0] +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][1]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][2]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][3]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][4]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][5]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][6]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][7]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][8]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][9]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][10]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][11]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][12]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][13]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][14]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][15]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][16]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][17]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][18]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][19]).toFixed(3)) +`</td>
                    <td style="text-align: right; border-left: 1px #373737 solid; padding: 0 3px">
                        `+ Intl.NumberFormat().format(parseFloat(account_and_trade_summary[i][20]).toFixed(3)) +`</td>
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
                        <pre style="font-size: 11px; color: black; margin-left: 20px; margin-top: 25px; margin-bottom: -15px">` 
                        + JSON.stringify(data_input_output_arr[i].input, null, 4) +
                        `</pre>;
                    </td>
                    <td>
                        <pre style="font-size: 11px; color: black; margin-left: 20px; margin-top: 25px; margin-bottom: -15px">` 
                        + JSON.stringify(data_input_output_arr[i].output, null, 4) +
                        `</pre>;
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
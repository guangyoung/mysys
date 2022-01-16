//------------------------------------------------------------------------------------------------------------
// RUN TEST #
//------------------------------------------------------------------------------------------------------------
// Ini adalah step run test ..................................................................................
//............................................................................................................
//............................................................................................................

async function run_test() {
    //initialisation variable
    var data_idx = 0;
    var current_date;
    var stock_price = new Array();
    var stock_position_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var stock_market_value = new Array();
    var daily_Interest;
    var cash_balance = initial_equity;
    var market_value;
    var equity_with_loanValue;
    var maintenance_margin_req;
    var excess_liquidity
    var regT_margin_req;
    var excess_equity;
    var sma = 0;
    var marginBuying_power;

    var buyHold_positionSize = new Array(); //istilah buyHold_stock_invest dicari lagi yg pas 
    for (i = 0; i < 30; i++) {
        buyHold_positionSize.push((initial_equity / 30) / parseFloat(test_data[0][i + 1].price));
    }

    var data_input = new Array();
    var signal_output = new Array();

    var daily_stock_position_transaction_details = new Array();
    var daily_stock_position_transaction_summary = new Array();
    var daily_account_and_trade_summary = new Array();
    var account_and_trade_summary = new Array();

    var quantxi_total_return_array = new Array();
    var buyandhold_total_return_array = new Array();

    var period_running;
    var quantxi_equity;
    var buyandhold_equity;
    var quantxi_total_return;
    var buyandhold_total_return;
    var quantxi_cagr;
    var buyandhold_cagr;
    var quantxi_mar;
    var buyandhold_mar;
    var quantxi_sharpe_ratio;
    var buyandhold_sharpe_ratio;
    var quantxi_sortino_ratio;
    var buyandhold_sortino_ratio;
    var quantxi_equity_peak = 0;
    var quantxi_equity_trough = 0;
    var quantxi_maxDrawDown = 0;
    var buyandhold_equity_peak = 0;
    var buyandhold_equity_trough = 0;
    var buyandhold_maxDrawDown = 0;

    if (test_data.length == 0) {
        Swal.fire(
            'No Test Data !',
            'Please click Market Data and Create It',
            'warning'
        )
        return false;
    } else {
        //api get last data
        //jika ada last data reset lalu running
        //munculkan modal set test period...msh pertimbangan...kemungkinan 75%    
        // Swal.fire({
        //     title: 'Connect to Quantxi AI',
        //     text: 'You will be connected to the Quantxi AI Engine Version 1.1.5, although this is a simulation, you are connected to the same Quantxi intelligence.',
        //     imageUrl: 'https://www.fundcalibre.com/wp-content/uploads/2020/04/AdobeStock_323829966-956x377.jpeg',
        //     imageWidth: 400,
        //     imageHeight: 200,
        //     imageAlt: 'Custom image',
        //     confirmButtonColor: '#3085d6',
        //     confirmButtonText: 'Ok'
        // }).then((result) => {

            // if (result.isConfirmed) {

                //disable button
                $("#setting_button").prop("disabled", true); //Disable Setting Button
                $("#data_button").prop("disabled", true); //Disable Market Data Button
                $("#reset_button").prop("disabled", true); //Disable Reset Button
                $("#play_button").prop("disabled", true); //Disable Play Button
                $("#trade_report_button").prop("disabled", true); //Disable Trade Report Button
                $("#trade_performance_button").prop("disabled", true); //Disable Performance Button
                $("#test_statistic_button").prop("disabled", true); //Disable Test Statistic Button
                $("#viewpost_button").prop("disabled", true); //Disable View Request Button

                //get stock ticker
                // var stock_ticker = new Array();
                // for (i = 0; i < 30; i++) {
                //     stock_ticker[i] = parseFloat(test_data.data[i].ticker);
                // }

                while (data_idx < 100) {  //dataidx < data length      

                    // ----------------------------------------------------------------------------------
                    // GET TEST DATA ####################################################################
                    // ----------------------------------------------------------------------------------
                    current_date = test_data[data_idx].date;

                    for (i = 0; i < 30; i++) {
                        stock_price[i] = parseFloat(test_data[data_idx].price[i]);
                    }
                    // ----------------------------------------------------------------------------------
                    // PRE TRADE POSITION CALCULATION ###################################################
                    // ----------------------------------------------------------------------------------

                    if (cash_balance < 0) {
                        if(current_date.getDay() == 5) {
                            daily_Interest = cash_balance * (interest_rate / 360) * 3; //cek lagi rumusnya
                        } else {
                            daily_Interest = cash_balance * (interest_rate / 360) * 1; //cek lagi rumusnya
                        }
                    } else {
                        daily_Interest = 0;
                    }

                    cash_balance -= daily_Interest;

                    for (i = 0; i < 30; i++) {
                        stock_market_value[i] = stock_price[i] * stock_position_size[i];
                    }
                    market_value = stock_market_value.reduce(function (accumulator, current) { return accumulator + current });

                    equity_with_loanValue = cash_balance + market_value;

                    maintenance_margin_req = market_value * 0.30;

                    excess_liquidity = equity_with_loanValue - maintenance_margin_req;

                    regT_margin_req = market_value * 0.50;

                    excess_equity = equity_with_loanValue - regT_margin_req;

                    sma = Math.max(sma, excess_equity);

                    if (excess_liquidity < 0) {
                        marginBuying_power = 0;//cek lagi coding ini krn saat excess liquidity <0 harusnya action mencegah margin call
                        //bisa juga set marginBuying_power = 0....arti 0, artinya terjadi margin call....dan quantxi akan kirim signal close all position
                        //tapi kemungkinan terjadi margin call jika menggunakan quantxi diminimalkan menjadi 0% alias tidak mungkin terjadi.
                    } else {
                        margin_buying_power = Math.min(sma / 0.5, excess_liquidity / 0.3);
                    }

                    //save daily pretrade stock position to array 
                    daily_stock_position_transaction_details.push({
                        stock_ticker,
                        stock_price,
                        stock_position_size,
                        stock_market_value
                    })
                    //save daily pretrade account summary to array  
                    daily_account_and_trade_summary.push({
                        date: current_date,
                        preTrade_dailyInterest: daily_Interest,
                        preTrade_cashbalance: cash_balance,
                        preTrade_marketvalue: market_value,
                        preTrade_equitywith_loanValue: equity_with_loanValue,
                        preTrade_maintenancemargin_reserved: maintenance_margin_reserved,
                        preTrade_maintenancemargin_available: maintenance_margin_available,
                        preTrade_initialmargin_reserved: initial_margin_reserved,
                        preTrade_initialmargin_available: initial_margin_available,
                        preTrade_marginbuying_power: marginBuying_power
                    })

                    //View in web account & margin summary
                    $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(cash_balance).toFixed(0)));
                    $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(market_value).toFixed(0)));
                    $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(equity_with_loanValue).toFixed(0)));
                    $('#maintenance_margin_reserved').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_reserved).toFixed(0)));
                    $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_available).toFixed(0)));
                    $('#initial_margin_reserved').html(Intl.NumberFormat().format(parseFloat(initial_margin_reserved).toFixed(0)));
                    $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_margin_available).toFixed(0)));
                    $('#marginBuying_power').html(Intl.NumberFormat().format(parseFloat(marginBuying_power).toFixed(0)));

                    // ----------------------------------------------------------------------------------  
                    // POST DATA TO QUANTXI AND GET SIGNAL FROM QUANTXI #################################
                    // ----------------------------------------------------------------------------------           
                   
                    var dataInput = {
                        request_no: data_idx + 1,//ganti jadi data_idx
                        margin_buying_power: marginBuying_power,
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
                        stock_position_size: [
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

                    data_input.push(dataInput); //save data to array data_input_history
                    // console.log(dataInput.data_id);        

                    $('#data_input_id').html(Intl.NumberFormat().format(parseFloat(dataInput.request_no).toFixed(0)));
                    $('#margin_buyingPower').html(Intl.NumberFormat().format(parseFloat(dataInput.margin_buying_power).toFixed(0)));
                    for (i = 1; i <= 30; i++) {
                        $("#price_stock" + i).html(Intl.NumberFormat().format(parseFloat(dataInput.stock_price[i]).toFixed(5)));
                        $("#position_stock" + i).html(Intl.NumberFormat().format(parseFloat(dataInput.stock_position_size[i]).toFixed(0)));
                    }

                    let ur = "https://api.quantxi.com/add_data?api_key=" + localStorage.getItem("apiKey");//gabung atau pisah ya ?
    
                    let post_process = running;

                    while (post_process == running) {
                        await $.ajax({
                            type: "POST",
                            url: ur,
                            data: dataInput,
                            dataType: 'json',
                            success: function (result) {
                                if (result.status == "success") {
                                    var signalOutput = {
                                        request_no: result.data.request_no,//ganti jadi response id
                                        signalTime_stamp: result.data.quantxiAI_engine,
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
                                    signal_output.push(signalOutput); //save data to array signal_output_history 
                                    // console.log(signalOutput);                        
    
                                    $('#total_request').html(parseFloat(dataInput.request_no).toFixed(0));
    
                                    $('#data_output_id').html(Intl.NumberFormat().format(parseFloat(signalOutput.data_id).toFixed(0)));
                                    $('#signaltimestamp').html(new Date(parseInt(signalOutput.signalTime_stamp)).toISOString());
                                    for (i = 1; i <= 30; i++) {
                                        $("#signal_position_stock" + i).html(signalOutput.signal_position[i]);
                                        $("#signal_size_stock" + i).html(Intl.NumberFormat().format(parseFloat(signalOutput.signal_size[i]).toFixed(0)));
                                    }
                                    post_process = finish;
                                }
                            }
                        })
                    }                                         

                    // ----------------------------------------------------------------------------------  
                    // TRADE TRANSACTION 
                    // ----------------------------------------------------------------------------------

                    //calculated total trade value
                    let total_trade_value_asumsi = 0;
                    for (i = 0; i < 30; i++) {
                        if (signalOutput.signal_position[i] == "BUY") {
                            total_trade_value_asumsi += parseInt(signalOutput.signal_size[i] * (stock_price[i] * (1 + spread_slippage)));
                        } else if (signalOutput.signal_position[i] == "SELL") {
                            total_trade_value_asumsi += parseInt(signalOutput.signal_size[i] * (stock_price[i] * (1 - spread_slippage)));
                        } else {
                            total_trade_value_asumsi += 0;
                        }
                    }

                    //calculate filled percentarge   
                    let filled_percentage;
                    if (total_trade_value_asumsi <= 0) {
                        filled_percentage = 1;
                    } else if (total_trade_value_asumsi < marginBuying_power) {
                        filled_percentage = 1;
                    } else {
                        filled_percentage = marginBuying_power / total_trade_value_asumsi;
                    }

                    //trade transaction   
                    let filledOrder = new Array();
                    let filledPrice = new Array();
                    let tradeValue = new Array();
                    let commission_arr = new Array();
                    let initialMargin = new Array();
                    for (i = 0; i < 30; i++) {
                        if (signalOutput.signal_position[i] == "BUY") {
                            filledOrder[i] = Math.floor(parseInt(signalOutput.signal_size[i] * filled_percentage));
                            filledPrice[i] = stock_price[i] * (1 + spread_slippage);
                            tradeValue[i] = filledOrder[i] * filledPrice[i];
                            commission_arr[i] = filledOrder[i] * commission_perShare;
                            initialMargin[i] = tradeValue[i] * 0.50;
                        } else if (signalOutput.signal_position[i] == "SELL") {
                            filledOrder[i] = Math.floor(parseInt(signalOutput.signal_size[i] * filled_percentage));
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

                        //save daily stock transaction data to array  
                        daily_stock_position_transaction_details.push({
                            filledOrder,
                            filledPrice,
                            tradeValue,
                            commission_arr,
                            initialMargin
                        })
                    }

                    let total_trade_value = tradeValue.reduce(function (accumulator, current) { return accumulator + current });
                    let total_commission = commission_arr.reduce(function (accumulator, current) { return accumulator + current });
                    let total_initial_margin = initialMargin.reduce(function (accumulator, current) { return accumulator + current });

                    //save daily trade summary data to array
                    daily_account_and_trade_summary.push({
                        totaltrade_value: total_trade_value,
                        totalcommission: total_commission,
                        totalinitial_margin: total_initial_margin
                    })

                    // ----------------------------------------------------------------------------------
                    // POST TRADE POSITION CALCULATION
                    // ----------------------------------------------------------------------------------

                    cash_balance -= (total_trade_value + total_commission);

                    for (i = 0; i < 30; i++) {
                        stock_position_size[i] += filledOrder[i];
                        stock_market_value[i] = stock_price[i] * stock_position_size[i];
                    }
                    market_value = stock_market_value.reduce(function (accumulator, current) { return accumulator + current });

                    equity_with_loanValue = cash_balance + market_value;

                    maintenance_margin_req = market_value * 0.30;

                    excess_liquidity = equity_with_loanValue - maintenance_margin_req;

                    regT_margin_req = market_value * 0.50;

                    excess_equity = equity_with_loanValue - regT_margin_req;

                    sma = Math.max(sma - total_initial_margin, excess_equity);

                    //save daily pretrade stock position to array 
                    daily_stock_position_transaction_details.push({
                        stock_position_size,
                        stock_market_value
                    });                    

                    //save daily pretrade account summary to array  
                    daily_account_and_trade_summary.push({
                        postTrade_cashbalance: cash_balance,
                        postTrade_marketvalue: market_value,
                        postTrade_equitywith_loanValue: equity_with_loanValue,
                        postTrade_maintenancemargin_reserved: maintenance_margin_reserved,
                        postTrade_maintenancemargin_available: maintenance_margin_available,
                        postTrade_initialmargin_reserved: initial_margin_reserved,
                        postTrade_initialmargin_available: initial_margin_available,
                        postTrade_marginbuying_power: margin_buying_power
                    });

                    //save daily stock position & transaction details to summary
                    daily_stock_position_transaction_summary.push(
                        {
                            date: current_date,
                            data: daily_stock_position_transaction_details
                        }
                    );

                    account_and_trade_summary.push(daily_account_and_trade_summary);

                    //View in web account & margin summary
                    $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(cash_balance).toFixed(0)));
                    $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(market_value).toFixed(0)));
                    $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(equity_with_loanValue).toFixed(0)));
                    $('#maintenance_margin_reserved').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_reserved).toFixed(0)));
                    $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_available).toFixed(0)));
                    $('#initial_margin_reserved').html(Intl.NumberFormat().format(parseFloat(initial_margin_reserved).toFixed(0)));
                    $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_margin_available).toFixed(0)));
                    $('#margin_buying_power').html(Intl.NumberFormat().format(parseFloat(marginBuying_power).toFixed(0)));

                    // ----------------------------------------------------------------------------------
                    // TRADE PERFORMANCE COMPARISON CALCULATION
                    // ---------------------------------------------------------------------------------- 

                    //perhitungan rasio2 performance---------------------------------
                    period_running = new Date(new Date(current_date) - new Date(test_data[0][0].date)).getUTCFullYear() - 1970;

                    quantxi_equity = equity_with_loanValue;

                    buyandhold_equity = stock_price.reduce(function (r, a, i) { return r + a * buyHold_positionSize[i] }, 0);

                    quantxi_total_return = quantxi_equity / initial_equity;
                    quantxi_total_return_array.push(quantxi_total_return);

                    buyandhold_total_return = buyandhold_equity / initial_equity;
                    buyandhold_total_return_array.push(buyandhold_total_return);

                    quantxi_cagr = ((quantxi_total_return) ^ (1 / period_running) - 1); //angka 30 ganti jadi periode sesuai periode data
                    // quantxi_cagr_array.push(quantxi_cagr);

                    buyandhold_cagr = ((buyandhold_total_return) ^ (1 / period_running) - 1); //angka 30 ganti jadi periode sesuai periode data
                    // buyandhold_cagr_array.push(buyandhold_cagr);

                    if (quantxi_equity > quantxi_equity_peak) {
                        quantxi_equity_peak = quantxi_equity;
                        quantxi_equity_trough = quantxi_equity_peak;
                    } else if (quantxi_equity < quantxi_equity_trough) {
                        quantxi_equity_trough = quantxi_equity;
                        let quantxi_tmpDrawDown = quantxi_equity_peak - quantxi_equity_trough;
                        if (quantxi_tmpDrawDown > quantxi_maxDrawDown)
                            quantxi_maxDrawDown = quantxi_tmpDrawDown;
                    }
                    // quantxi_maxDrawDown_array.push(quantxi_maxDrawDown);

                    if (buyandhold_equity > buyandhold_equity_peak) {
                        buyandhold_equity_peak = buyandhold_equity;
                        buyandhold_equity_trough = buyandhold_equity_peak;
                    } else if (buyandhold_equity < buyandhold_equity_trough) {
                        buyandhold_equity_trough = buyandhold_equity;
                        let buyandhold_tmpDrawDown = buyandhold_equity_peak - buyandhold_equity_trough;
                        if (buyandhold_tmpDrawDown > buyandhold_maxDrawDown)
                            buyandhold_maxDrawDown = buyandhold_tmpDrawDown;
                    }
                    // buyandhold_maxDrawDown_array.push(buyandhold_maxDrawDown);

                    quantxi_mar = (quantxi_cagr / quantxi_maxDrawDown);
                    // quantxi_mar_array.push(quantxi_mar);

                    buyandhold_mar = (buyandhold_cagr / buyandhold_maxDrawDown);
                    // buyandhold_mar_array.push(buyandhold_mar);

                    //Sharpe Ratio = (Average fund returns − Riskfree Rate) / Standard Deviation of fund  returns
                    quantxi_sharpe_ratio = (math.mean(quantxi_total_return_array) - risk_freeRate) / math.std(quantxi_total_return_array);
                    //dipikirkan jika tdk pakai total return array, tapi pakai equity array
                    // quantxi_sharpe_ratio_array.push(quantxi_sharpe_ratio);

                    buyandhold_sharpe_ratio = (math.mean(buyandhold_total_return_array) - risk_freeRate) / math.std(buyandhold_total_return_array);
                    // buyandhold_sharpe_ratio_array.push(buyandhold_sharpe_ratio);

                    quantxi_sortino_ratio = (1);
                    // quantxi_sortino_ratio_array.push(quantxi_sortino_ratio);

                    buyandhold_sortino_ratio = (1);
                    // buyandhold_sortino_ratio_array.push(buyandhold_sortino_ratio);

                    //tampilkan rasio ke halaman web------------------------------
                    $('#quantxi_total_return').html(parseFloat(quantxi_total_return * 100).toFixed(2) + "%");
                    $('#buyandhold_total_return').html(parseFloat(buyandhold_total_return * 100).toFixed(2) + "%");
                    $('#quantxi_cagr').html(parseFloat(quantxi_cagr * 100).toFixed(2) + "%");
                    $('#buyandhold_cagr').html(parseFloat(buyandhold_cagr * 100).toFixed(2) + "%");
                    $('#quantxi_maxdd').html(parseFloat(quantxi_maxDrawDown * 100).toFixed(2) + "%");
                    $('#buyandhold_maxdd').html(parseFloat(buyandhold_maxDrawDown * 100).toFixed(2) + "%");
                    $('#quantxi_sharpe').html(parseFloat(quantxi_sharpe_ratio * 100).toFixed(2) + "%");
                    $('#buyandhold_sharpe').html(parseFloat(buyandhold_sharpe_ratio * 100).toFixed(2) + "%");
                    $('#quantxi_sortino').html(parseFloat(quantxi_sortino_ratio * 100).toFixed(2) + "%");
                    $('#buyandhold_sortino').html(parseFloat(buyandhold_sortino_ratio * 100).toFixed(2) + "%");
                    
                    data_idx++; //next data proccess 
                    
                }

                // TRADE TESTING REPORT ---------------------------------------------------------------

                // //Performance Chart ---------------------------------------------
                // date_array.push(date);
                // quantxi_equity_array.push(parseFloat(equity).toFixed(0));    
                // buyandhold_equity_array.push(parseFloat(buyandhold_equity).toFixed(0));            
                // //------------------------------------------------------------------
                // //add data ID -------------------------------------------------------
                // dataID++; // lanjut id berikutnya, cek lagi posisi tambah id ini ?  
                //-----------------------------------------------------------     

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

                // clearInterval(proccess);

                // $(':button').prop('disabled', false); //Enable All Button
                $("#reset_button").prop("disabled", false); //Enable Reset Button
                $("#trade_report_button").prop("disabled", false); //Enable Trade Report Button
                $("#trade_performance_button").prop("disabled", false); //Enable Performance Button
                $("#test_statistic_button").prop("disabled", false); //Enable Test Statistic Button
                $("#viewpost_button").prop("disabled", false); //Enable View Request Button

                Swal.fire(
                    'Test Done',
                    'data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya',
                    'success'
                )

                $('#test_result').modal('show');
            // }
        // })
    }
}
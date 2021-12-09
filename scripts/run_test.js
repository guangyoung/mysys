//STEP 4. RESET TEST
//Ini adalah step run test ..........................,.............................
//...................................................................................
//...................................................................................

function run_test() {
    if (test_data.length == 0) {
        Swal.fire(
            'No Test Data !',
            'Please click Market Data and Create It',
            'warning'
        )
        return false;
        //cek last request_id/last data using quantxi rest api
    } else {
        Swal.fire({
            title: 'Connect to Quantxi AI',
            text: 'You will be connected to the Quantxi AI Engine Version 1.1.5, although this is a simulation, you are connected to the same Quantxi intelligence.',
            imageUrl: 'https://www.fundcalibre.com/wp-content/uploads/2020/04/AdobeStock_323829966-956x377.jpeg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {

                $("#setting_button").prop("disabled", true); //Disable Setting Button
                $("#data_button").prop("disabled", true); //Disable Market Data Button
                $("#reset_button").prop("disabled", true); //Disable Reset Button
                $("#play_button").prop("disabled", true); //Disable Play Button
                $("#trade_report_button").prop("disabled", true); //Disable Trade Report Button
                $("#trade_performance_button").prop("disabled", true); //Disable Performance Button
                $("#test_statistic_button").prop("disabled", true); //Disable Test Statistic Button
                $("#viewpost_button").prop("disabled", true); //Disable View Request Button

                proses();
            }
        })
    }
}

async function proses() {
    //initial variable
    var request_id = 0;
    // var response_id = 0;
    var current_date;
    var stock_price = new Array();
    var stock_position_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var daily_Interest;
    var cash_balance = initial_equity;
    var market_value = 0;
    var equity_with_loanValue;
    var maintenance_margin_reserved;
    var maintenance_margin_available;
    var initial_margin_reserved;
    var initial_margin_available;
    var marginBuying_power;

    var buyHold_stock_invest = new Array(); //istilah buyHold_stock_invest dicari lagi yg pas 
    for (i = 0; i < 30; i++) {
        buyHold_stock_invest.push((initial_equity / 30) / parseFloat(test_data[0][i + 1].price));
    }

    var data_input = new Array();
    var signal_output = new Array();

    var daily_stock_position_transaction_details = new Array();
    var daily_stock_position_transaction_summary = new Array();
    var daily_account_position_summary = new Array();

    var quantxi_total_return_array = new Array();
    var buyandhold_total_return_array = new Array();
    var quantxi_cagr_array = new Array();
    var buyandhold_cagr_array = new Array();
    var quantxi_maxDrawDown_array = new Array();
    var buyandhold_maxDrawDown_array = new Array();
    var quantxi_mar_array = new Array();
    var buyandhold_mar_array = new Array();
    var quantxi_sharpe_ratio_array = new Array();
    var buyandhold_sharpe_ratio_array = new Array();
    var quantxi_sortino_ratio_array = new Array();
    var buyandhold_sortino_ratio_array = new Array();

    while (request_id < 100) {

        // ----------------------------------------------------------------------------------
        // PRE TRADE POSITION CALCULATION
        // ----------------------------------------------------------------------------------

        current_date = test_data[request_id][0].date;

        if (cash_balance < 0) {            
            let previous_date = test_data[request_id - 1][0].date;
            let interest_day = current_date - previous_date //nama variable di cari yg cocok/standar penamaan
            daily_Interest = cash_balance * (interest_rate / 360) * 1; //cek lagi rumusnya
        } else {
            daily_Interest = 0;
        }

        cash_balance -= daily_Interest;

        // console.log("cash_balance: " + cash_balance);

        for (i = 0; i < 30; i++) {
            stock_price[i] = parseFloat(test_data[request_id][i + 1].price);//bimbang, apa terpisah atau gabung
            market_value += (stock_position_size[i] * stock_price[i]);
        }

        // console.log("market_value: " + market_value);

        equity_with_loanValue = cash_balance + market_value;

        // console.log("equity_with_loanValue: " + equity_with_loanValue);

        maintenance_margin_reserved = market_value * 0.30;

        maintenance_margin_available = equity_with_loanValue - maintenance_margin_reserved;

        initial_margin_reserved = market_value * 0.50;

        initial_margin_available = equity_with_loanValue - initial_margin_reserved;

        marginBuying_power = initial_margin_available * 2;

        // console.log("initial_margin_available: " + initial_margin_available);

        // console.log("daily_Interest: "+daily_Interest);
        // console.log("cash_balance: "+cash_balance);
        // console.log("market_value: "+market_value);
        // console.log("equity with loan value: "+equity_with_loanValue);
        // console.log("initial_margin_reserved: "+initial_margin_reserved);

        //save daily pretrade stock position to array            
        for (i = 0; i < 30; i++) {
            daily_stock_position_transaction_details.push({
                stock_price: stock_price[i],
                position_size: stock_position_size[i],
                market_value: stock_price[i] * stock_position_size[i]
            })
        }
        //save daily pretrade account summary to array  
        daily_account_position_summary.push({
            dailyInterest: daily_Interest,
            cashbalance: cash_balance,
            marketvalue: market_value,
            equitywith_loanValue: equity_with_loanValue,
            maintenancemargin_reserved: maintenance_margin_reserved,
            maintenancemargin_available: maintenance_margin_available,
            initialmargin_reserved: initial_margin_reserved,
            initialmargin_available: initial_margin_available,
            marginbuying_power: marginBuying_power
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
        // POST DATA TO QUANTXI AND GET SIGNAL FROM QUANTXI 
        // ----------------------------------------------------------------------------------           

        // request_id++;

        var dataInput = {
            data_id: request_id + 1,//ganti jadi request_id
            margin_buying_power: marginBuying_power,
            stock1: {
                price: stock_price[0],
                position_size: stock_position_size[0]
            },
            stock2: {
                price: stock_price[1],
                position_size: stock_position_size[1]
            },
            stock3: {
                price: stock_price[2],
                position_size: stock_position_size[2]
            },
            stock4: {
                price: stock_price[3],
                position_size: stock_position_size[3]
            },
            stock5: {
                price: stock_price[4],
                position_size: stock_position_size[4]
            },
            stock6: {
                price: stock_price[5],
                position_size: stock_position_size[5]
            },
            stock7: {
                price: stock_price[6],
                position_size: stock_position_size[6]
            },
            stock8: {
                price: stock_price[7],
                position_size: stock_position_size[7]
            },
            stock9: {
                price: stock_price[8],
                position_size: stock_position_size[8]
            },
            stock10: {
                price: stock_price[9],
                position_size: stock_position_size[9]
            },
            stock11: {
                price: stock_price[10],
                position_size: stock_position_size[10]
            },
            stock12: {
                price: stock_price[11],
                position_size: stock_position_size[11]
            },
            stock13: {
                price: stock_price[12],
                position_size: stock_position_size[12]
            },
            stock14: {
                price: stock_price[13],
                position_size: stock_position_size[13]
            },
            stock15: {
                price: stock_price[14],
                position_size: stock_position_size[14]
            },
            stock16: {
                price: stock_price[15],
                position_size: stock_position_size[15]
            },
            stock17: {
                price: stock_price[16],
                position_size: stock_position_size[16]
            },
            stock18: {
                price: stock_price[17],
                position_size: stock_position_size[17]
            },
            stock19: {
                price: stock_price[18],
                position_size: stock_position_size[18]
            },
            stock20: {
                price: stock_price[19],
                position_size: stock_position_size[19]
            },
            stock21: {
                price: stock_price[20],
                position_size: stock_position_size[20]
            },
            stock22: {
                price: stock_price[21],
                position_size: stock_position_size[21]
            },
            stock23: {
                price: stock_price[22],
                position_size: stock_position_size[22]
            },
            stock24: {
                price: stock_price[23],
                position_size: stock_position_size[23]
            },
            stock25: {
                price: stock_price[24],
                position_size: stock_position_size[24]
            },
            stock26: {
                price: stock_price[25],
                position_size: stock_position_size[25]
            },
            stock27: {
                price: stock_price[26],
                position_size: stock_position_size[26]
            },
            stock28: {
                price: stock_price[27],
                position_size: stock_position_size[27]
            },
            stock29: {
                price: stock_price[28],
                position_size: stock_position_size[28]
            },
            stock30: {
                price: stock_price[29],
                position_size: stock_position_size[29]
            }
        };

        data_input.push(dataInput); //save data to array data_input_history
        // console.log(dataInput.data_id);
        

        $('#data_input_id').html(Intl.NumberFormat().format(parseFloat(dataInput.data_id).toFixed(0)));
        $('#margin_buyingPower').html(Intl.NumberFormat().format(parseFloat(dataInput.margin_buying_power).toFixed(0)));
        for (i = 1; i <= 30; i++) {
            $("#price_stock" + i).html(eval(`Intl.NumberFormat().format(parseFloat(dataInput.stock` + i + `.price).toFixed(5))`));
            $("#position_stock" + i).html(eval(`Intl.NumberFormat().format(parseFloat(dataInput.stock` + i + `.position_size).toFixed(0))`));
        }

        // let post_process = "run";
        let ur = "https://api.quantxi.com/post?api_key=" + localStorage.getItem("apiKey");//gabung atau pisah ya ?

        // while (post_process == "run") {
            await $.ajax({
                type: "POST",
                url: ur,
                data: dataInput,
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                    if (result.status == "success") {
                        signalOutput = {
                            data_id: result.data.data_id,//ganti jadi response id
                            signalTime_stamp: result.data.quantxiAI_engine,
                            stock1: {
                                signal_position: result.data.signal_position_stock1,
                                signal_size: result.data.signal_size_stock1
                            },
                            stock2: {
                                signal_position: result.data.signal_position_stock2,
                                signal_size: result.data.signal_size_stock2
                            },
                            stock3: {
                                signal_position: result.data.signal_position_stock3,
                                signal_size: result.data.signal_size_stock3
                            },
                            stock4: {
                                signal_position: result.data.signal_position_stock4,
                                signal_size: result.data.signal_size_stock4
                            },
                            stock5: {
                                signal_position: result.data.signal_position_stock5,
                                signal_size: result.data.signal_size_stock5
                            },
                            stock6: {
                                signal_position: result.data.signal_position_stock6,
                                signal_size: result.data.signal_size_stock6
                            },
                            stock7: {
                                signal_position: result.data.signal_position_stock7,
                                signal_size: result.data.signal_size_stock7
                            },
                            stock8: {
                                signal_position: result.data.signal_position_stock8,
                                signal_size: result.data.signal_size_stock8
                            },
                            stock9: {
                                signal_position: result.data.signal_position_stock9,
                                signal_size: result.data.signal_size_stock9
                            },
                            stock10: {
                                signal_position: result.data.signal_position_stock10,
                                signal_size: result.data.signal_size_stock10
                            },
                            stock11: {
                                signal_position: result.data.signal_position_stock11,
                                signal_size: result.data.signal_size_stock11
                            },
                            stock12: {
                                signal_position: result.data.signal_position_stock12,
                                signal_size: result.data.signal_size_stock12
                            },
                            stock13: {
                                signal_position: result.data.signal_position_stock13,
                                signal_size: result.data.signal_size_stock13
                            },
                            stock14: {
                                signal_position: result.data.signal_position_stock14,
                                signal_size: result.data.signal_size_stock14
                            },
                            stock15: {
                                signal_position: result.data.signal_position_stock15,
                                signal_size: result.data.signal_size_stock15
                            },
                            stock16: {
                                signal_position: result.data.signal_position_stock16,
                                signal_size: result.data.signal_size_stock16
                            },
                            stock17: {
                                signal_position: result.data.signal_position_stock17,
                                signal_size: result.data.signal_size_stock17
                            },
                            stock18: {
                                signal_position: result.data.signal_position_stock18,
                                signal_size: result.data.signal_size_stock18
                            },
                            stock19: {
                                signal_position: result.data.signal_position_stock19,
                                signal_size: result.data.signal_size_stock19
                            },
                            stock20: {
                                signal_position: result.data.signal_position_stock20,
                                signal_size: result.data.signal_size_stock20
                            },
                            stock21: {
                                signal_position: result.data.signal_position_stock21,
                                signal_size: result.data.signal_size_stock21
                            },
                            stock22: {
                                signal_position: result.data.signal_position_stock22,
                                signal_size: result.data.signal_size_stock22
                            },
                            stock23: {
                                signal_position: result.data.signal_position_stock23,
                                signal_size: result.data.signal_size_stock23
                            },
                            stock24: {
                                signal_position: result.data.signal_position_stock24,
                                signal_size: result.data.signal_size_stock24
                            },
                            stock25: {
                                signal_position: result.data.signal_position_stock25,
                                signal_size: result.data.signal_size_stock25
                            },
                            stock26: {
                                signal_position: result.data.signal_position_stock26,
                                signal_size: result.data.signal_size_stock26
                            },
                            stock27: {
                                signal_position: result.data.signal_position_stock27,
                                signal_size: result.data.signal_size_stock27
                            },
                            stock28: {
                                signal_position: result.data.signal_position_stock28,
                                signal_size: result.data.signal_size_stock28
                            },
                            stock29: {
                                signal_position: result.data.signal_position_stock29,
                                signal_size: result.data.signal_size_stock29
                            },
                            stock30: {
                                signal_position: result.data.signal_position_stock30,
                                signal_size: result.data.signal_size_stock30
                            }
                        };
                        signal_output.push(signalOutput); //save data to array signal_output_history 
                        // console.log(signalOutput);

                        request_id++;

                        $('#total_request').html(request_id);

                        $('#data_output_id').html(Intl.NumberFormat().format(parseFloat(signalOutput.data_id).toFixed(0)));
                        console.log(signalOutput.signalTime_stamp);
                        // console.log(signalOutput.signalTime_stamp);
                        $('#signaltimestamp').html(new Date(signalOutput.signalTime_stamp).getTime()/1000);
                        for (i = 1; i <= 30; i++) {
                            $("#signal_position_stock" + i).html(eval(`signalOutput.stock` + i + `.signal_position`));
                            $("#signal_size_stock" + i).html(eval(`Intl.NumberFormat().format(parseFloat(signalOutput.stock` + i + `.signal_size).toFixed(0))`));
                        }

                        // post_process = "stop";

                        // ----------------------------------------------------------------------------------  
                        // TRADE TRANSACTION 
                        // ----------------------------------------------------------------------------------    

                        let filledOrder = new Array();
                        let filledPrice = new Array();
                        let tradeValue = new Array();
                        let commission_arr = new Array();
                        let initialMargin = new Array();
                        let total_trade_value;
                        let total_commission;
                        let total_initial_margin;

                        //calculated total initial_margin_required of all stock
                        let initial_margin_required = 0;
                        for (i = 0; i < 30; i++) {
                            if (eval(`signalOutput.stock` + (i + 1) + `.signal_position`) == "BUY") {
                                initial_margin_required += (parseInt(eval(`signalOutput.stock` + (i + 1) + `.signal_size`)) * (stock_price[i] * (1 + spread_slippage))) * regT_margin;
                            } else if (eval(`signalOutput.stock` + (i + 1) + `.signal_position`) == "SELL") {
                                initial_margin_required += (parseInt(eval(`signalOutput.stock` + (i + 1) + `.signal_size`)) * (stock_price[i] * (1 - spread_slippage))) * regT_margin;
                            } else {
                                initial_margin_required += 0;
                            }
                            // console.log("margin required "+i+": "+initial_margin_required);
                        }

                        //calculate filled percentarge   
                        let filled_percentage;
                        if (initial_margin_required <= 0) {
                            filled_percentage = 1;
                        } else if (initial_margin_available <= 0) {
                            filled_percentage = 0;
                        } else if (initial_margin_available > initial_margin_required) {
                            filled_percentage = 1;
                        } else {
                            filled_percentage = initial_margin_available / initial_margin_required;
                        }

                        // console.log("margin available: "+initial_margin_available);
                        // console.log("margin required: "+initial_margin_required);
                        // console.log("filled persen: "+filled_percentage);

                        // console.log("commission_setting: "+commission);

                        //trade transaction         
                        for (i = 0; i < 30; i++) {

                            if (eval(`signalOutput.stock` + (i + 1) + `.signal_position`) == "BUY") {
                                filledOrder[i] = Math.floor(parseInt(eval(`signalOutput.stock` + (i + 1) + `.signal_size`)) * filled_percentage);
                                filledPrice[i] = stock_price[i] * (1 + spread_slippage);
                                tradeValue[i] = filledOrder[i] * filledPrice[i];
                                commission_arr[i] = tradeValue[i] * commission_perShare;
                                initialMargin[i] = tradeValue[i] * 0.50;
                            } else if (eval(`signalOutput.stock` + (i + 1) + `.signal_position`) == "SELL") {
                                filledOrder[i] = Math.floor(parseInt(eval(`signalOutput.stock` + (i + 1) + `.signal_size`)) * filled_percentage);
                                filledPrice[i] = stock_price[i] * (1 - spread_slippage);
                                tradeValue[i] = filledOrder[i] * filledPrice[i];
                                commission_arr[i] = tradeValue[i] * commission_perShare;
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
                                stock_ticker: portfolio_data[i].ticker,
                                filledOrder: filledOrder[i],
                                filledPrice: filledPrice[i],
                                tradeValue: tradeValue[i],
                                commission: commission_arr[i],
                                initialMargin: initialMargin[i]
                            })
                        }

                        //save daily stock transaction data to array  
                        // for (i = 0; i < 30; i++) {

                        // }

                        total_trade_value = tradeValue.reduce(function (accumulator, current) {
                            return accumulator + current
                        }),
                        total_commission = commission_arr.reduce(function (accumulator, current) {
                            return accumulator + current
                        }),
                        total_initial_margin = initialMargin.reduce(function (accumulator, current) {
                            return accumulator + current
                        })

                        //save daily trade summary data to array
                        daily_account_position_summary.push({
                            totaltrade_value: total_trade_value,
                            totalcommission: total_commission,
                            totalinitial_margin: total_initial_margin
                        })

                        // ----------------------------------------------------------------------------------
                        // POST TRADE POSITION CALCULATION
                        // ----------------------------------------------------------------------------------

                        for (i = 0; i < 30; i++) {
                            // console.log("position size: "+stock_position_size[i]);
                            // console.log("filled order: "+filledOrder[i]);
                            stock_position_size[i] += filledOrder[i];
                            market_value += (stock_position_size[i] * stock_price[i]);
                        }
                        // console.log("total_trade_value: "+total_trade_value);
                        // console.log("total_commission: "+total_commission);
                        // console.log("cash_balance: "+cash_balance);

                        cash_balance -= (total_trade_value + total_commission);

                        equity_with_loanValue = cash_balance + market_value;

                        maintenance_margin_reserved = market_value * 0.30;

                        maintenance_margin_available = equity_with_loanValue - maintenance_margin_reserved;

                        initial_margin_reserved = market_value * 0.50;

                        initial_margin_available = equity_with_loanValue - initial_margin_reserved;

                        margin_buying_power = initial_margin_available * 2;

                        //save daily pretrade stock position to array            
                        for (i = 0; i < 30; i++) {
                            daily_stock_position_transaction_details.push({
                                position_size: stock_position_size[i],
                                market_value: stock_price[i] * stock_position_size[i]
                            })
                        }
                        //save daily stock position & transaction details to summary
                        daily_stock_position_transaction_summary.push(
                            {
                                date: current_date,
                                data: daily_stock_position_transaction_details
                            }
                        );

                        //save daily pretrade account summary to array  
                        daily_account_position_summary.push({
                            cashbalance: cash_balance,
                            marketvalue: market_value,
                            equitywith_loanValue: equity_with_loanValue,
                            maintenancemargin_reserved: maintenance_margin_reserved,
                            maintenancemargin_available: maintenance_margin_available,
                            initialmargin_reserved: initial_margin_reserved,
                            initialmargin_available: initial_margin_available,
                            marginbuying_power: margin_buying_power
                        })



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
                        let period = new Date(new Date(test_data[request_id - 1][0].date) - new Date(test_data[0][0].date)).getUTCFullYear() - 1970;

                        let quantxi_equity = equity_with_loanValue;

                        let buyandhold_equity = 0;
                        for (i = 0; i < 30; i++) {
                            buyandhold_equity += buyHold_stock_invest[i] * stock_price[i];
                        }

                        let quantxi_total_return = quantxi_equity / initial_equity;
                        quantxi_total_return_array.push(quantxi_total_return);

                        let buyandhold_total_return = buyandhold_equity / initial_equity;
                        buyandhold_total_return_array.push(buyandhold_total_return);

                        let quantxi_cagr = ((quantxi_total_return) ^ (1 / period) - 1); //angka 30 ganti jadi periode sesuai periode data
                        quantxi_cagr_array.push(quantxi_cagr);

                        let buyandhold_cagr = ((buyandhold_total_return) ^ (1 / period) - 1); //angka 30 ganti jadi periode sesuai periode data
                        buyandhold_cagr_array.push(buyandhold_cagr);

                        let quantxi_equity_peak = 0;
                        let quantxi_equity_trough = 0;
                        let quantxi_maxDrawDown = 0;
                        if (quantxi_equity > quantxi_equity_peak) {
                            quantxi_equity_peak = quantxi_equity;
                            quantxi_equity_trough = quantxi_equity_peak;
                        } else if (quantxi_equity < quantxi_equity_trough) {
                            quantxi_equity_trough = quantxi_equity;
                            let quantxi_tmpDrawDown = quantxi_equity_peak - quantxi_equity_trough;
                            if (quantxi_tmpDrawDown > quantxi_maxDrawDown)
                                quantxi_maxDrawDown = quantxi_tmpDrawDown;
                        }
                        quantxi_maxDrawDown_array.push(quantxi_maxDrawDown);

                        let buyandhold_equity_peak = 0;
                        let buyandhold_equity_trough = 0;
                        let buyandhold_maxDrawDown = 0;
                        if (buyandhold_equity > buyandhold_equity_peak) {
                            buyandhold_equity_peak = buyandhold_equity;
                            buyandhold_equity_trough = buyandhold_equity_peak;
                        } else if (buyandhold_equity < buyandhold_equity_trough) {
                            buyandhold_equity_trough = buyandhold_equity;
                            let buyandhold_tmpDrawDown = buyandhold_equity_peak - buyandhold_equity_trough;
                            if (buyandhold_tmpDrawDown > buyandhold_maxDrawDown)
                                buyandhold_maxDrawDown = buyandhold_tmpDrawDown;
                        }
                        buyandhold_maxDrawDown_array.push(buyandhold_maxDrawDown);

                        let quantxi_mar = (quantxi_cagr / quantxi_maxDrawDown);
                        quantxi_mar_array.push(quantxi_mar);

                        let buyandhold_mar = (buyandhold_cagr / buyandhold_maxDrawDown);
                        buyandhold_mar_array.push(buyandhold_mar);

                        //Sharpe Ratio = (Average fund returns − Riskfree Rate) / Standard Deviation of fund  returns
                        let quantxi_sharpe_ratio = (math.mean(quantxi_total_return_array) - risk_freeRate) / math.std(quantxi_total_return_array);
                        quantxi_sharpe_ratio_array.push(quantxi_sharpe_ratio);

                        let buyandhold_sharpe_ratio = (math.mean(buyandhold_total_return_array) - risk_freeRate) / math.std(buyandhold_total_return_array);
                        buyandhold_sharpe_ratio_array.push(buyandhold_sharpe_ratio);

                        let quantxi_sortino_ratio = (1);
                        quantxi_sortino_ratio_array.push(quantxi_sortino_ratio);

                        let buyandhold_sortino_ratio = (1);
                        buyandhold_sortino_ratio_array.push(buyandhold_sortino_ratio);

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
                    } 
                },
                error: function () {
                  alert(`koneksi ke server gagal, coba beberapa saat lagi`);
                  reset_test() 
                }
            })
        // }

    }

    // if(request_id == 1000){ 

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
}
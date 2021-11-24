 //STEP 4. RESET TEST
//Ini adalah step run test ..........................,.............................
//...................................................................................
//...................................................................................
 
    function run_test() { 
        //initial variable
        var request_id = 0;
        var response_id = 0;
        var date;
        var stock_price = new Array();
        var stock_position_size = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        
        var daily_Interest;
        var cash_balance = initial_equity;        
        var market_value = 0;
        var equity_with_loanValue;
        var maintenance_margin_reserved;
        var maintenance_margin_available;
        var initial_margin_reserved;
        var initial_margin_available; 

        var buyHold_stock_invest = new Array();//istilah buyHold_stock_invest dicari lagi yg pas        

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

        if (test_data.length == 0) {
            Swal.fire(
                'No Test Data !',
                'Please click Market Data and Create It',
                'warning'
            )
            return false;
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
                if(result.isConfirmed) {                    
                    $(':button').prop('disabled', true); //Disable All Button 
                    
                    var ti = setInterval(async function() {
                        
                        if (request_id < 5000 && request_id == response_id) {
                
                            date = test_data[request_id][0].date; 
                            
                            for (i=0;i<30;i++) {  
                                stock_price[i] = parseFloat(test_data[request_id][i+1].price); //ini kurang bisa dibaca, pikir cara lain                  
                            }
                
                            // ----------------------------------------------------------------------------------
                            // PRE TRADE POSITION CALCULATION
                            // ----------------------------------------------------------------------------------
                            
                            if(cash_balance < 0) {
                                daily_Interest = cash_balance * (interest_rate/360); //cek lagi rumusnya
                            } else {
                                daily_Interest = 0;
                            }           
                
                            // cash_balance -= daily_Interest;
                
                            for (i=0;i<30;i++) {  
                                market_value += (stock_position_size[i] * stock_price[i]);                  
                            }
                
                            equity_with_loanValue = cash_balance + market_value;
                
                            maintenance_margin_reserved = market_value * 0.30;
                
                            maintenance_margin_available = equity_with_loanValue - maintenance_margin_reserved;
                
                            initial_margin_reserved = market_value * 0.50;
                
                            initial_margin_available = equity_with_loanValue - initial_margin_reserved;

                            // console.log("daily_Interest: "+daily_Interest);
                            // console.log("cash_balance: "+cash_balance);
                            // console.log("market_value: "+market_value);
                            // console.log("equity with loan value: "+equity_with_loanValue);
                            // console.log("initial_margin_reserved: "+initial_margin_reserved);
                
                            //save daily pretrade stock position to array            
                            for (i=0;i<30;i++) {
                                daily_stock_position_transaction_details.push({
                                    stock_price : stock_price[i],
                                    position_size: stock_position_size[i],
                                    market_value:  stock_price[i]*stock_position_size[i]
                                })
                            }
                            //save daily pretrade account summary to array  
                            daily_account_position_summary.push({
                                daily_Interest:  daily_Interest,
                                cash_balance : cash_balance,
                                market_value: market_value,
                                equity_with_loanValue: equity_with_loanValue,
                                maintenance_margin_reserved: maintenance_margin_reserved,
                                maintenance_margin_available: maintenance_margin_available,
                                initial_margin_reserved: initial_margin_reserved,
                                initial_margin_available: initial_margin_available,
                            })  
                            
                            //View in web account & margin summary
                            $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(cash_balance).toFixed(0)));
                            $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(market_value).toFixed(0)));
                            $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(equity_with_loanValue).toFixed(0)));
                            $('#maintenance_margin_reserved').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_reserved).toFixed(0)));
                            $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_available).toFixed(0)));
                            $('#initial_margin_reserved').html(Intl.NumberFormat().format(parseFloat(initial_margin_reserved).toFixed(0)));
                            $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_margin_available).toFixed(0)));
                                
                            // ----------------------------------------------------------------------------------  
                            // POST DATA TO QUANTXI AND GET SIGNAL FROM QUANTXI 
                            // ----------------------------------------------------------------------------------           
                            
                            request_id++;
                
                            var dataInput = {
                                data_id: request_id,
                                margin_available: initial_margin_available,
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
                            // console.log(dataInput);

                            var input_element = 
                            `<tr>
                                <td colspan="3" style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Data ID</td>
                                <td colspan="3" style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+dataInput.data_id+`</td>
                            </tr>
                            <tr>
                                <td colspan="3" style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Margin Available</td>
                                <td colspan="3" style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.margin_available).toFixed(0))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock #</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 43px">Stock<br>Price</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 55px">Position<br>Size</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock #</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 43px">Stock<br>Price</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 55px">Position<br>Size</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;1</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock1.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock1.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;16</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock16.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock16.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;2</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock2.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock2.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;17</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock17.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock17.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;3</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock3.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock3.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;18</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock18.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock18.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;4</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock4.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock4.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;19</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock19.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock19.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;5</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock5.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock5.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;20</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock20.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock20.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;6</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock6.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock6.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;21</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock21.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock21.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;7</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock7.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock7.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;22</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock22.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock22.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;8</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock8.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock8.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;23</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock23.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock23.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;9</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock9.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock9.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;24</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock24.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock24.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;10</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock10.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock10.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;25</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock25.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock25.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;11</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock11.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock11.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;26</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock26.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock26.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;12</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock12.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock12.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;27</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock27.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock27.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;13</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock13.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock13.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;28</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock28.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock28.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;14</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock14.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock14.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;29</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock29.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock29.position_size).toFixed(5))+`</td>
                            </tr>
                            <tr>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;15</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock15.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock15.position_size).toFixed(5))+`</td>
                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;30</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock30.price).toFixed(0))+`</td>
                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(dataInput.stock30.position_size).toFixed(5))+`</td>
                            </tr>`

                            $("#inputElement").html(input_element);
                
                            //update signal....
                            // $('#data_id_input','#input_margin_available').html(dataInput.data_id,Intl.NumberFormat().format(parseFloat(dataInput.margin_available).toFixed(0)));
                            // $('#input_margin_available').html(Intl.NumberFormat().format(parseFloat(dataInput.margin_available).toFixed(0)));
                            // $('#stock1_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock1.price).toFixed(2)));
                            // $('#stock1_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock1.position_size).toFixed(0)));
                            // $('#stock2_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock2.price).toFixed(2)));
                            // $('#stock2_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock2.position_size).toFixed(0)));
                            // $('#stock3_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock3.price).toFixed(2)));
                            // $('#stock3_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock3.position_size).toFixed(0)));
                            // $('#stock4_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock4.price).toFixed(2)));
                            // $('#stock4_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock4.position_size).toFixed(0)));
                            // $('#stock5_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock5.price).toFixed(2)));
                            // $('#stock5_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock5.position_size).toFixed(0)));
                            // $('#stock6_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock6.price).toFixed(2)));
                            // $('#stock6_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock6.position_size).toFixed(0)));
                            // $('#stock7_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock7.price).toFixed(2)));
                            // $('#stock7_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock7.position_size).toFixed(0)));
                            // $('#stock8_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock8.price).toFixed(2)));
                            // $('#stock8_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock8.position_size).toFixed(0)));
                            // $('#stock9_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock9.price).toFixed(2)));
                            // $('#stock9_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock9.position_size).toFixed(0)));
                            // $('#stock10_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock10.price).toFixed(2)));
                            // $('#stock10_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock10.position_size).toFixed(0)));
                            // $('#stock11_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock11.price).toFixed(2)));
                            // $('#stock11_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock11.position_size).toFixed(0)));
                            // $('#stock12_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock12.price).toFixed(2)));
                            // $('#stock12_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock12.position_size).toFixed(0)));
                            // $('#stock13_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock13.price).toFixed(2)));
                            // $('#stock13_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock13.position_size).toFixed(0)));
                            // $('#stock14_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock14.price).toFixed(2)));
                            // $('#stock14_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock14.position_size).toFixed(0)));
                            // $('#stock15_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock15.price).toFixed(2)));
                            // $('#stock15_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock15.position_size).toFixed(0)));
                            // $('#stock16_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock16.price).toFixed(2)));
                            // $('#stock16_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock16.position_size).toFixed(0)));
                            // $('#stock17_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock17.price).toFixed(2)));
                            // $('#stock17_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock17.position_size).toFixed(0)));
                            // $('#stock18_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock18.price).toFixed(2)));
                            // $('#stock18_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock18.position_size).toFixed(0)));
                            // $('#stock19_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock19.price).toFixed(2)));
                            // $('#stock19_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock19.position_size).toFixed(0)));
                            // $('#stock20_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock20.price).toFixed(2)));
                            // $('#stock20_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock20.position_size).toFixed(0)));
                            // $('#stock21_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock21.price).toFixed(2)));
                            // $('#stock21_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock21.position_size).toFixed(0)));
                            // $('#stock22_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock22.price).toFixed(2)));
                            // $('#stock22_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock22.position_size).toFixed(0)));
                            // $('#stock23_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock23.price).toFixed(2)));
                            // $('#stock23_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock23.position_size).toFixed(0)));
                            // $('#stock24_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock24.price).toFixed(2)));
                            // $('#stock24_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock24.position_size).toFixed(0)));
                            // $('#stock25_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock25.price).toFixed(2)));
                            // $('#stock25_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock25.position_size).toFixed(0)));
                            // $('#stock26_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock26.price).toFixed(2)));
                            // $('#stock26_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock26.position_size).toFixed(0)));
                            // $('#stock27_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock27.price).toFixed(2)));
                            // $('#stock27_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock27.position_size).toFixed(0)));
                            // $('#stock28_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock28.price).toFixed(2)));
                            // $('#stock28_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock28.position_size).toFixed(0)));
                            // $('#stock29_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock29.price).toFixed(2)));
                            // $('#stock29_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock29.position_size).toFixed(0)));
                            // $('#stock30_price').html(Intl.NumberFormat().format(parseFloat(dataInput.stock30.price).toFixed(2)));
                            // $('#stock30_position_size').html(Intl.NumberFormat().format(parseFloat(dataInput.stock30.position_size).toFixed(0)));
                
                            // var post_process = "run";
                            let apiKey = localStorage.getItem("apiKey");
                            while (response_id < request_id) {
                                await $.ajax({
                                    type: "POST",
                                    url: "https://api.quantxi.com/post?api_key="+apiKey,
                                    data: dataInput,           
                                    dataType: 'json',
                                    success: function(result){ 
                                        // console.log(result);
                                        if (result.status == "success") {
                                            signalOutput = {
                                                data_id: result.data.data_id,
                                                total_signal: result.data.total_signal,
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
                                            signal_output.push(signalOutput);//save data to array signal_output_history 
                                            // console.log(signalOutput);
                
                                            $('#total_request').html(signalOutput.data_id);

                                            var output_element = 
                                            `<tr>
                                                <td colspan="3" style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Data ID</td>
                                                <td colspan="3" style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.data_id+`</td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" style="text-align: left; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Total Signal</td>
                                                <td colspan="3" style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-top: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.total_signal+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock #</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 45px">Signal<br>Position</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 53px">Signal<br>Size</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock #</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 45px">Signal<br>Position</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; width: 53px">Signal<br>Size</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;1</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock1.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock1.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;16</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock16.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock16.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;2</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock2.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock2.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;17</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock17.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock17.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;3</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock3.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock3.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;18</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock18.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock18.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;4</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock4.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock4.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;19</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock19.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock19.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;5</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock5.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock5.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;20</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock20.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock20.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;6</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock6.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock6.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;21</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock21.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock21.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;7</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock7.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock7.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;22</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock22.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock22.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;8</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock8.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock8.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;23</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock23.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock23.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;9</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock9.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock9.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;24</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock24.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock24.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;10</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock10.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock10.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;25</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock25.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock25.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;11</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock11.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock11.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;26</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock26.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock26.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;12</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock12.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock12.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;27</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock27.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock27.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;13</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock13.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock13.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;28</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock28.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock28.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;14</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock14.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock14.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;29</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock29.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock29.signal_size).toFixed(0))+`</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;15</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock15.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock15.signal_size).toFixed(0))+`</td>
                                                <td style="text-align: center; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">Stock&nbsp;30</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+signalOutput.stock30.signal_position+`</td>
                                                <td style="text-align: right; padding: 3px 5px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid;">`+Intl.NumberFormat().format(parseFloat(signalOutput.stock30.signal_size).toFixed(0))+`</td>
                                            </tr>`

                                            $("#outputElement").html(output_element);
                
                                            //kemungkin bisa ini dibuat pakai for loop campur eval
                                            // $('#data_id_output').html(signalOutput.data_id);
                                            // $('#output_total_signal').html(signalOutput.total_signal);
                                            // $('#stock1_signal_position').html(signalOutput.stock1.signal_position);
                                            // $('#stock1_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock1.signal_size).toFixed(0)));
                                            // $('#stock2_signal_position').html(signalOutput.stock2.signal_position);
                                            // $('#stock2_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock2.signal_size).toFixed(0)));
                                            // $('#stock3_signal_position').html(signalOutput.stock3.signal_position);
                                            // $('#stock3_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock3.signal_size).toFixed(0)));
                                            // $('#stock4_signal_position').html(signalOutput.stock4.signal_position);
                                            // $('#stock4_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock4.signal_size).toFixed(0)));
                                            // $('#stock5_signal_position').html(signalOutput.stock5.signal_position);
                                            // $('#stock5_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock5.signal_size).toFixed(0)));
                                            // $('#stock6_signal_position').html(signalOutput.stock6.signal_position);
                                            // $('#stock6_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock6.signal_size).toFixed(0)));
                                            // $('#stock7_signal_position').html(signalOutput.stock7.signal_position);
                                            // $('#stock7_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock7.signal_size).toFixed(0)));
                                            // $('#stock8_signal_position').html(signalOutput.stock8.signal_position);
                                            // $('#stock8_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock8.signal_size).toFixed(0)));
                                            // $('#stock9_signal_position').html(signalOutput.stock9.signal_position);
                                            // $('#stock9_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock9.signal_size).toFixed(0)));
                                            // $('#stock10_signal_position').html(signalOutput.stock10.signal_position);
                                            // $('#stock10_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock10.signal_size).toFixed(0)));
                                            // $('#stock11_signal_position').html(signalOutput.stock11.signal_position);
                                            // $('#stock11_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock11.signal_size).toFixed(0)));
                                            // $('#stock12_signal_position').html(signalOutput.stock12.signal_position);
                                            // $('#stock12_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock12.signal_size).toFixed(0)));
                                            // $('#stock13_signal_position').html(signalOutput.stock13.signal_position);
                                            // $('#stock13_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock13.signal_size).toFixed(0)));
                                            // $('#stock14_signal_position').html(signalOutput.stock14.signal_position);
                                            // $('#stock14_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock14.signal_size).toFixed(0)));
                                            // $('#stock15_signal_position').html(signalOutput.stock15.signal_position);
                                            // $('#stock15_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock15.signal_size).toFixed(0)));
                                            // $('#stock16_signal_position').html(signalOutput.stock16.signal_position);
                                            // $('#stock16_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock16.signal_size).toFixed(0)));
                                            // $('#stock17_signal_position').html(signalOutput.stock17.signal_position);
                                            // $('#stock17_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock17.signal_size).toFixed(0)));
                                            // $('#stock18_signal_position').html(signalOutput.stock18.signal_position);
                                            // $('#stock18_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock18.signal_size).toFixed(0)));
                                            // $('#stock19_signal_position').html(signalOutput.stock19.signal_position);
                                            // $('#stock19_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock19.signal_size).toFixed(0)));
                                            // $('#stock20_signal_position').html(signalOutput.stock20.signal_position);
                                            // $('#stock20_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock20.signal_size).toFixed(0)));
                                            // $('#stock21_signal_position').html(signalOutput.stock21.signal_position);
                                            // $('#stock21_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock21.signal_size).toFixed(0)));
                                            // $('#stock22_signal_position').html(signalOutput.stock22.signal_position);
                                            // $('#stock22_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock22.signal_size).toFixed(0)));
                                            // $('#stock23_signal_position').html(signalOutput.stock23.signal_position);
                                            // $('#stock23_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock23.signal_size).toFixed(0)));
                                            // $('#stock24_signal_position').html(signalOutput.stock24.signal_position);
                                            // $('#stock24_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock24.signal_size).toFixed(0)));
                                            // $('#stock25_signal_position').html(signalOutput.stock25.signal_position);
                                            // $('#stock25_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock25.signal_size).toFixed(0)));
                                            // $('#stock26_signal_position').html(signalOutput.stock26.signal_position);
                                            // $('#stock26_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock26.signal_size).toFixed(0)));
                                            // $('#stock27_signal_position').html(signalOutput.stock27.signal_position);
                                            // $('#stock27_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock27.signal_size).toFixed(0)));
                                            // $('#stock28_signal_position').html(signalOutput.stock28.signal_position);
                                            // $('#stock28_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock28.signal_size).toFixed(0)));
                                            // $('#stock29_signal_position').html(signalOutput.stock29.signal_position);
                                            // $('#stock29_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock29.signal_size).toFixed(0)));
                                            // $('#stock30_signal_position').html(signalOutput.stock30.signal_position);
                                            // $('#stock30_signal_size').html(Intl.NumberFormat().format(parseFloat(signalOutput.stock30.signal_size).toFixed(0)));
                                            
                                            response_id ++;
                                            
                                            // ----------------------------------------------------------------------------------  
                                            // TRADE TRANSACTION 
                                            // ----------------------------------------------------------------------------------    
                                            
                                            var filledOrder = new Array();
                                            var filledPrice = new Array();
                                            var tradeValue = new Array();
                                            var commission_arr = new Array();
                                            var initialMargin = new Array();
                                            var total_trade_value;
                                            var total_commission;
                                            var total_initial_margin;
                                            
                                            //calculated total initial_margin_required of all stock
                                            let initial_margin_required = 0;            
                                            for (i=0; i<30; i++) {
                                                if(eval(`signalOutput.stock`+(i+1)+`.signal_position`) == "BUY") {
                                                    initial_margin_required += (parseInt(eval(`signalOutput.stock`+(i+1)+`.signal_size`))*(stock_price[i]*(1+spread_slippage)))*regT_margin;
                                                } else if(eval(`signalOutput.stock`+(i+1)+`.signal_position`) == "SELL") {
                                                    initial_margin_required += (parseInt(eval(`signalOutput.stock`+(i+1)+`.signal_size`))*(stock_price[i]*(1-spread_slippage)))*regT_margin;
                                                } else {
                                                    initial_margin_required += 0;
                                                } 
                                                // console.log("margin required "+i+": "+initial_margin_required);
                                            } 
                                
                                            //calculate filled percentarge   
                                            let filled_percentage;
                                                if(initial_margin_required <= 0) {
                                                filled_percentage = 1;
                                                } else if(initial_margin_available <= 0) {
                                                filled_percentage = 0;
                                                } else if(initial_margin_available > initial_margin_required) {
                                                filled_percentage = 1;
                                                } else {
                                                filled_percentage = initial_margin_available / initial_margin_required;
                                                }

                                            // console.log("margin available: "+initial_margin_available);
                                            // console.log("margin required: "+initial_margin_required);
                                            // console.log("filled persen: "+filled_percentage);
                                                
                                            // console.log("commission_setting: "+commission);
                                                
                                            //trade transaction         
                                            for (i=0; i<30; i++) { 
                                
                                                if(eval(`signalOutput.stock`+(i+1)+`.signal_position`) == "BUY") {
                                                filledOrder[i]  = Math.floor(parseInt(eval(`signalOutput.stock`+(i+1)+`.signal_size`))*filled_percentage);
                                                filledPrice[i]  = stock_price[i]*(1+spread_slippage);
                                                tradeValue[i] = filledOrder[i] * filledPrice[i];
                                                commission_arr[i] = tradeValue[i] * commission;
                                                initialMargin[i] = tradeValue[i] * 0.50;
                                                } else if(eval(`signalOutput.stock`+(i+1)+`.signal_position`) == "SELL") {
                                                filledOrder[i]  = Math.floor(parseInt(eval(`signalOutput.stock`+(i+1)+`.signal_size`))*filled_percentage);
                                                filledPrice[i]  = stock_price[i]*(1-spread_slippage);
                                                tradeValue[i] = filledOrder[i] * filledPrice[i];
                                                commission_arr[i] = tradeValue[i] * commission;
                                                initialMargin[i] = tradeValue[i] * 0.50;
                                                } else {
                                                filledOrder[i]  = 0;
                                                filledPrice[i]  = 0;
                                                tradeValue[i] = 0;
                                                commission_arr[i] = 0; 
                                                initialMargin[i] = 0;     
                                                }                               
                                            } 
                                                    
                                            //save daily stock transaction data to array  
                                            for (i=0;i<30;i++) {
                                                daily_stock_position_transaction_details.push({
                                                    stock_ticker: portfolio_data[i].ticker,
                                                    filledOrder: filledOrder[i],
                                                    filledPrice: filledPrice[i],
                                                    tradeValue: tradeValue[i],
                                                    commission: commission_arr[i],
                                                    initialMargin: initialMargin[i]
                                                })
                                            }
                                
                                            total_trade_value = tradeValue.reduce(function (accumulator, current) { return accumulator + current}),
                                            total_commission = commission_arr.reduce(function (accumulator, current) { return accumulator + current}),
                                            total_initial_margin = initialMargin.reduce(function (accumulator, current) { return accumulator + current})
                                            
                                            //save daily trade summary data to array
                                            daily_account_position_summary.push({
                                                total_trade_value: total_trade_value,
                                                total_commission: total_commission,
                                                total_initial_margin: total_initial_margin
                                            })
                                            
                                            // ----------------------------------------------------------------------------------
                                            // POST TRADE POSITION CALCULATION
                                            // ----------------------------------------------------------------------------------
                                
                                            for (i=0;i<30;i++) {  
                                                // console.log("position size: "+stock_position_size[i]);
                                                // console.log("filled order: "+filledOrder[i]);
                                                stock_position_size[i] += filledOrder[i];                  
                                            }
                                            // console.log("total_trade_value: "+total_trade_value);
                                            // console.log("total_commission: "+total_commission);
                                            // console.log("cash_balance: "+cash_balance);
                                
                                            cash_balance -= (total_trade_value + total_commission);
                                
                                            for (i=0;i<30;i++) {  
                                                market_value += (stock_position_size[i] * stock_price[i]);                  
                                            }
                                
                                            equity_with_loanValue = cash_balance + market_value;
                                
                                            maintenance_margin_reserved = market_value * 0.30;
                                
                                            maintenance_margin_available = equity_with_loanValue - maintenance_margin_reserved;
                                
                                            initial_margin_reserved = market_value * 0.50;
                                
                                            initial_margin_available = equity_with_loanValue - initial_margin_reserved;
                                
                                            // buying_power = initial_margin_available * 2;
                                
                                            //save daily pretrade stock position to array            
                                            for (i=0;i<30;i++) {
                                                daily_stock_position_transaction_details.push({
                                                    position_size: stock_position_size[i],
                                                    market_value:  stock_price[i]*stock_position_size[i]
                                                })
                                            }
                                
                                            //save daily pretrade account summary to array  
                                            daily_account_position_summary.push({
                                                cash_balance : cash_balance,
                                                market_value: market_value,
                                                equity_with_loanValue:  equity_with_loanValue,
                                                maintenance_margin_reserved: maintenance_margin_reserved,
                                                maintenance_margin_available: maintenance_margin_available,
                                                initial_margin_reserved: initial_margin_reserved,
                                                initial_margin_available: initial_margin_available
                                            })
                                
                                            //save daily stock position & transaction details to summary
                                            daily_stock_position_transaction_summary.push(
                                                daily_stock_position_transaction_details
                                            );
                                
                                            //View in web account & margin summary
                                            $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(cash_balance).toFixed(0)));
                                            $('#long_market_value').html(Intl.NumberFormat().format(parseFloat(market_value).toFixed(0)));
                                            $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(equity_with_loanValue).toFixed(0)));
                                            $('#maintenance_margin_reserved').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_reserved).toFixed(0)));
                                            $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(maintenance_margin_available).toFixed(0)));
                                            $('#initial_margin_reserved').html(Intl.NumberFormat().format(parseFloat(initial_margin_reserved).toFixed(0)));
                                            $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_margin_available).toFixed(0)));
                                                                                
                                            // ----------------------------------------------------------------------------------
                                            // TRADE PERFORMANCE COMPARISON CALCULATION
                                            // ---------------------------------------------------------------------------------- 
                                                
                                            var period = new Date(new Date(test_data[request_id-1][0].date)-new Date(test_data[0][0].date)).getUTCFullYear() - 1970;
                                            // console.log(period);

                                            for (i=0; i<30; i++) {
                                                buyHold_stock_invest.push((initial_equity/30)/parseFloat(test_data[0][i+1].price));
                                            }
                                            
                                            var quantxi_equity = equity_with_loanValue;
                                
                                            var buyandhold_equity = 0;
                                            for(i=0;i<30;i++) {
                                                buyandhold_equity += buyHold_stock_invest[i]*stock_price[i]; 
                                            }  
                                
                                            var quantxi_total_return = quantxi_equity/initial_equity;
                                            quantxi_total_return_array.push(quantxi_total_return);
                                            var buyandhold_total_return = buyandhold_equity/initial_equity;
                                            buyandhold_total_return_array.push(buyandhold_total_return);
                                
                                            var quantxi_cagr = ((quantxi_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
                                            quantxi_cagr_array.push(quantxi_cagr);
                                            var buyandhold_cagr = ((buyandhold_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
                                            buyandhold_cagr_array.push(buyandhold_cagr);
                                
                                            var quantxi_equity_peak = 0;
                                            var quantxi_equity_trough = 0;
                                            var quantxi_maxDrawDown = 0;  
                                            if(quantxi_equity > quantxi_equity_peak) {
                                                quantxi_equity_peak = quantxi_equity;
                                                quantxi_equity_trough = quantxi_equity_peak;
                                            } else if (quantxi_equity < quantxi_equity_trough) {
                                                quantxi_equity_trough = quantxi_equity;
                                                var quantxi_tmpDrawDown = quantxi_equity_peak - quantxi_equity_trough;
                                                if (quantxi_tmpDrawDown > quantxi_maxDrawDown)
                                                    quantxi_maxDrawDown = quantxi_tmpDrawDown;
                                            }
                                            quantxi_maxDrawDown_array.push(quantxi_maxDrawDown);
                                
                                            var buyandhold_equity_peak = 0;
                                            var buyandhold_equity_trough = 0;
                                            var buyandhold_maxDrawDown = 0; 
                                            if(buyandhold_equity > buyandhold_equity_peak) {
                                                buyandhold_equity_peak = buyandhold_equity;
                                                buyandhold_equity_trough = buyandhold_equity_peak;
                                            } else if (buyandhold_equity < buyandhold_equity_trough) {
                                                buyandhold_equity_trough = buyandhold_equity;
                                                var buyandhold_tmpDrawDown = buyandhold_equity_peak - buyandhold_equity_trough;
                                                if (buyandhold_tmpDrawDown > buyandhold_maxDrawDown)
                                                    buyandhold_maxDrawDown = buyandhold_tmpDrawDown;
                                            } 
                                            buyandhold_maxDrawDown_array.push(buyandhold_maxDrawDown);
                                
                                            var quantxi_mar = (quantxi_cagr/quantxi_maxDrawDown);
                                            quantxi_mar_array.push(quantxi_mar);
                                            var buyandhold_mar = (buyandhold_cagr/buyandhold_maxDrawDown);
                                            buyandhold_mar_array.push(buyandhold_mar);
                                            
                                            //Sharpe Ratio = (Average fund returns − Riskfree Rate) / Standard Deviation of fund  returns
                                            var quantxi_sharpe_ratio = (math.mean(quantxi_total_return_array) - risk_freeRate) / math.std(quantxi_total_return_array);
                                            quantxi_sharpe_ratio_array.push(quantxi_sharpe_ratio);
                                            var buyandhold_sharpe_ratio = (math.mean(buyandhold_total_return_array) - risk_freeRate) / math.std(buyandhold_total_return_array);
                                            buyandhold_sharpe_ratio_array.push(buyandhold_sharpe_ratio);
                                            var quantxi_sortino_ratio = (1);
                                            quantxi_sortino_ratio_array.push(quantxi_sortino_ratio);
                                            var buyandhold_sortino_ratio = (1);
                                            buyandhold_sortino_ratio_array.push(buyandhold_sortino_ratio);
                                
                                            $('#quantxi_total_return').html(parseFloat((quantxi_total_return)*100).toFixed(2)+"%"); 
                                            $('#buyandhold_total_return').html(parseFloat((buyandhold_total_return)*100).toFixed(2)+"%");
                                            $('#quantxi_cagr').html(parseFloat((quantxi_cagr)*100).toFixed(2)+"%"); 
                                            $('#buyandhold_cagr').html(parseFloat((buyandhold_cagr)*100).toFixed(2)+"%");
                                            $('#quantxi_maxdd').html(parseFloat((quantxi_maxDrawDown)*100).toFixed(2)+"%"); 
                                            $('#buyandhold_maxdd').html(parseFloat((buyandhold_maxDrawDown)*100).toFixed(2)+"%"); 
                                            $('#quantxi_sharpe').html(parseFloat((quantxi_sharpe_ratio)*100).toFixed(2)+"%"); 
                                            $('#buyandhold_sharpe').html(parseFloat((buyandhold_sharpe_ratio)*100).toFixed(2)+"%");
                                            $('#quantxi_sortino').html(parseFloat((quantxi_sortino_ratio)*100).toFixed(2)+"%"); 
                                            $('#buyandhold_sortino').html(parseFloat((buyandhold_sortino_ratio)*100).toFixed(2)+"%"); 
                                        }         
                                    }
                                })
                            }
                
                        } else if(request_id == 5000){ 
                
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
                                
                            clearInterval(ti);
                
                            $(':button').prop('disabled', false); //Enable All Button
                            // $( "reset_button" ).prop( "disabled", false ); //Enable Reset Button
                            // $( "trade_report_button" ).prop( "disabled", false ); //Enable Trade Report Button
                            // $( "trade_performance_button" ).prop( "disabled", true ); //Enable Performance Button
                            // $( "test_statistic_button" ).prop( "disabled", true ); //Enable Test Statistic Button
                            // $( "viewpost_button" ).prop( "disabled", true ); //Enable View Request Button
                        
                            Swal.fire(
                                'Test Done',
                                'data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya',
                                'success'
                            )           
                        }           
                    }, 0)
                }
            })           
        }
    }    

    

       
     

        
      
        

        
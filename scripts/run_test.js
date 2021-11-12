 //STEP 4. RESET TEST
//Ini adalah step run test ..........................,.............................
//...................................................................................
//...................................................................................
 
    async function run_test() { 
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
                if (result.isConfirmed) {
                    $(':button').prop('disabled', true); //Disable All Button
                    proses()
                    $(':button').prop('disabled', false); //Disable All Button
                }
              })           
        }
    }

        
        
        
       
        var y = 0;
        async function proses() {
            // let i=0;
            if (y<100) {
            y++;
            $('#data_id_input').html(i);
            $('#stock1_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock1_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock2_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock2_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock3_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock3_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock4_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock4_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock5_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock5_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock6_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock6_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock7_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock7_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock8_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock8_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock9_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock9_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock10_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock10_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock11_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock11_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock12_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock12_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock13_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock13_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock14_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock14_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock15_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock15_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock16_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock16_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock17_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock17_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock18_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock18_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock19_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock19_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock20_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock20_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock21_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock21_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock22_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock22_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock23_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock23_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock24_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock24_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock25_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock25_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock26_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock26_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock27_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock27_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock28_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock28_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock29_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock29_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));
            $('#stock30_price').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(2)));
            $('#stock30_position_size').html(Intl.NumberFormat().format(parseFloat(1000+y).toFixed(0)));

            $('#data_id_input').html(y);
            $('#stock1_signal__position').html("BUY");
            $('#stock1_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock2_signal__position').html("BUY");
            $('#stock2_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock3_signal__position').html("BUY");
            $('#stock3_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock4_signal__position').html("BUY");
            $('#stock4_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock5_signal__position').html("BUY");
            $('#stock5_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock6_signal__position').html("BUY");
            $('#stock6_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock7_signal__position').html("BUY");
            $('#stock7_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock8_signal__position').html("BUY");
            $('#stock8_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock9_signal__position').html("BUY");
            $('#stock9_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock10_signal__position').html("BUY");
            $('#stock10_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock11_signal__position').html("BUY");
            $('#stock11_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock12_signal__position').html("BUY");
            $('#stock12_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock13_signal__position').html("BUY");
            $('#stock13_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock14_signal__position').html("BUY");
            $('#stock14_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock15_signal__position').html("BUY");
            $('#stock15_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock16_signal__position').html("BUY");
            $('#stock16_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock17_signal__position').html("BUY");
            $('#stock17_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock18_signal__position').html("BUY");
            $('#stock18_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock19_signal__position').html("BUY");
            $('#stock19_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock20_signal__position').html("BUY");
            $('#stock20_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock21_signal__position').html("BUY");
            $('#stock21_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock22_signal__position').html("BUY");
            $('#stock22_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock23_signal__position').html("BUY");
            $('#stock23_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock24_signal__position').html("BUY");
            $('#stock24_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock25_signal__position').html("BUY");
            $('#stock25_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock26_signal__position').html("BUY");
            $('#stock26_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock27_signal__position').html("BUY");
            $('#stock27_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock28_signal__position').html("BUY");
            $('#stock28_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock29_signal__position').html("BUY");
            $('#stock29_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            $('#stock30_signal__position').html("BUY");
            $('#stock30_signal_size').html(Intl.NumberFormat().format(parseFloat(123+y).toFixed(0)));
            
        
            } else {
             
              clearTimeout();
          
              alert(`data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
              return false;
            }
            setTimeout(proses, 1/1000);
          }

        
      
        //variable
        // var data_id = 0;
        // var date;
        // var stock_price = new Array();
        // var stock_position_size = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        // var daily_Interest = 0;
        // var cash_balance = initial_equity;    
        // var market_value;
        // var equity_with_loanValue;
        // var maintenance_margin_reserved;
        // var maintenance_margin_available;
        // var initial_margin_reserved;
        // var initial_margin_available; 
        // var buying_power;
        // var data_input = new Array();
        // var signal_output = new Array();
        // var stock_buyHold = new Array();
        // var daily_stock_pretrade_position = new Array();
        // var daily_account_pretrade_position = new Array();
        // var daily_stock_transaction = new Array();
        // var daily_trade_summary = new Array();

    //     while (data_id < test_data.length) { 

    //         data_id++;

    //         date = test_data[data_id-1][0].date; 

    //         console.log(parseFloat(test_data[data_id-1][i+1].price));
            
    //         for (i=0;i<30;i++) {  
    //             stock_price[i] = parseFloat(test_data[data_id-1][i+1].price);                    
    //         }

    //         //PRE TRADE POSITION CALCULATION
    //         // ----------------------------------------------------------------------------------
            
    //         if(cash_balance < 0) {
    //             daily_Interest = cash_balance * (interest_rate/360); //cek lagi rumusnya
    //         } else {
    //             daily_Interest = 0;
    //         }           

    //         cash_balance -= daily_Interest;

    //         for (i=0;i<30;i++) {  
    //             market_value += (stock_position_size[i] * stock_price[i]);                  
    //         }

    //         equity_with_loanValue = cash_balance + market_value;

    //         maintenance_margin_reserved = market_value * 0.30;

    //         maintenance_margin_available = equity_with_loanValue - maintenance_margin_reserved;

    //         initial_margin_reserved = market_value * 0.50;

    //         initial_margin_available = equity_with_loanValue - initial_margin_reserved;

    //         buying_power = initial_margin_available * 2;

    //         //save daily pretrade stock position to array            
    //         for (i=0;i<30;i++) {
    //             daily_stock_pretrade_position.push({
    //                 stock_ticker: portfolio_data[0].ticker,
    //                 stock_price : stock_price[i],
    //                 position_size: stock_position_size[i],
    //                 market_value:  stock_price[i]*stock_position_size[i]
    //             })
    //         }
    //         //save daily pretrade account summary to array    
    //         for (i=0;i<30;i++) {
    //             daily_account_pretrade_position.push({
    //                 daily_Interest:  daily_Interest,
    //                 cash_balance : cash_balance,
    //                 market_value: market_value,
    //                 equity_with_loanValue:  equity_with_loanValue,
    //                 maintenance_margin_reserved: maintenance_margin_reserved,
    //                 maintenance_margin_available: maintenance_margin_available,
    //                 initial_margin_reserved: initial_margin_reserved,
    //                 initial_margin_available: initial_margin_available,
    //                 buying_power: buying_power
    //             })
    //         }
            
    // // ----------------------------------------------------------------------------------  
    // //POST DATA TO QUANTXI AND GET SIGNAL FROM QUANTXI 
    // // ----------------------------------------------------------------------------------           
        
    //     data_input = {
    //         data_id: data_id,
    //         stock01_price: stock_price[0],
    //         stock01_positionSize: stock_position_size[0],
    //         stock02_price: stock_price[1],
    //         stock02_positionSize: stock_position_size[1],          
    //         stock03_price: stock_price[2],
    //         stock03_positionSize: stock_position_size[2],          
    //         stock04_price: stock_price[3],
    //         stock04_positionSize: stock_position_size[3],          
    //         stock05_price: stock_price[4],
    //         stock05_positionSize: stock_position_size[4],          
    //         stock06_price: stock_price[5],
    //         stock06_positionSize: stock_position_size[5],          
    //         stock07_price: stock_price[6],
    //         stock07_positionSize: stock_position_size[6],          
    //         stock08_price: stock_price[7],
    //         stock08_positionSize: stock_position_size[7],          
    //         stock09_price: stock_price[8],
    //         stock09_positionSize: stock_position_size[8],          
    //         stock10_price: stock_price[9],
    //         stock10_positionSize: stock_position_size[9], 
    //         stock11_price: stock_price[10],
    //         stock11_positionSize: stock_position_size[10],
    //         stock12_price: stock_price[11],
    //         stock12_positionSize: stock_position_size[11],          
    //         stock13_price: stock_price[12],
    //         stock13_positionSize: stock_position_size[12],          
    //         stock14_price: stock_price[13],
    //         stock14_positionSize: stock_position_size[13],          
    //         stock15_price: stock_price[14],
    //         stock15_positionSize: stock_position_size[14],          
    //         stock16_price: stock_price[15],
    //         stock16_positionSize: stock_position_size[15],          
    //         stock17_price: stock_price[16],
    //         stock17_positionSize: stock_position_size[16],          
    //         stock18_price: stock_price[17],
    //         stock18_positionSize: stock_position_size[17],          
    //         stock19_price: stock_price[18],
    //         stock19_positionSize: stock_position_size[18],          
    //         stock20_price: stock_price[19],
    //         stock20_positionSize: stock_position_size[19], 
    //         stock21_price: stock_price[20],
    //         stock21_positionSize: stock_position_size[20],
    //         stock22_price: stock_price[21],
    //         stock22_positionSize: stock_position_size[21],          
    //         stock23_price: stock_price[22],
    //         stock23_positionSize: stock_position_size[22],          
    //         stock24_price: stock_price[23],
    //         stock24_positionSize: stock_position_size[23],          
    //         stock25_price: stock_price[24],
    //         stock25_positionSize: stock_position_size[24],          
    //         stock26_price: stock_price[25],
    //         stock26_positionSize: stock_position_size[25],          
    //         stock27_price: stock_price[26],
    //         stock27_positionSize: stock_position_size[26],          
    //         stock28_price: stock_price[27],
    //         stock28_positionSize: stock_position_size[27],          
    //         stock29_price: stock_price[28],
    //         stock29_positionSize: stock_position_size[28],          
    //         stock30_price: stock_price[29],
    //         stock30_positionSize: stock_position_size[29]                    
    //     };

    //     data_input.push(data_input); //save data to array data_input_history

    //      //update signal....
    //      $('#data_id_input').html(data_id);
    //      $('#stock1_price').html(Intl.NumberFormat().format(parseFloat(stock_price[0]).toFixed(2)));
    //      $('#stock1_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[0]).toFixed(0)));
    //      $('#stock2_price').html(Intl.NumberFormat().format(parseFloat(stock_price[1]).toFixed(2)));
    //      $('#stock2_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[1]).toFixed(0)));
    //      $('#stock3_price').html(Intl.NumberFormat().format(parseFloat(stock_price[2]).toFixed(2)));
    //      $('#stock3_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[2]).toFixed(0)));
    //      $('#stock4_price').html(Intl.NumberFormat().format(parseFloat(stock_price[3]).toFixed(2)));
    //      $('#stock4_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[3]).toFixed(0)));
    //      $('#stock5_price').html(Intl.NumberFormat().format(parseFloat(stock_price[4]).toFixed(2)));
    //      $('#stock5_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[4]).toFixed(0)));
    //      $('#stock6_price').html(Intl.NumberFormat().format(parseFloat(stock_price[5]).toFixed(2)));
    //      $('#stock6_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[5]).toFixed(0)));
    //      $('#stock7_price').html(Intl.NumberFormat().format(parseFloat(stock_price[6]).toFixed(2)));
    //      $('#stock7_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[6]).toFixed(0)));
    //      $('#stock8_price').html(Intl.NumberFormat().format(parseFloat(stock_price[7]).toFixed(2)));
    //      $('#stock8_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[7]).toFixed(0)));
    //      $('#stock9_price').html(Intl.NumberFormat().format(parseFloat(stock_price[8]).toFixed(2)));
    //      $('#stock9_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[8]).toFixed(0)));
    //      $('#stock10_price').html(Intl.NumberFormat().format(parseFloat(stock_price[9]).toFixed(2)));
    //      $('#stock10_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[9]).toFixed(0)));
    //      $('#stock11_price').html(Intl.NumberFormat().format(parseFloat(stock_price[10]).toFixed(2)));
    //      $('#stock11_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[10]).toFixed(0)));
    //      $('#stock12_price').html(Intl.NumberFormat().format(parseFloat(stock_price[11]).toFixed(2)));
    //      $('#stock12_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[11]).toFixed(0)));
    //      $('#stock13_price').html(Intl.NumberFormat().format(parseFloat(stock_price[12]).toFixed(2)));
    //      $('#stock13_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[12]).toFixed(0)));
    //      $('#stock14_price').html(Intl.NumberFormat().format(parseFloat(stock_price[13]).toFixed(2)));
    //      $('#stock14_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[13]).toFixed(0)));
    //      $('#stock15_price').html(Intl.NumberFormat().format(parseFloat(stock_price[14]).toFixed(2)));
    //      $('#stock15_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[14]).toFixed(0)));
    //      $('#stock16_price').html(Intl.NumberFormat().format(parseFloat(stock_price[15]).toFixed(2)));
    //      $('#stock16_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[15]).toFixed(0)));
    //      $('#stock17_price').html(Intl.NumberFormat().format(parseFloat(stock_price[16]).toFixed(2)));
    //      $('#stock17_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[16]).toFixed(0)));
    //      $('#stock18_price').html(Intl.NumberFormat().format(parseFloat(stock_price[17]).toFixed(2)));
    //      $('#stock18_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[17]).toFixed(0)));
    //      $('#stock19_price').html(Intl.NumberFormat().format(parseFloat(stock_price[18]).toFixed(2)));
    //      $('#stock19_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[18]).toFixed(0)));
    //      $('#stock20_price').html(Intl.NumberFormat().format(parseFloat(stock_price[19]).toFixed(2)));
    //      $('#stock20_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[19]).toFixed(0)));
    //      $('#stock21_price').html(Intl.NumberFormat().format(parseFloat(stock_price[20]).toFixed(2)));
    //      $('#stock21_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[20]).toFixed(0)));
    //      $('#stock22_price').html(Intl.NumberFormat().format(parseFloat(stock_price[21]).toFixed(2)));
    //      $('#stock22_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[21]).toFixed(0)));
    //      $('#stock23_price').html(Intl.NumberFormat().format(parseFloat(stock_price[22]).toFixed(2)));
    //      $('#stock23_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[22]).toFixed(0)));
    //      $('#stock24_price').html(Intl.NumberFormat().format(parseFloat(stock_price[23]).toFixed(2)));
    //      $('#stock24_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[23]).toFixed(0)));
    //      $('#stock25_price').html(Intl.NumberFormat().format(parseFloat(stock_price[24]).toFixed(2)));
    //      $('#stock25_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[24]).toFixed(0)));
    //      $('#stock26_price').html(Intl.NumberFormat().format(parseFloat(stock_price[25]).toFixed(2)));
    //      $('#stock26_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[25]).toFixed(0)));
    //      $('#stock27_price').html(Intl.NumberFormat().format(parseFloat(stock_price[26]).toFixed(2)));
    //      $('#stock27_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[26]).toFixed(0)));
    //      $('#stock28_price').html(Intl.NumberFormat().format(parseFloat(stock_price[27]).toFixed(2)));
    //      $('#stock28_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[27]).toFixed(0)));
    //      $('#stock29_price').html(Intl.NumberFormat().format(parseFloat(stock_price[28]).toFixed(2)));
    //      $('#stock29_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[28]).toFixed(0)));
    //      $('#stock30_price').html(Intl.NumberFormat().format(parseFloat(stock_price[29]).toFixed(2)));
    //      $('#stock30_position_size').html(Intl.NumberFormat().format(parseFloat(stock_position_size[29]).toFixed(0)));

    //     var post_process = "run";

    //     while (post_process == "run") {
    //         await $.ajax({
    //             type: "POST",
    //             url: "https://api.quantxi.com/post?api_key="+localStorage.getItem("apiKey"),
    //             data: data_input,           
    //             dataType: 'json',
    //             success: function(result){ 
    //                 if (result.status == "success") {
    //                     signal_output = {
    //                         data_id: result.data.data_id,
    //                         stock01_signal_position: result.data.stock01_signal_position,
    //                         stock01_signal_size: result.data.stock01_signal_size,
    //                         stock02_signal_position: result.data.stock02_signal_position,
    //                         stock02_signal_size: result.data.stock02_signal_size,
    //                         stock03_signal_position: result.data.stock03_signal_position,
    //                         stock03_signal_size: result.data.stock03_signal_size,
    //                         stock04_signal_position: result.data.stock04_signal_position,
    //                         stock04_signal_size: result.data.stock04_signal_size,
    //                         stock05_signal_position: result.data.stock05_signal_position,
    //                         stock05_signal_size: result.data.stock05_signal_size,
    //                         stock06_signal_position: result.data.stock06_signal_position,
    //                         stock06_signal_size: result.data.stock06_signal_size,
    //                         stock07_signal_position: result.data.stock07_signal_position,
    //                         stock07_signal_size: result.data.stock07_signal_size,
    //                         stock08_signal_position: result.data.stock08_signal_position,
    //                         stock08_signal_size: result.data.stock08_signal_size,
    //                         stock09_signal_position: result.data.stock09_signal_position,
    //                         stock09_signal_size: result.data.stock09_signal_size,
    //                         stock10_signal_position: result.data.stock10_signal_position,
    //                         stock10_signal_size: result.data.stock10_signal_size,
    //                         stock11_signal_position: result.data.stock11_signal_position,
    //                         stock11_signal_size: result.data.stock11_signal_size,
    //                         stock12_signal_position: result.data.stock12_signal_position,
    //                         stock12_signal_size: result.data.stock12_signal_size,
    //                         stock13_signal_position: result.data.stock13_signal_position,
    //                         stock13_signal_size: result.data.stock13_signal_size,
    //                         stock14_signal_position: result.data.stock14_signal_position,
    //                         stock14_signal_size: result.data.stock14_signal_size,
    //                         stock15_signal_position: result.data.stock15_signal_position,
    //                         stock15_signal_size: result.data.stock15_signal_size,
    //                         stock16_signal_position: result.data.stock16_signal_position,
    //                         stock16_signal_size: result.data.stock16_signal_size,
    //                         stock17_signal_position: result.data.stock17_signal_position,
    //                         stock17_signal_size: result.data.stock17_signal_size,
    //                         stock18_signal_position: result.data.stock18_signal_position,
    //                         stock18_signal_size: result.data.stock18_signal_size,
    //                         stock19_signal_position: result.data.stock19_signal_position,
    //                         stock19_signal_size: result.data.stock19_signal_size,
    //                         stock20_signal_position: result.data.stock20_signal_position,
    //                         stock20_signal_size: result.data.stock20_signal_size,
    //                         stock21_signal_position: result.data.stock21_signal_position,
    //                         stock21_signal_size: result.data.stock21_signal_size,
    //                         stock22_signal_position: result.data.stock22_signal_position,
    //                         stock22_signal_size: result.data.stock22_signal_size,
    //                         stock23_signal_position: result.data.stock23_signal_position,
    //                         stock23_signal_size: result.data.stock23_signal_size,
    //                         stock24_signal_position: result.data.stock24_signal_position,
    //                         stock24_signal_size: result.data.stock24_signal_size,
    //                         stock25_signal_position: result.data.stock25_signal_position,
    //                         stock25_signal_size: result.data.stock25_signal_size,
    //                         stock26_signal_position: result.data.stock26_signal_position,
    //                         stock26_signal_size: result.data.stock26_signal_size,
    //                         stock27_signal_position: result.data.stock27_signal_position,
    //                         stock27_signal_size: result.data.stock27_signal_size,
    //                         stock28_signal_position: result.data.stock28_signal_position,
    //                         stock28_signal_size: result.data.stock28_signal_size,
    //                         stock29_signal_position: result.data.stock29_signal_position,
    //                         stock29_signal_size: result.data.stock29_signal_size,
    //                         stock30_signal_position: result.data.stock30_signal_position,
    //                         stock30_signal_size: result.data.stock30_signal_size
    //                     };
    //                     signal_output.push(signal_output);//save data to array signal_output_history 

    //                     $('#total_request').html(data_id);

    //                     $('#data_id_input').html(signal_output[0]);
    //                     $('#stock1_signal__position').html(signal_output[1]);
    //                     $('#stock1_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[1]).toFixed(0)));
    //                     $('#stock2_signal__position').html(signal_output[2]);
    //                     $('#stock2_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[2]).toFixed(0)));
    //                     $('#stock3_signal__position').html(signal_output[3]);
    //                     $('#stock3_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[3]).toFixed(0)));
    //                     $('#stock4_signal__position').html(signal_output[4]);
    //                     $('#stock4_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[4]).toFixed(0)));
    //                     $('#stock5_signal__position').html(signal_output[5]);
    //                     $('#stock5_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[5]).toFixed(0)));
    //                     $('#stock6_signal__position').html(signal_output[6]);
    //                     $('#stock6_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[6]).toFixed(0)));
    //                     $('#stock7_signal__position').html(signal_output[7]);
    //                     $('#stock7_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[7]).toFixed(0)));
    //                     $('#stock8_signal__position').html(signal_output[8]);
    //                     $('#stock8_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[8]).toFixed(0)));
    //                     $('#stock9_signal__position').html(signal_output[9]);
    //                     $('#stock9_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[9]).toFixed(0)));
    //                     $('#stock10_signal__position').html(signal_output[10]);
    //                     $('#stock10_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[10]).toFixed(0)));
    //                     $('#stock11_signal__position').html(signal_output[11]);
    //                     $('#stock11_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[11]).toFixed(0)));
    //                     $('#stock12_signal__position').html(signal_output[12]);
    //                     $('#stock12_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[12]).toFixed(0)));
    //                     $('#stock13_signal__position').html(signal_output[13]);
    //                     $('#stock13_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[13]).toFixed(0)));
    //                     $('#stock14_signal__position').html(signal_output[14]);
    //                     $('#stock14_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[14]).toFixed(0)));
    //                     $('#stock15_signal__position').html(signal_output[15]);
    //                     $('#stock15_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[15]).toFixed(0)));
    //                     $('#stock16_signal__position').html(signal_output[16]);
    //                     $('#stock16_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[16]).toFixed(0)));
    //                     $('#stock17_signal__position').html(signal_output[17]);
    //                     $('#stock17_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[17]).toFixed(0)));
    //                     $('#stock18_signal__position').html(signal_output[18]);
    //                     $('#stock18_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[18]).toFixed(0)));
    //                     $('#stock19_signal__position').html(signal_output[19]);
    //                     $('#stock19_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[19]).toFixed(0)));
    //                     $('#stock20_signal__position').html(signal_output[20]);
    //                     $('#stock20_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[20]).toFixed(0)));
    //                     $('#stock21_signal__position').html(signal_output[21]);
    //                     $('#stock21_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[21]).toFixed(0)));
    //                     $('#stock22_signal__position').html(signal_output[22]);
    //                     $('#stock22_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[22]).toFixed(0)));
    //                     $('#stock23_signal__position').html(signal_output[23]);
    //                     $('#stock23_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[23]).toFixed(0)));
    //                     $('#stock24_signal__position').html(signal_output[24]);
    //                     $('#stock24_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[24]).toFixed(0)));
    //                     $('#stock25_signal__position').html(signal_output[25]);
    //                     $('#stock25_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[25]).toFixed(0)));
    //                     $('#stock26_signal__position').html(signal_output[26]);
    //                     $('#stock26_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[26]).toFixed(0)));
    //                     $('#stock27_signal__position').html(signal_output[27]);
    //                     $('#stock27_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[27]).toFixed(0)));
    //                     $('#stock28_signal__position').html(signal_output[28]);
    //                     $('#stock28_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[28]).toFixed(0)));
    //                     $('#stock29_signal__position').html(signal_output[29]);
    //                     $('#stock29_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[29]).toFixed(0)));
    //                     $('#stock30_signal__position').html(signal_output[30]);
    //                     $('#stock30_signal_size').html(Intl.NumberFormat().format(parseFloat(signal_output[30]).toFixed(0)));

    //                     post_process = "stop"; //stop post process......
    //                 }         
    //             }
    //         })
    //     } 
     
    
    // // ----------------------------------------------------------------------------------  
    // // TRADE TRANSACTION 
    // // ----------------------------------------------------------------------------------
    //     var filledOrder = new Array();
    //     var filledPrice = new Array();
    //     var tradeValue = new Array();
    //     var commission = new Array();
    //     var initialMargin = new Array();
        
    //         //calculated all stock signal initial_margin_required
    //         let initial_margin_required = 0;            
    //         for (i=0, x=1; i<30 && x<61; i++, x+2) {
    //             if(signal_output[x] == "Buy") {
    //                 initial_margin_required+= (parseInt(signal_output[x])*(stock_price[i]*(1+spread_slippage)))*regT_margin;
    //             } else if(signal_output[x] == "Sell") {
    //                 initial_margin_required+= (parseInt(signal_output[x])*(stock_price[i]*(1-spread_slippage)))*regT_margin;
    //             } else {
    //                 initial_margin_required+= 0;
    //             } 
    //         } 

    //         //calculate filled percentarge   
    //         let filled_percentage;
    //          if(initial_margin_required <= 0) {
    //             filled_percentage = 1;
    //          } else if(initial_margin_available <= 0) {
    //             filled_percentage = 0;
    //          } else if(initial_margin_available > initial_margin_required) {
    //             filled_percentage = 1;
    //          } else {
    //             filled_percentage = initial_margin_available / initial_margin_required;
    //          }
            
            
    //         //trade transaction         
    //         for (i=0, x=2; i<30 && x<61; i++, x+2) { 

    //             if(signal_output[x] == "Buy") {
    //             filledOrder[i]  = parseInt(signal_output[x])*filled_percentage;
    //             filledPrice[i]  = stock_price[i]*(1+spread_slippage);
    //             tradeValue[i] = filledOrder[i] * filledPrice[i];
    //             commission[i] = tradeValue[i] * commision;
    //             initialMargin[i] = tradeValue[i] * 0.50;
    //             } else if(signal_output[x] == "Sell") {
    //             filledOrder[i]  = parseInt(signal_output[x])*filled_percentage;
    //             filledPrice[i]  = stock_price[i]*(1-spread_slippage);
    //             tradeValue[i] = filledOrder[i] * filledPrice[i];
    //             commission[i] = tradeValue[i] * commision;
    //             initialMargin[i] = tradeValue[i] * 0.50;
    //             } else {
    //             filledOrder[i]  = 0;
    //             filledPrice[i]  = 0;
    //             tradeValue[i] = 0;
    //             commission[i] = 0; 
    //             initialMargin[i] = 0;     
    //             }
    //         } 

    //         //update stock position & cash balance
    //         for (i=0;i<30;i++) {  
    //             stock_position_size[i] += filledOrder[i];                  
    //         }
    //         cash_balance -= (total_trade_value + total_commission);

    //         //save daily stock transaction data to array  
    //         for (i=0;i<30;i++) {
    //             daily_stock_transaction.push({
    //                 stock_ticker: portfolio_data[0].ticker,
    //                 filledOrder: filledOrder[i],
    //                 filledPrice: filledPrice[i],
    //                 tradeValue: tradeValue[i],
    //                 commission: commission[i],
    //                 initialMargin: initialMargin[i]
    //             })
    //         }
    //         //save daily trade summary data to array  
    //         for (i=0;i<30;i++) {
    //             daily_trade_summary.push({
    //                 total_trade_value: tradeValue.reduce(function (accumulator, current) { return accumulator + current}),
    //                 total_commission: commission.reduce(function (accumulator, current) { return accumulator + current}),
    //                 total_initial_margin: initialMargin.reduce(function (accumulator, current) { return accumulator + current})
    //             })
    //         } 
            
            
           
    //         //TRADE PERFORMANCE COMPARISON
            
    //         //post request response ----------------------------------------------
        
    //         // var input_element =
    //         // '<pre style="font-size: 11px; color: #70727a; margin-left: 50px; margin-top: 15px;">'
    //         //     + JSON.stringify(input, null, 4) +
    //         // '</pre>';
            
    //         // $("#input").html(input_element);
    //         // var output_element =
    //         // '<pre style="font-size: 11px; color: #70727a; margin-left: 50px; margin-top: 15px;">'
    //         //     + JSON.stringify(input, null, 4) +
    //         // '</pre>';
            
    //         // $("#output").html(output_element);
        
    //         // //Performance Comparison --------------------------------------------------------
    //         // var period = new Date(new Date(port_data[0][idx_start+data_id])-new Date(port_data[0][idx_start])).getUTCFullYear() - 1970;
    //         // console.log(period);
    //         // var quantxi_equity = preTrade_equity_with_loanValue;

    //         // var asset_equity_buyandhold = [];
    //         // for(i=1;i<31;i++) {
    //         //     asset_equity_buyandhold[i] = (stock_invest[i]/parseFloat(port_data[i][idx_start]))*parseFloat(port_data[i][(idx_start+(data_id-1))]); 
    //         // }
           
    //         // var buyandhold_equity = asset_equity_buyandhold.reduce(function (accumulator, current) { return accumulator + current; });           
    //         // var quantxi_total_return = equity/initial_equity;
    //         // var buyandhold_total_return = buyandhold_equity/equity;
    //         // var quantxi_cagr = ((quantxi_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
    //         // var buyandhold_cagr = ((buyandhold_total_return)^(1/period)-1);//angka 30 ganti jadi periode sesuai periode data
    //         // var quantxi_maxdd = (
    //         //     1
    //         // );
    //         // var buyandhold_maxdd = (
    //         //     1
    //         // );
    //         // var quantxi_mar_ratio = (
    //         //     1
    //         // );
    //         // var buyandhold_mar_ratio = (
    //         //     1
    //         // );
    //         // var quantxi_sharpe_ratio = (
    //         //     1
    //         // );
    //         // var buyandhold_sharpe_ratio = (
    //         //     1
    //         // );
    //         // var quantxi_treynor_ratio = (
    //         //     1
    //         // );
    //         // var buyandhold_treynor_ratio = (
    //         //     1
    //         // );

    //         // $('#quantxi_equity').html(Intl.NumberFormat().format(parseFloat(quantxi_equity).toFixed(0))); 
    //         // $('#buyandhold_equity').html(Intl.NumberFormat().format(parseFloat(buyandhold_equity).toFixed(0))); 
    //         // $('#quantxi_total_return').html(parseFloat((quantxi_total_return)*100).toFixed(2)+"%"); 
    //         // $('#buyandhold_total_return').html(parseFloat((buyandhold_total_return)*100).toFixed(2)+"%");
    //         // $('#quantxi_cagr').html(parseFloat((quantxi_cagr)*100).toFixed(2)+"%"); 
    //         // $('#buyandhold_cagr').html(parseFloat((buyandhold_cagr)*100).toFixed(2)+"%");
    //         // $('#quantxi_maxdd').html(parseFloat((quantxi_maxdd)*100).toFixed(2)+"%"); 
    //         // $('#buyandhold_maxdd').html(parseFloat((buyandhold_maxdd)*100).toFixed(2)+"%"); 
    //         // $('#quantxi_mar_ratio').html(parseFloat((quantxi_mar_ratio)*100).toFixed(2)+"%"); 
    //         // $('#buyandhold_mar_ratio').html(parseFloat((buyandhold_mar_ratio)*100).toFixed(2)+"%");
    //         // $('#quantxi_sharpe_ratio').html(parseFloat((quantxi_sharpe_ratio)*100).toFixed(2)+"%"); 
    //         // $('#buyandhold_sharpe_ratio').html(parseFloat((buyandhold_sharpe_ratio)*100).toFixed(2)+"%");
    //         // $('#quantxi_treynor_ratio').html(parseFloat((quantxi_treynor_ratio)*100).toFixed(2)+"%"); 
    //         // $('#buyandhold_treynor_ratio').html(parseFloat((buyandhold_treynor_ratio)*100).toFixed(2)+"%");    

    //         // TRADE TESTING REPORT ---------------------------------------------------------------
       
    //         // var trade_details = new Array();
    //         // for(i=1;i<=30;i++) {             
    //         //     trade_details.push({
    //         //     stocks : stock1,
    //         //     price : price[i],
    //         //     pretrade_position_size : pretrade_position_size[i],
    //         //     pretrade_market_value : pretrade_market_value[i],
    //         //     buy_filled_order : buy_filled_order[i],
    //         //     buy_filled_signal : buy_filled_signal[i],
    //         //     buy_trade_value : buy_trade_value[i],
    //         //     buy_commision : buy_commision[i],
    //         //     sell_filled_order : sell_filled_order[i],
    //         //     sell_filled_signal : sell_filled_signal[i],
    //         //     sell_trade_value : sell_trade_value[i],
    //         //     sell_commision : sell_commision[i],
    //         //     posttrade_position_size : posttrade_position_size[i],
    //         //     posttrade_market_value : posttrade_market_value[i]
    //         //     })
    //         // }

    //         // var account_summary = new Array(); 
    //         // account_summary.push({
    //         //     //Pre Trade Account Position
    //         //     pretrade_cash_balance : pretrade_cash_balance,
    //         //     pretrade_mtd_acrued_interest : pretrade_mtd_acrued_interest,
    //         //     pretrade_long_market_value : pretrade_long_market_value,
    //         //     pretrade_equity_with_loan_value : pretrade_equity_with_loan_value,
    //         //     pretrade_net_liquidation_value : pretrade_net_liquidation_value,
    //         //     pretrade_maintenance_margin : pretrade_maintenance_margin,
    //         //     pretrade_regT_margin_req : pretrade_regT_margin_req,
    //         //     pretrade_excess_liquidity : pretrade_excess_liquidity,
    //         //     pretrade_sma_excess_equity : pretrade_sma_excess_equity,
    //         //     pretrade_buying_power : pretrade_buying_power, 
    //         //     //Post Trade Account Position
    //         //     posttrade_cash_balance : posttrade_cash_balance,
    //         //     posttrade_mtd_acrued_interest : posttrade_mtd_acrued_interest,
    //         //     posttrade_long_market_value : posttrade_long_market_value,
    //         //     posttrade_equity_with_loan_value : posttrade_equity_with_loan_value,
    //         //     posttrade_net_liquidation_value : posttrade_net_liquidation_value,
    //         //     posttrade_maintenance_margin : posttrade_maintenance_margin,
    //         //     posttrade_regT_margin_req : posttrade_regT_margin_req,
    //         //     posttrade_excess_liquidity : posttrade_excess_liquidity,
    //         //     posttrade_sma_excess_equity : posttrade_sma_excess_equity,
    //         //     posttrade_buying_power : posttrade_buying_power    
    //         // });

    //         // tradeTesting_report.push({date: date, trade_details: trade_details, account_summary: account_summary});
                   
    //         // //Performance Chart ---------------------------------------------
    //         // date_array.push(date);
    //         // quantxi_equity_array.push(parseFloat(equity).toFixed(0));    
    //         // buyandhold_equity_array.push(parseFloat(buyandhold_equity).toFixed(0));            
    //         // //------------------------------------------------------------------
    //         // //add data ID -------------------------------------------------------
    //         // dataID++; // lanjut id berikutnya, cek lagi posisi tambah id ini ?  
    //         //-----------------------------------------------------------  
    //     } 

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

        // //view all post
             
        // $(':button').prop('disabled', false); //Enable All Button 
     
        // alert(`data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
        // return false;   
    // }
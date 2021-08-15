//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data
var stock_data = new Array(); 
function autorun() {  
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            var arr = [];
            let i = 0;     
            while (i< 30){
                var r = Math.floor(Math.random() * 1000) + 1;
                if(arr.indexOf(r) === -1) {
                    let dat = new Array();      
                    let exchange= result.data[r].Exchange;
                    let ticker= result.data[r].Symbol;
                    let description= result.data[r].Description; 
                    const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                    const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[r].Symbol+"?symbol="+result.data[r].Symbol+"&period1=0&period2=9999999999&interval=1d";
                    $.getJSON(proxyurl+urls, function(data){
                        if(data.chart.result !== null) {
                            if(data.chart.result[0].indicators.adjclose[0].adjclose.length>2500) {
                                dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
                                stock_data.push({exchange: exchange, ticker: ticker, description: description, data: dat});
                                console.log(stock_data[stock_data.length-1].exchange);
                                console.log(stock_data[stock_data.length-1].ticker);
                                console.log(stock_data[stock_data.length-1].description);
                                console.log(stock_data[stock_data.length-1].data[0].length);
                            }                        
                        } 
                    });
                arr.push(r);  
                i++; 
                }                
            }   
                    // // if(data.chart.result[0].indicators.adjclose[0].adjclose.length>2500) {
                    //     dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
                    //     // console.log(dat[0]);
                    //     // historical_data = {
                    //     //     exchange: exchange,
                    //     //     ticker: ticker,
                    //     //     description: description,
                    //     //     data: JSON.stringify(data.chart.result[0].indicators.adjclose[0].adjclose)
                    //     // } 
                    //     // console.log(historical_data);
                       
                    //     // $.ajax({
                    //     //     type: "POST",
                    //     //     url: "https://api.quantxi.com/add_data",
                    //     //     data: historical_data,             
                    //     //     dataType: 'json'
                    //     // })    
                    // // } else {
                    // //     return false;
                    // // }
                
            // }
        }
    });
}

function autorun2() { 
    var tick_list = new Array();
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            console.log(result);
            // for (i=0;i<result)
        }
    });   
    // if(ticker_list.length==0) {
    //     alert("tidak ada ticker yg dipilih");
    //     return false;
    // } else if((ticker_list.length+asset_portfolio_yahoo.length)>30) {
    //   alert("ticker yg anda pilih melebihi total ticker tersisa untuk portfolio")
    //   return false;
    // } else {
    //   if(asset_portfolio_yahoo.length>0) {
    //     for (i = 0; i<ticker_list.length; i++) {    //?????
    //       var tickere = ticker_list[i].split(', ')[0];
    //       for(x=0;x<asset_portfolio_yahoo.length;x++) {
    //         let idx = asset_portfolio_yahoo[x].ticker.indexOf(tickere);
    //         if (idx !== -1) {
    //           alert("ticker "+tickere+" sdh dipilih");
    //           return false;
    //         }
    //       }
    //     }
    //   } 
    //   for (i = 0; i < ticker_list.length && i < (30 - asset_portfolio_yahoo.length); i++) {
    //     let tickere = ticker_list[i].split(', ')[0];
    //     let as_data_date = new Array();
    //     let as_data_price = new Array();
    //     let ex_choo = exchange_choose_current;

    //     const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
    //     const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+tickere+"?symbol="+tickere+"&period1=0&period2=9999999999&interval=1d";

    //     $.getJSON(proxyurl+urls, function(result){
    //       console.log(result);
    //       var yahoo_data = result;
    //       let length_tm = yahoo_data.chart.result[0].timestamp.length;
    //       for(i=0; i<length_tm; i++) {
    //       var data_date = new Date(yahoo_data.chart.result[0].timestamp[i] * 1000);
    //       var data_price = yahoo_data.chart.result[0].indicators.adjclose[0].adjclose[i];
    //       as_data_date.push(
    //         appendLeadingZeroes(data_date.getMonth()+1) + "/" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10) + "/" + data_date.getFullYear()
    //       );
    //       as_data_price.push(
    //         data_price
    //       );
    //       }
    //       asset_portfolio_yahoo.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
    //       let al = asset_portfolio_yahoo.length;
    //       let portfolio =            
    //       `<tr>
    //           <td class="text-center">Stock `+al+`</td>
    //           <td class="text-center">`+tickere+`</td>
    //           <td class="text-center">`+ex_choo+`</td>
    //           <td class="text-center">`+as_data_date[0]+`</td>
    //           <td class="text-center">`+as_data_date[as_data_date.length-1]+`</td>
    //       </tr>`;
    //       $("#table_assets > tbody").append(portfolio);
    //       });
    //   }      
    //   $("#tiingo_tickers_btn").html(`Tickers (<span class="quantity">0</span>)`);
    //   $("#Xchange_btn").html(`<span class="Xchange">Exchange</span>`);
    //   ticker_list = [];
    //   exchange_choose_current="";
    //   exchange_choose ="";
    // }    
}  

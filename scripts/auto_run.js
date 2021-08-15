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
    var tick_data = new Array();
    var stock_data = new Array();
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            // console.log(result);
            for (i=0;i<result.data.length;i++) {
                tick_data.push({ticker: result.data[i].Symbol, exchange: result.data[i].Exchange, description: result.data[i].Description})
            }
        }
    });  
      
    //   for (i = 0; i < ticker_list.length && i < (30 - stock_data.length); i++) {
    //     let tickere = tick_data.ticker
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
         
    //       });
    //   }      
    
    //   ticker_list = [];
    //   exchange_choose_current="";
    //   exchange_choose ="";
    var arr = [];
    let i = 0;     
    while (i< 30){
        var r = Math.floor(Math.random() * 1000) + 1;
        if(arr.indexOf(r) === -1) {
            console.log(tick_data);
            let dat = new Array();      
            let exchange= tick_data[r].exchange;
            let ticker= tick_data[r].ticker;
            let description= tick_data[r].description; 
            const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
            const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=9999999999&interval=1d";
            $.getJSON(proxyurl+urls, function(data){
                if(data.chart.result !== null) {
                    if(data.chart.result[0].indicators.adjclose[0].adjclose.length>2500) {
                        dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
                        stock_data.push({exchange: exchange, ticker: ticker, description: description, data: dat});
                        console.log(stock_data[stock_data.length-1].exchange);
                        console.log(stock_data[stock_data.length-1].ticker);
                        console.log(stock_data[stock_data.length-1].description);
                        console.log(stock_data[stock_data.length-1].data[0].length);
                        arr.push(r);  
                        i++; 
                    }                        
                } 
            });
       
        }                
    }   
    }    
 

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
            for (i=0; i< 30; i++){
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
                                arr.push(r);  
                                i++; 
                                dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
                                console.log(exchange);
                                console.log(ticker);
                                console.log(description);                
                                stock_data.push({exchange: exchange, ticker: ticker, description: description, data: dat});
                                console.log(stock_data[stock_data.length-1].data[0].length);
                            }                        
                        } 
                    });
                
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

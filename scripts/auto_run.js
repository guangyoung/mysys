//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data
var tl = new Array();
function autorun() {  
    var tick_list = [];
    var exch_list = []; 
    var des_list = [];    
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {               
            // for(i=0; i<10; i++) {
            //     exch_list.push(result.data[i].Exchange);
            //     tick_list.push(result.data[i].Symbol);  
            //     des_list.push(result.data[i].Description);                 
            // } 
            // tl.push({exchanges: exch_list, ticker: tick_list, description: des_list});
            // console.log(tl.exchanges);
            // console.log(exch_list);
            for(i=0; i<3; i++) {
                // let exchange = tl[0].exchange[i];
                // let tickere = tl[0].ticker[i];
                // let descrip = tl[0].description[i];
                
                var data_price;
                const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[i].Symbol+"?symbol="+result.data[i].Symbol+"&period1=0&period2=9999999999&interval=1d";
                $.getJSON(proxyurl+urls, function(result){                 
                    data_price = result.chart.result[0].indicators.adjclose[0].adjclose;
                });       
                historical_data = {
                    exchange: result.data[i].Exchange,
                    ticker: result.data[i].Symbol,
                    description: result.data[i].Description,
                    data: data_price
                }              
                console.log(historical_data);
                $.ajax({
                    type: "POST",
                    url: "https://api.quantxi.com/add_data",
                    data: historical_data,             
                    dataType: 'json'
                }) 
            }
        }
    });
}

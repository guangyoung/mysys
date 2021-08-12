//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data
var tl = new Array();
// function autorun() {  
//     Papa.parse("dataset/stock_tickers_list.csv", {
//         download: true,
//         header: true,
//         complete: function(result) {             
//             for(i=0; i<5; i++) {
//                 let exchange= result.data[i].Exchange;
//                 let ticker= result.data[i].Symbol;
//                 let description= result.data[i].Description;             
//                 const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
//                 const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[i].Symbol+"?symbol="+result.data[i].Symbol+"&period1=0&period2=9999999999&interval=1d";
//                 $.getJSON(proxyurl+urls, function(data){
//                     // console.log(data.chart.result[0].indicators.adjclose[0].adjclose);
//                     if(data.chart.result[0].indicators.adjclose[0].adjclose.length>2500) {
//                         historical_data = {
//                             exchange: exchange,
//                             ticker: ticker,
//                             description: description,
//                             data: JSON.stringify(data.chart.result[0].indicators.adjclose[0].adjclose)
//                         } 
//                         console.log(historical_data);
//                         $.ajax({
//                             type: "POST",
//                             url: "https://api.quantxi.com/add_data",
//                             data: historical_data,             
//                             dataType: 'json'
//                         }) 
//                     }
//                 });    
//             }
//         }
//     });
// }

function autorun() {
    var tickers_list = new Array();
    var exchanges_list = new Array(); 
    var descriptions_list = new Array();     
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) { 
            for(i=0; i<20; i++) {
                tickers_list.push(result.data[i].Symbol);
                exchanges_list.push(result.data[i].Exchange);
                descriptions_list.push(result.data[i].Description);
            }   
        }
    });
    for(i=0; i<20; i++) {
        let exchange= exchanges_list[i];
        let ticker= tickers_list[i];
        let description= descriptions_list[i];             
        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=9999999999&interval=1d";
        $.getJSON(proxyurl+urls, function(data){
            // console.log(data.chart.result[0].indicators.adjclose[0].adjclose);
            if(data.chart.result[0].indicators.adjclose[0].adjclose.length>2500) {
                historical_data = {
                    exchange: exchange,
                    ticker: ticker,
                    description: description,
                    data: JSON.stringify(data.chart.result[0].indicators.adjclose[0].adjclose)
                } 
                console.log(historical_data);
                $.ajax({
                    type: "POST",
                    url: "https://api.quantxi.com/add_data",
                    data: historical_data,             
                    dataType: 'json'
                }) 
            }
        });    
    }
}

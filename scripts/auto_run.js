//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data

function autorun() {
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: false,
        complete: function(result) {
        // console.log(result.data);
        for(i=1; i<2; i++) {
            const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
            const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[i][2]+"?symbol="+result.data[i][2]+"&period1=0&period2=9999999999&interval=1d";

            $.getJSON(proxyurl+urls, function(data){
                // console.log(result.chart.result[0].indicators.adjclose[0].adjclose);
                exchange = result.data[i][1];
                ticker = result.data[i][2];
                decrp = result.data[i][3];
                edo_data = data.chart.result[0].indicators.adjclose[0].adjclose;
                console.log(exchange);
                console.log(ticker);  
                console.log(decrp);  
                console.log(edo_data);                
            });
        }        
        }
    });
}

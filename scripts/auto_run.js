//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data
var tl = new Array();
function autorun() {  
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            var arr = [];
            while(arr.length < 100){
                var r = Math.floor(Math.random() * 1000) + 1;
                if(arr.indexOf(r) === -1) arr.push(r);
            }
            console.log(arr);  
            var stock_data = 0; 
            var i = 0;        
            while(stock_data < 30) {                
                let exchange= result.data[arr[i]].Exchange;
                let ticker= result.data[arr[i]].Symbol;
                // console.log(exchange);
                // console.log(ticker);
                let description= result.data[arr[i]].Description;             
                const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[arr[i]].Symbol+"?symbol="+result.data[arr[i]].Symbol+"&period1=0&period2=9999999999&interval=1d";
                $.getJSON(proxyurl+urls, function(data){
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
                        stock_data++; 
                        console.log(stock_data);
                    } else {
                        return false;
                    }
                });
                i++;   
                // console.log(i); 
            }
        }
    });
}

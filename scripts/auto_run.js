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
            for(i=0; i<3; i++) {
                let as_data_price                
                const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[i].Symbol+"?symbol="+result.data[i].Symbol+"&period1=0&period2=9999999999&interval=1d";
                $.getJSON(proxyurl+urls, function(data){
                    let length_tm = data.chart.result[0].timestamp.length;
                    // for(i=0; i<length_tm; i++) {                 
                        as_data_price = data.chart.result[0].indicators.adjclose[0].adjclose;
                        // as_data_price.push(
                        //     data_price
                        // );
                    // }
                });     
                // console.log(as_data_price);  
                historical_data = {
                    exchange: result.data[i].Exchange,
                    ticker: result.data[i].Symbol,
                    description: result.data[i].Description,
                    data: as_data_price
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

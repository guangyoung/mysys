//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data
var tick_list = new Array();
function autorun() {    
    // var tl = new Array();
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {            
            for(i=0; i<10; i++) {
                tick_list.push(result.data[i].Symbol);               
            }                  
        }
    });
    // tick_list.push(tl);
    console.log(tick_list);
    for(i=0; i<3; i++) {
        console.log(tick_list[0]);
        let tickere = tick_list[i].split(',')[0];
        
        let as_data_price = new Array();
        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+tickere+"?symbol="+tickere+"&period1=0&period2=9999999999&interval=1d";
        $.getJSON(proxyurl+urls, function(result){ 
            var yahoo_data = result;
            console.log(yahoo_data);
            let length_tm = 1000;
            for(i=0; i<length_tm; i++) {
                var data_price = yahoo_data.chart.result[0].indicators.adjclose[0].adjclose[i];
                as_data_price.push(
                    data_price
                );
            }
        });       
        historical_data = {
            exchange: "NYSE",
            ticker: tickere,
            description: "des",
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

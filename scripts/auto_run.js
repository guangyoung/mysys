//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data

function autorun() {    
    var datdat;
    var eoddata;
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: false,
        complete: function(result) {
            for(i=1; i<31; i++) {
                datdat.push({exchange:result.data[i][1],ticker:result.data[i][2],description:result.data[i][3]});
            }              
        }
    });
    console.log(datdat);

    for(i=0; i<30; i++) {
        // console.log(tickers[0]);
        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/aapl?symbol=aapl&period1=0&period2=9999999999&interval=1d";
        $.getJSON(proxyurl+urls, function(data){            
            eoddata = data.chart.result[0].indicators.adjclose[0].adjclose; 
            historical_data = {
                exchange: "nyse",
                ticker: "aapl",
                description: "apple",
                data: eoddata.toString()
            }              
            console.log(historical_data);
            $.ajax({
                type: "POST",
                url: "https://api.quantxi.com/add_data",
                data: historical_data,             
                dataType: 'json'
            })                     
        });
        // if(eoddata.length>3000) {            
           
        // }     
    }    
}

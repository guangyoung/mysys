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
        for(i=1; i<2; i++) {
            const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
            const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[i][2]+"?symbol="+result.data[i][2]+"&period1=0&period2=9999999999&interval=1d";
            $.getJSON(proxyurl+urls, function(data){
                if(data.length>3000) {
                    historical_data = {
                        exchange: result.data[i][1],
                        ticker: result.data[i][2],
                        description: result.data[i][3],
                        data: data.chart.result[0].indicators.adjclose[0].adjclose
                    }              
                    console.log(historical_data);
                    $.ajax({
                        type: "POST",
                        url: "https://api.quantxi.com/add_data",
                        data: historical_data,             
                        dataType: 'json',
                        // success: function(result){ 
                        //     if (result.status == "success") {
                       
                        //     }         
                        // }
                    })
                }                
            });
        }        
        }
    });
}

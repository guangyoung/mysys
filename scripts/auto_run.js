
function autorun() {     
    Papa.parse("dataset/yahoo_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            for (let i = 2; i < 3; i++) {
                setTimeout(function timer() {
                        let dat = [];
                        let ticker= result.data[i].Symbol;
                        let description= result.data[i].Description;
                        let exchange= result.data[i].Exchange;
                        let country= result.data[i].Country; 
                        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=9999999999&interval=1d";
                        $.getJSON(proxyurl+urls, function(data){ 
                            if(data.chart.result !== null) {                                
                                if(data.chart.result[0].timestamp !== undefined) {                                    
                                    for(i=0;i<data.chart.result[0].timestamp.length;i++) {
                                        let datt = new Array();
                                        datt.push(
                                            data.chart.result[0].timestamp[i],
                                            data.chart.result[0].indicators.quote[0].open[i],
                                            data.chart.result[0].indicators.quote[0].high[i],
                                            data.chart.result[0].indicators.quote[0].low[i],
                                            data.chart.result[0].indicators.quote[0].close[i],
                                            data.chart.result[0].indicators.adjclose[0].adjclose[i],
                                            data.chart.result[0].indicators.quote[0].volume[i]
                                        )
                                        dat.push(datt);
                                    }
                                    
                                    historical_data = {
                                        'ticker': ticker,
                                        'data': dat
                                    } 
                                    console.log(historical_data);
                                    console.log(data.chart.result[0]);
                                    $.ajax({
                                        type: "POST",
                                        url: "https://api.quantxi.com/add_data",
                                        data: historical_data,          
                                        dataType: 'json',
                                        success: function (result) {
                                            console.log(result);
                                        }
                                    })
                                }                        
                            } 
                        }); 
                        
                }, i * 500);           
            } 
        }
    });   
}



function autorun() {     
    Papa.parse("dataset/yahoo_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            var i = 6000;
            var x = 0;
            while (x == 0) {
                x=1;                
                i++; 
                setTimeout(function timer() { 
                      
                let xx=0; 
                console.log(i);                        
                        let dat = [];
                        let ticker= result.data[i].Symbol;
                        let description= result.data[i].Description;
                        let exchange= result.data[i].Exchange;
                        let country= result.data[i].Country; 
                        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=1640961000&interval=1d";
                       
                        $.getJSON(proxyurl+urls, function(data){ 
                            if(data.chart.result !== null) {                                
                                if(data.chart.result[0].timestamp !== undefined) {
                                    let sd = data.chart.result[0].timestamp[0];
                                    let ed = data.chart.result[0].timestamp[data.chart.result[0].timestamp.length-1];
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
                                        'description': description,
                                        'exchange': exchange,
                                        'country': country,
                                        'startdate': sd,
                                        'enddate': ed,
                                        'data': dat
                                    } 
                                    $.ajax({
                                        type: "POST",
                                        url: "https://api.quantxi.com/add_stock",
                                        data: historical_data,     
                                        dataType: 'json'
                                    })                                   
                                }                        
                            } 
                        }); 
                        
                }, 1000);
                x = xx;  
                console.log(x);
            } 
        }
    });   
}

function appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }


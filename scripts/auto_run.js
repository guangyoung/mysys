
function autorun() {     
    Papa.parse("dataset/yahoo_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            var i = 6000;
            var x = 0;
            while (x==0 && i<15000) {
                x=1;
                // setTimeout(function timer() {
                    console.log(i);
                    // var r = Math.floor(Math.random() * 1000) + 1;
                    // if(arr.indexOf(r) === -1) {
                        let dat = [];
                        let ticker= result.data[i].Symbol;
                        let description= result.data[i].Description;
                        let exchange= result.data[i].Exchange;
                        let country= result.data[i].Country; 
                        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=1640961000&interval=1d";
                        $.ajax({
                            type: "GET",
                            url: proxyurl+urls,
                            // data: dataInput,
                            dataType: 'json',
                            success: function (data) {
                        // $.getJSON(proxyurl+urls, function(data){ 
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
                                    
                                    // dat.push({date: data.chart.result[0].timestamp, price: data.chart.result[0].indicators.adjclose[0].adjclose});
                                    historical_data = {
                                        'ticker': ticker,
                                        'description': description,
                                        'exchange': exchange,
                                        'country': country,
                                        'startdate': sd,
                                        'enddate': ed,
                                        'data': dat
                                    } 
                                    // console.log(historical_data);
                                    // console.log(data.chart.result[0]);
                                    $.ajax({
                                        type: "POST",
                                        url: "https://api.quantxi.com/add_stock",
                                        data: historical_data,     
                                        dataType: 'json'
                                    })

                                    i++;
                                    x=0;

                                    // dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
                                    // stock_data.push({exchange: exchange, ticker: ticker, description: description, data: dat});
                                    // console.log(stock_data[stock_data.length-1].exchange);
                                    // console.log(stock_data[stock_data.length-1].ticker);
                                    // console.log(stock_data[stock_data.length-1].description);
                                    // console.log(stock_data[stock_data.length-1].data[0].length);
                                    // console.log(stock_data.length);
                                }                        
                            } 
                        }
                        }); 
                        
                // }, i * 1000);           
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


//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data
// var stock_data = new Array(); 
function autorun() {     
    Papa.parse("dataset/yahoo_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            // var arr = [];
            // let i = 0;     
            for (let i = 0; i < 100; i++) {
                setTimeout(function timer() {
                    console.log(i);
                    // var r = Math.floor(Math.random() * 1000) + 1;
                    // if(arr.indexOf(r) === -1) {
                        let dat = new Array();
                        let ticker= result.data[i].Symbol;
                        let description= result.data[i].Description;
                        let exchange= result.data[i].Exchange;
                        let country= result.data[i].Country; 
                        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
                        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker+"?symbol="+ticker+"&period1=0&period2=9999999999&interval=1d";
                        $.getJSON(proxyurl+urls, function(data){                                     
                            if(data.chart.result[0].indicators.adjclose[0].length > 0) {
                                let sd = data.chart.result[0].timestamp[0];
                                console.log(sd);
                                // if(data.chart.result[0].timestamp.length>1000) {
                                    dat.push({date: data.chart.result[0].timestamp, price: data.chart.result[0].indicators.adjclose[0].adjclose});
                                    historical_data = {
                                        ticker: ticker,
                                        description: description,
                                        exchange: exchange,
                                        country: country,
                                        startdate: sd,                                        
                                        data: JSON.stringify(dat)
                                    } 
                                    $.ajax({
                                        type: "POST",
                                        url: "https://api.quantxi.com/add_data",
                                        data: historical_data,             
                                        dataType: 'json'
                                    })
                                    // dat.push(data.chart.result[0].indicators.adjclose[0].adjclose);
                                    // stock_data.push({exchange: exchange, ticker: ticker, description: description, data: dat});
                                    // console.log(stock_data[stock_data.length-1].exchange);
                                    // console.log(stock_data[stock_data.length-1].ticker);
                                    // console.log(stock_data[stock_data.length-1].description);
                                    // console.log(stock_data[stock_data.length-1].data[0].length);
                                    // console.log(stock_data.length);
                                // }                        
                            } 
                        }); 
                }, i * 500);           
            } 
            // alert(`selesai`);
        }
    });   
}
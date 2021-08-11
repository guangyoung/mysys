//setting
var initialequity = 1000000;
var bidaskspread = 0.01;
var commisionshare = 0.01;
var interestrate = 0.02;

//data

function autorun() {    
    var datdat=[];
    var eoddata;
    Papa.parse("dataset/stock_tickers_list.csv", {
        download: true,
        header: true,
        complete: function(result) {
            // console.log(result.data[0].Symbol);
            datdat=result;
            // for(i=1; i<31; i++) {
            //     datdat.push({exchange:result.data[i][1],ticker:result.data[i][2],description:result.data[i][3]});
            // }              
        }
    });
    console.log(datdat);

    for(i=0; i<3; i++) {
        // console.log(tickers[0]);
        let exc = datdat[i].exchange;
        let tickere = datdat[i].ticker;
        let des = datdat[i].description;
        const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
          const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+tickere+"?symbol="+tickere+"&period1=0&period2=9999999999&interval=1d";
        $.getJSON(proxyurl+urls, function(data){            
            eoddata = data.chart.result[0].indicators.adjclose[0].adjclose; 
            historical_data = {
                exchange: exc,
                ticker: tickere,
                description: des,
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

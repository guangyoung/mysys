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
        console.log(result.data);
        for(i=1; i<5; i++) {
            const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
            const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+result.data[i][2]+"?symbol="+result.data[i][2]+"&period1=0&period2=9999999999&interval=1d";

            $.getJSON(proxyurl+urls, function(result){
                console.log(result);
                // var yahoo_data = result;
                // let length_tm = yahoo_data.chart.result[0].timestamp.length;
                // for(i=0; i<length_tm; i++) {
                // var data_date = new Date(yahoo_data.chart.result[0].timestamp[i] * 1000);
                // var data_price = yahoo_data.chart.result[0].indicators.adjclose[0].adjclose[i];
                // as_data_date.push(
                // appendLeadingZeroes(data_date.getMonth()+1) + "/" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10) + "/" + data_date.getFullYear()
                // );
                // as_data_price.push(
                // data_price
                // );
                // }
                // asset_portfolio_yahoo.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
                // let al = asset_portfolio_yahoo.length;
                // let portfolio =            
                // `<tr>
                //     <td class="text-center">Stock `+al+`</td>
                //     <td class="text-center">`+tickere+`</td>
                //     <td class="text-center">`+ex_choo+`</td>
                //     <td class="text-center">`+as_data_date[0]+`</td>
                //     <td class="text-center">`+as_data_date[as_data_date.length-1]+`</td>
                // </tr>`;
                // $("#table_assets > tbody").append(portfolio);
            });
        }        
        }
    });
}

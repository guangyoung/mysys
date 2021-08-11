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
        console.log(result.data[2]);
        // for(i=1; i<result.data.length; i++) {
        //     var data_date = new Date(result.data[i][0]);
        //     var data_price = result.data[i][5];
        //     as_data_date.push(
        //     appendLeadingZeroes(data_date.getMonth()+1) + "/" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10) + "/" + data_date.getFullYear()
        //     );
        //     as_data_price.push(
        //     data_price
        //     );
        //     }
        // asset_portfolio_yahoo.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
        // console.log(asset_portfolio_yahoo);
        // console.log(as_data_date);
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
        }
    });
}

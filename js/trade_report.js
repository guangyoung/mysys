//Function Trade Report
function view_account_trade_summary() {
  $("#account_trade_summary_tbl>tbody").empty();
  $("#pagination_trade_summary").twbsPagination("destroy");
  if(account_trade_summary.length > 0) {
    $("#pagination_trade_summary").twbsPagination({
      totalPages: Math.ceil(account_trade_summary.length/20),
      visiblePages: 4,
      onPageClick: function (event, page) {
        $("#account_trade_summary_tbl>tbody").empty();
          for (i=(page*20)-20; i<(page*20) && i<(account_trade_summary.length); i++) {
            var account_trade_summary_row =
            `<tr>
                <td class="text-center" style="font-size: 10px; font-family: calibri; position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 2px 2px">`+account_trade_summary[i].date+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].cash.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].market_value_summary.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].margin_loan_balance_summary.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].equity.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].maintenance_margin.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].regT_margin_req.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].margin_available.toFixed(0)))+`</td>                
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].margin_used.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].margin_back.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].loan_used.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].loan_back.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].trade_cost_summary.toFixed(0)))+`</td> 
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].daily_interest.toFixed(0)))+`</td>  
            </tr>`           
            $("#account_trade_summary_tbl>tbody").append(account_trade_summary_row);
            }
      }
    });
  } else {
    alert("belum ada data")
    return false;
  } 
}

var asset_choose_current;
function assets_list() {//cari solusi biar tdk double click, muncul berkali2 di console
  $("#trade_report_dd").on('click', '.dropdown-item', function (event) {
      var container_asset_choose = $(this).closest("#trade_report_dd");
      asset_choose_current = $(event.currentTarget)[0].innerHTML;
      container_asset_choose.find('.asset_selected').text( asset_choose_current || 'Select Asset');
      // console.log(asset_choose_current);
  });
}

function view_asset_trade_details() {
  var assets_list = [
    "Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5", "Asset 6", "Asset 7", "Asset 8", "Asset 9", "Asset 10",
    "Asset 11", "Asset 12", "Asset 13", "Asset 14", "Asset 15", "Asset 16", "Asset 17", "Asset 18", "Asset 19", "Asset 20",
    "Asset 21", "Asset 22", "Asset 23", "Asset 24", "Asset 25", "Asset 26", "Asset 27", "Asset 28", "Asset 29", "Asset 30"
  ];

  let asset_idx = assets_list.indexOf(asset_choose_current);

  $("#asset_trade_details_tbl>tbody").empty();
  $("#pagination_trade_details").twbsPagination("destroy");

  if(asset_idx == -1) {
    alert("Asset belum dipilih, silahkan select asset yang mau ditampilkan datanya");
    return false;
  } else if(asset_trade_details.length == 0) {
    alert("belum ada data")
    return false;    
  } else {
    $("#pagination_trade_details").twbsPagination({
      totalPages: Math.ceil(asset_trade_details.length/20),
      visiblePages: 4,
      onPageClick: function (event, page) {
        $("#asset_trade_details_tbl>tbody").empty();
        for (i=(page*20)-20; i<(page*20) && i<(asset_trade_details.length); i++) {
          var asset_trade_details_row =
          `<tr>
              <td class="text-center" style="font-size: 10px; font-family: calibri; position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 2px 2px">`+asset_trade_details[i][asset_idx].date+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].price.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].position_size.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].market_value.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].margin_loan_balance.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_size.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_value.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_margin_used.toFixed(0)))+`</td>                
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_margin_loan.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_cost.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_size.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_value.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].avg_buy_price.toFixed(0)))+`</td>
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_loan_back.toFixed(0)))+`</td>                 
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_margin_back.toFixed(0)))+`</td>  
              <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_cost.toFixed(0)))+`</td>  
          </tr>`           
          $("#asset_trade_details_tbl>tbody").append(asset_trade_details_row);
        }
      }
    });    
  } 
}

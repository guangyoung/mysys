//Function Trade Report
function view_account_trade_summary() {
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
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].cash_pretrade.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].market_value_pretrade.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].margin_loan_balance_pretrade.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].equity_pretrade.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].maintenance_margin.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].regT_margin_req.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].margin_available.toFixed(0)))+`</td>
                
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].buy_trade_margin_req.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].sell_trade_margin_req.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].buy_trade_margin_loan.toFixed(0)))+`</td>
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].sell_trade_margin_loan.toFixed(0)))+`</td>

                
                <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(account_trade_summary[i].sell_trade_cost.toFixed(0)))+`</td> 
                
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

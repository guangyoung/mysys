//Kumpulan Fungsi-Fungsi.....







 



//Function View Full Post Request Response

//Function Trade Report
function view_account_trade_summary() {
  if(account_trade_summary.length > 0) {
    $("#pagination_trade_summary").twbsPagination({
      totalPages: Math.ceil(account_trade_summary.length/24),
      visiblePages: 2,
      onPageClick: function (event, page) {
        $("#account_trade_summary_tbl>tbody").empty();
          for (i=(page*24)-24; i<(page*24) && i<(account_trade_summary.length); i++) {
            var account_trade_summary_row =
            `<tr>
                <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+account_trade_summary[i].date+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+account_trade_summary[i].cash_pretrade+`</td>
                
            </tr>`;
            $("#account_trade_summary_tbl>tbody").append(account_trade_summary_row);
            }
      }
    });
  } else {
    alert("belum ada data")
    return false;
  }
    
}

//Function Performance Chart

//Function Test History

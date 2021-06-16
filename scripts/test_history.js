//view test history
function view_test_history() {
    $("#test_history_tbl>tbody").empty();
    $("#pagination_test_history").twbsPagination("destroy");
    if(test_history.length > 0) {
      $("#pagination_test_history").twbsPagination({
        totalPages: Math.ceil(test_history.length/20),
        visiblePages: 4,
        onPageClick: function (event, page) {
          $("#test_history_tbl>tbody").empty();
            for (i=(page*20)-20; i<(page*20) && i<(test_history.length); i++) {
              var test_history_row =
                `<tr>
                    <td style="text-align: center; ; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid; position: sticky; left: 0px; padding: 5px 5px; color:#d2d3d7;">`+test_history[i].test_no+`</td>
                    <td style="text-align: center; padding: 0px 10px; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid">`+test_history[i].date_time_testing+`</td>
                    <td style="text-align: left; padding: 0px 10px; border-bottom: 1px #292b43 solid">Spread/side<br>Commision/trade<br>Interest rate/year</td>
                    <td style="text-align: left; padding: 0px 10px; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid">`+test_history[i].test_setting.spread_side+`<br>`+test_history[i].test_setting.commision_share+`<br>`+test_history[i].test_setting.interest_rate+`</td>
                    <td style="text-align: center; padding: 0px 10px; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid">`+test_history[i].data_source+`</td>
                    <td style="text-align: center; padding: 10px 10px; border-left: 1px #292b43 solid; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid">`+test_history[i].ticker+`</td>
                    <td style="text-align: center; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid">`+test_history[i].period_of_data+`</td>
                    <td style="text-align: left; padding: 0px 10px; border-bottom: 1px #292b43 solid">
                    Total Return<br>CAGR<br>Max DD<br>MAR Ratio<br>Sharpe Ratio
                    </td>
                    <td style="text-align: left; padding: 0px 10px; border-right: 1px #292b43 solid; border-bottom: 1px #292b43 solid">
                    `+test_history[i].quantxi_return.total_return+`<br>`+test_history[i].quantxi_return.cagr+`<br>`+test_history[i].quantxi_return.max_dd+`<br>`+test_history[i].quantxi_return.mar_ratio+`<br>`+test_history[i].quantxi_return.sharpe_ratio+`
                    </td>
                    <td style="text-align: left; padding: 0px 10px; border-bottom: 1px #292b43 solid">
                    Total Return<br>CAGR<br>Max DD<br>MAR Ratio<br>Sharpe Ratio
                    </td>
                    <td style="text-align: left; padding: 0px 10px; border-bottom: 1px #292b43 solid">
                    `+test_history[i].buyandhold_return.total_return+`<br>`+test_history[i].buyandhold_return.cagr+`<br>`+test_history[i].buyandhold_return.max_dd+`<br>`+test_history[i].buyandhold_return.mar_ratio+`<br>`+test_history[i].buyandhold_return.sharpe_ratio+`
                    </td>
                </tr>`           
              $("#test_history_tbl>tbody").append(test_history_row);
              }
        }
      });
    } else {     
      return false;
    } 
  }
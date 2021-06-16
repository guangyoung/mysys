//Function Trade Report
function view_account_trade_summary() {
  $("#account_trade_summary_tbl>tbody").empty();
  $("#pagination_trade_summary").twbsPagination("destroy");
  if(account_trade_summary.length > 0) {
    $("#pagination_trade_summary").twbsPagination({
      totalPages: Math.ceil(account_trade_summary.length/5),
      visiblePages: 4,
      onPageClick: function (event, page) {
        $("#account_trade_summary_tbl>tbody").empty();
          for (i=(page*5)-5; i<(page*5) && i<(account_trade_summary.length); i++) {
            var account_trade_summary_row =
            `<tr>
                <td>
                    <div class="row" style="margin-left: 15px; margin-top: 15px">
                        <a style="color: #ffffff; font-size: 11px;">Date : 23-01-2001</a>
                    </div>                                            
                    <div class="table-hover" style="margin-left: 15px; margin-right: 15px; margin-top: -2px; background-color: #070914; overflow: auto; width: 1120px; height: 208px">
                        <table>
                            <thead style="color:#d2d3d7">
                                <tr>
                                    <th class="text-center" rowspan="2" style="position: sticky; top: 0px; padding: 3px 8px; background-color: #40446f; font-size: 9px">Portfolio</th>
                                    <th class="text-center" rowspan="2" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Price</th>
                                    <th class="text-center" colspan="2" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Pre Trade Position</th>
                                    <th class="text-center" colspan="5" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Buy Open (Add Position)</th>
                                    <th class="text-center" colspan="5" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Sell Close (Reduce Position)</th>
                                    <th class="text-center" colspan="2" style="position: sticky; top: 0px; border-left: 1px #808080 solid; padding: 3px 8px; background-color: #40446f; font-size: 9px">Post Trade Position</th>
                                </tr>                                           
                                <tr>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Position Size</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Market Value</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Quantxi Signal</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Order</th>                                                        
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Price</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Trade Value</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Com mision</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Quantxi Signal</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Order</th>                                                        
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Filled Price</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Trade Value</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Com mision</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Position Size</th>
                                    <th class="text-center" style="position: sticky; top: 19px; border-left: 1px #808080 solid; padding: 2px 8px; background-color: #1b1d2d; font-size: 9px">Market Value</th> 
                                </tr>                                            
                            </thead>
                            <tbody> 
                                <tr>
                                    <td class="text-center" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">Asset `+i+`</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000.00</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000.00</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">10,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">1,000,000</td>
                                    <td class="text-right" style="font-size: 10px; font-family: calibri; border-left: 1px #808080 solid; border-bottom: 1px #808080 solid; color:#d2d3d7; padding: 0 2px">100,000,000.00</td>                                                              
                                </tr>                                                                                         
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-left: 15px; margin-right: 15px; background-color: #1b3636; width: 1120px; height: 110px">
                        <table id="">                                        
                            <tbody>
                                <tr>
                                    <td class="text-center" rowspan="2" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 104px"><strong>Account<br>Summary<br>23/01/2001</strong></td>
                                    <td class="text-center" colspan="4" style="font-size: 11px; border-left: 1px #070914 solid; border-bottom: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 508px; padding: 3px 0 2px 0"><strong>Pre Trade Position</strong></td>
                                    <td class="text-center" colspan="4" style="font-size: 11px; border-left: 1px #070914 solid; border-bottom: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 508px; padding: 3px 0 2px 0"><strong>Post Trade Position</strong></td>                                              
                                </tr>
                                <tr>
                                    <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 150px; padding: 4px 10px 5px 10px">Cash Balance<br>MTD Acrued Interest<br>Long Market Value<br>Equity With Loan Value (ELV)<br>Net Liquidation Value</td>
                                    <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 104px; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
                                    <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 150px; padding:  4px 10px 5px 10px">Maintenance Margin<br>Reg.T Margin Requirement<br>Excess Liquidity<br>SMA/Excess Equity<br>Buying Power</td>
                                    <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 104px; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
                                    <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 150px; padding: 4px 10px 5px 10px">Cash Balance<br>MTD Acrued Interest<br>Long Market Value<br>Equity With Loan Value (ELV)<br>Net Liquidation Value</td>
                                    <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 104px; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
                                    <td class="text-left" style="font-size: 11px; border-left: 1px #070914 solid; font-family: calibri; color:#d2d3d7; width: 150px; padding:  4px 10px 5px 10px">Maintenance Margin<br>Reg.T Margin Requirement<br>Excess Liquidity<br>SMA/Excess Equity<br>Buying Power</td>
                                    <td class="text-right" style="font-size: 11px; font-family: calibri; color:#d2d3d7; width: 104px; padding:  4px 10px 5px 10px">100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00<br>100,000,000.00</td>
                                </tr>                                            
                            </tbody>
                        </table>
                    </div> 
                </td>
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
function view_asset_trade_details() {//cari solusi biar tdk double click, muncul berkali2 di console
  $("#trade_report_dd").on('click', '.dropdown-item', function (event) {
      var container_asset_choose = $(this).closest("#trade_report_dd");
      asset_choose_current = $(event.currentTarget)[0].innerHTML;
      container_asset_choose.find('.asset_selected').text( asset_choose_current || 'Select Asset');
      // console.log(asset_choose_current);
  });
  
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

// function view_asset_trade_details() {
//   var assets_list = [
//     "Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5", "Asset 6", "Asset 7", "Asset 8", "Asset 9", "Asset 10",
//     "Asset 11", "Asset 12", "Asset 13", "Asset 14", "Asset 15", "Asset 16", "Asset 17", "Asset 18", "Asset 19", "Asset 20",
//     "Asset 21", "Asset 22", "Asset 23", "Asset 24", "Asset 25", "Asset 26", "Asset 27", "Asset 28", "Asset 29", "Asset 30"
//   ];

//   let asset_idx = assets_list.indexOf(asset_choose_current);

//   $("#asset_trade_details_tbl>tbody").empty();
//   $("#pagination_trade_details").twbsPagination("destroy");

//   if(asset_idx == -1) {
//     alert("Asset belum dipilih, silahkan select asset yang mau ditampilkan datanya");
//     return false;
//   } else if(asset_trade_details.length == 0) {
//     alert("belum ada data")
//     return false;    
//   } else {
//     $("#pagination_trade_details").twbsPagination({
//       totalPages: Math.ceil(asset_trade_details.length/20),
//       visiblePages: 4,
//       onPageClick: function (event, page) {
//         $("#asset_trade_details_tbl>tbody").empty();
//         for (i=(page*20)-20; i<(page*20) && i<(asset_trade_details.length); i++) {
//           var asset_trade_details_row =
//           `<tr>
//               <td class="text-center" style="font-size: 10px; font-family: calibri; position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 2px 2px">`+asset_trade_details[i][asset_idx].date+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].price.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].position_size.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].market_value.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].margin_loan_balance.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_size.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_value.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_margin_used.toFixed(0)))+`</td>                
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_margin_loan.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].buy_trade_cost.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_size.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_value.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].avg_buy_price.toFixed(0)))+`</td>
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_loan_back.toFixed(0)))+`</td>                 
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_margin_back.toFixed(0)))+`</td>  
//               <td class="text-right" style="font-size: 10px; font-family: calibri; color:#d2d3d7; padding: 2px 2px">`+Intl.NumberFormat().format(parseFloat(asset_trade_details[i][asset_idx].sell_trade_cost.toFixed(0)))+`</td>  
//           </tr>`           
//           $("#asset_trade_details_tbl>tbody").append(asset_trade_details_row);
//         }
//       }
//     });    
//   } 
// }

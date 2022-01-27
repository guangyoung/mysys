//STEP 1. CREATE DATA
//Ini adalah step create data .......................................................
//...................................................................................
//...................................................................................

//Global Variables    
var portfolio_data = new Array();
var test_data = new Array();
var testData = new Array();
var array_test_data = new Array();

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

function tickers_exchange_btn() {
  var ul = document.getElementById('ex_dd');
  ul.onclick = function (event) {
    var target = getEventTarget(event);
    let container_exchange = $(this).closest("#tickers_exchange");
    exchange_choose_current_manual = target.innerText.split(' - ')[0]; 
    container_exchange.find('.Xchange').text(target.innerText || 'Select Exchange');
    console.log(exchange_choose_current_manual);
  };
}

function tickers_list_btn() {
  if (!exchange_choose_current_manual) {
    Swal.fire(
      'No Exchange Selected !!',
      'Please select your exchange',
      'warning'
    )
  } else if (exchange_choose_current_manual !== exchange_choose_previous_manual) {
    // $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
    exchange_choose_previous_manual = exchange_choose_current_manual;
    ticker_list = [];
    $('#ulul').empty();
    var tickers = eval(exchange_choose_current_manual);
    // console.log(tickers);
    for (i = 0; i < tickers.length; i++) {
      var newLi = document.createElement('li');
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.style.marginLeft = '15px';
      cb.style.marginRight = '5px';
      newLi.appendChild(cb);
      var text = document.createTextNode(tickers[i]);
      newLi.appendChild(text);
      // var text2 = document.createTextNode("testest");
      // newLi.appendChild(text2);
      document.getElementById("ulul").appendChild(newLi);
    }
  } else {
    return false;
  }
}

// function tickers_select() {
  // $("#tickers_list").on('click', '.dropdown-menu li', function (event) {
  //   event.stopPropagation();
  //   var container2 = $(this).closest("#tickers_list");
  //   var numChecked2 = container2.find('[type="checkbox"]:checked').length;
  //   container2.find('.quantity').text(numChecked2 || '0');
  //   console.log(numChecked2);
  //   var $target2 = $(event.currentTarget);
  //   console.log($target2.text());
  //   if (numChecked2 > ticker_list.length) {
  //       ticker_list.push($target2.text());
  //   } else if (numChecked2 < ticker_list.length) {
  //       var index = ticker_list.indexOf($target2.text());
  //       ticker_list.splice(index, 1);
  //   } else { }
  //   console.log(ticker_list);
  // });
// }

function add_data() {
  if (portfolio_data.length == 30) {
    Swal.fire(
      '30 Stocks has been selected !',
      'Please click reset stock to start new',
      'warning'
    )
    return false;
  } else if (ticker_list.length == 0) {
    Swal.fire(
      'No Ticker Selected !',
      'Please select your tickers to test',
      'warning'
    )
    return false;
  } else {
    if (portfolio_data.length > 0) {
      for (i = 0; i < ticker_list.length; i++) {    //?????
        var tickere = ticker_list[i].split(', ')[0];
        for (x = 0; x < portfolio_data.length; x++) {
          let idx = portfolio_data[x].ticker.indexOf(tickere);
          if (idx !== -1) {
            Swal.fire(
              'ticker ' + tickere + ' has been selected !',
              'Please choose another ticker',
              'warning'
            )
            return false;
          }
        }
      }
    }
    $(':button').prop('disabled', true);
    for (t = 0; t < ticker_list.length && t < (30 - portfolio_data.length); t++) {
      let tickere = ticker_list[t].split(', ')[0];
      let as_data_date = new Array();
      let as_data_price = new Array();
      let ex_choo = exchange_choose_current_manual;

      Papa.parse("dataset/" + exchange_choose_current_manual + "/" + tickere + ".csv", {
        download: true,
        header: false,
        complete: function (result) {
          console.log(result.data);
          for (i = 1; i < result.data.length; i++) {
            var data_date = new Date(result.data[i][0]);
            var data_price = result.data[i][5];
            as_data_date.push(
              appendLeadingZeroes(data_date.getMonth() + 1) + "/" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10) + "/" + data_date.getFullYear()
            );
            if (data_price == null) {
              as_data_price.push(
                as_data_price[as_data_price.length - 1]
              );
            } else {
              as_data_price.push(
                data_price
              );
            }
          }
          portfolio_data.push({ ticker: tickere, data: { date: as_data_date, price: as_data_price } });
          let al = portfolio_data.length;
          let portfolio =
            `<tr>
                      <td class="text-center">`+ al + `</td>
                      <td class="text-center">`+ tickere + `</td>
                      <td class="text-center">`+ ex_choo + `</td>
                      <td class="text-center">`+ as_data_date[0] + `</td>
                      <td class="text-center">`+ as_data_date[as_data_date.length - 1] + `</td>
                  </tr>`;
          $("#table_assets > tbody").append(portfolio);
        }
      });
    }
    $(':button').prop('disabled', false);
    $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
    $("#Xchange_btn").html(`<span class="Xchange">Select Exchange</span>`);
    $("#Xchange_btn_random").html(`<span class="Xchange_random">Select Exchange</span>`);
    ticker_list = [];
    $('#ulul').empty();
    exchange_choose_current_manual = "";
    exchange_choose_previous_manual = "";
  }
}


function tickers_exchange_btn_random() {
  var ul = document.getElementById('ex_dd_random');
  ul.onclick = function (event) {
    var target = getEventTarget(event);
    let container_exchange = $(this).closest("#tickers_exchange_select_random");
    exchange_choose_current_random = target.innerText.split(' - ')[0]; 
    container_exchange.find('.Xchange_random').text(target.innerText || 'Select Exchange');
    console.log(exchange_choose_current_random);
  };
}


function add_data_random() {
  if (portfolio_data.length == 30) {
    Swal.fire(
      '30 Stocks has been selected !',
      'Please click reset stock to start new',
      'warning'
    )
    return false;
  } else if (!exchange_choose_current_random) {
    Swal.fire(
      'No Exchange Selected !',
      'Please select your exchange',
      'warning'
    )
    return false;
  } else {//rumus random ini sdh cukup bagus..ditingkatkan
    var tickers_random = eval(exchange_choose_current_random);
    for (ticker_random_total=0; ticker_random_total < 30; ticker_random_total++) {
      let rand_no = Math.floor(Math.random() * tickers_random.length);
      ticker_list.push(tickers_random[rand_no]);
      console.log(tickers_random);
      tickers_random.splice(rand_no, 1);
    }
    console.log(ticker_list);

    // $(':button').prop('disabled', true);
    for (t = 0; t < ticker_list.length; t++) {
      let tickere = ticker_list[t].split(', ')[0];
      let as_data_date = new Array();
      let as_data_price = new Array();
      let ex_choo = exchange_choose_current_random.split('-')[0];

      Papa.parse("dataset/" + exchange_choose_current_random + "/" + tickere + ".csv", {
        download: true,
        header: false,
        complete: function (result) {
          console.log(result.data);
          for (i = 1; i < result.data.length; i++) {
            var data_date = new Date(result.data[i][0]);
            var data_price = result.data[i][5];
            as_data_date.push(
              appendLeadingZeroes(data_date.getMonth() + 1) + "/" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10) + "/" + data_date.getFullYear()
            );
            if (data_price == null) {
              as_data_price.push(
                as_data_price[as_data_price.length - 1]
              );
            } else {
              as_data_price.push(
                data_price
              );
            }
          }
          portfolio_data.push({ ticker: tickere, data: { date: as_data_date, price: as_data_price } });
          let al = portfolio_data.length;
          let portfolio =
            `<tr>
                      <td class="text-center">`+ al + `</td>
                      <td class="text-center">`+ tickere + `</td>
                      <td class="text-center">`+ ex_choo + `</td>
                      <td class="text-center">`+ as_data_date[0] + `</td>
                      <td class="text-center">`+ as_data_date[as_data_date.length - 1] + `</td>
                  </tr>`;
          $("#table_assets > tbody").append(portfolio);
        }
      });
    }
    // $(':button').prop('disabled', false);
    $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
    $("#Xchange_btn").html(`<span class="Xchange">Select Exchange</span>`);
    $("#Xchange_btn_random").html(`<span class="Xchange_random">Select Exchange</span>`);
    ticker_list = [];
    $('#ulul').empty();
    exchange_choose_current_random = "";
    exchange_choose_previous_random = "";
  }
  // $(':button').prop('disabled', false);
}

function create_test_data() {
  if (portfolio_data.length < 30) {
    Swal.fire(
      'Portfolio < 30 Stocks !',
      'Please select more stocks',
      'warning'
    )
    return false;
  } else if (test_data.length > 0) {
    Swal.fire(
      'Portfolio data already',
      'Please click reset to start new',
      'warning'
    )
    return false;
  } else {
    $("#pagination-demo").twbsPagination("destroy");
    var startdates = new Array();
    var enddates = new Array();
    for (i = 0; i < portfolio_data.length; i++) {
      startdates.push(new Date(portfolio_data[i].data.date[0]));
      enddates.push(new Date(portfolio_data[i].data.date[portfolio_data[i].data.date.length - 1]));
    }
    var startDate = new Date(Math.max.apply(null, startdates));
    var endDate = new Date(Math.min.apply(null, enddates));
    var currentDate = startDate;
    // var startDate_test = startDate;
    // var endDate_test = endDate;
    console.log(startDate_test);
    // $("#period_data").val(appendLeadingZeroes(startDate.getMonth() + 1) + "/" + appendLeadingZeroes(startDate.getDate()) + "/" + startDate.getFullYear() + " - " + appendLeadingZeroes(endDate.getMonth() + 1) + "/" + appendLeadingZeroes(endDate.getDate()) + "/" + endDate.getFullYear());
    $("#startdate_data").val(appendLeadingZeroes(startDate.getMonth() + 1) + "/" + appendLeadingZeroes(startDate.getDate()) + "/" + startDate.getFullYear());
    $("#enddate_data").val(appendLeadingZeroes(endDate.getMonth() + 1) + "/" + appendLeadingZeroes(endDate.getDate()) + "/" + endDate.getFullYear());
    $("#start_date_test").val(startDate.getFullYear() + "-" + appendLeadingZeroes(startDate.getMonth() + 1) + "-" + appendLeadingZeroes(startDate.getDate()));
    $("#end_date_test").val(endDate.getFullYear() + "-" + appendLeadingZeroes(endDate.getMonth() + 1) + "-" + appendLeadingZeroes(endDate.getDate()));
    $("#start_date_test").attr("min", startDate.getFullYear() + "-" + appendLeadingZeroes(startDate.getMonth() + 1) + "-" + appendLeadingZeroes(startDate.getDate()));
    $("#start_date_test").attr("max", endDate.getFullYear() + "-" + appendLeadingZeroes(endDate.getMonth() + 1) + "-" + appendLeadingZeroes(endDate.getDate()));
    $("#end_date_test").attr("min", startDate.getFullYear() + "-" + appendLeadingZeroes(startDate.getMonth() + 1) + "-" + appendLeadingZeroes(startDate.getDate()));
    $("#end_date_test").attr("max", endDate.getFullYear() + "-" + appendLeadingZeroes(endDate.getMonth() + 1) + "-" + appendLeadingZeroes(endDate.getDate()));
  
    var idx = new Array();
    for (i = 0; i < 30; i++) {
      idx[i] = 0;
    }
    while (currentDate <= endDate) {
      let as_arr = new Array();
      let dtt = appendLeadingZeroes(currentDate.getMonth() + 1) + "/" + appendLeadingZeroes(currentDate.getDate()) + "/" + currentDate.getFullYear();
      for (i = 0; i < 30; i++) { //CEK BAGAIMANA PROSES INI BISA CEPAT....PENTIIIING !!!!!!
        let id = portfolio_data[i].data.date.indexOf(dtt, idx[i]);
        if (id == -1) {//jika idx tidak ditemukan
          as_arr.push(test_data[test_data.length - 1].price[i]); //masukkan harga sebelumnya
        } else {
          as_arr.push(portfolio_data[i].data.price[id]); //jika idx ketemu masukkan harga berdasarkan idx
          idx[i] = id + 1;
        }
      }
      test_data.push({
        date: currentDate.getFullYear() + "-" + appendLeadingZeroes(currentDate.getMonth() + 1) + "-" + appendLeadingZeroes(currentDate.getDate()),
        price: as_arr
      });
      if (currentDate.getDay() == 5) {
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
      } else {
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    }
    console.log(test_data); 
    testData = test_data;
    console.log(testData);   

    $("#pagination-demo").twbsPagination({
      totalPages: Math.ceil(test_data.length / 22),
      visiblePages: 4,
      onPageClick: function (event, page) {
        $("#port_data_tbl>tbody").empty();
        for (i = (page - 1) * 22; i < (page * 22) && i < (test_data.length); i++) {
          var test_data_row =
            `<tr>
                <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+ test_data[i].date + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[0]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[1]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[2]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[3]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[4]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[5]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[6]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[7]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[8]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[9]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[10]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[11]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[12]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[13]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[14]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[15]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[16]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[17]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[18]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[19]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[20]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[21]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[22]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[23]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[24]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[25]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[26]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[27]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[28]).toFixed(2)) + `</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+ Intl.NumberFormat().format(parseFloat(test_data[i].price[29]).toFixed(2)) + `</td>
              </tr>`;
          $("#port_data_tbl>tbody").append(test_data_row);
        }
      }
    });
  }

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your Market Data Created',
    showConfirmButton: false,
    timer: 1500
  })
}

function change_period_ofTest() {
  var startDate_test;
  var endDate_test;
  if(new Date($("#start_date_test").val()).getDay() == 6) {
    startDate_test = new Date(new Date($("#start_date_test").val()).setDate(new Date($("#start_date_test").val()).getDate() + 2));
    $("#start_date_test").val(startDate_test.getFullYear() + "-" + appendLeadingZeroes(startDate_test.getMonth() + 1) + "-" + appendLeadingZeroes(startDate_test.getDate()));
  } else if(new Date($("#start_date_test").val()).getDay() == 0) {
    startDate_test = new Date(new Date($("#start_date_test").val()).setDate(new Date($("#start_date_test").val()).getDate() + 1));
    $("#start_date_test").val(startDate_test.getFullYear() + "-" + appendLeadingZeroes(startDate_test.getMonth() + 1) + "-" + appendLeadingZeroes(startDate_test.getDate()));
  } else if(new Date($("#end_date_test").val()).getDay() == 6) {
    endDate_test = new Date(new Date($("#end_date_test").val()).setDate(new Date($("#end_date_test").val()).getDate() + 2));
    $("#end_date_test").val(endDate_test.getFullYear() + "-" + appendLeadingZeroes(endDate_test.getMonth() + 1) + "-" + appendLeadingZeroes(endDate_test.getDate()));
  } else if(new Date($("#end_date_test").val()).getDay() == 0) {
    endDate_test = new Date(new Date($("#end_date_test").val()).setDate(new Date($("#end_date_test").val()).getDate() + 1));
    $("#end_date_test").val(endDate_test.getFullYear() + "-" + appendLeadingZeroes(endDate_test.getMonth() + 1) + "-" + appendLeadingZeroes(endDate_test.getDate()));
  } 
      
  startDate_test = $("#start_date_test").val();
  endDate_test = $("#end_date_test").val();
  console.log(startDate_test);
  let startDate_test_idx;
  let endDate_test_idx;
  for(i=0;i<test_data.length;i++) {
    if(test_data[i].date == startDate_test) {
      startDate_test_idx = i;
      for(y=i+1;y<test_data.length;y++) {
        if(test_data[y].date == endDate_test) {
          endDate_test_idx = y;
        }
      }
    }
  }
  testData = test_data.slice(startDate_test_idx, endDate_test_idx+1);
  console.log(startDate_test_idx);
  console.log(endDate_test_idx);
  console.log(testData);
  
}

function reset_stock() {
  $("#tiingo_tickers_btn").html(`Select Stocks (<span class="quantity">0</span>)`);
  $("#Xchange_btn").html(`<span class="Xchange">Select Exchange</span>`);
  $("#Xchange_btn_random").html(`<span class="Xchange_random">Select Exchange</span>`);
  ticker_list = [];
  exchange_choose_current_manual = "";
  exchange_choose_previous_manual = "";
  exchange_choose_current_random = "";
  exchange_choose_previous_random = "";
  portfolio_data = [];
  test_data = [];
  $("#table_assets > tbody").empty();
  $("#port_data_tbl>tbody").empty();
  $("#pagination-demo").twbsPagination("destroy");
  $("#period_data").val("No Data Available");
  $('#ulul').empty();

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Porfolio Stock Reseted',
    showConfirmButton: false,
    timer: 1500
  });

}

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n
}

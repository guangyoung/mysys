//STEP 1. CREATE DATA
//Ini adalah step create data .......................................................
//...................................................................................
//...................................................................................

//Global Variables    
var portfolio_data = new Array();
var test_data = new Array();
var testData = new Array();

var ticker_list = new Array();
var exchange_choose_current_manual;
var exchange_choose_previous_manual;
var exchange_choose_current_random;
var exchange_choose_previous_random;

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

function tickers_exchange_btn() {
  $("#ex_dd").click(function(event) {
    exchange_choose_current_manual = getEventTarget(event).innerText.split(' - ')[0]; 
    $(this).closest("#tickers_exchange").find('.Xchange').text(getEventTarget(event).innerText || 'Select Exchange');
  });
}

function tickers_list_btn() {
  if (!exchange_choose_current_manual) {
    Swal.fire(
      'No Exchange Selected !!',
      'Please select your exchange',
      'warning'
    )
  } else if (exchange_choose_current_manual !== exchange_choose_previous_manual) {
    exchange_choose_previous_manual = exchange_choose_current_manual;
    ticker_list = [];
    $('#ulul').empty();
    var tickers = eval(exchange_choose_current_manual);
    for (i = 0; i < tickers.length; i++) {
      var newLi = document.createElement('li');
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.style.cssText = 'margin-left:15px; margin-right: 5px';
      var text = document.createTextNode(tickers[i]);
      newLi.append(cb,text);
      $('#ulul').append(newLi);
    }

    $(".dropdown-menu li").click(function(event) {
      event.stopPropagation();
      var numChecked2 = $(this).closest("#tickers_list").find('[type="checkbox"]:checked').length;
      $(this).closest("#tickers_list").find('.quantity').text(numChecked2 || '0');
      if (numChecked2 > ticker_list.length) {
          ticker_list.push($(event.currentTarget).text());
      } else if (numChecked2 < ticker_list.length) {
          var index = ticker_list.indexOf($(event.currentTarget).text());
          ticker_list.splice(index, 1);
      } else { }
      console.log(ticker_list);
    });
  } else {
    return false;
  }
}

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
    // $(':button').prop('disabled', true);
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
    // $(':button').prop('disabled', false);
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
  $("#ex_dd_random").click(function(event) {
    exchange_choose_current_random = getEventTarget(event).innerText.split(' - ')[0]; 
    $(this).closest("#tickers_exchange_select_random").find('.Xchange_random').text(getEventTarget(event).innerText || 'Select Exchange');
  });
  console.log(exchange_choose_current_random);
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
    console.log(exchange_choose_current_random);
    var tickers_random = eval(exchange_choose_current_random);
    console.log(tickers_random);
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
    exchange_choose_current_manual = "";
    exchange_choose_previous_manual = "";
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
    // testData = test_data;
    // console.log(testData);

    // localStorage.setItem('mytestdata', JSON.stringify(test_data));
    
    $('#stock1_ticker').html(portfolio_data[0].ticker);
    $('#stock2_ticker').html(portfolio_data[1].ticker);
    $('#stock3_ticker').html(portfolio_data[2].ticker);
    $('#stock4_ticker').html(portfolio_data[3].ticker);
    $('#stock5_ticker').html(portfolio_data[4].ticker);
    $('#stock6_ticker').html(portfolio_data[5].ticker);
    $('#stock7_ticker').html(portfolio_data[6].ticker);
    $('#stock8_ticker').html(portfolio_data[7].ticker);
    $('#stock9_ticker').html(portfolio_data[8].ticker);
    $('#stock10_ticker').html(portfolio_data[9].ticker);
    $('#stock11_ticker').html(portfolio_data[10].ticker);
    $('#stock12_ticker').html(portfolio_data[11].ticker);
    $('#stock13_ticker').html(portfolio_data[12].ticker);
    $('#stock14_ticker').html(portfolio_data[13].ticker);
    $('#stock15_ticker').html(portfolio_data[14].ticker);
    $('#stock16_ticker').html(portfolio_data[15].ticker);
    $('#stock17_ticker').html(portfolio_data[16].ticker);
    $('#stock18_ticker').html(portfolio_data[17].ticker);
    $('#stock19_ticker').html(portfolio_data[18].ticker);
    $('#stock20_ticker').html(portfolio_data[19].ticker);
    $('#stock21_ticker').html(portfolio_data[20].ticker);
    $('#stock22_ticker').html(portfolio_data[21].ticker);
    $('#stock23_ticker').html(portfolio_data[22].ticker);
    $('#stock24_ticker').html(portfolio_data[23].ticker);
    $('#stock25_ticker').html(portfolio_data[24].ticker);
    $('#stock26_ticker').html(portfolio_data[25].ticker);
    $('#stock27_ticker').html(portfolio_data[26].ticker);
    $('#stock28_ticker').html(portfolio_data[27].ticker);
    $('#stock29_ticker').html(portfolio_data[28].ticker);
    $('#stock30_ticker').html(portfolio_data[29].ticker);
    
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
  let sd = new Date($("#start_date_test").val());
  let ed = new Date($("#end_date_test").val());
  if(sd.getDay() == 6) {
    let new_date = new Date(sd.setDate(sd.getDate() + 2));
    $("#start_date_test").val(new_date.getFullYear() + "-" + appendLeadingZeroes(new_date.getMonth() + 1) + "-" + appendLeadingZeroes(new_date.getDate()));
  } else if(sd.getDay() == 0) {
    let new_date = new Date(sd.setDate(sd.getDate() + 1));
    $("#start_date_test").val(new_date.getFullYear() + "-" + appendLeadingZeroes(new_date.getMonth() + 1) + "-" + appendLeadingZeroes(new_date.getDate()));
  } else if(ed.getDay() == 6) {
    let new_date = new Date(ed.setDate(ed.getDate() + 2));
    $("#end_date_test").val(new_date.getFullYear() + "-" + appendLeadingZeroes(new_date.getMonth() + 1) + "-" + appendLeadingZeroes(new_date.getDate()));
  } else if(ed.getDay() == 0) {
    let new_date = new Date(ed.setDate(ed.getDate() + 1));
    $("#end_date_test").val(new_date.getFullYear() + "-" + appendLeadingZeroes(new_date.getMonth() + 1) + "-" + appendLeadingZeroes(new_date.getDate()));
  }
  let startDate_test_idx;
  let endDate_test_idx;
  for(i=0;i<test_data.length;i++) {
    if(test_data[i].date == $("#start_date_test").val()) {
      startDate_test_idx = i;
      for(y=i+1;y<test_data.length;y++) {
        if(test_data[y].date == $("#end_date_test").val()) {
          endDate_test_idx = y;
        }
      }
    }
  }
  if(((endDate_test_idx-startDate_test_idx)+1)<2100) {
    Swal.fire(
      'total test record data dari periode test yang anda pilih < 2100',
      'Please change your test period',
      'warning'
    )    
  } else {
    testData = test_data.slice(startDate_test_idx, endDate_test_idx+1);
    Swal.fire(
      'total test record '+testData.length,
      'Test data anda sudah siap',
      'success'
    )  
  }
  
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

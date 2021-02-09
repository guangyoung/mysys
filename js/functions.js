//Kumpulan Fungsi-Fungsi.....

//Function Login
function start_quantxi_btn() {
  // if($("#api_key").val() == null) {
  //   alert("api key belum diisi");
  // } else {
  var endpoint = "http://localhost/rasio_server/api/get.php";
  var api_key = $("#api_key").val();
      $.ajax({
          type: "GET",
          url: endpoint,
          headers:{
              "Content-Type": "application/x-www-form-urlencoded",
              "X-API-KEY": api_key
          },
          dataType: 'json',
          success: function(result){
          // if (result.status == "success") {
              alert(`selamat datang point72`); //setting diserver u/tampilkan message nama user api
              sessionStorage.setItem("api", api_key);
              open("dashboard.html","_self");
          // }
          // else {
          //     alert(`gagal koneksi, periksa api key anda`);
          //     return false;
          //   }
          },
          error: function() {
              alert(`gagal koneksi, periksa api key anda`);
              return false;
          }
      })
    }
  // }

//Function Logout
function logout_btn() {
  sessionStorage.removeItem("api");
  open("index.html","_self");
}

//Function Test Setting
function test_setting_submit_btn() {
//   $("#frmSetting" ).on( "click", function( event ) {
    // event.preventDefault();
    // var initialequity = $("#initial_equity").val();
    // var bidaskspread = $("#bid_ask_spread").val();
    // var commisionshare = $("#commision_share").val();
    // var interestrate = $("#interest_rate").val();
    // var riskfreerate = $("#risk_free_rate").val();
    // var regTmargin = $("#regT_margin").val();
    // var maintmargin = $("#maint_margin").val();
    // var mindata = $("#min_data").val();
    // var maxdata = $("#max_data").val();
    // var portfoliosize = $("#portfolio_size").val();
    // alert('Setting Berhasil disimpan');
// });
}

//Function Portfolio Dataset
var ticker_list = new Array();
var exchange_choose_current;
var exchange_choose;
var startdate_choose_current;
var startdate_choose;
var asset_portfolio_yahoo = new Array();
var asset_portfolio_files = new Array();
var mychart;
// var port_data = new Array();

function exchange_list() {//cari solusi biar tdk double click, muncul berkali2 di console
      $("#tickers_exchange").on('click', '.dropdown-item', function (event) {
        var container_exchange = $(this).closest("#tickers_exchange");
        exchange_choose_current = $(event.currentTarget)[0].innerHTML;
        container_exchange.find('.Xchange').text( exchange_choose_current || 'Exchange');
        console.log(exchange_choose_current);
    });
  }

function startdate_list() {//cari solusi biar tdk double click, muncul berkali2 di console
  $("#tickers_startdate").on('click', '.dropdown-item', function (event) {
      var container_startdate = $(this).closest("#tickers_startdate");
      startdate_choose_current = $(event.currentTarget)[0].innerHTML;
      container_startdate.find('.startdt').text( startdate_choose_current || 'Startdate');
      console.log(startdate_choose_current);
  });
  }

function tickers_list_btn () {
  if(!exchange_choose_current || !startdate_choose_current) {
     $('#ulul').empty();
    var li = document.createElement('li').appendChild(document.createTextNode("silahkan pilih exchange & startdate"));
    document.getElementById("ulul").appendChild(li);
    return false;
  }
  // if(exchange_choose_current == exchange_choose || startdate_choose_current == stardate_choose) {
  //   return false;
  // }
  if(ticker_list.length>0) {
    if (exchange_choose_current !== exchange_choose || startdate_choose_current !== startdate_choose) {
    if (confirm("anda punya ticker yg dipilih blm di add, apa anda mau batalin") == true) {
        ticker_list = [];
        $("#tiingo_tickers_btn").html(`Tickers (<span class="quantity">0</span>)`);
        exchange_choose = exchange_choose_current;
        startdate_choose = startdate_choose_current;
        $('#ulul').empty();
        tickers_list_filter();
      } else {
        exchange_choose_current = exchange_choose;
        startdate_choose_current = startdate_choose;
        $("#Xchange_btn").html(`<span class="Xchange">`+exchange_choose+`</span>`);
        $("#startdt_btn").html(`<span class="startdt">`+startdate_choose+`</span>`);
        return false;
      }
  } else {
      return false
  }
 } else {
  exchange_choose = exchange_choose_current;
  startdate_choose = startdate_choose_current;
  $('#ulul').empty();
  tickers_list_filter();
  }
    $("#tickers_list").on('click', '.dropdown-menu li', function (event) { //cari solusi biar tdk double click, muncul berkali2 di console
      event.stopPropagation();
      var container2 = $(this).closest("#tickers_list");
      var numChecked2 = container2.find('[type="checkbox"]:checked').length;
      container2.find('.quantity').text(numChecked2 || '0');
      console.log(numChecked2);
      var $target2 = $(event.currentTarget);
      console.log($target2.text());
      if(numChecked2 > ticker_list.length) {
          ticker_list.push($target2.text());
      } else if(numChecked2 < ticker_list.length){
          var index = ticker_list.indexOf($target2.text());
          ticker_list.splice(index, 1);
      } else{}
      console.log(ticker_list);
  });
}

function tickers_list_filter() {
    var tickers = NYSE_ticker_list;
    for (i=0;i<tickers.length;i++) {
    var newLi = document.createElement('li');
    var cb = document.createElement( "input" );
    cb.type = "checkbox";
    cb.id = "c1";
    cb.checked = false;
      //Append the checkbox to the li
    newLi.appendChild(cb);
    //Create the text node after the the checkbox
    var text = document.createTextNode(tickers[i]);
      //  Append the text node to the <li>
    newLi.appendChild(text);
      //Append the <li> to the <ul>
    // var ul = document.getElementById("ulul");
    document.getElementById("ulul").appendChild(newLi);
    }

    //     }
    // });
  }

function add_data() {
    if(ticker_list.length==0) {
        alert("tidak ada ticker yg dipilih");
        return false;
    }
    if((ticker_list.length+asset_portfolio_yahoo.length)>30) {
      alert("ticker yg anda pilih melebihi total ticker tersisa untuk portfolio")
      return false;
    }
    if(asset_portfolio_yahoo.length>0) {
    for (i = 0; i<ticker_list.length; i++) {    //?????
        var tickere = ticker_list[i].split(', ')[0];
        for(x=0;x<asset_portfolio_yahoo.length;x++) {
          let idx = asset_portfolio_yahoo[x].ticker.indexOf(tickere);
          if (idx !== -1) {
            alert("ticker "+tickere+" sdh dipilih");
            return false;
          }
        }
      }
    }
    for (i = 0; i < ticker_list.length && i < (30 - asset_portfolio_yahoo.length); i++) {
        let tickere = ticker_list[i].split(', ')[0];
        let as_data_date = new Array();
        let as_data_price = new Array();

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+tickere+"?symbol="+tickere+"&period1=0&period2=9999999999&interval=1d";

        $.getJSON(proxyurl+urls, function(result){
            var yahoo_data = result;
            let length_tm = yahoo_data.chart.result[0].timestamp.length;
            for(i=0; i<length_tm; i++) {
            var data_date = new Date(yahoo_data.chart.result[0].timestamp[i] * 1000);
            var data_price = yahoo_data.chart.result[0].indicators.adjclose[0].adjclose[i];
            as_data_date.push(
              data_date.getFullYear() + "-" + appendLeadingZeroes(data_date.getMonth()+1) + "-" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10)
            );
            as_data_price.push(
              data_price
            );
            }
            asset_portfolio_yahoo.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
            let al = asset_portfolio_yahoo.length;
            let portfolio =
            `<tr>
                <td class="text-center">Asset `+al+`</td>
                <td class="text-center">`+tickere+`</td>
                <td class="text-center">`+as_data_date[0]+`</td>
                <td class="text-center">`+as_data_date[as_data_date.length-1]+`</td>
            </tr>`;
            $("#table_assets > tbody").append(portfolio);
            });

        // Papa.parse("dataset/"+exchange_choose+"/startdate_1990_under/"+tickere+".csv", {
        //     download: true,
        //     header: false,
        //     complete: function(result) {
        //       console.log(result.data);
        //       for(i=1; i<result.data.length; i++) {
        //         var data_date = new Date(result.data[i][0]);
        //         var data_price = result.data[i][5];
        //         as_data_date.push(
        //           data_date.getFullYear() + "-" + appendLeadingZeroes(data_date.getMonth()+1) + "-" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10)
        //         );
        //         as_data_price.push(
        //           data_price
        //         );
        //         }
        //         asset_portfolio_yahoo.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
        //         console.log(asset_portfolio_yahoo);
        //         console.log(as_data_date);
        //         let al = asset_portfolio_yahoo.length;
        //         // let ad = as_data.length-1;
        //         let portfolio =
        //         `<tr>
        //             <td class="text-center">Asset `+al+`</td>
        //             <td class="text-center">`+tickere+`</td>
        //             <td class="text-center">`+as_data_date[0]+`</td>
        //             <td class="text-center">`+as_data_date[as_data_date.length-1]+`</td>
        //         </tr>`;
        //         $("#table_assets > tbody").append(portfolio);
        //     }
        // });
    }
    exchange_choose_current = "";
    startdate_choose_current = "";
    $("#tiingo_tickers_btn").html(`Tickers (<span class="quantity">0</span>)`);
    $("#Xchange_btn").html(`<span class="Xchange">Exchange</span>`);
    $("#startdt_btn").html(`<span class="startdt">Startdate</span>`);
    ticker_list = [];
    }

  function reset_portfolio() {
    asset_portfolio_yahoo = [];
    // port_data = [];
    $("#table_assets > tbody").empty();
    // $("#port_data_tbl>tbody").empty();
    // $("#pagination-demo").twbsPagination("destroy");
    // $("#period_data").val("");
    // $("#start_date").val("");
    // localStorage.removeItem("portData");
  }

 function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

function price_idx_list() {//cari solusi biar tdk double click, muncul berkali2 di console
  $("#price_idx").on('click', '.dropdown-item', function (event) {
    var container_price_idx = $(this).closest("#price_idx");
    price_idx = $(event.currentTarget)[0].innerHTML;
    container_price_idx.find('.price_idx_column').text( price_idx || '#');
    console.log(price_idx);
});
}

function add_data_files() {
  if(file.files.length==0) {
    alert("tidak ada file yg dipilih");
    return false;
  }
  if((file.files.length+asset_portfolio_files.length)>30) {
    alert("ticker yg anda pilih melebihi total ticker tersisa untuk portfolio")
    return false;
  }
  if(asset_portfolio_files.length>0) {
  for (i = 0; i<file.files.length; i++) {    //?????
      var tickere = file.files[i].split(', ')[0];
      for(x=0;x<asset_portfolio_files.length;x++) {
        let idx = asset_portfolio_files[x].ticker.indexOf(tickere);
        if (idx !== -1) {
          alert("ticker "+tickere+" sdh dipilih");
          return false;
        }
      }
    }
  }
  for (i = 0; i < file.files.length; i++) {
    let sFileName       = (file.files[i].name.split('\\').pop().split('/').pop().split('.'))[0];
    let sFileExtension  = file.files[i].name.split('.')[file.files[i].name.split('.').length - 1].toLowerCase();
    let sFileSize       = file.files[i].size / 1024 / 1024; // in MB
    if (!(sFileExtension === "csv" )) { /// 10 mb
        alert(`Format File ${file.files[i].name} Bukan CSV`);
        return false;
    }
    else if (sFileSize > 1) { /// 10 mb
        alert(`File Size ${file.files[i].name} Lebih dr 1 MB`);
        return false;
    } else {
      let as_data_date = new Array();
      let as_data_price = new Array();
        Papa.parse(file.files[i], {
            download: true,
            header: false,
            complete: function(result) {
              for(i=1; i<result.data.length; i++) {
                let data_date = new Date(result.data[i][0]);
                let data_price = result.data[i][5];
                as_data_date.push(
                    data_date.getFullYear() + "-" + appendLeadingZeroes(data_date.getMonth()+1) + "-" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10)
                );
                as_data_price.push(
                  data_price
                );
                }
                asset_portfolio_files.push({ticker: sFileName, data: {date: as_data_date, price: as_data_price}});
                console.log(asset_portfolio_files);
                console.log(as_data_date);
                let al = asset_portfolio_files.length;
                // let ad = as_data.length-1;
                let portfolio =
                `<tr>
                    <td class="text-center">Asset `+al+`</td>
                    <td class="text-center">`+sFileName+`</td>
                    <td class="text-center">`+as_data_date[0]+`</td>
                    <td class="text-center">`+as_data_date[as_data_date.length-1]+`</td>
                </tr>`;
                $("#table_assets2 > tbody").append(portfolio);
            }
        });
  }
}
$("#file").val(``);
}

//tombol proses data utk data from yahoo and files
var port_data = new Array();
 function process_data_yahoo() {
      if(asset_portfolio_yahoo.length < 30) {
          alert('total asset kurang dari 30');
          return false;
      } else {
        port_data = [];
        $("#port_data_tbl>tbody").empty();
        $("#pagination-demo").twbsPagination("destroy");
        $("#period_data").val("");
        $("#period_data_dashboard").val("No Data Available");
          var startdates= new Array();
          var enddates= new Array();
          for (i=0; i<asset_portfolio_yahoo.length; i++) {
              startdates.push(new Date(asset_portfolio_yahoo[i].data.date[0]));
              enddates.push(new Date(asset_portfolio_yahoo[i].data.date[asset_portfolio_yahoo[i].data.date.length-1]));
          }
          var startDate=new Date(Math.max.apply(null,startdates));
          var endDate=new Date(Math.min.apply(null,enddates));
          console.log(startDate);
          console.log(endDate);

          var dt = startDate;
          var dtt_arr = new Array();
          var dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
          dt.toString().slice(0, 10);
          dtt_arr.push(dtt);
          while (dt < endDate) {
              if (dt.getDay()==5) {
                  dt = new Date(dt.setDate(dt.getDate() + 3));
                  dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
                  dt.toString().slice(0, 10);
                  dtt_arr.push(dtt);
              } else {
                  dt = new Date(dt.setDate(dt.getDate() + 1));
                  dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
                  dt.toString().slice(0, 10);
                  dtt_arr.push(dtt);
              }
          }
          port_data.push(dtt_arr);

          for (y=0; y<asset_portfolio_yahoo.length; y++) {
              var as_arr = new Array();
              for (i=0; i<dtt_arr.length; i++) {
                  // var tgl = new Date(dtt_arr[i]);
                  // tgl = tgl.getFullYear() + "-" + appendLeadingZeroes(tgl.getMonth()+1) + "-" + appendLeadingZeroes(tgl.getDate());
                  // tgl.toString().slice(0, 10);
                  var idx = asset_portfolio_yahoo[y].data.date.indexOf(dtt_arr[i])
                  if(idx == -1) {//jika idx tidak ditemukan
                      as_arr.push(as_arr[as_arr.length-1]); //masukkan harga sebelumnya
                  } else {
                      as_arr.push(asset_portfolio_yahoo[y].data.price[idx]); //jika idx ketemu masukkan harga berdasarkan idx
                  }
              }
              port_data.push(as_arr);
          }
      }

      $("#period_data").val(dtt_arr[0]+' - '+dtt_arr[dtt_arr.length-1]);
      $("#period_data_dashboard").val(dtt_arr[0]+' - '+dtt_arr[dtt_arr.length-1]);
      console.log(port_data);

      $("#pagination-demo").twbsPagination({
        totalPages: Math.ceil(port_data[0].length/24),
        visiblePages: 4,
        onPageClick: function (event, page) {
          $("#port_data_tbl>tbody").empty();
            for (i=(page*24)-24; i<(page*24) && i<(port_data[0].length); i++) {
              var port_data_row =
              `<tr>
                  <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+port_data[0][i]+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[1][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[2][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[3][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[4][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[5][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[6][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[7][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[8][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[9][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[10][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[11][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[12][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[13][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[14][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[15][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[16][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[17][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[18][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[19][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[20][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[21][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[22][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[23][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[24][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[25][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[26][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[27][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[28][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[29][i]).toFixed(2))+`</td>
                  <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[30][i]).toFixed(2))+`</td>
              </tr>`;
              $("#port_data_tbl>tbody").append(port_data_row);
              }
        }
        });
 }

 function process_data_files() {
  if(asset_portfolio_files.length < 30) {
      alert('total asset kurang dari 30');
      return false;
  } else {
    port_data = [];
    $("#port_data_tbl>tbody").empty();
    $("#pagination-demo").twbsPagination("destroy");
    $("#period_data").val("");
    $("#period_data_dashboard").val("No Data Available");
      var startdates= new Array();
      var enddates= new Array();
      for (i=0; i<asset_portfolio_files.length; i++) {
          startdates.push(new Date(asset_portfolio_files[i].data.date[0]));
          enddates.push(new Date(asset_portfolio_files[i].data.date[asset_portfolio_files[i].data.date.length-1]));
      }
      var startDate=new Date(Math.max.apply(null,startdates));
      var endDate=new Date(Math.min.apply(null,enddates));
      console.log(startDate);
      console.log(endDate);

      var dt = startDate;
      var dtt_arr = new Array();
      var dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
      dt.toString().slice(0, 10);
      dtt_arr.push(dtt);
      while (dt < endDate) {
          if (dt.getDay()==5) {
              dt = new Date(dt.setDate(dt.getDate() + 3));
              dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
              dt.toString().slice(0, 10);
              dtt_arr.push(dtt);
          } else {
              dt = new Date(dt.setDate(dt.getDate() + 1));
              dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
              dt.toString().slice(0, 10);
              dtt_arr.push(dtt);
          }
      }
      port_data.push(dtt_arr);
      for (y=0; y<asset_portfolio_files.length; y++) {
          var as_arr = new Array();
          for (i=0; i<dtt_arr.length; i++) {
              // var tgl = new Date(dtt_arr[i]);
              // var tgl = (new Date(dtt_arr[i]).getFullYear() + "-" + appendLeadingZeroes(new Date(dtt_arr[i]).getMonth()+1) + "-" + appendLeadingZeroes(new Date(dtt_arr[i]).getDate())).toString().slice(0, 10);
              // tgl.toString().slice(0, 10);
              var idx = asset_portfolio_files[y].data.date.indexOf(dtt_arr[i]);
              if(idx == -1) {//jika idx tidak ditemukan
                  as_arr.push(as_arr[as_arr.length-1]); //masukkan harga sebelumnya
              } else {
                  as_arr.push(asset_portfolio_files[y].data.price[idx]); //jika idx ketemu masukkan harga berdasarkan idx
              }
          }
          port_data.push(as_arr);
      }
  }

  $("#period_data").val(dtt_arr[0]+' - '+dtt_arr[dtt_arr.length-1]);
  $("#period_data_dashboard").val(dtt_arr[0]+' - '+dtt_arr[dtt_arr.length-1]);

  $("#pagination-demo").twbsPagination({
    totalPages: Math.ceil(port_data[0].length/24),
    visiblePages: 4,
    onPageClick: function (event, page) {
      $("#port_data_tbl>tbody").empty();
        for (i=(page*24)-24; i<(page*24) && i<(port_data[0].length); i++) {
          var port_data_row =
          `<tr>
              <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+port_data[0][i]+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[1][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[2][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[3][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[4][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[5][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[6][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[7][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[8][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[9][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[10][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[11][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[12][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[13][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[14][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[15][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[16][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[17][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[18][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[19][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[20][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[21][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[22][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[23][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[24][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[25][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[26][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[27][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[28][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[29][i]).toFixed(2))+`</td>
              <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[30][i]).toFixed(2))+`</td>
          </tr>`;
          $("#port_data_tbl>tbody").append(port_data_row);
          }
    }
    });
}

//montecarlo simulation proses
function process_montercarlo_simulation() {
  port_data = [];
  $("#port_data_tbl>tbody").empty();
  $("#pagination-demo").twbsPagination("destroy");
  $("#period_data").val("");
  $("#period_data_dashboard").val("No Data Available");
var initial_price = $("#initial_price").val();
var drift = $("#drift").val();
var volatility = $("#volatility").val();
var year_days = $("#year_days").val();
var steps = $("#steps").val();
var startdate_simulation = new Date($("#startdate_simulation").val());
var dt = startdate_simulation;
var dt_arr = new Array();
for (i=0;i<90;i++) {
if (dt.getDay()==5) {
  let dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
  dt_arr.push(dtt);
  dt = new Date(dt.setDate(dt.getDate() + 3));
} else {          
    let dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
    dt_arr.push(dtt);
    dt = new Date(dt.setDate(dt.getDate() + 1));
}
}
port_data.push(dt_arr);

for (i=0;i<30;i++) {
var price_sim_array = new Array ();
var price_sim = parseFloat(initial_price);
for (x=0;x<90;x++) {
  price_sim_array.push(price_sim)
  price_sim = price_sim+((price_sim*(drift*steps))+((volatility*((Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()-6)*Math.sqrt(steps)))*price_sim));
}
port_data.push(price_sim_array);
}

$("#period_data").val(dt_arr[0]+' - '+dt_arr[dt_arr.length-1]);
$("#period_data_dashboard").val(dt_arr[0]+' - '+dt_arr[dt_arr.length-1]);
// $("#start_date").val(dt_arr[0]);
console.log(port_data);

$("#pagination-demo").twbsPagination({
totalPages: Math.ceil(port_data[0].length/24),
visiblePages: 4,
onPageClick: function (event, page) {
  $("#port_data_tbl>tbody").empty();
    for (i=(page*24)-24; i<(page*24) && i<(port_data[0].length); i++) {
      var port_data_row =
      `<tr>
          <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+port_data[0][i]+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[1][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[2][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[3][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[4][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[5][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[6][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[7][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[8][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[9][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[10][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[11][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[12][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[13][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[14][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[15][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[16][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[17][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[18][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[19][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[20][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[21][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[22][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[23][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[24][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[25][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[26][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[27][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[28][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[29][i]).toFixed(2))+`</td>
          <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[30][i]).toFixed(2))+`</td>
      </tr>`;
      $("#port_data_tbl>tbody").append(port_data_row);
      }
}
});

chartColors = {
red: 'rgb(255, 99, 132)',
orange: 'rgb(255, 159, 64)',
yellow: 'rgb(255, 205, 86)',
green: 'rgb(75, 192, 192)',
blue: 'rgb(54, 162, 235)',
purple: 'rgb(153, 102, 255)',
grey: 'rgb(201, 203, 207)' };

data_chart = port_data;
dataChart1 = new Array();
dataChart2 = new Array();
dataChart3 = new Array();
dataChart4 = new Array();
dataChart5 = new Array();
dataChart6 = new Array();
dataChart7 = new Array();
dataChart8 = new Array();
dataChart9 = new Array();
dataChart10 = new Array();
dataChart11 = new Array();
dataChart12 = new Array();
dataChart13 = new Array();
dataChart14 = new Array();
dataChart15 = new Array();
dataChart16 = new Array();
dataChart17 = new Array();
dataChart18 = new Array();
dataChart19 = new Array();
dataChart20 = new Array();
dataChart21 = new Array();
dataChart22 = new Array();
dataChart23 = new Array();
dataChart24 = new Array();
dataChart25 = new Array();
dataChart26 = new Array();
dataChart27 = new Array();
dataChart28 = new Array();
dataChart29 = new Array();
dataChart30 = new Array();
dataLabel = new Array();

for (i=0; i<7830; i++) {
dataLabel.push(data_chart[0][i]);
dataChart1.push(data_chart[1][i]);
dataChart2.push(data_chart[2][i]);
dataChart3.push(data_chart[3][i]);
dataChart4.push(data_chart[4][i]);
dataChart5.push(data_chart[5][i]);
dataChart6.push(data_chart[6][i]);
dataChart7.push(data_chart[7][i]);
dataChart8.push(data_chart[8][i]);
dataChart9.push(data_chart[9][i]);
dataChart10.push(data_chart[10][i]);
dataChart11.push(data_chart[11][i]);
dataChart12.push(data_chart[12][i]);
dataChart13.push(data_chart[13][i]);
dataChart14.push(data_chart[14][i]);
dataChart15.push(data_chart[15][i]);
dataChart16.push(data_chart[16][i]);
dataChart17.push(data_chart[17][i]);
dataChart18.push(data_chart[18][i]);
dataChart19.push(data_chart[19][i]);
dataChart20.push(data_chart[20][i]);
dataChart21.push(data_chart[21][i]);
dataChart22.push(data_chart[22][i]);
dataChart23.push(data_chart[23][i]);
dataChart24.push(data_chart[24][i]);
dataChart25.push(data_chart[25][i]);
dataChart26.push(data_chart[26][i]);
dataChart27.push(data_chart[27][i]);
dataChart28.push(data_chart[28][i]);
dataChart29.push(data_chart[29][i]);
dataChart30.push(data_chart[30][i]);
}

var config = {
  type: 'line',
  data: {
    labels: dataLabel,
    datasets: [{
      label: 'Asset1',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.red,
      borderColor: chartColors.red,
      data: dataChart1,
      fill: false },
    {
      label: 'Asset2',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart2,
      fill: false},
    {
      label: 'Asset3',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart3,
      fill: false},
    {
      label: 'Asset4',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart4,
      fill: false},
    {
      label: 'Asset5',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart5,
      fill: false},
    {
      label: 'Asset6',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart6,
      fill: false},
    {
      label: 'Asset7',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart7,
      fill: false},
    {
      label: 'Asset8',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart8,
      fill: false},
    {
      label: 'Asset9',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart9,
      fill: false},
    {
      label: 'Asset10',
      pointRadius: 0,
      borderWidth: 1,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: dataChart10,
      fill: false}
    ]},
  options: {

    responsive: true,
    legend: {
        display: false
    },
    title: {
      display: true,
      text: 'Montecarlo Simulation Stocks Chart' },

    hover: {
      mode: 'nearest',
      intersect: true },
      // events:[],
    scales: {
      xAxes: [{
        display: false,
        scaleLabel: {
          display: false,
          labelString: 'Years' } }],


    yAxes: [{
      display: false,
      scaleLabel: {
        display: false,
        labelString: 'Equity' } }] } } };

    if(mychart!=null){
        mychart.destroy();
    }
      var ctx = document.getElementById('overtimechart').getContext('2d');
      mychart = new Chart(ctx, config);
}
  
  //run Test
  async function run_test() {

    var data_id;
    var date;   
  
    var asset_position_size_pretrade = [];
    var asset_market_value_pretrade = [];
    var asset_trade_position = [];
    var asset_trade_size = [];
    var asset_trade_value = [];
    var asset_trade_margin_req = [];
    var asset_trade_margin_loan = [];
    var asset_trade_cost = [];
    var asset_position_size_posttrade = [];
    var asset_market_value_posttrade = [];
    
    var cash_pretrade = initialequity;
    var market_value_pretrade;
    var margin_loan_balance_pretrade;
    var equity_pretrade;
    var maintenance_margin;
    var regT_margin_req;
    var margin_available;
    var buy_trade_value;
    var buy_margin_req = 0;
    var buy_margin_loan = 0;
    var buy_trade_cost = 0;
    var sell_trade_value;
    var sell_margin_req = 0;
    var sell_margin_loan = 0;
    var sell_trade_cost = 0;
    var cash_posttrade;
    var market_value_posttrade;
    var margin_loan_balance_posttrade;
    var equity_posttrade;

    var daily_interest = 0; 

    var signal_response = new Array ();

    //array
    var assets_trade_details = new Array();
    var data_length;
    var signal_response;

    data_id = 1;
    //test setting
    var initialequity = $("#initial_equity").val();
    var bidaskspread = $("#bid_ask_spread").val();
    var commisionshare = $("#commision_share").val();
    var interestrate = $("#interest_rate").val();
    var riskfreerate = $("#risk_free_rate").val();
    var regTmargin = $("#regT_margin").val();
    var maintmargin = $("#maint_margin").val();
    var mindata = $("#min_data").val();
    var maxdata = $("#max_data").val();
    var portfoliosize = $("#portfolio_size").val();
    
    //cek test data
    if (port_data.length == 0) {
      alert(`tidak ada data untuk test`);
      return false;
    }
    data_length = port_data[0].length;
    if (data_length < 30) {
      alert(`data test anda kurang dari 2610 data baris`);
      return false;
    }    

    //reset your previous portfolio data in quantxi
    await $.ajax({
      type: "POST",
      url: "http://localhost/rasio_server/api/reset.php",
      headers:{
        "Content-Type": "application/json",
        "X-API-KEY": sessionStorage.getItem("api")
      },
      dataType: 'json',
      success: function(result){
        console.log(result);
        //disable button
        $('#setting_button').attr('disabled',true);
        $('#data_button').attr('disabled',true);
        $('#start_date').attr('disabled',true);
        $('#change_period_btn').attr('disabled',true);
        $('#play_button').attr('disabled',true);
        // $('#refresh_button').attr('disabled',false);
        $('#viewpost_button').attr('disabled',true);
        $('#trade_report_button').attr('disabled',true);
        $('#chart_button').attr('disabled',true);
        $('#statistik_button').attr('disabled',true);
      },
      error: function() {      
        alert(`koneksi ke server gagal, coba beberapa saat lagi`);
        return false;
      }
    })

    //proses data
    async function proses() {
      if (data_id < (data_length+1)) {
        var asset_price = new Array();
        //PRE TRADE 
        date = port_data[0][data_id-1];  
        // console.log(date);  
        
        for (i=1;i<31;i++) {     
          asset_price[i] = port_data[i][data_id-1];
          asset_position_size_pretrade[i] = asset_position_size_posttrade[i];
          asset_market_value_pretrade[i] =  asset_position_size_pretrade[i] * asset_price[i];      
        }
        cash_pretrade = cash_posttrade - daily_interest;
        for (i=1;i<31;i++) {     
          market_value_pretrade += asset_market_value_pretrade[i]; //cek lagi rumus ini ?????
        }
        margin_loan_balance_pretrade = margin_loan_balance_posttrade; 
        equity_pretrade = cash_pretrade + market_value_pretrade - margin_loan_balance_pretrade;
        maintenance_margin = market_value_pretrade * maintmargin;
        regT_margin_req = market_value_pretrade * regTmargin;
        margin_available = equity_pretrade - regT_margin_req;
    
        //POST REST API, pikirkan code yg bila ini gagal balik lagi ke task ini
      
        await $.ajax({
          type: "POST",
          url: "http://localhost/rasio_server/api/post.php",
          headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "X-API-KEY": sessionStorage.getItem("api")
          },
          data:{
            data_id: data_id,
            margin_available: margin_available,
            asset1_price: asset_price[1],
            asset2_price: asset_price[2],
            asset3_price: asset_price[3],
            asset4_price: asset_price[4],
            asset5_price: asset_price[5],
            asset6_price: asset_price[6],
            asset7_price: asset_price[7],
            asset8_price: asset_price[8],
            asset9_price: asset_price[9],
            asset10_price: asset_price[10],
            asset11_price: asset_price[11],
            asset12_price: asset_price[12],
            asset13_price: asset_price[13],
            asset14_price: asset_price[14],
            asset15_price: asset_price[15],
            asset16_price: asset_price[16],
            asset17_price: asset_price[17],
            asset18_price: asset_price[18],
            asset19_price: asset_price[19],
            asset20_price: asset_price[20],
            asset21_price: asset_price[21],
            asset22_price: asset_price[22],
            asset23_price: asset_price[23],
            asset24_price: asset_price[24],
            asset25_price: asset_price[25],
            asset26_price: asset_price[26],
            asset27_price: asset_price[27],
            asset28_price: asset_price[28],
            asset29_price: asset_price[29],
            asset30_price: asset_price[30]
          },
          dataType: 'json',
          success: function(result){
            
            console.log(result);
    
          if (result.status == "success") {
           
            signal_response = new Array ();
            signal_response.push(result.data);

            // console.log(result.data);
            
            var req_element =
            '<pre style="font-size: 13px; color: #c1c2c6; overflow:hidden">'
            + JSON.stringify(result, null, 4) +
            '</pre>';
            $("#request_area").html(req_element);
            var resp_element =
            '<pre style="font-size: 13px; color: #c1c2c6; overflow:hidden">'
            + JSON.stringify(result, null, 4) +
            '</pre>';
            $("#response_area").html(resp_element);

          } 
          // else {
          //   alert("error post");
          //   return false;
          //   //kembali ke post rest api, coba lagi
          // }
          // },
          // error: function() {
          //   alert("error post");
          //   return false;
            // var req_element = '<div style="margin: auto; width: 50%; color: #c1c2c6; text-align: center"> <h5 style="margin-top: 120px">koneksi lambat, mohon tunggu atau klik "reload this page" pada browser anda utk mengulang dr awal.....</h5> <img src="img/spinner.gif" width="200" height="200" style="margin-top: -30px"></div>';
    
            // $("#request_area").html(req_element);
            // $("#response_area").html(req_element);
    
        }
      })
    
      if(signal_response.length > 0) {   
        //TRADE   
        console.log("trade"); 
        for (i=1, x=2;i<31, x<32;i++, x++) {      
          if(signal_response[x]>0) {
            asset_trade_position[i] = "BUY";
            asset_trade_size[i] = signal_response[x];
            asset_trade_value[i] = asset_trade_size[i] * asset_price[i];        
            asset_trade_margin_req[i] = asset_trade_value * regTmargin;
            asset_trade_margin_loan[i] = asset_trade_value - asset_trade_margin_req[i];
            asset_trade_cost[i] = (asset_trade_value * bidaskspread) + (asset_trade_value * commisionshare);
          } else if(signal_response[x]<0) {
            asset_trade_position[i] = "SELL";
            asset_trade_size[i] = signal_response[x];
            asset_trade_value[i] = asset_trade_size[i] * asset_price[i];        
            asset_trade_margin_loan[i] = asset_trade_value - asset_trade_margin_req[i]; // cek lagi, coding marginloan saat kondisi jual
            asset_trade_margin_req[i] = asset_trade_value * regTmargin;
            asset_trade_cost[i] = (asset_trade_value * bidaskspread) + (asset_trade_value * commisionshare);
          } else {
            asset_trade_position[i] = "HOLD";
          }
        }
    
        for (i=1; i<31; i++) {
          if(asset_trade_position[i] == "BUY") {
            buy_trade_value += asset_trade_value[i]; 
            buy_margin_req += asset_trade_margin_req[i];
            buy_margin_loan += asset_trade_margin_loan[i];
            buy_trade_cost += asset_trade_cost[i];     
          } else if(asset_trade_position[i] == "SELL") {
            sell_trade_value += asset_trade_value[i];
            sell_margin_req += asset_trade_margin_req[i];
            sell_margin_loan += asset_trade_margin_loan[i];
            sell_trade_cost += asset_trade_cost[i];  
          }
        }
    
        //POST TRADE
        console.log("post trade"); 
        for(i=1;i<31;i++) {
          asset_position_size_posttrade[i] = asset_position_size_pretrade[i] + asset_trade_size[i];
          asset_market_value_posttrade[i] = asset_position_size_posttrade[i] * asset_price[i];
        }
    
        cash_posttrade = cash_pretrade - buy_margin_req - buy_trade_cost + sell_margin_req - sell_trade_cost;
        for(i=1;i<31;i++) {
          market_value_posttrade += asset_market_value_posttrade[i]; //cek lagi rumus ini ?????
        }
        margin_loan_balance_posttrade = margin_loan_balance_pretrade + buy_margin_loan - sell_margin_loan;
        equity_posttrade = cash_posttrade + market_value_posttrade - margin_loan_balance_posttrade;
    
        daily_interest = margin_loan_balance_posttrade * (1/365); //cek lagi rumus ini ?????
        
        //ADD DATA ID
        data_id++; // lanjut id berikutnya, cek lagi posisi tambah id ini ?
       
      }     
    
      } else {
        $('#setting_button').attr('disabled',false);
        $('#data_button').attr('disabled',false);
        $('#refresh_button').attr('disabled',false);
        $('#statistik_button').attr('disabled',false);
        $('#logout_button').attr('disabled',false);
        $('#viewpost_button').attr('disabled',false);
        $('#chart_button').attr('disabled',false);
        $('#portfolio_summary_button').attr('disabled',false);
        $('#assets_details_button').attr('disabled',false);
    
        clearTimeout();
    
        alert(`data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
        return false;
      }
      setTimeout(proses, 1/1000);
    }

    proses(); 
    
  }

//Function Reset Test
function reset_test() {
  $('#setting_button').attr('disabled',false);
  $('#data_button').attr('disabled',false);
  $('#start_date').attr('disabled',false);
  $('#change_period_btn').attr('disabled',false);
  $('#play_button').attr('disabled',false);
  $('#refresh_button').attr('disabled',true);
  $('#viewpost_button').attr('disabled',false);
  $('#trade_report_button').attr('disabled',false);
  $('#chart_button').attr('disabled',false);
  $('#statistik_button').attr('disabled',false);
  // $('#total_post').html(0);
  // $('#totalbrtr').html(0);
  // $('#totalbrtr2').html(0);
  // $('#totalbrtr3').html(0);
  // $('#massa').html(0);
  // $("#request_area").html("");
  // $("#response_area").html("");
}

//Function View Full Post Request Response

//Function Trade Report

//Function Performance Chart

//Function Test History

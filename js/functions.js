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
    var tickers = new Array();
    $.ajax({
        url: "mysys/tree/main/dataset/NASDAQ/startdate_1990_under/",
        success: function(data) {
            doc = new DOMParser().parseFromString(data, 'text/html');
            rows = doc.querySelector('table').querySelectorAll('tr');
            for (var i=3;i<rows.length;i++) {
                if (rows[i].children[1]) {
                    if (parseInt(rows[i].children[1].innerText)>0);
                    tickers.push(rows[i].children[1].innerText.split('.')[0]);
                }
            }
            console.log(tickers.length);
             //Create checkbox dynamically

            for (i=0;i<tickers.length;i++) {
                //Create a new <li> dynamically
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
            var ul = document.getElementById("ulul");
            ul.appendChild(newLi);
            }

        }
    });
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
        Papa.parse("dataset/"+exchange_choose+"/startdate_1990_under/"+tickere+".csv", {
            download: true,
            header: false,
            complete: function(result) {
              console.log(result.data);
              for(i=1; i<result.data.length; i++) {
                var data_date = new Date(result.data[i][0]);
                var data_price = result.data[i][5];
                as_data_date.push(
                  data_date.getFullYear() + "-" + appendLeadingZeroes(data_date.getMonth()+1) + "-" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10)
                );
                as_data_price.push(
                  data_price
                );
                }
                asset_portfolio_yahoo.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
                console.log(asset_portfolio_yahoo);
                console.log(as_data_date);
                let al = asset_portfolio_yahoo.length;
                // let ad = as_data.length-1;
                let portfolio =
                `<tr>
                    <td class="text-center">Asset `+al+`</td>
                    <td class="text-center">`+tickere+`</td>
                    <td class="text-center">`+as_data_date[0]+`</td>
                    <td class="text-center">`+as_data_date[as_data_date.length-1]+`</td>
                </tr>`;
                $("#table_assets > tbody").append(portfolio);
            }
        });
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
 function process_data_yahoo() {
      if(asset_portfolio_yahoo.length < 30) {
          alert('total asset kurang dari 30');
          return false;
      } else {
        var port_data = new Array();
        $("#port_data_tbl>tbody").empty();
        $("#pagination-demo").twbsPagination("destroy");
        $("#period_data").val("");
        $("#start_date").val("");
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
                  var tgl = new Date(dtt_arr[i]);
                  tgl = tgl.getFullYear() + "-" + appendLeadingZeroes(tgl.getMonth()+1) + "-" + appendLeadingZeroes(tgl.getDate());
                  tgl.toString().slice(0, 10);
                  var idx = asset_portfolio_yahoo[y].data.date.indexOf(tgl)
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
      $("#start_date").val(dtt_arr[0]);
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

       localStorage.setItem("portData", JSON.stringify(port_data));
 }

 function process_data_files() {
  if(asset_portfolio_files.length < 30) {
      alert('total asset kurang dari 30');
      return false;
  } else {
    var port_data = new Array();
    $("#port_data_tbl>tbody").empty();
    $("#pagination-demo").twbsPagination("destroy");
    $("#period_data").val("");
    $("#start_date").val("");
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
              var tgl = new Date(dtt_arr[i]);
              tgl = tgl.getFullYear() + "-" + appendLeadingZeroes(tgl.getMonth()+1) + "-" + appendLeadingZeroes(tgl.getDate());
              tgl.toString().slice(0, 10);
              var idx = asset_portfolio_files[y].data.date.indexOf(tgl)
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
  $("#start_date").val(dtt_arr[0]);
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

   localStorage.setItem("portData", JSON.stringify(port_data));
}

//montecarlo simulation proses
function process_montercarlo_simulation() {
        var port_data = new Array();
        $("#port_data_tbl>tbody").empty();
        $("#pagination-demo").twbsPagination("destroy");
        $("#period_data").val("");
        $("#start_date").val("");
    var initial_price = $("#initial_price").val();
    var drift = $("#drift").val();
    var volatility = $("#volatility").val();
    var year_days = $("#year_days").val();
    var steps = $("#steps").val();
    var startdate_simulation = new Date($("#startdate_simulation").val());
    var dt = startdate_simulation;
    var dt_arr = new Array();
    for (i=0;i<7830;i++) {
      if (dt.getDay()==5) {
        dt = new Date(dt.setDate(dt.getDate() + 3));
        let dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
        // dt.toString().slice(0, 10);
        dt_arr.push(dtt);
      } else {
          dt = new Date(dt.setDate(dt.getDate() + 1));
          let dtt = dt.getFullYear() + "-" + appendLeadingZeroes(dt.getMonth()+1) + "-" + appendLeadingZeroes(dt.getDate());
          // dt.toString().slice(0, 10);
          dt_arr.push(dtt);
      }
    }
    port_data.push(dt_arr);

    for (i=0;i<30;i++) {
      var price_sim_array = new Array ();
      var price_sim = parseFloat(initial_price);
      for (x=0;x<7830;x++) {
        price_sim_array.push(price_sim)
        price_sim = price_sim+((price_sim*(drift*steps))+((volatility*((Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()-6)*Math.sqrt(steps)))*price_sim));
      }
      port_data.push(price_sim_array);
    }

    $("#period_data").val(dt_arr[0]+' - '+dt_arr[dt_arr.length-1]);
    $("#start_date").val(dt_arr[0]);
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

     localStorage.setItem("portData", JSON.stringify(port_data));

      chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)' };

    data_chart = JSON.parse(localStorage.portData);
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

//Function Run Test
function run_test() {
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
    endpoint_post = 'http://localhost/rasio_server/api/post.php'//https://quantxi.com/api.php
    endpoint_reset = 'http://localhost/rasio_server/api/reset.php'//https://quantxi.com/api.php
    api_key = sessionStorage.getItem("api");

    if(localStorage.portData == undefined) {
      alert(`tidak ada data untuk test`);
      return false;
    }
    data_test = JSON.parse(localStorage.portData);
    data_test.shift();

    data_length = data_test[0].length;
    start_date = $("#start_date").val();//ambil angka di inputan start date di dashboard

    //data awal
    // data_id = 1;
    // data_id_out = 1;

    // for(i=1;i<31;i++) {
    //     berat_previous_anak[i] = 0;
    // }

    // for(i=1;i<31;i++) {
    //     total_rasio_anak[i] = 0;
    // }

    // total_porsi2 = 0;

    // hasil_kelompok = new Array();

    // rasio_anak_kelompok = new Array();

    // for(i=1;i<31;i++) {
    //     rasio_details_anak[i] = new Array();
    // }

    // perbandingan_rasio = new Array();

    if (data_length < 2610) {
      alert(`data test anda kurang dari 2610 data baris`);
      return false;
    } else if (start_date == "") {
        alert(`startdate belum diisi`);
        return false;
    } else {
      $('#setting_button').attr('disabled',true);
      $('#data_button').attr('disabled',true);
      $('#start_date').attr('disabled',true);
      $('#change_period_btn').attr('disabled',true);
      $('#play_button').attr('disabled',true);
      $('#viewpost_button').attr('disabled',true);
      $('#trade_report_button').attr('disabled',true);
      $('#chart_button').attr('disabled',true);
      $('#statistik_button').attr('disabled',true);

      $.ajax({
        type: "POST",
        url: endpoint_reset,
        headers:{
          "Content-Type": "application/json",
          "X-API-KEY": api_key
        },
        dataType: 'json',
        success: function(result){
          console.log(result);
          if (result.status == "success") {

            proses();

          } else {
            $('#setting_button').attr('disabled',false);
            $('#data_button').attr('disabled',false);
            $('#start_date').attr('disabled',false);
            $('#change_period_btn').attr('disabled',false);
            $('#play_button').attr('disabled',false);
            $('#viewpost_button').attr('disabled',false);
            $('#trade_report_button').attr('disabled',false);
            $('#chart_button').attr('disabled',false);
            $('#statistik_button').attr('disabled',false);

            alert(`ada kesalahan, coba periksa api key anda dan ulang lagi`);
            return false;
          }
        },
        error: function() {

          $('#setting_button').attr('disabled',false);
          $('#data_button').attr('disabled',false);
          $('#start_date').attr('disabled',false);
          $('#change_period_btn').attr('disabled',false);
          $('#play_button').attr('disabled',false);
          $('#viewpost_button').attr('disabled',false);
          $('#trade_report_button').attr('disabled',false);
          $('#chart_button').attr('disabled',false);
          $('#statistik_button').attr('disabled',false);

          alert(`koneksi ke server gagal, coba beberapa saat lagi`);
          return false;
        }
      })

    }
  }

function proses() {
  // console.log(to);
  to = setTimeout(proses, 1/10000);
  // var hasil ={};
  if (data_id < data_length) {

    data_rasio = new Array ();
    data_rasio_anak1 = new Array ();

    tanggal = data_anak[data_id-1][0];

    for(i=1,y=1;i<31,y<31;i++,y++) {
        berat_anak[i] = data_anak[data_id-1][y];
    }

    for(i=1;i<31;i++) {
        total_brtr_anak[i] = berat_anak[i] * total_rasio_anak[i];
    }

    total_brtr = total_brtr_anak1 + total_brtr_anak2 + total_brtr_anak3 + total_brtr_anak4 + total_brtr_anak5 + total_brtr_anak6 + total_brtr_anak7 + total_brtr_anak8 + total_brtr_anak9 + total_brtr_anak10 +  total_brtr_anak11 + total_brtr_anak12+ total_brtr_anak13 + total_brtr_anak14 + total_brtr_anak15 + total_brtr_anak16 + total_brtr_anak17 + total_brtr_anak18 + total_brtr_anak19 + total_brtr_anak20 + total_brtr_anak21 + total_brtr_anak22 + total_brtr_anak23 + total_brtr_anak24 + total_brtr_anak25 + total_brtr_anak26 + total_brtr_anak27 + total_brtr_anak28 + total_brtr_anak29 + total_brtr_anak30;

    selisih_harian = (total_rasio_anak1 * (berat_anak1-berat_anak1_previous))+(total_rasio_anak2 * (berat_anak2-berat_anak2_previous))+(total_rasio_anak3 * (berat_anak3-berat_anak3_previous))+(total_rasio_anak4 * (berat_anak4-berat_anak4_previous))+(total_rasio_anak5 * (berat_anak5-berat_anak5_previous))+(total_rasio_anak6 * (berat_anak6-berat_anak6_previous))+(total_rasio_anak7 * (berat_anak7-berat_anak7_previous))+(total_rasio_anak8 * (berat_anak8-berat_anak8_previous))+(total_rasio_anak9 * (berat_anak9-berat_anak9_previous))+(total_rasio_anak10 * (berat_anak10-berat_anak10_previous))+(total_rasio_anak11 * (berat_anak11-berat_anak11_previous))+(total_rasio_anak12 * (berat_anak12-berat_anak12_previous))+(total_rasio_anak13 * (berat_anak13-berat_anak13_previous))+(total_rasio_anak14 * (berat_anak14-berat_anak14_previous))+(total_rasio_anak15 * (berat_anak15-berat_anak15_previous))+(total_rasio_anak16 * (berat_anak16-berat_anak16_previous))+(total_rasio_anak17 * (berat_anak17-berat_anak17_previous))+(total_rasio_anak18 * (berat_anak18-berat_anak18_previous))+(total_rasio_anak19 * (berat_anak19-berat_anak19_previous))+(total_rasio_anak20 * (berat_anak20-berat_anak20_previous))+(total_rasio_anak21 * (berat_anak21-berat_anak21_previous))+(total_rasio_anak22 * (berat_anak22-berat_anak22_previous))+(total_rasio_anak23 * (berat_anak23-berat_anak23_previous))+(total_rasio_anak24 * (berat_anak24-berat_anak24_previous))+(total_rasio_anak25 * (berat_anak25-berat_anak25_previous))+(total_rasio_anak26 * (berat_anak26-berat_anak26_previous))+(total_rasio_anak27 * (berat_anak27-berat_anak27_previous))+(total_rasio_anak28 * (berat_anak28-berat_anak28_previous))+(total_rasio_anak29 * (berat_anak29-berat_anak29_previous))+(total_rasio_anak30 * (berat_anak30-berat_anak30_previous));

    index_harian = total_porsi2 * (indeX/360);

    massa = massa + selisih_harian - index_harian;

    massa_fix = total_brtr * massafix;

    index_massa = massa - massa_fix;

    $.ajax({
      type: "POST",
      url: endpoint,
      headers:{
        "Content-Type": "application/json",
        "X-API-KEY": api_key
      },
      data:{
        data_id: 100,
        margin_available: 100,
        asset1_price: 100,
        asset2_price: 100,
        asset3_price: 100,
        asset4_price: 100,
        asset5_price: 100,
        asset6_price: 100,
        asset7_price: 100,
        asset8_price: 100,
        asset9_price: 100,
        asset10_price: 100,
        asset11_price: 100,
        asset12_price: 100,
        asset13_price: 100,
        asset14_price: 100,
        asset15_price: 100,
        asset16_price: 100,
        asset17_price: 100,
        asset18_price: 100,
        asset19_price: 100,
        asset20_price: 100,
        asset21_price: 100,
        asset22_price: 100,
        asset23_price: 100,
        asset24_price: 100,
        asset25_price: 100,
        asset26_price: 100,
        asset27_price: 100,
        asset28_price: 100,
        asset29_price: 100,
        asset30_price: 100
      },
      dataType: 'json',
      success: function(result){

      if (result.data.data_id == data_id) {

        var hasil = new Array ();
        hasil.push(result.data);
        var req_element =
        '<pre style="font-size: 13px; color: #c1c2c6; overflow:hidden">'
        + JSON.stringify(hasil, null, 4) +
        '</pre>';
      $("#request_area").html(req_element);
        var resp_element =
        '<pre style="font-size: 13px; color: #c1c2c6; overflow:hidden">'
        + JSON.stringify(hasil, null, 4) +
        '</pre>';
      $("#response_area").html(resp_element);

      for(i=1;i<31;i++) {
        pola_anak[i] = "Tambah";
      }

      for(i=1;i<31;i++) {
        rasio_berat_tambah_anak[i] = 10;
      }

      for(i=1;i<31;i++) {
        rasio_berat_kurang_anak[i] = 10;
      }

      for(i=1;i<31;i++) {
        br_tambah_anak[i] = berat_anak[i] * rasio_berat_tambah_anak[i];
      }

      for(i=1;i<31;i++) {
        br_kurang_anak[i] = berat_anak[i] * rasio_berat_kurang_anak[i];
      }

      br_tambah = br_tambah_anak1 + br_tambah_anak2 + br_tambah_anak3 + br_tambah_anak4 + br_tambah_anak5 + br_tambah_anak6 + br_tambah_anak7 + br_tambah_anak8 + br_tambah_anak9 + br_tambah_anak10 + br_tambah_anak11 + br_tambah_anak12 + br_tambah_anak13 + br_tambah_anak14 + br_tambah_anak15 + br_tambah_anak16 + br_tambah_anak17 + br_tambah_anak18 + br_tambah_anak19 + br_tambah_anak20 +br_tambah_anak21 + br_tambah_anak22 + br_tambah_anak23 + br_tambah_anak24 + br_tambah_anak25 + br_tambah_anak26 + br_tambah_anak27 + br_tambah_anak28 + br_tambah_anak29 + br_tambah_anak30;

      br_kurang = br_kurang_anak1 + br_kurang_anak2 + br_kurang_anak3 + br_kurang_anak4 + br_kurang_anak5 + br_kurang_anak6 + br_kurang_anak7 + br_kurang_anak8 + br_kurang_anak9 + br_kurang_anak10 + br_kurang_anak11 + br_kurang_anak12 + br_kurang_anak13 + br_kurang_anak14 + br_kurang_anak15 + br_kurang_anak16 + br_kurang_anak17 + br_kurang_anak18 + br_kurang_anak19 + br_kurang_anak20 +br_kurang_anak21 + br_kurang_anak22 + br_kurang_anak23 + br_kurang_anak24 + br_kurang_anak25 + br_kurang_anak26 + br_kurang_anak27 + br_kurang_anak28 + br_kurang_anak29 + br_kurang_anak30;

      for(i=1;i<31;i++) {
        porsi1_tambah_anak[i] = br_tambah_anak[i] * massafix;
      }

      for(i=1;i<31;i++) {
        porsi1_kurang_anak[i] = br_kurang_anak[i] * massafix;
      }

      porsi1_tambah = porsi1_tambah_anak1 + porsi1_tambah_anak2 + porsi1_tambah_anak3 + porsi1_tambah_anak4 + porsi1_tambah_anak5 + porsi1_tambah_anak6 + porsi1_tambah_anak7 + porsi1_tambah_anak8 + porsi1_tambah_anak9 + porsi1_tambah_anak10 + porsi1_tambah_anak11 + porsi1_tambah_anak12 + porsi1_tambah_anak13 + porsi1_tambah_anak14 + porsi1_tambah_anak15 + porsi1_tambah_anak16 + porsi1_tambah_anak17 + porsi1_tambah_anak18 + porsi1_tambah_anak19 + porsi1_tambah_anak20 + porsi1_tambah_anak21 + porsi1_tambah_anak22 + porsi1_tambah_anak23 + porsi1_tambah_anak24 + porsi1_tambah_anak25 + porsi1_tambah_anak26 + porsi1_tambah_anak27 + porsi1_tambah_anak28 + porsi1_tambah_anak29 + porsi1_tambah_anak30;

      porsi1_kurang = porsi1_kurang_anak1 + porsi1_kurang_anak2 + porsi1_kurang_anak3 + porsi1_kurang_anak4 + porsi1_kurang_anak5 + porsi1_kurang_anak6 + porsi1_kurang_anak7 + porsi1_kurang_anak8 + porsi1_kurang_anak9 + porsi1_kurang_anak10 + porsi1_kurang_anak11 + porsi1_kurang_anak12 + porsi1_kurang_anak13 + porsi1_kurang_anak14 + porsi1_kurang_anak15 + porsi1_kurang_anak16 + porsi1_kurang_anak17 + porsi1_kurang_anak18 + porsi1_kurang_anak19 + porsi1_kurang_anak20 + porsi1_kurang_anak21 + porsi1_kurang_anak22 + porsi1_kurang_anak23 + porsi1_kurang_anak24 + porsi1_kurang_anak25 + porsi1_kurang_anak26 + porsi1_kurang_anak27 + porsi1_kurang_anak28 + porsi1_kurang_anak29 + porsi1_kurang_anak30;

      for(i=1;i<31;i++) {
        porsi2_tambah_anak[i] = br_tambah_anak[i] * massafix;
      }

      for(i=1;i<31;i++) {
        porsi2_kurang_anak[i] = br_kurang_anak[i] * massafix;
      }

      porsi2_tambah = porsi2_tambah_anak1 + porsi2_tambah_anak2 + porsi2_tambah_anak3 + porsi2_tambah_anak4 + porsi2_tambah_anak5 + porsi2_tambah_anak6 + porsi2_tambah_anak7 + porsi2_tambah_anak8 + porsi2_tambah_anak9 + porsi2_tambah_anak10 + porsi2_tambah_anak11 + porsi2_tambah_anak12 + porsi2_tambah_anak13 + porsi2_tambah_anak14 + porsi2_tambah_anak15 + porsi2_tambah_anak16 + porsi2_tambah_anak17 + porsi2_tambah_anak18 + porsi2_tambah_anak19 + porsi2_tambah_anak20 + porsi2_tambah_anak21 + porsi2_tambah_anak22 + porsi2_tambah_anak23 + porsi2_tambah_anak24 + porsi2_tambah_anak25 + porsi2_tambah_anak26 + porsi2_tambah_anak27 + porsi2_tambah_anak28 + porsi2_tambah_anak29 + porsi2_tambah_anak30;

      porsi2_kurang = porsi2_kurang_anak1 + porsi2_kurang_anak2 + porsi2_kurang_anak3 + porsi2_kurang_anak4 + porsi2_kurang_anak5 + porsi2_kurang_anak6 + porsi2_kurang_anak7 + porsi2_kurang_anak8 + porsi2_kurang_anak9 + porsi2_kurang_anak10 + porsi2_kurang_anak11 + porsi2_kurang_anak12 + porsi2_kurang_anak13 + porsi2_kurang_anak14 + porsi2_kurang_anak15 + porsi2_kurang_anak16 + porsi2_kurang_anak17 + porsi2_kurang_anak18 + porsi2_kurang_anak19 + porsi2_kurang_anak20 + porsi2_kurang_anak21 + porsi2_kurang_anak22 + porsi2_kurang_anak23 + porsi2_kurang_anak24 + porsi2_kurang_anak25 + porsi2_kurang_anak26 + porsi2_kurang_anak27 + porsi2_kurang_anak28 + porsi2_kurang_anak29 + porsi2_kurang_anak30;

      for(i=1;i<31;i++) {
        bobot_tambah_anak[i] = br_tambah_anak[i] * (bobot1 + bobot2);
      }

      for(i=1;i<31;i++) {
        bobot_kurang_anak[i] = br_kurang_anak1[i] * (bobot1 + bobot2);
      }

      bobot_tambah = bobot_tambah_anak1 + bobot_tambah_anak2 + bobot_tambah_anak3 + bobot_tambah_anak4 + bobot_tambah_anak5 + bobot_tambah_anak6 + bobot_tambah_anak7 + bobot_tambah_anak8 + bobot_tambah_anak9 + bobot_tambah_anak10 + bobot_tambah_anak11 + bobot_tambah_anak12 + bobot_tambah_anak13 + bobot_tambah_anak14 + bobot_tambah_anak15 + bobot_tambah_anak16 + bobot_tambah_anak17 + bobot_tambah_anak18 + bobot_tambah_anak19 + bobot_tambah_anak20 + bobot_tambah_anak21 + bobot_tambah_anak22 + bobot_tambah_anak23 + bobot_tambah_anak24 + bobot_tambah_anak25 + bobot_tambah_anak26 + bobot_tambah_anak27 + bobot_tambah_anak28 + bobot_tambah_anak29 + bobot_tambah_anak30;

      bobot_kurang = bobot_kurang_anak1 + bobot_kurang_anak2 + bobot_kurang_anak3 + bobot_kurang_anak4 + bobot_kurang_anak5 + bobot_kurang_anak6 + bobot_kurang_anak7 + bobot_kurang_anak8 + bobot_kurang_anak9 + bobot_kurang_anak10 + bobot_kurang_anak11 + bobot_kurang_anak12 + bobot_kurang_anak13 + bobot_kurang_anak14 + bobot_kurang_anak15 + bobot_kurang_anak16 + bobot_kurang_anak17 + bobot_kurang_anak18 + bobot_kurang_anak19 + bobot_kurang_anak20 + bobot_kurang_anak21 + bobot_kurang_anak22 + bobot_kurang_anak23 + bobot_kurang_anak24 + bobot_kurang_anak25 + bobot_kurang_anak26 + bobot_kurang_anak27 + bobot_kurang_anak28 + bobot_kurang_anak29 + bobot_kurang_anak30;

      massa = massa - bobot_tambah - bobot_kurang;

      for(i=1;i<31;i++) {
        total_rasio_anak[i] += (rasio_berat_tambah_anak[i] + rasio_berat_kurang_anak[i]);
      }

      total_porsi2 += porsi2_tambah + porsi2_kurang;

      for(i=1;i<31;i++) {
        berat_previous_anak[i] = berat_anak[i];
      }

      data_rasio_anak1.push(tanggal);
      data_rasio_anak1.push(berat_anak1);
      data_rasio_anak1.push(total_rasio_anak1);
      data_rasio_anak1.push(total_brtr_anak1);
      data_rasio_anak1.push(rasio_berat_tambah_anak1);
      data_rasio_anak1.push(br_tambah_anak1);
      data_rasio_anak1.push(porsi1_tambah_anak1);
      data_rasio_anak1.push(porsi2_tambah_anak1);
      data_rasio_anak1.push(bobot_tambah_anak1);
      data_rasio_anak1.push(rasio_berat_kurang_anak1);
      data_rasio_anak1.push(br_kurang_anak1);
      data_rasio_anak1.push(porsi1_kurang_anak1);
      data_rasio_anak1.push(porsi2_kurang_anak1);
      data_rasio_anak1.push(bobot_kurang_anak1);

      rasio_anak1_details.push(data_rasio_anak1);

      data_rasio.push(tanggal);
      data_rasio.push(total_brtr);
      data_rasio.push(selisih_harian);
      data_rasio.push(index_harian);
      data_rasio.push(massa);
      data_rasio.push(massa_fix);
      data_rasio.push(index_massa);
      data_rasio.push(br_tambah);
      data_rasio.push(porsi1_tambah);
      data_rasio.push(porsi2_tambah);
      data_rasio.push(bobot_tambah);
      data_rasio.push(br_kurang);
      data_rasio.push(porsi1_kurang);
      data_rasio.push(porsi2_kurang);
      data_rasio.push(bobot_kurang);

      rasio_anak_kelompok.push(data_rasio);


      $('#total_post').html(data_id);
      $('#total_resp').html(data_id);
      // $("#data_kelompok").html(rasio_kelompok_datarow);
      $('#totalbrtr').html(Intl.NumberFormat().format(total_brtr));
      $('#totalbrtr2').html(Intl.NumberFormat().format(total_brtr));
      $('#totalbrtr3').html(Intl.NumberFormat().format(total_brtr));
      $('#massa').html(Intl.NumberFormat().format(massa.toFixed(2)));
      // $("#request_area").html(hasil);
      // $("#response_area").html(hasil);

      // start_date= start_date+1;
      data_id++;

        }


        // if (result.status == "failed") { //coba dipikirkan kodingnya PENTING JIKA SERVER BELUM ADA OUTPUT!!!!
        //     return false;
        // }
      },
      error: function() {

        var req_element = '<div style="margin: auto; width: 50%; color: #c1c2c6; text-align: center"> <h5 style="margin-top: 120px">koneksi lambat, mohon tunggu atau klik "reload this page" pada browser anda utk mengulang dr awal.....</h5> <img src="img/spinner.gif" width="200" height="200" style="margin-top: -30px"></div>';

        $("#request_area").html(req_element);
        $("#response_area").html(req_element);
    }
    })
  } else if (data_id == max) {
    $('#setting_button').attr('disabled',false);
    $('#data_button').attr('disabled',false);
    $('#refresh_button').attr('disabled',false);
    $('#statistik_button').attr('disabled',false);
    $('#logout_button').attr('disabled',false);
    $('#viewpost_button').attr('disabled',false);
    $('#chart_button').attr('disabled',false);
    $('#portfolio_summary_button').attr('disabled',false);
    $('#assets_details_button').attr('disabled',false);

    clearTimeout(to);

    alertFn("success", `data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
    return false;
  }
}

//Function Reset Test
function reset_test() {
  $('#start_date').val("");
  $('#start_date').attr('disabled',false);
  $('#play_button').attr('disabled',false);
  $('#refresh_button').attr('disabled',true);
  $('#total_post').html(0);
  $('#total_resp').html(0);
  $('#totalbrtr').html(0);
  $('#totalbrtr2').html(0);
  $('#totalbrtr3').html(0);
  $('#massa').html(0);
  $("#request_area").html("");
  $("#response_area").html("");
}

//Function View Full Post Request Response

//Function Trade Report

//Function Performance Chart

//Function Test History

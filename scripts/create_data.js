//Function Portfolio Dataset
var ticker_list = new Array();//session
// var xchange_list = new Array();
var exchange_choose_current;//session
var exchange_choose;//session
var startdate_choose_current;//session
var startdate_choose;//session
var asset_portfolio_yahoo = new Array();//session
var port_data = new Array();//session
// var asset_portfolio_files = new Array();
var mychart;
function tickers_list_btn () {
  if(!exchange_choose_current || !startdate_choose_current) {
    $('#ulul').empty();
    var li = document.createElement('li').appendChild(document.createTextNode("silahkan pilih exchange & startdate"));
    document.getElementById("ulul").appendChild(li);
    return false;
  }
  if(ticker_list.length>0) {
    if (exchange_choose_current !== exchange_choose || startdate_choose_current !== startdate_choose) {
      if (confirm("anda punya ticker yg dipilih blm di add, apa anda mau batalin") == true) {
        ticker_list = [];
        $("#tiingo_tickers_btn").html(`Tickers (<span class="quantity">0</span>)`);
        exchange_choose = exchange_choose_current;
        startdate_choose = startdate_choose_current;
        $('#ulul').empty();
        for (i=0;i< NYSE_ticker_list.length;i++) {
          var newLi = document.createElement('li');
          var cb = document.createElement( "input" );
            cb.type = "checkbox";
            cb.id = "c1";
            cb.checked = false;
            //Append the checkbox to the li
            newLi.appendChild(cb);
            //Create the text node after the the checkbox
            var text = document.createTextNode(NYSE_ticker_list[i]);
            //Append the text node to the <li>
            newLi.appendChild(text);
            //Append the <li> to the <ul>
            document.getElementById("ulul").appendChild(newLi);
        }
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
    for (i=0;i< NYSE_ticker_list.length;i++) {
      var newLi = document.createElement('li');
      var cb = document.createElement( "input" );
        cb.type = "checkbox";
        cb.id = "c1";
        cb.checked = false;
        //Append the checkbox to the li
        newLi.appendChild(cb);
        //Create the text node after the the checkbox
        var text = document.createTextNode(NYSE_ticker_list[i]);
        //Append the text node to the <li>
        newLi.appendChild(text);
        //Append the <li> to the <ul>
        document.getElementById("ulul").appendChild(newLi);
    }
  }
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
                  appendLeadingZeroes(data_date.getMonth()+1) + "/" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10) + "/" + data_date.getFullYear()
                );
                as_data_price.push(
                  data_price
                );
                }
                asset_portfolio_yahoo.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
                console.log(asset_portfolio_yahoo);
                console.log(as_data_date);
                let al = asset_portfolio_yahoo.length;
                let portfolio =
                `<tr>
                    <td class="text-center">Stock `+al+`</td>
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
    port_data = [];
    $("#table_assets > tbody").empty();
    $("#port_data_tbl>tbody").empty();
    $("#pagination-demo").twbsPagination("destroy");
    $("#period_data").val("");
    $("#period_data_dashboard").val("No Data Available");
    $("#source_data").val("");
    // $("#start_date").val("");
    // localStorage.removeItem("portData");
  }

function appendLeadingZeroes(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}

// tombol proses data utk data from yahoo and files
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
        $("#source_data").val("");
          
        //cek periode data yg tercover oleh semua stocks
          var startdates= new Array();
          var enddates= new Array();
          for (i=0; i<asset_portfolio_yahoo.length; i++) {
              startdates.push(new Date(asset_portfolio_yahoo[i].data.date[0]));
              enddates.push(new Date(asset_portfolio_yahoo[i].data.date[asset_portfolio_yahoo[i].data.date.length-1]));
          }
          var startDate=new Date(Math.max.apply(null,startdates));
          var endDate=new Date(Math.min.apply(null,enddates));
          while (startDate <= endDate) {
            var as_arr = new Array();
            dtt = appendLeadingZeroes(startDate.getMonth()+1) + "/" + appendLeadingZeroes(startDate.getDate()) + "/" + startDate.getFullYear();
            as_arr.push(dtt);          
            for (y=0; y<30; y++) {
              // var idx = asset_portfolio_yahoo[y].data.date.indexOf(dtt);
              var i = 0;
              while (i<asset_portfolio_yahoo[y].data.date.length) {
                if(asset_portfolio_yahoo[y].data.date[i] === dtt) {
                  as_arr.push(asset_portfolio_yahoo[y].data.price[i]);
                  i = asset_portfolio_yahoo[y].data.date.length;
                } else {
                  i++;
                  as_arr.push(port_data[port_data.length-1][y+1]);
                }
              }
              // if(idx == -1) {//jika idx tidak ditemukan
              //     as_arr.push(port_data[port_data.length-1][y+1]); //masukkan harga sebelumnya
              // } else {
              //     as_arr.push(asset_portfolio_yahoo[y].data.price[idx]); //jika idx ketemu masukkan harga berdasarkan idx
              // }
            }
            port_data.push(as_arr);

            if (startDate.getDay()==5) {
                startDate = new Date(startDate.setDate(startDate.getDate() + 3));
            } else {
                startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            }
          }

          $("#source_data").val("Yahoo Finance");
          $("#period_data").val(port_data[0][0]+' - '+port_data[port_data.length-1][0]);
          $("#period_data_dashboard").val(port_data[0][0]+' - '+port_data[port_data.length-1][0]);
          console.log(port_data);
    
          $("#pagination-demo").twbsPagination({
            totalPages: Math.ceil(port_data.length/23),
            visiblePages: 2,
            onPageClick: function (event, page) {
              $("#port_data_tbl>tbody").empty();
                for (i=(page-1)*23; i<(page*23) && i<(port_data.length); i++) {
                  var port_data_row =
                  `<tr>
                      <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+port_data[i][0]+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][1]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][2]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][3]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][4]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][5]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][6]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][7]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][8]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][9]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][10]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][11]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][12]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][13]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][14]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][15]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][16]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][17]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][18]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][19]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][20]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][21]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][22]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][23]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][24]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][25]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][26]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][27]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][28]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][29]).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i][30]).toFixed(2))+`</td>
                  </tr>`;
                  $("#port_data_tbl>tbody").append(port_data_row);
                  }
            }
            });  
      }      
 }

//montecarlo simulation proses
function process_montercarlo_simulation() {  
  // $('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0); 
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
  for (i=0;i<7830;i++) { 
    let dtt = appendLeadingZeroes(dt.getMonth()+1) + "/" + appendLeadingZeroes(dt.getDate()) + "/" + dt.getFullYear();
      dt_arr.push(dtt);
    if (dt.getDay()==5) {      
      dt = new Date(dt.setDate(dt.getDate() + 3));
    } else {   
        dt = new Date(dt.setDate(dt.getDate() + 1));
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

// console.log(port_data);

$("#source_data").val("Geometric Brownian Motion");
$("#period_data").val(dt_arr[0]+' - '+dt_arr[dt_arr.length-1]);
$("#period_data_dashboard").val(dt_arr[0]+' - '+dt_arr[dt_arr.length-1]);
$("#startDate").val(dt_arr[0].split("/")[2] + '-' + dt_arr[0].split("/")[0] + '-' + dt_arr[0].split("/")[1]);
// $('#startDate').attr('min',"1990-12-01");//atur biar tgl otomatis
// $('#startDate').attr('max',"1991-02-01");//atur biar tgl otomatis
$('#stock1_ticker').html("GBM_1");
$('#stock2_ticker').html("GBM_2");
$('#stock3_ticker').html("GBM_3");
$('#stock4_ticker').html("GBM_4");
$('#stock5_ticker').html("GBM_5");
$('#stock6_ticker').html("GBM_6");
$('#stock7_ticker').html("GBM_7");
$('#stock8_ticker').html("GBM_8");
$('#stock9_ticker').html("GBM_9");
$('#stock10_ticker').html("GBM_10");
$('#stock11_ticker').html("GBM_11");
$('#stock12_ticker').html("GBM_12");
$('#stock13_ticker').html("GBM_13");
$('#stock14_ticker').html("GBM_14");
$('#stock15_ticker').html("GBM_15");
$('#stock16_ticker').html("GBM_16");
$('#stock17_ticker').html("GBM_17");
$('#stock18_ticker').html("GBM_18");
$('#stock19_ticker').html("GBM_19");
$('#stock20_ticker').html("GBM_20");
$('#stock21_ticker').html("GBM_21");
$('#stock22_ticker').html("GBM_22");
$('#stock23_ticker').html("GBM_23");
$('#stock24_ticker').html("GBM_24");
$('#stock25_ticker').html("GBM_25");
$('#stock26_ticker').html("GBM_26");
$('#stock27_ticker').html("GBM_27");
$('#stock28_ticker').html("GBM_28");
$('#stock29_ticker').html("GBM_29");
$('#stock30_ticker').html("GBM_30");

$("#pagination-demo").twbsPagination({
totalPages: Math.ceil(port_data[0].length/23),
visiblePages: 2,
onPageClick: function (event, page) {
  $("#port_data_tbl>tbody").empty();
    for (i=(page*23)-23; i<(page*23) && i<(port_data[0].length); i++) {
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

//montecarlo simulation chart
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

      var ctx = document.getElementById('montecarlo_simulation_chart').getContext('2d');
      mychart = new Chart(ctx, config);
      

}
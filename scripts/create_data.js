//Function Portfolio Dataset
var ticker_list = new Array();//session
// var xchange_list = new Array();
var exchange_choose_current;//session
var exchange_choose;//session
var startdate_choose_current;//session
var startdate_choose;//session
var asset_portfolio_yahoo = new Array();//session
// var asset_portfolio_files = new Array();
var mychart;
var port_data = new Array();//rubah pakai session storage

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
var port_data = new Array();//session
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
          // console.log(startDate);
          // console.log(endDate);         
          while (startDate <= endDate) {
            var as_arr = new Array();
            dtt = appendLeadingZeroes(startDate.getMonth()+1) + "/" + appendLeadingZeroes(startDate.getDate()) + "/" + startDate.getFullYear();
            as_arr.push(dtt);          
            for (y=0; y<asset_portfolio_yahoo.length; y++) {
              var idx = asset_portfolio_yahoo[y].data.date.indexOf(dtt);
              if(idx == -1) {//jika idx tidak ditemukan
                  as_arr.push(as_arr[as_arr.length-1]); //masukkan harga sebelumnya
              } else {
                  as_arr.push(asset_portfolio_yahoo[y].data.price[idx]); //jika idx ketemu masukkan harga berdasarkan idx
              }
            }
            port_data.push({
              date : as_arr[0],
              stock1_price : as_arr[1],
              stock2_price : as_arr[2],
              stock3_price : as_arr[3],
              stock4_price : as_arr[4],
              stock5_price : as_arr[5],
              stock6_price : as_arr[6],
              stock7_price : as_arr[7],
              stock8_price : as_arr[8],
              stock9_price : as_arr[9],
              stock10_price : as_arr[10],
              stock11_price : as_arr[11],
              stock12_price : as_arr[12],
              stock13_price : as_arr[13],
              stock14_price : as_arr[14],
              stock15_price : as_arr[15],
              stock16_price : as_arr[16],
              stock17_price : as_arr[17],
              stock18_price : as_arr[18],
              stock19_price : as_arr[19],
              stock20_price : as_arr[20],
              stock21_price : as_arr[21],
              stock22_price : as_arr[22],
              stock23_price : as_arr[23],
              stock24_price : as_arr[24],
              stock25_price : as_arr[25],
              stock26_price : as_arr[26],
              stock27_price : as_arr[27],
              stock28_price : as_arr[28],
              stock29_price : as_arr[29],
              stock30_price : as_arr[30]
            });

            if (startDate.getDay()==5) {
                startDate = new Date(startDate.setDate(startDate.getDate() + 3));
            } else {
                startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            }
          }

          $("#source_data").val("Yahoo Finance");
          $("#period_data").val(port_data[0].date+' - '+port_data[port_data.length-1].date);
          $("#period_data_dashboard").val(port_data[0].date+' - '+port_data[port_data.length-1].date);
          // console.log(port_data);
    
          $("#pagination-demo").twbsPagination({
            totalPages: Math.ceil(port_data.length/23),
            visiblePages: 2,
            onPageClick: function (event, page) {
              $("#port_data_tbl>tbody").empty();
                for (i=(page*23)-23; i<(page*23) && i<(port_data.length); i++) {
                  var port_data_row =
                  `<tr>
                      <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+port_data[i].date+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock1_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock2_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock3_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock4_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock5_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock6_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock7_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock8_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock9_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock10_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock11_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock12_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock13_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock14_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock15_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock16_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock17_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock18_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock19_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock20_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock21_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock22_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock23_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock24_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock25_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock26_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock27_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock28_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock29_price).toFixed(2))+`</td>
                      <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(port_data[i].stock30_price).toFixed(2))+`</td>
                  </tr>`;
                  $("#port_data_tbl>tbody").append(port_data_row);
                  }
            }
            });  
      }

      
 }

//montecarlo simulation proses
function process_montercarlo_simulation() {  
  $('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0); 
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
  if (dt.getDay()==5) {
    let dtt = appendLeadingZeroes(dt.getMonth()+1) + "/" + appendLeadingZeroes(dt.getDate()) + "/" + dt.getFullYear();
    dt_arr.push(dtt);
    dt = new Date(dt.setDate(dt.getDate() + 3));
  } else {          
    let dtt = appendLeadingZeroes(dt.getMonth()+1) + "/" + appendLeadingZeroes(dt.getDate()) + "/" + dt.getFullYear();
      dt_arr.push(dtt);
      dt = new Date(dt.setDate(dt.getDate() + 1));
  }

  var step = 0;
  if (step == 0) {
  step = 1; 
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      step = 0;
    } else {
      width++;
      $('.progress-bar').css('width', width+'%').attr('aria-valuenow', width); 
    }
  }
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

}
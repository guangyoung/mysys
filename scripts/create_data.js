//Function Portfolio Dataset

//GLOBAL VARIABLE
var ticker_list = new Array();//session
var asset_portfolio_yahoo = new Array();//session
var exchange_choose_current;
var exchange_choose;
var port_data = new Array();//session

function tickers_list_btn () {
  if(!exchange_choose_current) {
     $('#ulul').empty();
    var li = document.createElement('li').appendChild(document.createTextNode("silahkan pilih exchange & startdate"));
    document.getElementById("ulul").appendChild(li);
    return false;
  } else if (exchange_choose_current !== exchange_choose) {
    ticker_list = [];    
    $("#tiingo_tickers_btn").html(`Tickers (<span class="quantity">0</span>)`);
    exchange_choose = exchange_choose_current;
    $('#ulul').empty();
    var tickers = eval(exchange_choose_current+"_ticker_list");
    for (i=0;i<tickers.length;i++) {
    var newLi = document.createElement('li');
    var cb = document.createElement( "input" );
    cb.type = "checkbox";
    cb.id = "c1";
    cb.checked = false;
    newLi.appendChild(cb);
    var text = document.createTextNode(tickers[i]);
    newLi.appendChild(text);
    document.getElementById("ulul").appendChild(newLi);
    }
  } else {
    return false;
  }
}


function add_data() {
  if(ticker_list.length==0) {
      alert("tidak ada ticker yg dipilih");
      return false;
  } else if((ticker_list.length+asset_portfolio_yahoo.length)>30) {
    alert("ticker yg anda pilih melebihi total ticker tersisa untuk portfolio")
    return false;
  } else {
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
      let ex_choo = exchange_choose_current;

      Papa.parse("dataset/"+exchange_choose+"/"+tickere+".csv", {
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
                  <td class="text-center">`+ex_choo+`</td>
                  <td class="text-center">`+as_data_date[0]+`</td>
                  <td class="text-center">`+as_data_date[as_data_date.length-1]+`</td>
              </tr>`;
              $("#table_assets > tbody").append(portfolio);
          }
      });
    }   
    $("#tiingo_tickers_btn").html(`Tickers (<span class="quantity">0</span>)`);
    $("#Xchange_btn").html(`<span class="Xchange">Exchange</span>`);
    ticker_list = [];
    exchange_choose_current="";
    exchange_choose ="";
  }
}

function reset_portfolio() {
  asset_portfolio_yahoo = [];
  port_data = [];
  $("#table_assets > tbody").empty();
  $("#port_data_tbl>tbody").empty();
  $("#pagination-demo").twbsPagination("destroy");
  $("#period_data").val("");
  $("#period_data_dashboard").val("mm/dd/yyyy - mm/dd/yyyy");
  $("#test_startdate").val("");
  $('#data_available_alert').html("No Test Data Available To Test");
  $('#stock1_ticker').html("");
  $('#stock2_ticker').html("");
  $('#stock3_ticker').html("");
  $('#stock4_ticker').html("");
  $('#stock5_ticker').html("");
  $('#stock6_ticker').html("");
  $('#stock7_ticker').html("");
  $('#stock8_ticker').html("");
  $('#stock9_ticker').html("");
  $('#stock10_ticker').html("");
  $('#stock11_ticker').html("");
  $('#stock12_ticker').html("");
  $('#stock13_ticker').html("");
  $('#stock14_ticker').html("");
  $('#stock15_ticker').html("");
  $('#stock16_ticker').html("");
  $('#stock17_ticker').html("");
  $('#stock18_ticker').html("");
  $('#stock19_ticker').html("");
  $('#stock20_ticker').html("");
  $('#stock21_ticker').html("");
  $('#stock22_ticker').html("");
  $('#stock23_ticker').html("");
  $('#stock24_ticker').html("");
  $('#stock25_ticker').html("");
  $('#stock26_ticker').html("");
  $('#stock27_ticker').html("");
  $('#stock28_ticker').html("");
  $('#stock29_ticker').html("");
  $('#stock30_ticker').html("");
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
        $("#period_data_dashboard").val("mm/dd/yyyy - mm/dd/yyyy");        
        $("#test_startdate").val("");
        $('#data_available_alert').html("No Test Data Available To Test");
          
        //cek periode data yg tercover oleh semua stocks
          var startdates= new Array();
          var enddates= new Array();
          for (i=0; i<asset_portfolio_yahoo.length; i++) {
              startdates.push(new Date(asset_portfolio_yahoo[i].data.date[0]));
              enddates.push(new Date(asset_portfolio_yahoo[i].data.date[asset_portfolio_yahoo[i].data.date.length-1]));
          }
          var startDate=new Date(Math.max.apply(null,startdates));
          var endDate=new Date(Math.min.apply(null,enddates));
          var as_arr = new Array();
          while (startDate <= endDate) {
            as_arr = [];
            dtt = appendLeadingZeroes(startDate.getMonth()+1) + "/" + appendLeadingZeroes(startDate.getDate()) + "/" + startDate.getFullYear();
            as_arr.push(dtt);          
            for (y=0; y<30; y++) { //CEK BAGAIMANA PROSES INI BISA CEPAT....PENTIIIING !!!!!!
              let idx = asset_portfolio_yahoo[y].data.date.indexOf(dtt);
              if(idx == -1) {//jika idx tidak ditemukan
                as_arr.push(port_data[port_data.length-1][y+1]); //masukkan harga sebelumnya
              } else {
                as_arr.push(asset_portfolio_yahoo[y].data.price[idx]); //jika idx ketemu masukkan harga berdasarkan idx
              }
            }
            port_data.push(as_arr);

            if (startDate.getDay()==5) {
                startDate = new Date(startDate.setDate(startDate.getDate() + 3));
            } else {
                startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            }
          }

          $("#period_data").val(port_data[0][0]+' - '+port_data[port_data.length-1][0]);
          $("#period_data_dashboard").val(port_data[0][0]+' - '+port_data[port_data.length-1][0]);  
          $("#test_startdate").val(new Date(port_data[0][0]).getFullYear() + "-"+ appendLeadingZeroes(new Date(port_data[0][0]).getMonth()+1) + "-" + appendLeadingZeroes(new Date(port_data[0][0]).getDate()));
          $('#data_available_alert').html("You Have Data Available To Test");
          $('#stock1_ticker').html(asset_portfolio_yahoo[0].ticker);
          $('#stock2_ticker').html(asset_portfolio_yahoo[1].ticker);
          $('#stock3_ticker').html(asset_portfolio_yahoo[2].ticker);
          $('#stock4_ticker').html(asset_portfolio_yahoo[3].ticker);
          $('#stock5_ticker').html(asset_portfolio_yahoo[4].ticker);
          $('#stock6_ticker').html(asset_portfolio_yahoo[5].ticker);
          $('#stock7_ticker').html(asset_portfolio_yahoo[6].ticker);
          $('#stock8_ticker').html(asset_portfolio_yahoo[7].ticker);
          $('#stock9_ticker').html(asset_portfolio_yahoo[8].ticker);
          $('#stock10_ticker').html(asset_portfolio_yahoo[9].ticker);
          $('#stock11_ticker').html(asset_portfolio_yahoo[10].ticker);
          $('#stock12_ticker').html(asset_portfolio_yahoo[11].ticker);
          $('#stock13_ticker').html(asset_portfolio_yahoo[12].ticker);
          $('#stock14_ticker').html(asset_portfolio_yahoo[13].ticker);
          $('#stock15_ticker').html(asset_portfolio_yahoo[14].ticker);
          $('#stock16_ticker').html(asset_portfolio_yahoo[15].ticker);
          $('#stock17_ticker').html(asset_portfolio_yahoo[16].ticker);
          $('#stock18_ticker').html(asset_portfolio_yahoo[17].ticker);
          $('#stock19_ticker').html(asset_portfolio_yahoo[18].ticker);
          $('#stock20_ticker').html(asset_portfolio_yahoo[19].ticker);
          $('#stock21_ticker').html(asset_portfolio_yahoo[20].ticker);
          $('#stock22_ticker').html(asset_portfolio_yahoo[21].ticker);
          $('#stock23_ticker').html(asset_portfolio_yahoo[22].ticker);
          $('#stock24_ticker').html(asset_portfolio_yahoo[23].ticker);
          $('#stock25_ticker').html(asset_portfolio_yahoo[24].ticker);
          $('#stock26_ticker').html(asset_portfolio_yahoo[25].ticker);
          $('#stock27_ticker').html(asset_portfolio_yahoo[26].ticker);
          $('#stock28_ticker').html(asset_portfolio_yahoo[27].ticker);
          $('#stock29_ticker').html(asset_portfolio_yahoo[28].ticker);
          $('#stock30_ticker').html(asset_portfolio_yahoo[29].ticker);
          console.log(port_data);
          $('#create_data').modal('toggle'); 
          $("#table_assets > tbody").empty();
    
          $("#pagination-demo").twbsPagination({
            totalPages: Math.ceil(port_data.length/22),
            visiblePages: 2,
            onPageClick: function (event, page) {
              $("#port_data_tbl>tbody").empty();
                for (i=(page-1)*22; i<(page*22) && i<(port_data.length); i++) {
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

//Function Portfolio Dataset

//GLOBAL VARIABLE
var ticker_list = new Array();//session
var asset_portfolio_yahoo = new Array();//session
var port_data = new Array();//session
var exchange_choose_current;
var exchange_choose;

function tickers_list_btn () {
  if(!exchange_choose_current) {
     $('#ulul').empty();
    var li = document.createElement('li').appendChild(document.createTextNode("silahkan pilih exchange & startdate"));
    document.getElementById("ulul").appendChild(li);
    return false;
  } else if (exchange_choose_current !== exchange_choose) {
    ticker_list = [];
    console.log(exchange_choose);
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
                  <td class="text-center">`+exchange_choose_current+`</td>
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
  $("#period_data_dashboard").val("No Data Available");
  $("#test_startdate").val("");
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
        $("#test_startdate").val("");
          
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

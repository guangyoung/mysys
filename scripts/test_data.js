//STEP 1. CREATE DATA
//Ini adalah step create data .......................................................
//...................................................................................
//...................................................................................

    //Global Variables    
    var portfolio_data = new Array();    
    var test_data = new Array();

    function tickers_list_btn() {
      if(!exchange_choose_current || !startdate_select) {
        $('#ulul').empty();
        var newLi = document.createElement('li');
        var li = document.createTextNode("\u00A0\u00A0Please Choose Your \u00A0\u00A0Exchange & Startdate !!!");
        newLi.appendChild(li);
        document.getElementById("ulul").appendChild(newLi);
        return false;
      } else {
        ticker_list = [];    
        $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
        // exchange_choose_previous = exchange_choose_current;
        $('#ulul').empty();
        var tickers = eval(exchange_choose_current+'_'+startdate_select);
        for (i=0;i<tickers.length;i++) {
        var newLi = document.createElement('li');
        var cb = document.createElement( "input" );
        cb.type = "checkbox";
        cb.style.marginLeft = '15px';
        cb.style.marginRight = '5px';
        // cb.id = "c1";
        // cb.checked = false;
        newLi.appendChild(cb);
        var text = document.createTextNode(tickers[i]);
        newLi.appendChild(text);
        document.getElementById("ulul").appendChild(newLi);
        }
      } 
    }

    function add_data() {
      if(ticker_list.length==0) {
          alert("tidak ada ticker yg dipilih");
          return false;
      } else if((ticker_list.length+portfolio_data.length)>30) {
        alert("ticker yg anda pilih melebihi total ticker tersisa untuk portfolio")
        return false;
      } else {
        if(portfolio_data.length>0) {
          for (i = 0; i<ticker_list.length; i++) {    //?????
            var tickere = ticker_list[i].split(', ')[0];
            for(x=0;x<portfolio_data.length;x++) {
              let idx = portfolio_data[x].ticker.indexOf(tickere);
              if (idx !== -1) {
                alert("ticker "+tickere+" sdh dipilih");
                return false;
              }
            }
          }
        } 
        for (i = 0; i < ticker_list.length && i < (30 - portfolio_data.length); i++) {
          let tickere = ticker_list[i].split(', ')[0];
          let as_data_date = new Array();
          let as_data_price = new Array();
          let ex_choo = exchange_choose_current.split('-')[0];

          const proxyurl = "https://api.codetabs.com/v1/proxy?quest=";
          const urls = "https://query1.finance.yahoo.com/v8/finance/chart/"+tickere+"?symbol="+tickere+"&period1=0&period2=9999999999&interval=1d";

          $.getJSON(proxyurl+urls, function(result){
            console.log(result);
            var market_data = result;
            let length_tm = market_data.chart.result[0].timestamp.length;
            for(i=0; i<length_tm; i++) {
            var data_date = new Date(market_data.chart.result[0].timestamp[i] * 1000);
            var data_price = market_data.chart.result[0].indicators.adjclose[0].adjclose[i];             
                as_data_date.push(
                  appendLeadingZeroes(data_date.getMonth()+1) + "/" + appendLeadingZeroes(data_date.getDate()).toString().slice(0, 10) + "/" + data_date.getFullYear()
                );
              if(data_price == null) {
                as_data_price.push(
                  as_data_price[as_data_price.length-1]
                );
              } else {
                as_data_price.push(
                  data_price
                );
              }           
            }
            portfolio_data.push({ticker: tickere, data: {date: as_data_date, price: as_data_price}});
            let al = portfolio_data.length;
            let portfolio =            
            `<tr>
                <td class="text-center">`+al+`</td>
                <td class="text-center">`+tickere+`</td>
                <td class="text-center">`+ex_choo+`</td>
                <td class="text-center">`+as_data_date[0]+`</td>
            </tr>`;
            $("#table_assets > tbody").append(portfolio);
            });
        }      
        $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
        $("#Xchange_btn").html(`<span class="Xchange">Select Exchange</span>`);
        $("#startdate_btn").html(`<span class="Sdate">Select Start Date</span>`);
        ticker_list = [];
        exchange_choose_current="";
        // exchange_choose_previous ="";
      }
    }

    function appendLeadingZeroes(n){
      if(n <= 9){
        return "0" + n;
      }
      return n
    }

    function reset_stock() {
      $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
      $("#Xchange_btn").html(`<span class="Xchange">Select Exchange</span>`);
      $("#startdate_btn").html(`<span class="Sdate">Select Start Date</span>`);
      ticker_list = [];
      exchange_choose_current="";
      // exchange_choose_previous ="";
      portfolio_data = [];
      test_data = [];
      $("#table_assets > tbody").empty();
      $("#port_data_tbl>tbody").empty();
      $("#pagination-demo").twbsPagination("destroy");
      $("#period_data").val("");
      // $('#ulul').empty();
    }

    function create_test_data() {      
      if(portfolio_data.length < 30) {
          alert('total asset kurang dari 30');
          return false;
      } else if(test_data.length > 0) {
          alert('anda punya portfolio data, silahkan reset data terlebih dahulu');
          return false;
        } else {
        // portfolio_data = [];
        // test_data = [];
        // $("#table_assets > tbody").empty();
        // $("#port_data_tbl>tbody").empty();
        $("#pagination-demo").twbsPagination("destroy");
        // $("#period_data").val("");
        // console.log(portfolio_data);
        //cek periode data yg tercover oleh semua stocks
        var startdates= new Array();
        var enddates= new Array();
        for (i=0; i<portfolio_data.length; i++) {
            startdates.push(new Date(portfolio_data[i].data.date[0]));
            enddates.push(new Date(portfolio_data[i].data.date[portfolio_data[i].data.date.length-1]));
        }
        var startDate=new Date(Math.max.apply(null,startdates));
        var endDate=new Date(Math.min.apply(null,enddates));
        // console.log(startDate);
        // console.log(endDate);
        var as_arr = new Array();
        var idx = new Array();
          for (i=0;i<30;i++) {
            idx[i] = 0;
          }  
        while (startDate <= endDate) {
          as_arr = [];
          dtt = appendLeadingZeroes(startDate.getMonth()+1) + "/" + appendLeadingZeroes(startDate.getDate()) + "/" + startDate.getFullYear();
          // console.log(dtt);
          as_arr.push(dtt);              
          for (y=0; y<30; y++) { //CEK BAGAIMANA PROSES INI BISA CEPAT....PENTIIIING !!!!!!
            let id = portfolio_data[y].data.date.indexOf(dtt, idx[y]);
            // console.log(id, y);
            if(id == -1) {//jika idx tidak ditemukan
              as_arr.push(test_data[test_data.length-1][y+1]); //masukkan harga sebelumnya
              // console.log(as_arr);
            } else {
              // if(portfolio_data[y].data.price[id] == null) {
              //   as_arr.push(test_data[test_data.length-1][y+1]); 
              //   // console.log(as_arr);
              // } else {
                as_arr.push(portfolio_data[y].data.price[id]); //jika idx ketemu masukkan harga berdasarkan idx
                idx[y] = id+1;
                // console.log(as_arr);
              // }   
            }        
          }
          
          test_data.push(as_arr);

          if (startDate.getDay()==5) {
              startDate = new Date(startDate.setDate(startDate.getDate() + 3));
          } else {
              startDate = new Date(startDate.setDate(startDate.getDate() + 1));
          }
        }
        // console.log(test_data);
        $("#period_data").val(test_data[0][0]+' - '+test_data[test_data.length-1][0]);
       
        // $("#period_data_dashboard").val(test_data[0][0]+' - '+test_data[test_data.length-1][0]);  
        // $("#test_startdate").val(new Date(test_data[0][0]).getFullYear() + "-"+ appendLeadingZeroes(new Date(test_data[0][0]).getMonth()+1) + "-" + appendLeadingZeroes(new Date(test_data[0][0]).getDate()));
        // $("#test_enddate").val(new Date(test_data[test_data.length-1][0]).getFullYear() + "-"+ appendLeadingZeroes(new Date(test_data[test_data.length-1][0]).getMonth()+1) + "-" + appendLeadingZeroes(new Date(test_data[test_data.length-1][0]).getDate()));
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
        console.log(test_data);
        // $('#create_data').modal('toggle'); 
        // $("#table_assets > tbody").empty();
        // portfolio_data = [];
    
        $("#pagination-demo").twbsPagination({
          totalPages: Math.ceil(test_data.length/22),
          visiblePages: 4,
          onPageClick: function (event, page) {
            $("#port_data_tbl>tbody").empty();
            for (i=(page-1)*22; i<(page*22) && i<(test_data.length); i++) {
              var test_data_row =
              `<tr>
                <td class="text-center" style="position: sticky; left: 0px; color:#d2d3d7; background-color: #326363;padding: 0 2px">`+test_data[i][0]+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][1]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][2]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][3]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][4]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][5]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][6]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][7]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][8]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][9]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][10]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][11]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][12]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][13]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][14]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][15]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][16]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][17]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][18]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][19]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][20]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][21]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][22]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][23]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][24]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][25]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][26]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][27]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][28]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][29]).toFixed(2))+`</td>
                <td class="text-right" style="color:#d2d3d7; padding: 0 2px">`+Intl.NumberFormat().format(parseFloat(test_data[i][30]).toFixed(2))+`</td>
              </tr>`;
              $("#port_data_tbl>tbody").append(test_data_row);
            }
          }
        });  
      }           
    }
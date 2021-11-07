//STEP 1. CREATE DATA
//Ini adalah step create data .......................................................
//...................................................................................
//...................................................................................

    //Global Variables    
    var portfolio_data = new Array();    
    var test_data = new Array();

    function tickers_list_btn () {
      if(!exchange_choose_current || !startdate_select) {
        Swal.fire(
          'No Exchange and Start Date Selected !',
          'Please select your exchange and startdate before',
          'warning'
        )
        $('#ulul').empty();
        // var newLi = document.createElement('li');
        // var li = document.createTextNode("\u00A0\u00A0Please Choose Your \u00A0\u00A0Exchange & Startdate !!!");
        // newLi.appendChild(li);
        // document.getElementById("ulul").appendChild(newLi);
        return false;
      } else if (exchange_choose_current !== exchange_choose_previous || startdate_select !== startdate_select_previous) {
        console.log(exchange_choose_current);
        console.log(startdate_select);
        ticker_list = [];    
        $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
        exchange_choose_previous = exchange_choose_current;
        startdate_select_previous = startdate_select;
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
      } else {
        return false;
      }
    }

  function getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement; 
  }

    function tickers_exchange_btn() {
      var ul = document.getElementById('ex_dd');
      ul.onclick = function(event) {
          var target = getEventTarget(event);
          let container_exchange = $(this).closest("#tickers_exchange");
          exchange_choose_current = target.id;
          container_exchange.find('.Xchange').text( target.innerText || 'Select Exchange' );
          console.log(target.id);
      };       
    }

    function tickers_exchange_btn_random() {
      var ul = document.getElementById('ex_dd_random');
      ul.onclick = function(event) {
          var target = getEventTarget(event);
          let container_exchange = $(this).closest("#tickers_exchange_select_random");
          exchange_choose_current = target.id;
          container_exchange.find('.Xchange_random').text( target.innerText || 'Select Exchange' );
          console.log(target.id);
      };       
    }

    // $("#tickers_exchange_select_random").on('click', '.dropdown-item', function (event) {
    //   let container_exchange = $(this).closest("#tickers_exchange_select_random");
    //   exchange_choose_current = $(event.currentTarget)[0].id;
    //   container_exchange.find('.Xchange_random').text( $(event.currentTarget)[0].innerText || 'Select Exchange');
    //   console.log(exchange_choose_current);
    //   });


    function add_data() {         
      if(portfolio_data.length==30) {
        Swal.fire(
          '30 Stocks has been selected !',
          'Please click reset stock to start new',
          'warning'
        )
        return false;
      } else if(ticker_list.length==0) {
        Swal.fire(
          'No Ticker Selected !',
          'Please select your tickers to test',
          'warning'
        )
        return false;
      } else {
        if(portfolio_data.length>0) {
          for (i = 0; i<ticker_list.length; i++) {    //?????
            var tickere = ticker_list[i].split(', ')[0];
            for(x=0;x<portfolio_data.length;x++) {
              let idx = portfolio_data[x].ticker.indexOf(tickere);
              if (idx !== -1) {
                Swal.fire(
                  'ticker '+tickere+' has been selected !',
                  'Please choose another ticker',
                  'warning'
                )
                return false;
              }
            }
          }
        }
        $(':button').prop('disabled', true);    
        // var t = 0;
        for (t=0;t < ticker_list.length && t < (30 - portfolio_data.length);t++) {          
          let tickere = ticker_list[t].split(', ')[0];
          let as_data_date = new Array();
          let as_data_price = new Array();
          let ex_choo = exchange_choose_current.split('-')[0];
          
            Papa.parse("dataset/"+exchange_choose_current+"/"+tickere+".csv", {
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
                }
          });
        }
        $(':button').prop('disabled', false);     
                
        $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
        $("#Xchange_btn").html(`<span class="Xchange">Select Exchange</span>`);
        $("#startdate_btn").html(`<span class="Sdate">Select Start Date</span>`);
        $("#Xchange_btn_random").html(`<span class="Xchange_random">Select Exchange</span>`);
        $("#startdate_btn_random").html(`<span class="Sdate_random">Select Start Date</span>`);
        ticker_list = [];
        exchange_choose_current="";
        exchange_choose_previous ="";
        startdate_select ="";
        startdate_select_previous ="";
      }
      // $(':button').prop('disabled', false); 
    }

    function add_data_random() { 
      if(portfolio_data.length==30) {
        Swal.fire(
          '30 Stocks has been selected !',
          'Please click reset stock to start new',
          'warning'
        )
        return false;
      } else if(!exchange_choose_current || !startdate_select) {
        Swal.fire(
          'No Exchange and Start Date Selected !',
          'Please select your exchange and startdate before',
          'warning'
        )
        return false;
      } else {
          var tickers_random = eval(exchange_choose_current+'_'+startdate_select);

          for (i=0;i<tickers_random.length && i<(30-portfolio_data.length);i++) {
              let tick_no = Math.floor(Math.random() * tickers_random.length);
              ticker_list.push(tickers_random[tick_no]);
              console.log(tickers_random[tick_no]);
              tickers_random.splice(tick_no,1);              
          }
          console.log(ticker_list); 

          $(':button').prop('disabled', true); 
          // var t = 0;
          for (t=0;t < ticker_list.length;t++) {
            let tickere = ticker_list[t].split(', ')[0];
            let as_data_date = new Array();
            let as_data_price = new Array();
            let ex_choo = exchange_choose_current.split('-')[0];

            Papa.parse("dataset/"+exchange_choose_current+"/"+tickere+".csv", {
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
                }
              });        
          } 
          $(':button').prop('disabled', false);    
          
          $("#tiingo_tickers_btn").html(`Select Tickers (<span class="quantity">0</span>)`);
          $("#Xchange_btn").html(`<span class="Xchange">Select Exchange</span>`);
          $("#startdate_btn").html(`<span class="Sdate">Select Start Date</span>`);
          $("#Xchange_btn_random").html(`<span class="Xchange_random">Select Exchange</span>`);
          $("#startdate_btn_random").html(`<span class="Sdate_random">Select Start Date</span>`);
          ticker_list = [];
          exchange_choose_current="";
          exchange_choose_previous ="";
          startdate_select ="";
          startdate_select_previous ="";
        }
        $(':button').prop('disabled', false); 
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
      $("#Xchange_btn_random").html(`<span class="Xchange_random">Select Exchange</span>`);
      $("#startdate_btn_random").html(`<span class="Sdate_random">Select Start Date</span>`);
      ticker_list = [];
      exchange_choose_current="";
      exchange_choose_previous ="";
      startdate_select ="";
      startdate_select_previous="";
      portfolio_data = [];
      test_data = [];
      $("#table_assets > tbody").empty();
      $("#port_data_tbl>tbody").empty();
      $("#pagination-demo").twbsPagination("destroy");
      $("#period_data").val("");
      // $('#ulul').empty();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Porfolio Stock Reseted',
        showConfirmButton: false,
        timer: 1500
      });

    }

    function create_test_data() {      
      if(portfolio_data.length < 30) {
          Swal.fire(
            'Portfolio < 30 Stocks !',
            'Please select more stocks',
            'warning'
          )
          return false;
      } else if(test_data.length > 0) {        
          Swal.fire(
            'Portfolio data already',
            'Please click reset to start new',
            'warning'
          )
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
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Market Data Created',
        showConfirmButton: false,
        timer: 1500
      })
    }

function clearData() {
  localStorage.removeItem("selected");
  localStorage.removeItem("tgl_done");
  localStorage.removeItem("tgl_max");
  localStorage.removeItem("tgl_min");
  localStorage.removeItem("data_all");
  localStorage.removeItem("dataAnak");
  localStorage.removeItem("data_anak");
  localStorage.removeItem("all_data");
  $("#v-pills-tab").html("");
  $("#data_csv").html("");
  $("#row_anak").html("");
}

function play() {

    endpoint = 'http://localhost/rasio_server/api/post.php'//https://quantxi.com/api.php
    endpoint2 = 'http://localhost/rasio_server/api/reset.php'//https://quantxi.com/api.php
    api_key = sessionStorage.getItem("api");
    massa = $("#massa2").val();//ambil angka massa di form setting
    bobot1 = $("#bobot1").val();//ambil angka bobot1 di form setting
    bobot2 = $("#bobot2").val();//ambil angka bobot2 di form setting
    indeX = $("#index").val();//ambil angka indeX di form setting
    rate = $("#rate").val();//ambil angka rate di form setting
    massafix = $("#massa_fix").val();//ambil angka rate di form setting
    maintmassa = $("#maint_massa").val();//ambil angka rate di form setting
    max_datapost = $("#max_data_post").val();//ambil angka rate di form setting

    //data
    data_anak = JSON.parse(localStorage.data_anak);
    data_anak.shift();
    max = data_anak.length;
    //start date
    start_date = $("#start_date").val();//ambil angka di inputan start date di dashboard

    //data awal
    data_id = 1;
    // data_id_out = 1;

    berat_anak1_previous = 0;
    berat_anak2_previous = 0;
    berat_anak3_previous = 0;
    berat_anak4_previous = 0;
    berat_anak5_previous = 0;
    berat_anak6_previous = 0;
    berat_anak7_previous = 0;
    berat_anak8_previous = 0;
    berat_anak9_previous = 0;
    berat_anak10_previous = 0;
    berat_anak11_previous = 0;
    berat_anak12_previous = 0;
    berat_anak13_previous = 0;
    berat_anak14_previous = 0;
    berat_anak15_previous = 0;
    berat_anak16_previous = 0;
    berat_anak17_previous = 0;
    berat_anak18_previous = 0;
    berat_anak19_previous = 0;
    berat_anak20_previous = 0;
    berat_anak21_previous = 0;
    berat_anak22_previous = 0;
    berat_anak23_previous = 0;
    berat_anak24_previous = 0;
    berat_anak25_previous = 0;
    berat_anak26_previous = 0;
    berat_anak27_previous = 0;
    berat_anak28_previous = 0;
    berat_anak29_previous = 0;
    berat_anak30_previous = 0;

    total_rasio_anak1 = 0;
    total_rasio_anak2 = 0;
    total_rasio_anak3 = 0;
    total_rasio_anak4 = 0;
    total_rasio_anak5 = 0;
    total_rasio_anak6 = 0;
    total_rasio_anak7 = 0;
    total_rasio_anak8 = 0;
    total_rasio_anak9 = 0;
    total_rasio_anak10 = 0;
    total_rasio_anak11 = 0;
    total_rasio_anak12 = 0;
    total_rasio_anak13 = 0;
    total_rasio_anak14 = 0;
    total_rasio_anak15 = 0;
    total_rasio_anak16 = 0;
    total_rasio_anak17 = 0;
    total_rasio_anak18 = 0;
    total_rasio_anak19 = 0;
    total_rasio_anak20 = 0;
    total_rasio_anak21 = 0;
    total_rasio_anak22 = 0;
    total_rasio_anak23 = 0;
    total_rasio_anak24 = 0;
    total_rasio_anak25 = 0;
    total_rasio_anak26 = 0;
    total_rasio_anak27 = 0;
    total_rasio_anak28 = 0;
    total_rasio_anak29 = 0;
    total_rasio_anak30 = 0;

    total_porsi2 = 0;

    hasil_kelompok = new Array();
    rasio_anak_kelompok = new Array();
    rasio_anak1_details = new Array();
    rasio_anak2_details = new Array();
    rasio_anak3_details = new Array();
    rasio_anak4_details = new Array();
    rasio_anak5_details = new Array();
    rasio_anak6_details = new Array();
    rasio_anak7_details = new Array();
    rasio_anak8_details = new Array();
    rasio_anak9_details = new Array();
    rasio_anak10_details = new Array();
    rasio_anak11_details = new Array();
    rasio_anak12_details = new Array();
    rasio_anak13_details = new Array();
    rasio_anak14_details = new Array();
    rasio_anak15_details = new Array();
    rasio_anak16_details = new Array();
    rasio_anak17_details = new Array();
    rasio_anak18_details = new Array();
    rasio_anak19_details = new Array();
    rasio_anak20_details = new Array();
    rasio_anak21_details = new Array();
    rasio_anak22_details = new Array();
    rasio_anak23_details = new Array();
    rasio_anak24_details = new Array();
    rasio_anak25_details = new Array();
    rasio_anak26_details = new Array();
    rasio_anak27_details = new Array();
    rasio_anak28_details = new Array();
    rasio_anak29_details = new Array();
    rasio_anak30_details = new Array();
    perbandingan_rasio = new Array();

  if(max < 2000) {
    alertFn("error", `data anda kurang dari 2000 data baris`);
    return false;
  } else if (massa < 100000) {
    alertFn("error", `massa kurang dr 100000`);
    return false;
  } else if (bobot1 < 0.001) {
    alertFn("error", `bobot1 kurang dr 0.001`);
    return false;
  } else if (bobot2 < 0.001) {
    alertFn("error", `bobot2 kurang dr 0.001`);
    return false;
  } else if (indeX < 0.01) {
    alertFn("error", `index kurang dr 0.01`);
    return false;
  } else if (rate < 0.01) {
    alertFn("error", `rate kurang dr 0.01`);
    return false;
  } else if (start_date == "") {
    alertFn("error", `startdate belum diisi`);
    return false;
  } else {

      $('#setting_button').attr('disabled',true);
      $('#data_button').attr('disabled',true);
      $('#start_date').attr('disabled',true);
      $('#play_button').attr('disabled',true);
      // $('#refresh_button').attr('disabled',true);
      $('#statistik_button').attr('disabled',true);
      $('#logout_button').attr('disabled',true);
      $('#viewpost_button').attr('disabled',true);
      $('#chart_button').attr('disabled',true);
      $('#portfolio_summary_button').attr('disabled',true);
      $('#assets_details_button').attr('disabled',true);

      // proses();

      $.ajax({
        url: endpoint2+"?api_key="+apikey,
        // contentType: "application/json",
        headers: {'Content-Type': 'application/json'},
        dataType: 'json',
        success: function(result){
          console.log(result);
          if (result.status == "success") {

            proses();

          } else {
            alertFn("error", `ada kesalahan, coba periksa api key anda dan ulang lagi`);
            return false;
          }
        },
        error: function() {

            $('#setting_button').attr('disabled',false);
            $('#data_button').attr('disabled',false);
            $('#start_date').attr('disabled',false);
            $('#play_button').attr('disabled',false);
            // $('#refresh_button').attr('disabled',false);
            $('#statistik_button').attr('disabled',false);
            $('#logout_button').attr('disabled',false);
            $('#viewpost_button').attr('disabled',false);
            $('#chart_button').attr('disabled',false);
            $('#portfolio_summary_button').attr('disabled',false);
            $('#assets_details_button').attr('disabled',false);

            alertFn("error", `koneksi ke server gagal, coba beberapa saat lagi`);
            return false;
        }
      })

    }
  }

//   var to;
// function timer() {
//    to = setTimeout(proses, 1/100);
// }
// function stoptimer() {
//   clearTimeout(to);
// }


function proses() {
  // console.log(to);
  to = setTimeout(proses, 1/10000);
  // var hasil ={};
  if (data_id < max) {

    data_rasio = new Array ();
    data_rasio_anak1 = new Array ();

    tanggal = data_anak[data_id-1][0];

    berat_anak1 = data_anak[data_id-1][1];
    berat_anak2 = data_anak[data_id-1][2];
    berat_anak3 = data_anak[data_id-1][3];
    berat_anak4 = data_anak[data_id-1][4];
    berat_anak5 = data_anak[data_id-1][5];
    berat_anak6 = data_anak[data_id-1][6];
    berat_anak7 = data_anak[data_id-1][7];
    berat_anak8 = data_anak[data_id-1][8];
    berat_anak9 = data_anak[data_id-1][9];
    berat_anak10 = data_anak[data_id-1][10];
    berat_anak11 = data_anak[data_id-1][11];
    berat_anak12 = data_anak[data_id-1][12];
    berat_anak13 = data_anak[data_id-1][13];
    berat_anak14 = data_anak[data_id-1][14];
    berat_anak15 = data_anak[data_id-1][15];
    berat_anak16 = data_anak[data_id-1][16];
    berat_anak17 = data_anak[data_id-1][17];
    berat_anak18 = data_anak[data_id-1][18];
    berat_anak19 = data_anak[data_id-1][19];
    berat_anak20 = data_anak[data_id-1][20];
    berat_anak21 = data_anak[data_id-1][21];
    berat_anak22 = data_anak[data_id-1][22];
    berat_anak23 = data_anak[data_id-1][23];
    berat_anak24 = data_anak[data_id-1][24];
    berat_anak25 = data_anak[data_id-1][25];
    berat_anak26 = data_anak[data_id-1][26];
    berat_anak27 = data_anak[data_id-1][27];
    berat_anak28 = data_anak[data_id-1][28];
    berat_anak29 = data_anak[data_id-1][29];
    berat_anak30 = data_anak[data_id-1][30];

    total_brtr_anak1 = berat_anak1 * total_rasio_anak1;
    total_brtr_anak2 = berat_anak2 * total_rasio_anak2;
    total_brtr_anak3 = berat_anak3 * total_rasio_anak3;
    total_brtr_anak4 = berat_anak4 * total_rasio_anak4;
    total_brtr_anak5 = berat_anak5 * total_rasio_anak5;
    total_brtr_anak6 = berat_anak6 * total_rasio_anak6;
    total_brtr_anak7 = berat_anak7 * total_rasio_anak7;
    total_brtr_anak8 = berat_anak8 * total_rasio_anak8;
    total_brtr_anak9 = berat_anak9 * total_rasio_anak9;
    total_brtr_anak10 = berat_anak10 * total_rasio_anak10;
    total_brtr_anak11 = berat_anak11 * total_rasio_anak11;
    total_brtr_anak12 = berat_anak12 * total_rasio_anak12;
    total_brtr_anak13 = berat_anak13 * total_rasio_anak13;
    total_brtr_anak14 = berat_anak14 * total_rasio_anak14;
    total_brtr_anak15 = berat_anak15 * total_rasio_anak15;
    total_brtr_anak16 = berat_anak16 * total_rasio_anak16;
    total_brtr_anak17 = berat_anak17 * total_rasio_anak17;
    total_brtr_anak18 = berat_anak18 * total_rasio_anak18;
    total_brtr_anak19 = berat_anak19 * total_rasio_anak19;
    total_brtr_anak20 = berat_anak20 * total_rasio_anak20;
    total_brtr_anak21 = berat_anak21 * total_rasio_anak21;
    total_brtr_anak22 = berat_anak22 * total_rasio_anak22;
    total_brtr_anak23 = berat_anak23 * total_rasio_anak23;
    total_brtr_anak24 = berat_anak24 * total_rasio_anak24;
    total_brtr_anak25 = berat_anak25 * total_rasio_anak25;
    total_brtr_anak26 = berat_anak26 * total_rasio_anak26;
    total_brtr_anak27 = berat_anak27 * total_rasio_anak27;
    total_brtr_anak28 = berat_anak28 * total_rasio_anak28;
    total_brtr_anak29 = berat_anak29 * total_rasio_anak29;
    total_brtr_anak30 = berat_anak30 * total_rasio_anak30;

    total_brtr = total_brtr_anak1 + total_brtr_anak2 + total_brtr_anak3 + total_brtr_anak4 + total_brtr_anak5 + total_brtr_anak6 + total_brtr_anak7 + total_brtr_anak8 + total_brtr_anak9 + total_brtr_anak10 +  total_brtr_anak11 + total_brtr_anak12+ total_brtr_anak13 + total_brtr_anak14 + total_brtr_anak15 + total_brtr_anak16 + total_brtr_anak17 + total_brtr_anak18 + total_brtr_anak19 + total_brtr_anak20 + total_brtr_anak21 + total_brtr_anak22 + total_brtr_anak23 + total_brtr_anak24 + total_brtr_anak25 + total_brtr_anak26 + total_brtr_anak27 + total_brtr_anak28 + total_brtr_anak29 + total_brtr_anak30;

    selisih_harian = (total_rasio_anak1 * (berat_anak1-berat_anak1_previous))+(total_rasio_anak2 * (berat_anak2-berat_anak2_previous))+(total_rasio_anak3 * (berat_anak3-berat_anak3_previous))+(total_rasio_anak4 * (berat_anak4-berat_anak4_previous))+(total_rasio_anak5 * (berat_anak5-berat_anak5_previous))+(total_rasio_anak6 * (berat_anak6-berat_anak6_previous))+(total_rasio_anak7 * (berat_anak7-berat_anak7_previous))+(total_rasio_anak8 * (berat_anak8-berat_anak8_previous))+(total_rasio_anak9 * (berat_anak9-berat_anak9_previous))+(total_rasio_anak10 * (berat_anak10-berat_anak10_previous))+(total_rasio_anak11 * (berat_anak11-berat_anak11_previous))+(total_rasio_anak12 * (berat_anak12-berat_anak12_previous))+(total_rasio_anak13 * (berat_anak13-berat_anak13_previous))+(total_rasio_anak14 * (berat_anak14-berat_anak14_previous))+(total_rasio_anak15 * (berat_anak15-berat_anak15_previous))+(total_rasio_anak16 * (berat_anak16-berat_anak16_previous))+(total_rasio_anak17 * (berat_anak17-berat_anak17_previous))+(total_rasio_anak18 * (berat_anak18-berat_anak18_previous))+(total_rasio_anak19 * (berat_anak19-berat_anak19_previous))+(total_rasio_anak20 * (berat_anak20-berat_anak20_previous))+(total_rasio_anak21 * (berat_anak21-berat_anak21_previous))+(total_rasio_anak22 * (berat_anak22-berat_anak22_previous))+(total_rasio_anak23 * (berat_anak23-berat_anak23_previous))+(total_rasio_anak24 * (berat_anak24-berat_anak24_previous))+(total_rasio_anak25 * (berat_anak25-berat_anak25_previous))+(total_rasio_anak26 * (berat_anak26-berat_anak26_previous))+(total_rasio_anak27 * (berat_anak27-berat_anak27_previous))+(total_rasio_anak28 * (berat_anak28-berat_anak28_previous))+(total_rasio_anak29 * (berat_anak29-berat_anak29_previous))+(total_rasio_anak30 * (berat_anak30-berat_anak30_previous));

    // console.log(total_porsi2);
    index_harian = total_porsi2 * (indeX/360);

    massa = massa + selisih_harian - index_harian;

    massa_fix = total_brtr * massafix;

    index_massa = massa - massa_fix;


    $.ajax({
      url:
      endpoint+"?api_key="+apikey+"&data_id="+data_id+"&massa="+total_brtr+"&berat_rata2_anak1="+berat_anak1+"&total_rasio_anak1=10&berat_rata2_anak2="+berat_anak2+"&total_rasio_anak2=10&berat_rata2_anak3=10&total_rasio_anak3=10&berat_rata2_anak4=10&total_rasio_anak4=10&berat_rata2_anak5=10&total_rasio_anak5=10&berat_rata2_anak6=10&total_rasio_anak6=10&berat_rata2_anak7=10&total_rasio_anak7=10&berat_rata2_anak8=10&total_rasio_anak8=10&berat_rata2_anak9=10&total_rasio_anak9=10&berat_rata2_anak10=10&total_rasio_anak10=10&berat_rata2_anak11=10&total_rasio_anak11=10&berat_rata2_anak12=10&total_rasio_anak12=10&berat_rata2_anak13=10&total_rasio_anak13=10&berat_rata2_anak14=10&total_rasio_anak14=10&berat_rata2_anak15=10&total_rasio_anak15=10&berat_rata2_anak16=10&total_rasio_anak16=10&berat_rata2_anak17=10&total_rasio_anak17=10&berat_rata2_anak18=10&total_rasio_anak18=10&berat_rata2_anak19=10&total_rasio_anak19=10&berat_rata2_anak20=10&total_rasio_anak20=10&berat_rata2_anak21=10&total_rasio_anak21=10&berat_rata2_anak22=10&total_rasio_anak22=10&berat_rata2_anak23=10&total_rasio_anak23=10&berat_rata2_anak24=10&total_rasio_anak24=10&berat_rata2_anak25=10&total_rasio_anak25=10&berat_rata2_anak26=10&total_rasio_anak26=10&berat_rata2_anak27=10&total_rasio_anak27=10&berat_rata2_anak28=10&total_rasio_anak28=10&berat_rata2_anak29=10&total_rasio_anak29=10&berat_rata2_anak30=10&total_rasio_anak30=10",
      // contentType: "application/json",
      headers: {'Content-Type': 'application/json'},
      dataType: 'json',
      success: function(result){


        // console.log(result);
        // console.log(data_id);

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

      pola_anak1 = "Tambah";
      pola_anak2 = "Tambah";
      pola_anak3 = "Tambah";
      pola_anak4 = "Tambah";
      pola_anak5 = "Tambah";
      pola_anak6 = "Tambah";
      pola_anak7 = "Tambah";
      pola_anak8 = "Tambah";
      pola_anak9 = "Tambah";
      pola_anak10 = "Tambah";
      pola_anak11 = "Tambah";
      pola_anak12 = "Tambah";
      pola_anak13 = "Tambah";
      pola_anak14 = "Tambah";
      pola_anak15 = "Tambah";
      pola_anak16 = "Tambah";
      pola_anak17 = "Tambah";
      pola_anak18 = "Tambah";
      pola_anak19 = "Tambah";
      pola_anak20 = "Tambah";
      pola_anak21 = "Tambah";
      pola_anak22 = "Tambah";
      pola_anak23 = "Tambah";
      pola_anak24 = "Tambah";
      pola_anak25 = "Tambah";
      pola_anak26 = "Tambah";
      pola_anak27 = "Tambah";
      pola_anak28 = "Tambah";
      pola_anak29 = "Tambah";
      pola_anak30 = "Tambah";

      rasio_berat_tambah_anak1 = 10;
      rasio_berat_tambah_anak2 = 10;
      rasio_berat_tambah_anak3 = 10;
      rasio_berat_tambah_anak4 = 10;
      rasio_berat_tambah_anak5 = 10;
      rasio_berat_tambah_anak6 = 10;
      rasio_berat_tambah_anak7 = 10;
      rasio_berat_tambah_anak8 = 10;
      rasio_berat_tambah_anak9 = 10;
      rasio_berat_tambah_anak10 = 10;
      rasio_berat_tambah_anak11 = 10;
      rasio_berat_tambah_anak12 = 10;
      rasio_berat_tambah_anak13 = 10;
      rasio_berat_tambah_anak14 = 10;
      rasio_berat_tambah_anak15 = 10;
      rasio_berat_tambah_anak16 = 10;
      rasio_berat_tambah_anak17 = 10;
      rasio_berat_tambah_anak18 = 10;
      rasio_berat_tambah_anak19 = 10;
      rasio_berat_tambah_anak20 = 10;
      rasio_berat_tambah_anak21 = 10;
      rasio_berat_tambah_anak22 = 10;
      rasio_berat_tambah_anak23 = 10;
      rasio_berat_tambah_anak24 = 10;
      rasio_berat_tambah_anak25 = 10;
      rasio_berat_tambah_anak26 = 10;
      rasio_berat_tambah_anak27 = 10;
      rasio_berat_tambah_anak28 = 10;
      rasio_berat_tambah_anak29 = 10;
      rasio_berat_tambah_anak30 = 10;

      rasio_berat_kurang_anak1 = 10;
      rasio_berat_kurang_anak2 = 10;
      rasio_berat_kurang_anak3 = 10;
      rasio_berat_kurang_anak4 = 10;
      rasio_berat_kurang_anak5 = 10;
      rasio_berat_kurang_anak6 = 10;
      rasio_berat_kurang_anak7 = 10;
      rasio_berat_kurang_anak8 = 10;
      rasio_berat_kurang_anak9 = 10;
      rasio_berat_kurang_anak10 = 10;
      rasio_berat_kurang_anak11 = 10;
      rasio_berat_kurang_anak12 = 10;
      rasio_berat_kurang_anak13 = 10;
      rasio_berat_kurang_anak14 = 10;
      rasio_berat_kurang_anak15 = 10;
      rasio_berat_kurang_anak16 = 10;
      rasio_berat_kurang_anak17 = 10;
      rasio_berat_kurang_anak18 = 10;
      rasio_berat_kurang_anak19 = 10;
      rasio_berat_kurang_anak20 = 10;
      rasio_berat_kurang_anak21 = 10;
      rasio_berat_kurang_anak22 = 10;
      rasio_berat_kurang_anak23 = 10;
      rasio_berat_kurang_anak24 = 10;
      rasio_berat_kurang_anak25 = 10;
      rasio_berat_kurang_anak26 = 10;
      rasio_berat_kurang_anak27 = 10;
      rasio_berat_kurang_anak28 = 10;
      rasio_berat_kurang_anak29 = 10;
      rasio_berat_kurang_anak30 = 10;

      br_tambah_anak1 = berat_anak1 * rasio_berat_tambah_anak1;
      br_tambah_anak2 = berat_anak2 * rasio_berat_tambah_anak2;
      br_tambah_anak3 = berat_anak3 * rasio_berat_tambah_anak3;
      br_tambah_anak4 = berat_anak4 * rasio_berat_tambah_anak4;
      br_tambah_anak5 = berat_anak5 * rasio_berat_tambah_anak5;
      br_tambah_anak6 = berat_anak6 * rasio_berat_tambah_anak6;
      br_tambah_anak7 = berat_anak7 * rasio_berat_tambah_anak7;
      br_tambah_anak8 = berat_anak8 * rasio_berat_tambah_anak8;
      br_tambah_anak9 = berat_anak9 * rasio_berat_tambah_anak9;
      br_tambah_anak10 = berat_anak10 * rasio_berat_tambah_anak10;
      br_tambah_anak11 = berat_anak11 * rasio_berat_tambah_anak11;
      br_tambah_anak12 = berat_anak12 * rasio_berat_tambah_anak12;
      br_tambah_anak13 = berat_anak13 * rasio_berat_tambah_anak13;
      br_tambah_anak14 = berat_anak14 * rasio_berat_tambah_anak14;
      br_tambah_anak15 = berat_anak15 * rasio_berat_tambah_anak15;
      br_tambah_anak16 = berat_anak16 * rasio_berat_tambah_anak16;
      br_tambah_anak17 = berat_anak17 * rasio_berat_tambah_anak17;
      br_tambah_anak18 = berat_anak18 * rasio_berat_tambah_anak18;
      br_tambah_anak19 = berat_anak19 * rasio_berat_tambah_anak19;
      br_tambah_anak20 = berat_anak20 * rasio_berat_tambah_anak20;
      br_tambah_anak21 = berat_anak21 * rasio_berat_tambah_anak21;
      br_tambah_anak22 = berat_anak22 * rasio_berat_tambah_anak22;
      br_tambah_anak23 = berat_anak23 * rasio_berat_tambah_anak23;
      br_tambah_anak24 = berat_anak24 * rasio_berat_tambah_anak24;
      br_tambah_anak25 = berat_anak25 * rasio_berat_tambah_anak25;
      br_tambah_anak26 = berat_anak26 * rasio_berat_tambah_anak26;
      br_tambah_anak27 = berat_anak27 * rasio_berat_tambah_anak27;
      br_tambah_anak28 = berat_anak28 * rasio_berat_tambah_anak28;
      br_tambah_anak29 = berat_anak29 * rasio_berat_tambah_anak29;
      br_tambah_anak30 = berat_anak30 * rasio_berat_tambah_anak30;

      br_kurang_anak1 = berat_anak1 * rasio_berat_kurang_anak1;
      br_kurang_anak2 = berat_anak2 * rasio_berat_kurang_anak2;
      br_kurang_anak3 = berat_anak3 * rasio_berat_kurang_anak3;
      br_kurang_anak4 = berat_anak4 * rasio_berat_kurang_anak4;
      br_kurang_anak5 = berat_anak5 * rasio_berat_kurang_anak5;
      br_kurang_anak6 = berat_anak6 * rasio_berat_kurang_anak6;
      br_kurang_anak7 = berat_anak7 * rasio_berat_kurang_anak7;
      br_kurang_anak8 = berat_anak8 * rasio_berat_kurang_anak8;
      br_kurang_anak9 = berat_anak9 * rasio_berat_kurang_anak9;
      br_kurang_anak10 = berat_anak10 * rasio_berat_kurang_anak10;
      br_kurang_anak11 = berat_anak11 * rasio_berat_kurang_anak11;
      br_kurang_anak12 = berat_anak12 * rasio_berat_kurang_anak12;
      br_kurang_anak13 = berat_anak13 * rasio_berat_kurang_anak13;
      br_kurang_anak14 = berat_anak14 * rasio_berat_kurang_anak14;
      br_kurang_anak15 = berat_anak15 * rasio_berat_kurang_anak15;
      br_kurang_anak16 = berat_anak16 * rasio_berat_kurang_anak16;
      br_kurang_anak17 = berat_anak17 * rasio_berat_kurang_anak17;
      br_kurang_anak18 = berat_anak18 * rasio_berat_kurang_anak18;
      br_kurang_anak19 = berat_anak19 * rasio_berat_kurang_anak19;
      br_kurang_anak20 = berat_anak20 * rasio_berat_kurang_anak20;
      br_kurang_anak21 = berat_anak21 * rasio_berat_kurang_anak21;
      br_kurang_anak22 = berat_anak22 * rasio_berat_kurang_anak22;
      br_kurang_anak23 = berat_anak23 * rasio_berat_kurang_anak23;
      br_kurang_anak24 = berat_anak24 * rasio_berat_kurang_anak24;
      br_kurang_anak25 = berat_anak25 * rasio_berat_kurang_anak25;
      br_kurang_anak26 = berat_anak26 * rasio_berat_kurang_anak26;
      br_kurang_anak27 = berat_anak27 * rasio_berat_kurang_anak27;
      br_kurang_anak28 = berat_anak28 * rasio_berat_kurang_anak28;
      br_kurang_anak29 = berat_anak29 * rasio_berat_kurang_anak29;
      br_kurang_anak30 = berat_anak30 * rasio_berat_kurang_anak30;

      br_tambah = br_tambah_anak1 + br_tambah_anak2 + br_tambah_anak3 + br_tambah_anak4 + br_tambah_anak5 + br_tambah_anak6 + br_tambah_anak7 + br_tambah_anak8 + br_tambah_anak9 + br_tambah_anak10 + br_tambah_anak11 + br_tambah_anak12 + br_tambah_anak13 + br_tambah_anak14 + br_tambah_anak15 + br_tambah_anak16 + br_tambah_anak17 + br_tambah_anak18 + br_tambah_anak19 + br_tambah_anak20 +br_tambah_anak21 + br_tambah_anak22 + br_tambah_anak23 + br_tambah_anak24 + br_tambah_anak25 + br_tambah_anak26 + br_tambah_anak27 + br_tambah_anak28 + br_tambah_anak29 + br_tambah_anak30;

      br_kurang = br_kurang_anak1 + br_kurang_anak2 + br_kurang_anak3 + br_kurang_anak4 + br_kurang_anak5 + br_kurang_anak6 + br_kurang_anak7 + br_kurang_anak8 + br_kurang_anak9 + br_kurang_anak10 + br_kurang_anak11 + br_kurang_anak12 + br_kurang_anak13 + br_kurang_anak14 + br_kurang_anak15 + br_kurang_anak16 + br_kurang_anak17 + br_kurang_anak18 + br_kurang_anak19 + br_kurang_anak20 +br_kurang_anak21 + br_kurang_anak22 + br_kurang_anak23 + br_kurang_anak24 + br_kurang_anak25 + br_kurang_anak26 + br_kurang_anak27 + br_kurang_anak28 + br_kurang_anak29 + br_kurang_anak30;

      porsi1_tambah_anak1 = br_tambah_anak1 * massafix;
      porsi1_tambah_anak2 = br_tambah_anak2 * massafix;
      porsi1_tambah_anak3 = br_tambah_anak3 * massafix;
      porsi1_tambah_anak4 = br_tambah_anak4 * massafix;
      porsi1_tambah_anak5 = br_tambah_anak5 * massafix;
      porsi1_tambah_anak6 = br_tambah_anak6 * massafix;
      porsi1_tambah_anak7 = br_tambah_anak7 * massafix;
      porsi1_tambah_anak8 = br_tambah_anak8 * massafix;
      porsi1_tambah_anak9 = br_tambah_anak9 * massafix;
      porsi1_tambah_anak10 = br_tambah_anak10 * massafix;
      porsi1_tambah_anak11 = br_tambah_anak11 * massafix;
      porsi1_tambah_anak12 = br_tambah_anak12 * massafix;
      porsi1_tambah_anak13 = br_tambah_anak13 * massafix;
      porsi1_tambah_anak14 = br_tambah_anak14 * massafix;
      porsi1_tambah_anak15 = br_tambah_anak15 * massafix;
      porsi1_tambah_anak16 = br_tambah_anak16 * massafix;
      porsi1_tambah_anak17 = br_tambah_anak17 * massafix;
      porsi1_tambah_anak18 = br_tambah_anak18 * massafix;
      porsi1_tambah_anak19 = br_tambah_anak19 * massafix;
      porsi1_tambah_anak20 = br_tambah_anak20 * massafix;
      porsi1_tambah_anak21 = br_tambah_anak21 * massafix;
      porsi1_tambah_anak22 = br_tambah_anak22 * massafix;
      porsi1_tambah_anak23 = br_tambah_anak23 * massafix;
      porsi1_tambah_anak24 = br_tambah_anak24 * massafix;
      porsi1_tambah_anak25 = br_tambah_anak25 * massafix;
      porsi1_tambah_anak26 = br_tambah_anak26 * massafix;
      porsi1_tambah_anak27 = br_tambah_anak27 * massafix;
      porsi1_tambah_anak28 = br_tambah_anak28 * massafix;
      porsi1_tambah_anak29 = br_tambah_anak29 * massafix;
      porsi1_tambah_anak30 = br_tambah_anak30 * massafix;

      porsi1_kurang_anak1 = br_kurang_anak1 * massafix;
      porsi1_kurang_anak2 = br_kurang_anak2 * massafix;
      porsi1_kurang_anak3 = br_kurang_anak3 * massafix;
      porsi1_kurang_anak4 = br_kurang_anak4 * massafix;
      porsi1_kurang_anak5 = br_kurang_anak5 * massafix;
      porsi1_kurang_anak6 = br_kurang_anak6 * massafix;
      porsi1_kurang_anak7 = br_kurang_anak7 * massafix;
      porsi1_kurang_anak8 = br_kurang_anak8 * massafix;
      porsi1_kurang_anak9 = br_kurang_anak9 * massafix;
      porsi1_kurang_anak10 = br_kurang_anak10 * massafix;
      porsi1_kurang_anak11 = br_kurang_anak11 * massafix;
      porsi1_kurang_anak12 = br_kurang_anak12 * massafix;
      porsi1_kurang_anak13 = br_kurang_anak13 * massafix;
      porsi1_kurang_anak14 = br_kurang_anak14 * massafix;
      porsi1_kurang_anak15 = br_kurang_anak15 * massafix;
      porsi1_kurang_anak16 = br_kurang_anak16 * massafix;
      porsi1_kurang_anak17 = br_kurang_anak17 * massafix;
      porsi1_kurang_anak18 = br_kurang_anak18 * massafix;
      porsi1_kurang_anak19 = br_kurang_anak19 * massafix;
      porsi1_kurang_anak20 = br_kurang_anak20 * massafix;
      porsi1_kurang_anak21 = br_kurang_anak21 * massafix;
      porsi1_kurang_anak22 = br_kurang_anak22 * massafix;
      porsi1_kurang_anak23 = br_kurang_anak23 * massafix;
      porsi1_kurang_anak24 = br_kurang_anak24 * massafix;
      porsi1_kurang_anak25 = br_kurang_anak25 * massafix;
      porsi1_kurang_anak26 = br_kurang_anak26 * massafix;
      porsi1_kurang_anak27 = br_kurang_anak27 * massafix;
      porsi1_kurang_anak28 = br_kurang_anak28 * massafix;
      porsi1_kurang_anak29 = br_kurang_anak29 * massafix;
      porsi1_kurang_anak30 = br_kurang_anak30 * massafix;

      porsi1_tambah = porsi1_tambah_anak1 + porsi1_tambah_anak2 + porsi1_tambah_anak3 + porsi1_tambah_anak4 + porsi1_tambah_anak5 + porsi1_tambah_anak6 + porsi1_tambah_anak7 + porsi1_tambah_anak8 + porsi1_tambah_anak9 + porsi1_tambah_anak10 + porsi1_tambah_anak11 + porsi1_tambah_anak12 + porsi1_tambah_anak13 + porsi1_tambah_anak14 + porsi1_tambah_anak15 + porsi1_tambah_anak16 + porsi1_tambah_anak17 + porsi1_tambah_anak18 + porsi1_tambah_anak19 + porsi1_tambah_anak20 + porsi1_tambah_anak21 + porsi1_tambah_anak22 + porsi1_tambah_anak23 + porsi1_tambah_anak24 + porsi1_tambah_anak25 + porsi1_tambah_anak26 + porsi1_tambah_anak27 + porsi1_tambah_anak28 + porsi1_tambah_anak29 + porsi1_tambah_anak30;

      porsi1_kurang = porsi1_kurang_anak1 + porsi1_kurang_anak2 + porsi1_kurang_anak3 + porsi1_kurang_anak4 + porsi1_kurang_anak5 + porsi1_kurang_anak6 + porsi1_kurang_anak7 + porsi1_kurang_anak8 + porsi1_kurang_anak9 + porsi1_kurang_anak10 + porsi1_kurang_anak11 + porsi1_kurang_anak12 + porsi1_kurang_anak13 + porsi1_kurang_anak14 + porsi1_kurang_anak15 + porsi1_kurang_anak16 + porsi1_kurang_anak17 + porsi1_kurang_anak18 + porsi1_kurang_anak19 + porsi1_kurang_anak20 + porsi1_kurang_anak21 + porsi1_kurang_anak22 + porsi1_kurang_anak23 + porsi1_kurang_anak24 + porsi1_kurang_anak25 + porsi1_kurang_anak26 + porsi1_kurang_anak27 + porsi1_kurang_anak28 + porsi1_kurang_anak29 + porsi1_kurang_anak30;

      porsi2_tambah_anak1 = br_tambah_anak1 * massafix;
      porsi2_tambah_anak2 = br_tambah_anak2 * massafix;
      porsi2_tambah_anak3 = br_tambah_anak3 * massafix;
      porsi2_tambah_anak4 = br_tambah_anak4 * massafix;
      porsi2_tambah_anak5 = br_tambah_anak5 * massafix;
      porsi2_tambah_anak6 = br_tambah_anak6 * massafix;
      porsi2_tambah_anak7 = br_tambah_anak7 * massafix;
      porsi2_tambah_anak8 = br_tambah_anak8 * massafix;
      porsi2_tambah_anak9 = br_tambah_anak9 * massafix;
      porsi2_tambah_anak10 = br_tambah_anak10 * massafix;
      porsi2_tambah_anak11 = br_tambah_anak11 * massafix;
      porsi2_tambah_anak12 = br_tambah_anak12 * massafix;
      porsi2_tambah_anak13 = br_tambah_anak13 * massafix;
      porsi2_tambah_anak14 = br_tambah_anak14 * massafix;
      porsi2_tambah_anak15 = br_tambah_anak15 * massafix;
      porsi2_tambah_anak16 = br_tambah_anak16 * massafix;
      porsi2_tambah_anak17 = br_tambah_anak17 * massafix;
      porsi2_tambah_anak18 = br_tambah_anak18 * massafix;
      porsi2_tambah_anak19 = br_tambah_anak19 * massafix;
      porsi2_tambah_anak20 = br_tambah_anak20 * massafix;
      porsi2_tambah_anak21 = br_tambah_anak21 * massafix;
      porsi2_tambah_anak22 = br_tambah_anak22 * massafix;
      porsi2_tambah_anak23 = br_tambah_anak23 * massafix;
      porsi2_tambah_anak24 = br_tambah_anak24 * massafix;
      porsi2_tambah_anak25 = br_tambah_anak25 * massafix;
      porsi2_tambah_anak26 = br_tambah_anak26 * massafix;
      porsi2_tambah_anak27 = br_tambah_anak27 * massafix;
      porsi2_tambah_anak28 = br_tambah_anak28 * massafix;
      porsi2_tambah_anak29 = br_tambah_anak29 * massafix;
      porsi2_tambah_anak30 = br_tambah_anak30 * massafix;

      porsi2_kurang_anak1 = br_kurang_anak1 * massafix;
      porsi2_kurang_anak2 = br_kurang_anak2 * massafix;
      porsi2_kurang_anak3 = br_kurang_anak3 * massafix;
      porsi2_kurang_anak4 = br_kurang_anak4 * massafix;
      porsi2_kurang_anak5 = br_kurang_anak5 * massafix;
      porsi2_kurang_anak6 = br_kurang_anak6 * massafix;
      porsi2_kurang_anak7 = br_kurang_anak7 * massafix;
      porsi2_kurang_anak8 = br_kurang_anak8 * massafix;
      porsi2_kurang_anak9 = br_kurang_anak9 * massafix;
      porsi2_kurang_anak10 = br_kurang_anak10 * massafix;
      porsi2_kurang_anak11 = br_kurang_anak11 * massafix;
      porsi2_kurang_anak12 = br_kurang_anak12 * massafix;
      porsi2_kurang_anak13 = br_kurang_anak13 * massafix;
      porsi2_kurang_anak14 = br_kurang_anak14 * massafix;
      porsi2_kurang_anak15 = br_kurang_anak15 * massafix;
      porsi2_kurang_anak16 = br_kurang_anak16 * massafix;
      porsi2_kurang_anak17 = br_kurang_anak17 * massafix;
      porsi2_kurang_anak18 = br_kurang_anak18 * massafix;
      porsi2_kurang_anak19 = br_kurang_anak19 * massafix;
      porsi2_kurang_anak20 = br_kurang_anak20 * massafix;
      porsi2_kurang_anak21 = br_kurang_anak21 * massafix;
      porsi2_kurang_anak22 = br_kurang_anak22 * massafix;
      porsi2_kurang_anak23 = br_kurang_anak23 * massafix;
      porsi2_kurang_anak24 = br_kurang_anak24 * massafix;
      porsi2_kurang_anak25 = br_kurang_anak25 * massafix;
      porsi2_kurang_anak26 = br_kurang_anak26 * massafix;
      porsi2_kurang_anak27 = br_kurang_anak27 * massafix;
      porsi2_kurang_anak28 = br_kurang_anak28 * massafix;
      porsi2_kurang_anak29 = br_kurang_anak29 * massafix;
      porsi2_kurang_anak30 = br_kurang_anak30 * massafix;

      porsi2_tambah = porsi2_tambah_anak1 + porsi2_tambah_anak2 + porsi2_tambah_anak3 + porsi2_tambah_anak4 + porsi2_tambah_anak5 + porsi2_tambah_anak6 + porsi2_tambah_anak7 + porsi2_tambah_anak8 + porsi2_tambah_anak9 + porsi2_tambah_anak10 + porsi2_tambah_anak11 + porsi2_tambah_anak12 + porsi2_tambah_anak13 + porsi2_tambah_anak14 + porsi2_tambah_anak15 + porsi2_tambah_anak16 + porsi2_tambah_anak17 + porsi2_tambah_anak18 + porsi2_tambah_anak19 + porsi2_tambah_anak20 + porsi2_tambah_anak21 + porsi2_tambah_anak22 + porsi2_tambah_anak23 + porsi2_tambah_anak24 + porsi2_tambah_anak25 + porsi2_tambah_anak26 + porsi2_tambah_anak27 + porsi2_tambah_anak28 + porsi2_tambah_anak29 + porsi2_tambah_anak30;

      porsi2_kurang = porsi2_kurang_anak1 + porsi2_kurang_anak2 + porsi2_kurang_anak3 + porsi2_kurang_anak4 + porsi2_kurang_anak5 + porsi2_kurang_anak6 + porsi2_kurang_anak7 + porsi2_kurang_anak8 + porsi2_kurang_anak9 + porsi2_kurang_anak10 + porsi2_kurang_anak11 + porsi2_kurang_anak12 + porsi2_kurang_anak13 + porsi2_kurang_anak14 + porsi2_kurang_anak15 + porsi2_kurang_anak16 + porsi2_kurang_anak17 + porsi2_kurang_anak18 + porsi2_kurang_anak19 + porsi2_kurang_anak20 + porsi2_kurang_anak21 + porsi2_kurang_anak22 + porsi2_kurang_anak23 + porsi2_kurang_anak24 + porsi2_kurang_anak25 + porsi2_kurang_anak26 + porsi2_kurang_anak27 + porsi2_kurang_anak28 + porsi2_kurang_anak29 + porsi2_kurang_anak30;

      bobot_tambah_anak1 = br_tambah_anak1 * (bobot1 + bobot2);
      bobot_tambah_anak2 = br_tambah_anak2 * (bobot1 + bobot2);
      bobot_tambah_anak3 = br_tambah_anak3 * (bobot1 + bobot2);
      bobot_tambah_anak4 = br_tambah_anak4 * (bobot1 + bobot2);
      bobot_tambah_anak5 = br_tambah_anak5 * (bobot1 + bobot2);
      bobot_tambah_anak6 = br_tambah_anak6 * (bobot1 + bobot2);
      bobot_tambah_anak7 = br_tambah_anak7 * (bobot1 + bobot2);
      bobot_tambah_anak8 = br_tambah_anak8 * (bobot1 + bobot2);
      bobot_tambah_anak9 = br_tambah_anak9 * (bobot1 + bobot2);
      bobot_tambah_anak10 = br_tambah_anak10 * (bobot1 + bobot2);
      bobot_tambah_anak11 = br_tambah_anak11 * (bobot1 + bobot2);
      bobot_tambah_anak12 = br_tambah_anak12 * (bobot1 + bobot2);
      bobot_tambah_anak13 = br_tambah_anak13 * (bobot1 + bobot2);
      bobot_tambah_anak14 = br_tambah_anak14 * (bobot1 + bobot2);
      bobot_tambah_anak15 = br_tambah_anak15 * (bobot1 + bobot2);
      bobot_tambah_anak16 = br_tambah_anak16 * (bobot1 + bobot2);
      bobot_tambah_anak17 = br_tambah_anak17 * (bobot1 + bobot2);
      bobot_tambah_anak18 = br_tambah_anak18 * (bobot1 + bobot2);
      bobot_tambah_anak19 = br_tambah_anak19 * (bobot1 + bobot2);
      bobot_tambah_anak20 = br_tambah_anak20 * (bobot1 + bobot2);
      bobot_tambah_anak21 = br_tambah_anak21 * (bobot1 + bobot2);
      bobot_tambah_anak22 = br_tambah_anak22 * (bobot1 + bobot2);
      bobot_tambah_anak23 = br_tambah_anak23 * (bobot1 + bobot2);
      bobot_tambah_anak24 = br_tambah_anak24 * (bobot1 + bobot2);
      bobot_tambah_anak25 = br_tambah_anak25 * (bobot1 + bobot2);
      bobot_tambah_anak26 = br_tambah_anak26 * (bobot1 + bobot2);
      bobot_tambah_anak27 = br_tambah_anak27 * (bobot1 + bobot2);
      bobot_tambah_anak28 = br_tambah_anak28 * (bobot1 + bobot2);
      bobot_tambah_anak29 = br_tambah_anak29 * (bobot1 + bobot2);
      bobot_tambah_anak30 = br_tambah_anak30 * (bobot1 + bobot2);

      bobot_kurang_anak1 = br_kurang_anak1 * (bobot1 + bobot2);
      bobot_kurang_anak2 = br_kurang_anak2 * (bobot1 + bobot2);
      bobot_kurang_anak3 = br_kurang_anak3 * (bobot1 + bobot2);
      bobot_kurang_anak4 = br_kurang_anak4 * (bobot1 + bobot2);
      bobot_kurang_anak5 = br_kurang_anak5 * (bobot1 + bobot2);
      bobot_kurang_anak6 = br_kurang_anak6 * (bobot1 + bobot2);
      bobot_kurang_anak7 = br_kurang_anak7 * (bobot1 + bobot2);
      bobot_kurang_anak8 = br_kurang_anak8 * (bobot1 + bobot2);
      bobot_kurang_anak9 = br_kurang_anak9 * (bobot1 + bobot2);
      bobot_kurang_anak10 = br_kurang_anak10 * (bobot1 + bobot2);
      bobot_kurang_anak11 = br_kurang_anak11 * (bobot1 + bobot2);
      bobot_kurang_anak12 = br_kurang_anak12 * (bobot1 + bobot2);
      bobot_kurang_anak13 = br_kurang_anak13 * (bobot1 + bobot2);
      bobot_kurang_anak14 = br_kurang_anak14 * (bobot1 + bobot2);
      bobot_kurang_anak15 = br_kurang_anak15 * (bobot1 + bobot2);
      bobot_kurang_anak16 = br_kurang_anak16 * (bobot1 + bobot2);
      bobot_kurang_anak17 = br_kurang_anak17 * (bobot1 + bobot2);
      bobot_kurang_anak18 = br_kurang_anak18 * (bobot1 + bobot2);
      bobot_kurang_anak19 = br_kurang_anak19 * (bobot1 + bobot2);
      bobot_kurang_anak20 = br_kurang_anak20 * (bobot1 + bobot2);
      bobot_kurang_anak21 = br_kurang_anak21 * (bobot1 + bobot2);
      bobot_kurang_anak22 = br_kurang_anak22 * (bobot1 + bobot2);
      bobot_kurang_anak23 = br_kurang_anak23 * (bobot1 + bobot2);
      bobot_kurang_anak24 = br_kurang_anak24 * (bobot1 + bobot2);
      bobot_kurang_anak25 = br_kurang_anak25 * (bobot1 + bobot2);
      bobot_kurang_anak26 = br_kurang_anak26 * (bobot1 + bobot2);
      bobot_kurang_anak27 = br_kurang_anak27 * (bobot1 + bobot2);
      bobot_kurang_anak28 = br_kurang_anak28 * (bobot1 + bobot2);
      bobot_kurang_anak29 = br_kurang_anak29 * (bobot1 + bobot2);
      bobot_kurang_anak30 = br_kurang_anak30 * (bobot1 + bobot2);

      // console.log(bobot_tambah);

      bobot_tambah = bobot_tambah_anak1 + bobot_tambah_anak2 + bobot_tambah_anak3 + bobot_tambah_anak4 + bobot_tambah_anak5 + bobot_tambah_anak6 + bobot_tambah_anak7 + bobot_tambah_anak8 + bobot_tambah_anak9 + bobot_tambah_anak10 + bobot_tambah_anak11 + bobot_tambah_anak12 + bobot_tambah_anak13 + bobot_tambah_anak14 + bobot_tambah_anak15 + bobot_tambah_anak16 + bobot_tambah_anak17 + bobot_tambah_anak18 + bobot_tambah_anak19 + bobot_tambah_anak20 + bobot_tambah_anak21 + bobot_tambah_anak22 + bobot_tambah_anak23 + bobot_tambah_anak24 + bobot_tambah_anak25 + bobot_tambah_anak26 + bobot_tambah_anak27 + bobot_tambah_anak28 + bobot_tambah_anak29 + bobot_tambah_anak30;

      bobot_kurang = bobot_kurang_anak1 + bobot_kurang_anak2 + bobot_kurang_anak3 + bobot_kurang_anak4 + bobot_kurang_anak5 + bobot_kurang_anak6 + bobot_kurang_anak7 + bobot_kurang_anak8 + bobot_kurang_anak9 + bobot_kurang_anak10 + bobot_kurang_anak11 + bobot_kurang_anak12 + bobot_kurang_anak13 + bobot_kurang_anak14 + bobot_kurang_anak15 + bobot_kurang_anak16 + bobot_kurang_anak17 + bobot_kurang_anak18 + bobot_kurang_anak19 + bobot_kurang_anak20 + bobot_kurang_anak21 + bobot_kurang_anak22 + bobot_kurang_anak23 + bobot_kurang_anak24 + bobot_kurang_anak25 + bobot_kurang_anak26 + bobot_kurang_anak27 + bobot_kurang_anak28 + bobot_kurang_anak29 + bobot_kurang_anak30;

      massa = massa - bobot_tambah - bobot_kurang;

      total_rasio_anak1 += (rasio_berat_tambah_anak1 + rasio_berat_kurang_anak1);
      total_rasio_anak2 += (rasio_berat_tambah_anak2 + rasio_berat_kurang_anak2);
      total_rasio_anak3 += (rasio_berat_tambah_anak3 + rasio_berat_kurang_anak3);
      total_rasio_anak4 += (rasio_berat_tambah_anak4 + rasio_berat_kurang_anak4);
      total_rasio_anak5 += (rasio_berat_tambah_anak5 + rasio_berat_kurang_anak5);
      total_rasio_anak6 += (rasio_berat_tambah_anak6 + rasio_berat_kurang_anak6);
      total_rasio_anak7 += (rasio_berat_tambah_anak7 + rasio_berat_kurang_anak7);
      total_rasio_anak8 += (rasio_berat_tambah_anak8 + rasio_berat_kurang_anak8);
      total_rasio_anak9 += (rasio_berat_tambah_anak9 + rasio_berat_kurang_anak9);
      total_rasio_anak10 += (rasio_berat_tambah_anak10 + rasio_berat_kurang_anak10);
      total_rasio_anak11 += (rasio_berat_tambah_anak11 + rasio_berat_kurang_anak11);
      total_rasio_anak12 += (rasio_berat_tambah_anak12 + rasio_berat_kurang_anak12);
      total_rasio_anak13 += (rasio_berat_tambah_anak13 + rasio_berat_kurang_anak13);
      total_rasio_anak14 += (rasio_berat_tambah_anak14 + rasio_berat_kurang_anak14);
      total_rasio_anak15 += (rasio_berat_tambah_anak15 + rasio_berat_kurang_anak15);
      total_rasio_anak16 += (rasio_berat_tambah_anak16 + rasio_berat_kurang_anak16);
      total_rasio_anak17 += (rasio_berat_tambah_anak17 + rasio_berat_kurang_anak17);
      total_rasio_anak18 += (rasio_berat_tambah_anak18 + rasio_berat_kurang_anak18);
      total_rasio_anak19 += (rasio_berat_tambah_anak19 + rasio_berat_kurang_anak19);
      total_rasio_anak20 += (rasio_berat_tambah_anak20 + rasio_berat_kurang_anak20);
      total_rasio_anak21 += (rasio_berat_tambah_anak21 + rasio_berat_kurang_anak21);
      total_rasio_anak22 += (rasio_berat_tambah_anak22 + rasio_berat_kurang_anak22);
      total_rasio_anak23 += (rasio_berat_tambah_anak23 + rasio_berat_kurang_anak23);
      total_rasio_anak24 += (rasio_berat_tambah_anak24 + rasio_berat_kurang_anak24);
      total_rasio_anak25 += (rasio_berat_tambah_anak25 + rasio_berat_kurang_anak25);
      total_rasio_anak26 += (rasio_berat_tambah_anak26 + rasio_berat_kurang_anak26);
      total_rasio_anak27 += (rasio_berat_tambah_anak27 + rasio_berat_kurang_anak27);
      total_rasio_anak28 += (rasio_berat_tambah_anak28 + rasio_berat_kurang_anak28);
      total_rasio_anak29 += (rasio_berat_tambah_anak29 + rasio_berat_kurang_anak29);
      total_rasio_anak30 += (rasio_berat_tambah_anak30 + rasio_berat_kurang_anak30);

      total_porsi2 += porsi2_tambah + porsi2_kurang;

      berat_anak1_previous = berat_anak1;
      berat_anak2_previous = berat_anak2;
      berat_anak3_previous = berat_anak3;
      berat_anak4_previous = berat_anak4;
      berat_anak5_previous = berat_anak5;
      berat_anak6_previous = berat_anak6;
      berat_anak7_previous = berat_anak7;
      berat_anak8_previous = berat_anak8;
      berat_anak9_previous = berat_anak9;
      berat_anak10_previous = berat_anak10;
      berat_anak11_previous = berat_anak11;
      berat_anak12_previous = berat_anak12;
      berat_anak13_previous = berat_anak13;
      berat_anak14_previous = berat_anak14;
      berat_anak15_previous = berat_anak15;
      berat_anak16_previous = berat_anak16;
      berat_anak17_previous = berat_anak17;
      berat_anak18_previous = berat_anak18;
      berat_anak19_previous = berat_anak19;
      berat_anak20_previous = berat_anak20;
      berat_anak21_previous = berat_anak21;
      berat_anak22_previous = berat_anak22;
      berat_anak23_previous = berat_anak23;
      berat_anak24_previous = berat_anak24;
      berat_anak25_previous = berat_anak25;
      berat_anak26_previous = berat_anak26;
      berat_anak27_previous = berat_anak27;
      berat_anak28_previous = berat_anak28;
      berat_anak29_previous = berat_anak29;
      berat_anak30_previous = berat_anak30;

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

      // for (i=1; i<31; i++) {
      //   data_rasio_anak[i].push(tanggal);
      //   data_rasio_anak[i].push(berat_anak[i]);
      //   data_rasio_anak[i].push(total_rasio_anak[i]);
      //   data_rasio_anak[i].push(total_brtr_anak[i]);
      //   data_rasio_anak[i].push(rasio_berat_tambah_anak[i]);
      //   data_rasio_anak[i].push(br_tambah_anak[i]);
      //   data_rasio_anak[i].push(porsi1_tambah_anak[i]);
      //   data_rasio_anak[i].push(porsi2_tambah_anak[i]);
      //   data_rasio_anak[i].push(bobot_tambah_anak[i]);
      //   data_rasio_anak[i].push(rasio_berat_kurang_anak[i]);
      //   data_rasio_anak[i].push(br_kurang_anak[i]);
      //   data_rasio_anak[i].push(porsi1_kurang_anak[i]);
      //   data_rasio_anak[i].push(porsi2_kurang_anak[i]);
      //   data_rasio_anak[i].push(bobot_kurang_anak[i]);

      //   rasio_anak_details[i].push(data_rasio_anak[i]);
      // }

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



    // console.log(to);
  } else if (data_id == max) {
    $('#setting_button').attr('disabled',false);
    $('#data_button').attr('disabled',false);
    // $('#start_date').attr('disabled',false);
    // $('#play_button').attr('disabled',false);
    $('#refresh_button').attr('disabled',false);
    $('#statistik_button').attr('disabled',false);
    $('#logout_button').attr('disabled',false);
    $('#viewpost_button').attr('disabled',false);
    $('#chart_button').attr('disabled',false);
    $('#portfolio_summary_button').attr('disabled',false);
    $('#assets_details_button').attr('disabled',false);

    clearTimeout(to);

    alertFn("error", `data anda selesai di proses, silahkan lihat performance chart, portfolio trade summary dan assets trade details untuk detailsnya`);
    return false;
  }
}
function refresh() {

  // location.reload();
  // stoptimer();
  // data_id = max;

  $('#start_date').val("");
  $('#start_date').attr('disabled',false);
  $('#play_button').attr('disabled',false);
  $('#refresh_button').attr('disabled',true);
  // // $('#start_date').html("");
  $('#total_post').html(0);
  $('#total_resp').html(0);
  $('#totalbrtr').html(0);
  $('#totalbrtr2').html(0);
  $('#totalbrtr3').html(0);
  $('#massa').html(0);
  $("#request_area").html("");
  $("#response_area").html("");

}



function startSimulasi() {
  var tgl_mulai = $("#start-date").val();

  var jlh_hari = 2610;
  getNextValue(100);
  var day = new Date(tgl_mulai);
  // console.log(date_format(day)); // Apr 30 2000

  var nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  // console.log(date_format(nextDay)); // May 01 2000
  var today = day;
  var tanggal = new Array();
  var row_data = new Array();
  var data_awal = new Array();

  for (n = 1; n <= jlh_hari; n++) {
    date_arr = new Array();
    date_arr[0] = date_format(day);
    row_data.push(date_arr);
    day.setDate(day.getDate() + 1);
  }

  var nilai_awal = parseInt($("#berat_awal").val());
  for (n = 0; n < 30; n++) {
    row_data[0].push(nilai_awal);
  }

  //console.log(row_data[0][1])

  for (x = 1; x < jlh_hari; x++) {
    for (y = 1; y <= 30; y++) {
      var new_value = getNextValue(parseInt(row_data[x - 1][y]));
      row_data[x].push(new_value);
    }
  }

  localStorage.setItem("data_anak", JSON.stringify(row_data));
  show_table();
}

function date_format(cur_date) {
  var yyyy = cur_date.getFullYear().toString();
  var mm = (cur_date.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = cur_date.getDate().toString();

  //return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
  return (
    (dd[1] ? dd : "0" + dd[0]) + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + yyyy
  );
}

function alertFn(icon, title) {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: true,
    timer: 5000,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
}
// var params_load = false;

function cekFile(file) {
  //cekking File
  // console.log(file.files);
  var arr_anak = [];
  var findMax = [];
  var data_temp = [];
  var row_data = new Array();
  var tgl_done = localStorage.tgl_done;

  localStorage.removeItem("data_all");
  localStorage.removeItem("selected");

  for (var i = file.files.length - 1; i >= 0; i--) {
    var sFileName = file.files[i].name
      .split("\\")
      .pop()
      .split("/")
      .pop()
      .split(".")[0];
    var sFileExtension = file.files[i].name
      .split(".")
      [file.files[i].name.split(".").length - 1].toLowerCase();
    var sFileSize = file.files[i].size / 1024 / 1024; // in MB

    if (!(sFileExtension === "csv")) {
      /// 10 mb
      alertFn("error", `Format File ${file.files[i].name} Bukan CSV`);
      return false;
    } else if (sFileSize > 1) {
      /// 10 mb
      alertFn("error", `File Size ${file.files[i].name} Lebih dr 1 MB`);
      return false;
    } else {
      if (!localStorage.tgl_min) {
        var cur_min = 0;
      } else {
        var cur_min = localStorage.tlg_min;
      }
      if (!localStorage.tgl_max) {
        var cur_max = Date.parse("2100-01-01");
      } else {
        var cur_max = localStorage.tgl_max;
      }
      var counter = 0;

      Papa.parse(file.files[i], {
        download: true,
        header: false,
        complete: function (results) {
          counter++;

          //console.log(results.data[0][0]);
          var avg = new Array();
          var count = 0;
          $.each(results.data, function (key, value) {
            //console.log( value[0]+" - "+value[5]);
            if (value[0].length > 0) {
              avg.push([value[0], value[5]]);
            }
            //count++;
          });

          avg.shift();
          data_temp.push(avg);

          localStorage.setItem("data_all", JSON.stringify(data_temp));

          if (typeof tgl_done === "undefined") {
            //first date
            first_tgl = Date.parse(avg[0][0]);

            //last_date
            last_tgl = Date.parse(avg[avg.length - 1][0]);

            //console.log('current:'+new Date(cur_max));
            //console.log('data:'+avg[avg.length-1][0]);

            if (first_tgl > cur_min) {
              cur_min = first_tgl;
            }

            if (last_tgl < cur_max) {
              cur_max = last_tgl;
            }

            //console.log('max after:'+cur_max);

            //var row_count=0;

            localStorage.setItem("tgl_max", new Date(cur_max).toString());
            localStorage.setItem("tgl_min", new Date(cur_min).toString());
          }

          if (counter == file.files.length) {
            clean_up();
          }
        },
      });

      arr_anak.push(file.files[i].name);

      localStorage.setItem("dataAnak", arr_anak.toString());
      localStorage.setItem("jlhAnak", arr_anak.length);

      var totalanak = document.getElementById("data_anak").rows.length + 1; // hitung row table anak
      var data_anak = null;
      dataAnak = localStorage.dataAnak;
      // for (var i = 0; i < arr_anak.length; i++) {
      data_anak = `<tr style="margin-top:15px" class="data_anakcount">
                                    <td class="text-left">Anak ${totalanak} :</td>
                                    <td class="text-left">${sFileName}</td>
                                </tr>`;
      // }
      var count = $("#data_anak > tbody").find(".data_anakcount").length;

      if (count === 0) {
        $("#data_anak > tbody").append(data_anak);
      } else {
        $(".data_anakcount").last().after(data_anak);
      }
    }
  }
}
function clean_up() {
  //alert('AYO');
  data_temp = JSON.parse(localStorage.getItem("data_all"));
  //console.log(data_temp);

  cur_max = localStorage.tgl_max;
  cur_min = localStorage.tgl_min;

  let current_max = new Date(cur_max);
  let formatted_max =
    appendLeadingZeroes(current_max.getDate()) +
    "/" +
    appendLeadingZeroes(current_max.getMonth() + 1) +
    "/" +
    String(current_max.getFullYear()).substr(2, 2);

  let current_min = new Date(cur_min);
  let formatted_min =
    appendLeadingZeroes(current_min.getDate()) +
    "/" +
    appendLeadingZeroes(current_min.getMonth() + 1) +
    "/" +
    String(current_min.getFullYear()).substr(2, 2);

  var period = formatted_min + " - " + formatted_max;

  $("#periode").attr("value", period);

  var row_data = new Array();
  //clean up
  $.each(data_temp, function (key, value) {
    var clean_data = new Array();
    $.each(value, function (det_key, det_value) {
      if (
        Date.parse(det_value[0]) <= Date.parse(cur_max) &&
        Date.parse(det_value[0]) >= Date.parse(cur_min)
      ) {
        clean_data.push([det_value[0].toString(), det_value[1]]);
      }
    });
    row_data.push(clean_data);
  });

  //console.log(row_data);
  localStorage.setItem("selected", JSON.stringify(row_data));
  display_table();
}

function enterbtn() {
    // $('#btnSubmit').on('click', function () {

  var endpoint = "http://localhost/rasio_server/api/user/get.php";
  var api_key = $("#api_key").val();
  sessionStorage.setItem("api", api_key);
  var username = $("#username").val();

  console.log(api_key);

  // if ($("#username").val() != "" && $("#apikey").val() != "") {
      $.ajax({
          type: "GET",
          url: endpoint,
          headers:{
              "Content-Type": "application/x-www-form-urlencoded",
              "X-API-KEY": api_key,
              "X-USER-NAME": username
          },
          // data: {
          //     api_key: api_key,
          //     username: username
          //     },
          // url: endpoint+"?api_key="+api_key+"&username="+username,
          // headers: {'Authorization': 'Bearer'},
          // headers: {'Content-Type': 'application/json'},
          dataType: 'json',
          success: function(result){
          console.log(result);
          if (result.status == "success") {

              open("dashboard.html","_self")
              // alertFn("success", `berhasil`);
              // return false;

          } else {
              alertFn("error", `gagal`);
              return false;

          }
          },
          error: function() {
              alertFn("error", `gagal koneksi`);
              return false;

          }
      })

  //  });

  }

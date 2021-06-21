//Function Test Setting
function test_setting_submit_btn() {

    sessionStorage.setItem("initial_equity", $("#initial_equity").val());
    sessionStorage.setItem("bid_ask_spread", $("#bid_ask_spread").val());
    sessionStorage.setItem("commision_share", $("#commision_share").val());
    sessionStorage.setItem("interest_rate", $("#interest_rate").val());
    sessionStorage.setItem("regT_margin", $("#regT_margin").val());
    sessionStorage.setItem("maint_margin", $("#maint_margin").val());
    sessionStorage.setItem("port_size", $("#port_size").val());
    sessionStorage.setItem("min_post", $("#min_post").val());

    // var initialequity = $("#initial_equity").val();
    // var bidaskspread = $("#bid_ask_spread").val();
    // var commisionshare = $("#commision_share").val();
    // var interestrate = $("#interest_rate").val();
    // var regTmargin = $("#regT_margin").val();
    // var maintmargin = $("#maint_margin").val();
    // var portsize = $("#port_size").val();
    // var minpost = $("#min_post").val();

    //simpan semuanya ke session storage

    alert('Setting berhasil disimpan');
  
}
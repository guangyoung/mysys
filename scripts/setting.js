//Function Test Setting
//GLOBAL VARIABLE
var initialequity;
var bidaskspread;
var commisionshare;
var interestrate;
var regTmargin;
var maintmargin;
var portsize;
var minpost;

function test_setting_submit_btn() {

    initialequity = $("#initial_equity").val();
    bidaskspread = $("#bid_ask_spread").val();
    commisionshare = $("#commision_share").val();
    interestrate = $("#interest_rate").val();
    regTmargin = $("#regT_margin").val();
    maintmargin = $("#maint_margin").val();
    portsize = $("#port_size").val();
    minpost = $("#min_post").val();

    alert('Setting berhasil disimpan');
  
}
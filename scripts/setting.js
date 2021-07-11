//Function Test Setting
//GLOBAL VARIABLE
var initialequity;
var bidaskspread;
var commisionshare;
var interestrate;

function test_setting_submit_btn() {

    initialequity = $("#initial_equity").val();
    bidaskspread = $("#bid_ask_spread").val();
    commisionshare = $("#commision_share").val();
    interestrate = $("#interest_rate").val();

    alert('Setting berhasil disimpan');
  
}
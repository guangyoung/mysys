//Function Test Setting
function test_setting_submit_btn() {
    //   $("#frmSetting" ).on( "click", function( event ) {
        // event.preventDefault();
        var initialequity = $("#initial_equity").val();
        var bidaskspread = $("#bid_ask_spread").val();
        var commisionshare = $("#commision_share").val();
        var interestrate = $("#interest_rate").val();
        var regTmargin = $("#regT_margin").val();
        var maintmargin = $("#maint_margin").val();
        var portsize = $("#port_size").val();
        var minpost = $("#min_post").val();

        console.log(initialequity);   
        alert('Setting Berhasil disimpan');
    // });
    }
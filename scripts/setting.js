//Function Test Setting
   
    //GLOBAL VARIABLE
    var initialequity;
    var bidaskspread;
    var commisionshare;
    var interestrate;

    function test_setting_submit_btn() {

        if( $("#initial_equity").val() < 1000000 ) {
            alert(`initial equity yg anda input kurang dari 1 juta`);
            return false;
        } else if( $("#initial_equity").val() > 100000000 ) {
            alert(`initial equity yg anda input kurang dari 100 juta`);
            return false;
        } else if ( $("#bid_ask_spread").val() < 0.001 ) {
            alert(`spread+slippage yg anda input kurang dari 0.001`);
            return false;
        } else if ( $("#bid_ask_spread").val() > 0.004 ) {
            alert(`spread+slippage yg anda input lebih dari 0.004`);
            return false;
        } else if ( $("#commision_share").val() < 0.001 ) {
            alert(`commision/share yg anda input kurang dari 0.001`);
            return false;
        } else if ( $("#commision_share").val() > 0.004 ) {
            alert(`commision/share yg anda input lebih dari 0.004`);
            return false;
        } else if ( $("#interest_rate").val() < 0.001 ) {
            alert(`interest rate yg anda input kurang dari 1%`);
            return false;
        } else if ( $("#interest_rate").val() > 0.005 ) {
            alert(`interest rate yg anda input lebih dari 5%`);
            return false;
        } else {
            initialequity = $("#initial_equity").val();
            bidaskspread = $("#bid_ask_spread").val();
            commisionshare = $("#commision_share").val();
            interestrate = $("#interest_rate").val();

            $('#setting').modal('hide');
        }  
    }
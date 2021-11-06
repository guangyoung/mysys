//STEP 1. SETTING
//Ini adalah step setting initial equity.............................................
//...................................................................................
//...................................................................................
   
    //Global Variables
    var initial_equity;
    var spread_slippage;
    var commission;
    var interest_rate;
    var regT_margin;
    var maint_margin;
    var min_data;
    var max_data;

    function test_setting_submit_btn() {

        if( $("#initial_equity").val() < 1000000 ) {
            Swal.fire('initial equity yg anda input kurang dari 1 juta');
            return false;
        } else if( $("#initial_equity").val() > 100000000 ) {
            Swal.fire('initial equity yg anda input lebih dari 100 juta');//angka ini dipikirkan lagi baiknya seperti apa
            return false;
        } else if ( $("#bid_ask_spread").val() < 0.001 ) {
            Swal.fire('spread+slippage yg anda input kurang dari 0.001');
            return false;
        } else if ( $("#bid_ask_spread").val() > 0.005 ) {
            Swal.fire('spread+slippage yg anda input lebih dari 0.005');
            return false;
        } else if ( $("#commision_share").val() < 0.001 ) {
            Swal.fire('commision/share yg anda input kurang dari 0.001');
            return false;
        } else if ( $("#commision_share").val() > 0.005 ) {
            Swal.fire('commision/share yg anda input lebih dari 0.005');
            return false;
        } else if ( $("#interest_rate").val() < 0.01 ) {
            Swal.fire('interest rate yg anda input kurang dari 1%');
            return false;
        } else if ( $("#interest_rate").val() > 0.05 ) {
            Swal.fire('interest rate yg anda input lebih dari 5%');
            return false;
        } else {
            initial_equity = $("#initial_equity").val();
            spread_slippage = $("#spread_slippage").val();
            commission = $("#commision").val();
            interest_rate = $("#interest_rate").val();
            regT_margin = $("#regT_margin").val();
            maint_margin = $("#maint_margin").val();
            min_data = $("#min_data").val();
            max_data = $("#max_data").val();

            $('#setting').modal('hide');

            console.log(initial_equity);
            console.log(spread_slippage);
            console.log(commission);
            console.log(interest_rate);
            console.log(regT_margin);
            console.log(maint_margin);
            console.log(min_data);
            console.log(max_data);
        }  
    }
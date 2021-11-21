//STEP 1. SETTING
//Ini adalah step setting initial equity.............................................
//...................................................................................
//...................................................................................
   
    //Global Variables  
    
    
    var initial_equity = 1000000; //default initial equity...
    var spread_slippage = 0.001;
    var commission = 0.005;
    var interest_rate = 0.02;
    var regT_margin = 0.5;
    var maint_margin = 0.3;
    var min_data = 1305;
    var max_data = 7830;
    var risk_freeRate = 0.01;

    function test_setting_submit_btn() {

        if( $("#initial_equity").val() < 1000000 ) {            
            Swal.fire(
                'Initial Equity < 1,000,000 !',
                'Please input initial equity between 1m - 100m',
                'warning'
            )
            return false;
        } else if( $("#initial_equity").val() > 100000000 ) {
            Swal.fire(
                'Initial Equity > 100,000,000 !',
                'Please input initial equity between 1m - 100m',
                'warning'
            )
            return false;
        } else if ( $("#spread_slippage").val() < 0.001 ) {
            Swal.fire(
                'Spread+Slippage < 0.001 !',
                'Please input spread+slippage between 0.001 - 0.005',
                'warning'
            )
            return false;
        } else if ( $("#spread_slippage").val() > 0.005 ) {
            Swal.fire(
                'Spread+Slippage > 0.005 !',
                'Please input spread+slippage between 0.001 - 0.005',
                'warning'
            )
            return false;
        } else if ( $("#commision").val() < 0.001 ) {
            Swal.fire(
                'Commission < 0.001 !',
                'Please input commission between 0.001 - 0.005',
                'warning'
            )
            return false;
        } else if ( $("#commision").val() > 0.005 ) {
            Swal.fire(
                'Commission > 0.005 !',
                'Please input commission between 0.001 - 0.005',
                'warning'
            )
            return false;
        } else if ( $("#interest_rate").val() < 0.01 ) {
            Swal.fire(
                'Interest rate < 1% !',
                'Please input Interest rate between 1% - 5%',
                'warning'
            )
            return false;
        } else if ( $("#interest_rate").val() > 0.05 ) {
            Swal.fire(
                'Interest rate > 5% !',
                'Please input Interest rate between 1% - 5%',
                'warning'
            )
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

            $('#cash_balance').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));
            $('#equity_with_loan_value').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));
            $('#maintenance_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));
            $('#initial_margin_available').html(Intl.NumberFormat().format(parseFloat(initial_equity).toFixed(0)));

            $('#setting').modal('hide');
        }  
    }
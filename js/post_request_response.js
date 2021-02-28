function post_request_response_json() {  
    $("#post_request_response_tbl>tbody").empty();
    $("#pagination_post_request_response").twbsPagination("destroy");
    if(data_input_array.length > 0) {
        $("#pagination_post_request_response").twbsPagination({
        totalPages: Math.ceil(data_input_array.length/1),
        visiblePages: 4,
        onPageClick: function (event, page) {
            $("#post_request_response_tbl>tbody").empty();
            for (i=page-1; i<page && i<data_input_array.length; i++) {            
                var req_element =
                '<pre style="font-size: 11px; color: #70727a; margin-left: 50px; margin-top: 15px;">'
                    + JSON.stringify(data_input_array[i], null, 4) +
                '</pre>';
                
                $("#request_area").html(req_element);
                var resp_element =
                '<pre style="font-size: 11px; color: #70727a; margin-left: 50px; margin-top: 15px;">'
                        + JSON.stringify(data_input_array[i], null, 4) +
                '</pre>';
                $("#response_area").html(resp_element);
            }
        }
        });
    } else {
        alert("belum ada data")
        return false;
    }    
}
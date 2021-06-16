function performance_chart() {
    var performance_chart;

    chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)' };
    
    var config = {
      type: 'line',
      data: {
        labels: date_array,
        datasets: [{
          label: 'Quantxi',
          pointRadius: 1,
          borderWidth: 1,
          backgroundColor: chartColors.red,
          borderColor: chartColors.red,
          data: quantxi_equity_array,
          fill: false },
        {
          label: 'Buy & Hold',
          pointRadius: 1,
          borderWidth: 1,
          backgroundColor: chartColors.blue,
          borderColor: chartColors.blue,
          data: buyandhold_equity_array,
          fill: false}
        ]},
      options: {
    
        responsive: true,
        legend: {
            display: true
        },
        title: {
          display: true,
          text: 'Performance Comparison' },
        tooltips: {
            mode: 'index',
            intersect: true },
        hover: {
          mode: 'nearest',
          intersect: true },
          // events:[],
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Years' } }],
    
    
        yAxes: [{
          display: true,
          ticks: {
            callback: function(value, index, values) {
              return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'Equity' } }] } } };
    
        if(performance_chart!=null){
            performance_chart.destroy();
        }
          var ctx = document.getElementById('performance_chart').getContext('2d');
          performance_chart = new Chart(ctx, config);
}
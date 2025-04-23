const PI = 3.141592653589793;
const row = 1;
const column = 2;

let IB, Q, z, sigma, r, currentSliderValue, r_scale, Q_scale;

let sigma_test, sigma_plot;
let chart, stepX;



function calculate_sigma (Q, z, r){
    denominator = 1 + Math.pow (r/z, 2);
    IB = (3/(2*PI))*(1/Math.pow(denominator, 2.5));
    sigma = IB * Q/Math.pow(z, 2);
    return sigma;
}


function compute_plot_data (r, z, Q){
    const points = [];
    for (let y = 0.25; y <=z; y+=0.25){
        let x = calculate_sigma (Q, y, r);
        points.push ({x, y});
    }
    return points;
}



function update_chart(r, z, Q){

    var ctx = document.getElementById('chart').getContext("2d");
    var r_for_scale = document.getElementById("radial").valueAsNumber;
    var Q_for_scale = document.getElementById("load").valueAsNumber;
    if(r_for_scale ==0){
        stepX = 10;
    }else if (r_for_scale >0 && Q_for_scale <100){
        stepX = 0.01;
    }else if (r_for_scale>0 && Q_for_scale >100) {
      stepX = 2.5;
    }

    const dataPoints = compute_plot_data(r, z, Q);
    console.log (dataPoints);
    const maxX = Math.max(...dataPoints.map(p => p.x))
    const data = {
        datasets: [{
          label: 'Depth (m)',
          data: dataPoints,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          showLine: true,
          fill: false,
          tension: 0.3
        }]
      };
    
      const config = {
        type: 'line', // Use scatter to allow X/Y points freely
        data: data,
        options: {
          responsive: false,
          scales: {
            x: {
                type: 'linear',
                position:'top',
              reverse: false, // Positive x goes to the left
              min: 0,
              max: maxX+0.2*maxX,
              grid: {
                drawOnChartArea: true
              },
              title: {
                display: true,
                text: 'Vertical Stress (kPa)', 
                font: {
                size: 14
            }
              },
              ticks: {
                stepSize: stepX
              }
            },


            y: {
              reverse: true, // Positive y goes down
              min: 0,
              max: z,
              grid: {
                drawOnChartArea: true
              },
              title: {
                display:true,
                text: 'Depth (m)',
                font: {
                    size :14
                }
              },
              ticks: {
                stepSize: 0.5
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };
    
      if (chart != undefined) {
        chart.destroy();
    }

      chart = new Chart(ctx, config);
}

update_chart(1, 10, 1)

/** 
const data = {
    datasets: [{
      label: 'Line Dataset',
      data: [
        { x: 0.0064, y: 0.25 },
        { x: 0.0340, y: 0.5 },
        { x: 0.0844, y: 1 },
        { x: 0.0683, y: 2 },
        { x: 0.0407, y: 3 },
        { x: 0.0256, y: 4 },
        { x: 0.017, y: 5 },
      ],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      showLine: true,
      fill: false,
      tension: 0.3
    }]
  };

  const config = {
    type: 'line', // Use scatter to allow X/Y points freely
    data: data,
    options: {
      responsive: false,
      scales: {
        x: {
            type: 'linear',
            position:'top',
          reverse: false, // Positive x goes to the left
          min: 0,
          max: 0.1,
          grid: {
            drawOnChartArea: true
          },
          ticks: {
            stepSize: 0.01,
            callback: function(value) {
                return value+ 'Q' ; // ✅ Label as "Q50", "Q100", etc.
              }
          }
        },
        y: {
          reverse: true, // Positive y goes down
          min: 0,
          max: 10,
          grid: {
            drawOnChartArea: true
          },
          ticks: {
            stepSize: 0.5
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  };

  const myChart = new Chart(ctx, config);
  */
function getBackgroundColor(index) {
  const colors = [
"#000080",
"#1E90FF",
"#87CEEB",
"#ADD8E6",
"#4169E1",
"#4682B4", 
"#0000CD", 
"#191970",
  ];
  const i = index % colors.length;
  return colors[i];
}

function fetchAndRenderBarChart(year) {
  const urlBar = dataBarChart;
  const customUrl = new Date().getTime();
  const versionBar = `${urlBar}?v=${customUrl}`;

  fetch(versionBar, {
    headers: headers
})
    .then((response) => response.json())
    .then((data) => {
      let filteredData;
      if (year) {
        filteredData = data.data.filter((item) => item.sales_year === year);
      } else {
        filteredData = data.data.filter((item) => item.sales_year === currentYear);
      }

      const bulan = filteredData.map((item) => item.bulan);
      const labels = Object.keys(filteredData[0])
        .filter((key) => key !== "bulan" && key !== "sales_year");

      const backgroundColors = labels.map((label, index) =>
        getBackgroundColor(index)
      );

      const datasets = labels.map((label, index) => {
        return {
          label: label.charAt(0).toUpperCase() + label.slice(1),
          data: filteredData.map((item) => item[label]),
          backgroundColor: backgroundColors[index],
          borderColor: backgroundColors[index],
          borderWidth: 1,
        };
      });

      var ctx = document.getElementById("myChart1").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: bulan,
    datasets: datasets,
  },
  options: {
    scales: {
      xAxes: [{ stacked: true }], 
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            // Ubah format nilai menjadi string dengan pembatas ratusan, puluhan, dan satuan
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      }],
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          let dataset = data.datasets[tooltipItem.datasetIndex];
          let currentValue = dataset.data[tooltipItem.index];

          // Ubah format nilai menjadi string dengan pembatas ratusan, puluhan, dan satuan
          let formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return formattedValue;
        }
      }
    }
  },
});

    })
    .catch((error) => console.error("Error fetching data:", error));
}

fetchAndRenderBarChart();

function fetchAndRenderPieChart(year) {
  const urlCurve = mpData;
  const customUrl = new Date().getTime();
  const versionCurve = `${urlCurve}?v=${customUrl}`;

  fetch(versionCurve, {
    headers: headers
})
    .then((response) => response.json())
    .then((data) => {
      let filteredData;
      if (year) {
        filteredData = data.data.filter((item) => item.sales_year == year);
      } else {
        filteredData = data.data.filter((item) => item.sales_year == currentYear);
      }

      const totalPoData = filteredData.map((item) => item.total_po);
      const labels = filteredData.map((item) => item.project_type);
      const colors = [
"#000080",
"#1E90FF",
"#87CEEB",
"#ADD8E6",
"#4169E1",
"#4682B4", 
"#0000CD", 
"#191970",
      ];

      var ctx = document.getElementById("myChart2").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: totalPoData,
              backgroundColor: colors,
              label: "Dataset 1",
            },
          ],
          labels: labels,
        },
        options: {
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        let dataset = data.datasets[tooltipItem.datasetIndex];
        let currentValue = dataset.data[tooltipItem.index];

        // Bulatkan angka
        let roundedValue = Math.round(currentValue);

         // Konversi nilai ke notasi "M" jika lebih besar dari atau sama dengan 1 juta
                if (roundedValue >= 1000000 && roundedValue < 1000000000) {
                  let millionValue = (roundedValue / 1000000).toFixed(1);
                  return millionValue + 'M';
                } else if (roundedValue >= 1000000000) { // Konversi nilai ke notasi "B" jika lebih besar dari atau sama dengan 1 miliar
                  let billionValue = (roundedValue / 1000000000).toFixed(1);
                  return billionValue + 'B';
                }

        // Kembalikan angka asli jika kurang dari 1 juta
        return currentValue;
      }
    }
  },
  responsive: true,
  legend: {
    position: "bottom",
  },
},
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

fetchAndRenderPieChart();
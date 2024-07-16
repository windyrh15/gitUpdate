function getBackgroundColor(index) {
  const colors = [
    "#ff6384",
    "#36a2eb",
    "#ffce56",
    "#32a852",
    "#ff00ff",
    "#00ffff",
    "#ffff00",
    "#800080",
  ];
  const i = index % colors.length;
  return colors[i];
}

function fetchAndRenderBarChart(year) {
  const urlBar = "api/" + sales + dataBarChart;
  const customUrl = new Date().getTime();
  const versionBar = `${urlBar}?v=${customUrl}`;

  fetch(versionBar)
    .then((response) => response.json())
    .then((data) => {
      let filteredData;
      if (year) {
        filteredData = data.data.filter((item) => item.year === year);
      } else {
        filteredData = data.data.filter((item) => item.year === currentYear);
      }

      const bulan = filteredData.map((item) => item.bulan); // Ambil semua bulan dari JSON
      const labels = Object.keys(filteredData[0]) // Ambil semua kolom kecuali 'bulan' dan 'year'
        .filter((key) => key !== "bulan" && key !== "year");

      const backgroundColors = labels.map((label, index) =>
        getBackgroundColor(index)
      );

      const datasets = labels.map((label, index) => {
        return {
          label: label.charAt(0).toUpperCase() + label.slice(1), // Ubah huruf pertama menjadi kapital
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
            xAxes: [{ stacked: true }], // Menumpuk batang pada sumbu X
            yAxes: [
              {
                stacked: true, // Menumpuk batang pada sumbu Y
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

fetchAndRenderBarChart();

function fetchAndRenderPieChart(year) {
  const urlCurve = "api/" + sales + mpData;
  const customUrl = new Date().getTime();
  const versionCurve = `${urlCurve}?v=${customUrl}`;

  fetch(versionCurve)
    .then((response) => response.json())
    .then((data) => {
      let filteredData;
      if (year) {
        // Jika tahun difilter, gunakan tahun yang difilter
        filteredData = data.data.filter((item) => item.year == year);
      } else {
        // Jika tahun tidak difilter, gunakan tahun saat ini
        filteredData = data.data.filter((item) => item.year == currentYear);
      }

      const totalPoData = filteredData.map((item) => item.total_po);
      const labels = filteredData.map((item) => item.type);
      // const colors = ["#ff6384", "#36a2eb", "#ffce56", "#32a852"];
      const colors = [
        "#ff6384",
        "#36a2eb",
        "#ffce56",
        "#32a852",
        "#ff00ff",
        "#00ffff",
        "#ffff00",
        "#800080",
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
const addFilter = document.querySelector("#addFilter");

function filterDataByYear(data, year) {
  return data.filter((item) => item.sales_year == year);
}

function filterDataTotalYear(data, year) {
  return data.filter((item) => item.sales_year == year);
}

addFilter.addEventListener("click", function () {
  fetch("module/" + page + "/modal/marketing_recap/getFilter.php")
    .then((response) => response.text())
    .then((htmlContent) => {
      Swal.fire({
        title: "Filter Data",
        html: htmlContent,
        showCancelButton: true,
        confirmButtonText: "Filter",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        preConfirm: async () => {
          const filterYear = Swal.getPopup().querySelector("#filterYear").value;

          if (!filterYear) {
            // Jika filterYear kosong, tampilkan pesan kesalahan
            Swal.showValidationMessage("Please select a year");
          } else {
            // Jika filterYear tidak kosong, lanjutkan prosesnya
            const selectedYear = parseInt(filterYear);
            const filteredData = filterDataByYear(dataMp.data, selectedYear);
            const filteredTotalData = filterDataTotalYear(
              totalMp.data,
              selectedYear
            );
            renderData(filteredData);
            renderFooterData(filteredTotalData[0]);
            fetchAndRenderPieChart(filterYear);
            fetchAndRenderBarChart(selectedYear);
            $("#year").text(filterYear);
          }
        },
      });
    });
});


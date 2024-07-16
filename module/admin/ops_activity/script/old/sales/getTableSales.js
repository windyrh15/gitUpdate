let dataSales;
const urlSales = salesData;
const urlFiles = salesFile;
const customTime = new Date().getTime();
const versionSales = `${urlSales}?v=${customTime}`;
const tbodySales = document.querySelector("#sales tbody");
const searchInput = document.querySelector("#search-input");
const pageSize = 10;
let currentPage = 1;

function displayData(
  page,
  searchQuery = "",
  filterUser = "",
  filterType = "",
  filterStatus = "",
  filterYear = "",
  startDate = "",
  endDate = ""
) {
  currentPage = page;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const filteredData = dataSales.dataSales.filter((sales) => {
    // Filter data berdasarkan pencarian (jika ada)
    const userMatched =
      filterUser === "" ||
      sales.nama.toLowerCase() === filterUser.toLowerCase();
    const typeMatched =
      filterType === "" ||
      sales.project_type.toLowerCase() === filterType.toLowerCase();
    const statusMatched =
      filterStatus === "" || sales.status_sales === filterStatus;
    const yearMatched =
      filterYear === "" || new Date(sales.tanggal).getFullYear() == filterYear;
    const startDateMatched =
      startDate === "" || new Date(sales.date) >= new Date(startDate);
    const endDateMatched =
      endDate === "" || new Date(sales.date) <= new Date(endDate);
    const searchMatched =
      searchQuery === "" ||
      sales.no_qtn
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sales.tanggal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.total_order.toString().includes(searchQuery) ||
      sales.pelanggan_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sales.status_sales.toString().includes(searchQuery);

    return (
      userMatched &&
      typeMatched &&
      statusMatched &&
      yearMatched &&
      startDateMatched &&
      endDateMatched &&
      searchMatched
    );
  });
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(startIdx, endIdx);
  tbodySales.innerHTML = "";
  let i = startIdx + 1;
  paginatedData.forEach((sales) => {
    const row = document.createElement("tr");

    const tanggalTransaksiSales = new Date(sales.tanggal);
    const tanggalSales = tanggalTransaksiSales
      .getDate()
      .toString()
      .padStart(2, "0");
    const bulanSales = (tanggalTransaksiSales.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const tahunSales = tanggalTransaksiSales.getFullYear();
    const formattedDateSales = `${tanggalSales}/${bulanSales}/${tahunSales}`;

    row.innerHTML = `
            <td class="d-none d-md-table-cell ta-center">${i}</td>
            <td class="d-none d-md-table-cell ta-end">${formattedDateSales}</td>
          <td class="ta-start">${sales.no_qtn}<br>${
      sales.project_name
    }<br>Created by <b>${sales.nama}</b>
    <br>Calculation File: <a href="${urlFiles}/${sales.file}">${sales.file}</a>
    <div class="d-block d-md-none d-lg-none d-sm-none"><br>
        <div style="display: flex; justify-content: center;">
            <button class="btn btn-success btn-sm mr-2" onclick="showDetailsSales('${
              sales.pesanan_id
            }')">
                <i class="fa-solid fa-eye"></i>
            </button>
            <div class="dropdown no-arrow">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" id="editSalesButton" data-id="${
                      sales.pesanan_id
                    }">Edit</a>
                    <a class="dropdown-item delete-btn text-danger" onclick="deleteSales(${
                      sales.pesanan_id
                    })">Delete</a>
                    <hr>
                    <a class="dropdown-item ongoing-btn text-warning" onclick="statusOnGoing(${
                      sales.pesanan_id
                    })">On Going</a>
                    <a class="dropdown-item won-btn text-success" onclick="statusWon(${
                      sales.pesanan_id
                    })">Won</a>
                    <a class="dropdown-item lost-btn text-dark" onclick="statusLost(${
                      sales.pesanan_id
                    })">Lost</a>
                </div>
            </div>
        </div>
    </div><br>
</td>
          <td class="d-none d-md-table-cell ta-start">${sales.project_type}</td>
          <td class="d-none d-md-table-cell ta-end">${sales.total_order.toLocaleString()}</td>
          <td class="d-none d-sm-table-cell ta-start">${sales.pelanggan_nama}</td>
          <td class="d-none d-md-table-cell ta-center">${sales.status}</td>
          <td class="d-none d-sm-table-cell ta-center">
          <button class="btn btn-success btn-sm d-md-none d-lg-none mr-2 mb-2 mt-2" onclick="showDetailsSales('${
            sales.pesanan_id
          }')">
              <i class="fa-solid fa-eye"></i>
          </button>
          <center><div class="dropdown no-arrow mb-4">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Action
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" id="editSalesButton" data-id="${
            sales.pesanan_id
          }">Edit</a>
          <a class="dropdown-item delete-btn text-danger" onclick="deleteSales(${
            sales.pesanan_id
          })">Delete</a>
		  <hr>
      <a class="dropdown-item ongoing-btn text-warning" onclick="statusOnGoing(${
        sales.pesanan_id
      })">On Going</a>
      <a class="dropdown-item won-btn text-success" onclick="statusWon(${
        sales.pesanan_id
      })">Won</a>
      <a class="dropdown-item lost-btn text-dark" onclick="statusLost(${
        sales.pesanan_id
      })">Lost</a>
        </div>
    </div></center>
      </td>
        `;
    tbodySales.appendChild(row);
    i++;
  });
  createPaginationButtonsPC(totalPages);
  createPaginationButtonsMobile(totalPages);
}

function createPaginationButtonsPC(totalPages) {
  const paginationContainer = document.querySelector(
    "#pagination-container-pc"
  );
  paginationContainer.innerHTML = "";
  const pagesToShow = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page > 0 && page <= totalPages
  );

  const firstButton = document.createElement("button");
  firstButton.innerText = "First";
  firstButton.addEventListener("click", () => {
    displayData(1, searchInput.value);
  });
  paginationContainer.appendChild(firstButton);

  const previousButton = document.createElement("button");
  previousButton.innerText = "Previous";
  previousButton.addEventListener("click", () => {
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    displayData(previousPage, searchInput.value);
  });
  paginationContainer.appendChild(previousButton);

  pagesToShow.forEach((page) => {
    const button = document.createElement("button");
    button.innerText = page;
    if (page === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      displayData(page, searchInput.value);
    });
    paginationContainer.appendChild(button);
  });

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    displayData(nextPage, searchInput.value);
  });
  paginationContainer.appendChild(nextButton);

  const lastButton = document.createElement("button");
  lastButton.innerText = "Last";
  lastButton.addEventListener("click", () => {
    displayData(totalPages, searchInput.value);
  });
  paginationContainer.appendChild(lastButton);
}

function createPaginationButtonsMobile(totalPages) {
  const paginationContainer = document.querySelector(
    "#pagination-container-mobile"
  );
  paginationContainer.innerHTML = "";

  const pagesToShow = [currentPage - 1, currentPage, currentPage + 1]
    .filter((page) => page > 0 && page <= totalPages)
    .slice(0, 3); 

  const firstButton = document.createElement("button");
  firstButton.innerHTML = '<i class="fas fa-angle-double-left"></i>';
  firstButton.addEventListener("click", () => {
    displayData(1, searchInput.value);
  });
  paginationContainer.appendChild(firstButton);

  const previousButton = document.createElement("button");
  previousButton.innerHTML = '<i class="fas fa-angle-left"></i>';
  previousButton.addEventListener("click", () => {
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    displayData(previousPage, searchInput.value);
  });
  paginationContainer.appendChild(previousButton);

  pagesToShow.forEach((page) => {
    const button = document.createElement("button");
    button.innerText = page;
    if (page === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      displayData(page, searchInput.value);
    });
    paginationContainer.appendChild(button);
  });

  const nextPageButton = document.createElement("button");
  nextPageButton.innerHTML = '<i class="fas fa-angle-right"></i>';
  nextPageButton.addEventListener("click", () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    displayData(nextPage, searchInput.value);
  });
  paginationContainer.appendChild(nextPageButton);

  const lastButton = document.createElement("button");
  lastButton.innerHTML = '<i class="fas fa-angle-double-right"></i>';
  lastButton.addEventListener("click", () => {
    displayData(totalPages, searchInput.value);
  });
  paginationContainer.appendChild(lastButton);
}

// function fetchData() {

//   fetch(versionSales, {
//     headers: headers
//   })
//     .then((response) => response.json())
//     .then((responseData) => {
//       dataSales = responseData;
//       displayData(currentPage);
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }

function fetchData() {
  // Menampilkan elemen loading dengan animasi
  const loadingRow = document.createElement('tr');
  loadingRow.innerHTML = `
    <td colspan="8" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>`;
  tbodySales.innerHTML = '';
  tbodySales.appendChild(loadingRow);

  // Mengatur waktu tampilan loading sebelum memuat data
  const loadingTimeout = setTimeout(() => {
    // Hapus elemen loading jika waktu tampilan telah berakhir
    tbodySales.removeChild(loadingRow);
  }, 1500); // Waktu tampilan loading dalam milidetik

  fetch(versionSales, {
    headers: headers
  })
    .then((response) => response.json())
    .then((responseData) => {
      clearTimeout(loadingTimeout); // Menghapus timeout jika data berhasil dimuat
      dataSales = responseData;
      if (dataSales.dataSales.length === 0) {
        // Tampilkan pesan "Belum ada data" jika tidak ada data yang dimuat
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = '<td colspan="8" class="text-center">No data available</td>';
        tbodySales.appendChild(noDataRow);
      } else {
        displayData(currentPage);
      }
    })
    .catch((error) => {
      clearTimeout(loadingTimeout); // Menghapus timeout jika terjadi kesalahan
      console.error("Error fetching data:", error);
      // Tampilkan pesan "Ada masalah dengan API" jika terjadi kesalahan
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = '<td colspan="8" class="text-center">Problems with the API</td>';
      tbodySales.appendChild(errorRow);
    });
}


searchInput.addEventListener("input", () => {
  displayData(1, searchInput.value);
});

fetchData();

function showDetailsSales(salesId) {
  var detailDataSales = getDetailDataSales(salesId);

  var modalBodySales = document.getElementById("detailsModalSalesBody");
  modalBodySales.innerHTML = `
                <p>Date : ${detailDataSales.tanggal}</p>
                <p>Sales# : <br>${detailDataSales.no_qtn}<br>${
    detailDataSales.project_name
  }<br>Created by <b>${detailDataSales.nama}</b></p>
  <br>Calculation File: ${sales.file}
                <p>Type : ${detailDataSales.project_type}</p>
                <p>Amount : ${detailDataSales.total_order.toLocaleString()}</p>
                <p>Client : ${detailDataSales.pelanggan_nama}</p>
                <p> Status : ${detailDataSales.status}</p>
`;

  $("#detailsModalSales").modal("show");
}

function getDetailDataSales(salesId) {
  console.log("All Sales:", dataSales.dataSales);
  const foundSales = dataSales.dataSales.find(
    (sales) => sales.pesanan_id == salesId
  );

  console.log("Found Sales", foundSales);
  return foundSales || {};
}
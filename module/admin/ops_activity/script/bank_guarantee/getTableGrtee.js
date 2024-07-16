// Namespace untuk Bank Guarantee
const bankGuaranteeApp = (() => {
  let data;
  const url = purchaseOrder;
  const customTime = new Date().getTime();
  const versionPo = `${url}?v=${customTime}`;
  const tbody = document.querySelector("#purchase_order tbody");
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
    const filteredData = data.data.filter((sales) => {
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
    console.log(paginatedData)
    tbody.innerHTML = "";
    let i = startIdx + 1;
    paginatedData.forEach((data) => {
      const row = document.createElement("tr");
      row.onclick = function () {
        showDetails(data.purchase_id);
      };

      row.innerHTML = `
              <td class="d-none d-md-table-cell ta-center">${i}</td>
              <td class="d-none d-md-table-cell ta-center">${data.project}</td>
              <td class="d-none d-md-table-cell ta-center">${data.start_date}</td>
              <td class="d-none d-md-table-cell ta-center">${data.close_date}</td>
              <td class="d-none d-md-table-cell ta-center">${data.bond_number}</td>
              <td class="d-none d-md-table-cell ta-center">${data.bond}</td>
              <td class="d-none d-md-table-cell ta-center">${data.amount}</td>
              <td class="d-none d-md-table-cell ta-center">${data.collateral}</td>
              <td class="d-none d-md-table-cell ta-center">${data.bank}</td>
              <td class="d-none d-md-table-cell ta-center">${data.counter_guarantee}</td>
              <td class="d-none d-md-table-cell ta-center">${data.beneficiary}</td>
              <td class="d-none d-md-table-cell ta-center">${data.period_days}</td>
              <td class="d-none d-md-table-cell ta-center">${data.status}</td>
               <td class="d-none d-sm-table-cell ta-center">
                <center><div class="dropdown no-arrow mb-4">
              <button class="btn btn-primary dropdown-toggle mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item info-btn text-info" onclick="showEditForm(${data.bg_id})">Edit</a>
                <a class="dropdown-item delete-btn text-danger" onclick="deleteDelNote(${data.bg_id})">Delete</a>
              </div> 
              </div></center>
            </td>
          `;
      tbody.appendChild(row);
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

  function fetchData() {
    // Show loading spinner
    const loadingRow = document.createElement('tr');
    loadingRow.innerHTML = `
      <td colspan="6" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </td>`;
    tbody.innerHTML = ""; 
    tbody.appendChild(loadingRow); 

    fetch(getBGData, {
      headers: headers
    })
      .then((response) => response.json())
      .then((responseData) => {
        tbody.innerHTML = ""; // Clear the loading row
        data = responseData;
        if (data.data.length === 0) {
          // Show "No data available" if no data
          const row = document.createElement("tr");
          row.innerHTML = `
            <td colspan="14" class="text-center">No data available</td>
          `;
          tbody.appendChild(row);
        } else {
          displayData(currentPage);
        }
      })
      .catch((error) => {
        tbody.innerHTML = ""; // Clear the loading row
        console.error("Error fetching data:", error);

        // Show "Problems with the API" if there is an error
        const errorRow = document.createElement('tr');
        errorRow.innerHTML = `
          <td colspan="14" class="text-center">Problems with the API</td>`;
        tbody.appendChild(errorRow);
      });
  }

  searchInput.addEventListener("input", () => {
    displayData(1, searchInput.value);
  });

  fetchData();

  return {
    fetchData,
    displayData,
    createPaginationButtonsPC,
    createPaginationButtonsMobile
  };
})();

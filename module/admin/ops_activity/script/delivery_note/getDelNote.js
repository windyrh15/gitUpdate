const deliveryNoteApp = (() => {
  let dnData;
  const dnUrl = deliveryNote;
  const dnCustomTime = new Date().getTime();
  const dnVersion = `${dnUrl}?v=${dnCustomTime}`;
  const dnTbody = document.querySelector("#deliveryNote tbody");
  const dnSearchInput = document.querySelector("#search-input");
  const dnPageSize = 10;
  let dnCurrentPage = 1;

  function displayDnData(
    page,
    searchQuery = "",
    filterUser = "",
    filterType = "",
    filterStatus = "",
    filterYear = "",
    startDate = "",
    endDate = ""
  ) {
    dnCurrentPage = page;
    const dnStartIdx = (dnCurrentPage - 1) * dnPageSize;
    const dnEndIdx = dnStartIdx + dnPageSize;
    const dnFilteredData = dnData.data.filter((dnItem) => {
      const userMatched =
        filterUser === "" ||
        dnItem.nama.toLowerCase() === filterUser.toLowerCase();
      const typeMatched =
        filterType === "" ||
        dnItem.project_type.toLowerCase() === filterType.toLowerCase();
      const statusMatched =
        filterStatus === "" || dnItem.status_sales === filterStatus;
      const yearMatched =
        filterYear === "" ||
        new Date(dnItem.tanggal).getFullYear() == filterYear;
      const startDateMatched =
        startDate === "" || new Date(dnItem.date) >= new Date(startDate);
      const endDateMatched =
        endDate === "" || new Date(dnItem.date) <= new Date(endDate);
      const searchMatched =
        searchQuery === "" ||
        dnItem.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dnItem.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dnItem.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dnItem.no_dn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dnItem.pic.toString().includes(searchQuery.toLowerCase()) ||
        dnItem.pic_phone.toLowerCase().includes(searchQuery.toLowerCase());

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

    const dnTotalPages = Math.ceil(dnFilteredData.length / dnPageSize);
    const dnPaginatedData = dnFilteredData.slice(dnStartIdx, dnEndIdx);
    dnTbody.innerHTML = "";
    let dnIndex = dnStartIdx + 1;
    dnPaginatedData.forEach((dnItem) => {
      const dnRow = document.createElement("tr");


      let materialDetails = "";
      dnItem.material_detail.forEach((material) => {
        materialDetails += `
              <ul>
                  <li>Quantity : ${material.quantity}</li>
                  <li>Material : ${material.material}</li>
              </ul>
          `;
      });

      dnRow.innerHTML = `
              <td class="d-none d-md-table-cell ta-center">${dnIndex}</td>
              <td class="d-none d-md-table-cell ta-start">${dnItem.date}</td>
              <td class="d-none d-md-table-cell ta-start">${materialDetails}</td>
              <td class="d-none d-md-table-cell ta-start">${dnItem.project}</td>
              <td class="d-none d-md-table-cell ta-end">${dnItem.customer}</td>
              <td class="d-none d-md-table-cell ta-start">${dnItem.no_dn}</td>
              <td class="d-none d-md-table-cell ta-start">${dnItem.pic}</td>
              <td class="d-none d-md-table-cell ta-start">${dnItem.pic_phone}</td>
              <td class="d-none d-sm-table-cell ta-center action-column">
                <center><div class="dropdown no-arrow mb-4">
              <button class="btn btn-primary dropdown-toggle mt-4" type="button" id="dnDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dnDropdownMenuButton">
              <a class="dropdown-item dn-info-btn text-info" onclick="showEditForm(${dnItem.delivery_id})">Edit</a>
                <a class="dropdown-item dn-delete-btn text-danger" onclick="deleteDelNote(${dnItem.delivery_id})">Delete</a>
              </div> 
              </div></center>
            </td>
          `;
      dnTbody.appendChild(dnRow);
      dnIndex++;
    });

    createDnPaginationButtonsPC(dnTotalPages);
    createDnPaginationButtonsMobile(dnTotalPages);
  }

  function createDnPaginationButtonsPC(dnTotalPages) {
    const dnPaginationContainer = document.querySelector(
      "#pagination-container-pc-dn"
    );
    dnPaginationContainer.innerHTML = "";
    const dnPagesToShow = [dnCurrentPage - 1, dnCurrentPage, dnCurrentPage + 1].filter(
      (dnPage) => dnPage > 0 && dnPage <= dnTotalPages
    );

    const dnFirstButton = document.createElement("button");
    dnFirstButton.innerText = "First";
    dnFirstButton.addEventListener("click", () => {
      displayDnData(1, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnFirstButton);

    const dnPreviousButton = document.createElement("button");
    dnPreviousButton.innerText = "Previous";
    dnPreviousButton.addEventListener("click", () => {
      const dnPreviousPage = dnCurrentPage > 1 ? dnCurrentPage - 1 : 1;
      displayDnData(dnPreviousPage, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnPreviousButton);

    dnPagesToShow.forEach((dnPage) => {
      const dnButton = document.createElement("button");
      dnButton.innerText = dnPage;
      if (dnPage === dnCurrentPage) {
        dnButton.classList.add("active");
      }
      dnButton.addEventListener("click", () => {
        displayDnData(dnPage, dnSearchInput.value);
      });
      dnPaginationContainer.appendChild(dnButton);
    });

    const dnNextButton = document.createElement("button");
    dnNextButton.innerText = "Next";
    dnNextButton.addEventListener("click", () => {
      const dnNextPage = dnCurrentPage < dnTotalPages ? dnCurrentPage + 1 : dnTotalPages;
      displayDnData(dnNextPage, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnNextButton);

    const dnLastButton = document.createElement("button");
    dnLastButton.innerText = "Last";
    dnLastButton.addEventListener("click", () => {
      displayDnData(dnTotalPages, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnLastButton);
  }

  function createDnPaginationButtonsMobile(dnTotalPages) {
    const dnPaginationContainer = document.querySelector(
      "#pagination-container-mobile"
    );
    dnPaginationContainer.innerHTML = "";

    const dnPagesToShow = [dnCurrentPage - 1, dnCurrentPage, dnCurrentPage + 1]
      .filter((dnPage) => dnPage > 0 && dnPage <= dnTotalPages)
      .slice(0, 3);

    const dnFirstButton = document.createElement("button");
    dnFirstButton.innerHTML = '<i class="fas fa-angle-double-left"></i>';
    dnFirstButton.addEventListener("click", () => {
      displayDnData(1, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnFirstButton);

    const dnPreviousButton = document.createElement("button");
    dnPreviousButton.innerHTML = '<i class="fas fa-angle-left"></i>';
    dnPreviousButton.addEventListener("click", () => {
      const dnPreviousPage = dnCurrentPage > 1 ? dnCurrentPage - 1 : 1;
      displayDnData(dnPreviousPage, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnPreviousButton);

    dnPagesToShow.forEach((dnPage) => {
      const dnButton = document.createElement("button");
      dnButton.innerText = dnPage;
      if (dnPage === dnCurrentPage) {
        dnButton.classList.add("active");
      }
      dnButton.addEventListener("click", () => {
        displayDnData(dnPage, dnSearchInput.value);
      });
      dnPaginationContainer.appendChild(dnButton);
    });

    const dnNextPageButton = document.createElement("button");
    dnNextPageButton.innerHTML = '<i class="fas fa-angle-right"></i>';
    dnNextPageButton.addEventListener("click", () => {
      const dnNextPage = dnCurrentPage < dnTotalPages ? dnCurrentPage + 1 : dnTotalPages;
      displayDnData(dnNextPage, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnNextPageButton);

    const dnLastButton = document.createElement("button");
    dnLastButton.innerHTML = '<i class="fas fa-angle-double-right"></i>';
    dnLastButton.addEventListener("click", () => {
      displayDnData(dnTotalPages, dnSearchInput.value);
    });
    dnPaginationContainer.appendChild(dnLastButton);
  }

  function fetchDnData() {
    const dnLoadingRow = document.createElement("tr");
    dnLoadingRow.innerHTML = `
      <td colspan="9" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </td>`;
    dnTbody.innerHTML = "";
    dnTbody.appendChild(dnLoadingRow);

    fetch(dnVersion, { headers: headers })
      .then((response) => response.json())
      .then((responseData) => {
        dnTbody.innerHTML = "";
        dnData = responseData;

        if (dnData.data.length === 0) {
          const dnRow = document.createElement("tr");
          dnRow.innerHTML = `
            <td colspan="9" class="text-center">No data available</td>
          `;
          dnTbody.appendChild(dnRow);
        } else {
          displayDnData(dnCurrentPage);
        }
      })
      .catch((error) => {
        dnTbody.innerHTML = "";
        console.error("Error fetching data:", error);
        const dnErrorRow = document.createElement("tr");
        dnErrorRow.innerHTML = `
          <td colspan="9" class="text-center">Problems with the API</td>`;
        dnTbody.appendChild(dnErrorRow);
      });
  }

  dnSearchInput.addEventListener("input", () => {
    displayDnData(1, dnSearchInput.value);
  });

  fetchDnData();

  return {
    fetchDnData,
    displayDnData,
    createDnPaginationButtonsPC,
    createDnPaginationButtonsMobile
  };
})();

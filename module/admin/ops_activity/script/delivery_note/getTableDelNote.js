// Namespace untuk Delivery Note
const deliveryNoteApp = (() => {
  let data;
  const customTime = new Date().getTime();
  const tbody = document.querySelector("#deliveryNote tbody");
  const searchInput = document.querySelector("#search-input");
  const searchForm = document.querySelector("#search-form");
  const addNoteButton = document.querySelector("#add-note-button");
  const tableSection = document.querySelector("#table-section");
  const detailsSection = document.querySelector("#details-section");
  const detailContent = document.querySelector("#detail-content");
  const closeButton = document.querySelector("#close-button");
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
    const filteredData = data.data.filter((delNote) => {
      const userMatched =
        filterUser === "" ||
        delNote.nama.toLowerCase() === filterUser.toLowerCase();
      const typeMatched =
        filterType === "" ||
        delNote.project_type.toLowerCase() === filterType.toLowerCase();
      const statusMatched =
        filterStatus === "" || delNote.status_sales === filterStatus;
      const yearMatched =
        filterYear === "" ||
        new Date(delNote.tanggal).getFullYear() == filterYear;
      const startDateMatched =
        startDate === "" || new Date(delNote.date) >= new Date(startDate);
      const endDateMatched =
        endDate === "" || new Date(delNote.date) <= new Date(endDate);
      const searchMatched =
        searchQuery === "" ||
        delNote.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delNote.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delNote.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delNote.no_dn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delNote.pic.toString().includes(searchQuery.toLowerCase()) ||
        delNote.pic_phone.toLowerCase().includes(searchQuery.toLowerCase());

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
    tbody.innerHTML = "";
    let i = startIdx + 1;
    paginatedData.forEach((data) => {
      const row = document.createElement("tr");
      
      // Tambahkan event listener untuk seluruh baris kecuali kolom Action
      row.addEventListener('click', function(event) {
        if (!event.target.closest('.action-column')) {
          showDetails(data);
        }
      });

      let materialDetails = "";
      data.material_detail.forEach((material) => {
        materialDetails += `
              <ul>
                  <li>Quantity : ${material.quantity}</li>
                  <li>Material : ${material.material}</li>
              </ul>
          `;
      });

      row.innerHTML = `
              <td class="d-none d-md-table-cell ta-center">${i}</td>
              <td class="d-none d-md-table-cell ta-start">${data.date}</td>
              <td class="d-none d-md-table-cell ta-start">${materialDetails}</td>
              <td class="d-none d-md-table-cell ta-start">${data.project}</td>
              <td class="d-none d-md-table-cell ta-end">${data.customer}</td>
              <td class="d-none d-md-table-cell ta-start">${data.no_dn}</td>
              <td class="d-none d-md-table-cell ta-start">${data.pic}</td>
              <td class="d-none d-md-table-cell ta-start">${data.pic_phone}</td>
              <td class="d-none d-sm-table-cell ta-center action-column">
                <center><div class="dropdown no-arrow mb-4">
              <button class="btn btn-primary dropdown-toggle mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item info-btn text-info" onclick="showEditForm(${data.delivery_id})">Edit</a>
                <a class="dropdown-item delete-btn text-danger" onclick="deleteDelNote(${data.delivery_id})">Delete</a>
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

  function showDetails(data) {
    searchForm.style.display = 'none';
    addNoteButton.style.display = 'none';
    tableSection.style.display = 'none';
    detailsSection.style.display = 'block';
    detailContent.innerHTML = `
      <h3>${data.project_name}</h3>
      <p><strong>Date:</strong> ${data.date}</p>
      <p><strong>Customer:</strong> ${data.customer}</p>
      <p><strong>Format No:</strong> ${data.no_dn}</p>
      <p><strong>PIC:</strong> ${data.pic}</p>
      <p><strong>Phone:</strong> ${data.pic_phone}</p>
      <h4>Material Details</h4>
      ${data.material_detail.map(material => `
        <ul>
          <li>Quantity: ${material.quantity}</li>
          <li>Material: ${material.material}</li>
        </ul>
      `).join('')}
    `;
  }

  closeButton.addEventListener("click", () => {
    closeDetails();
  });

  function closeDetails() {
    searchForm.style.display = 'flex';
    addNoteButton.style.display = 'block';
    tableSection.style.display = 'block';
    detailsSection.style.display = 'none';
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
    const loadingRow = document.createElement("tr");
    loadingRow.innerHTML = `
      <td colspan="9" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </td>`;
    tbody.innerHTML = "";
    tbody.appendChild(loadingRow);

    fetch(deliveryNote, { headers: headers })
      .then((response) => response.json())
      .then((responseData) => {
        tbody.innerHTML = "";
        data = responseData;
        
        if (data.data.length === 0) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td colspan="9" class="text-center">No data available</td>
          `;
          tbody.appendChild(row);
        } else {
          displayData(currentPage);
        }
      })
      .catch((error) => {
        tbody.innerHTML = "";
        console.error("Error fetching data:", error);
        const errorRow = document.createElement("tr");
        errorRow.innerHTML = `
          <td colspan="9" class="text-center">Problems with the API</td>`;
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
    showDetails,
    closeDetails,
    createPaginationButtonsPC,
    createPaginationButtonsMobile
  };
})();

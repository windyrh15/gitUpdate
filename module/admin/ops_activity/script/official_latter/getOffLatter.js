function toggleFiles(folderId) {
    const folderElement = document.getElementById(`folder-${folderId}`);
    if (folderElement) {
      folderElement.classList.toggle('d-none');
    }
  }
  
  const officialLetterApp = (() => {
    let data;
    const url = letterData;
    const customTime = new Date().getTime();
    const version = `${url}?v=${customTime}`;
    const tbody = document.querySelector("#official_letter tbody");
    const searchAddContainer = document.getElementById("search-add-container");
    const searchInput = document.querySelector("#search-input");
    const tableContainer = document.getElementById("table-container");
    const documentDetailsContainer = document.getElementById("document-details");
    const addLetterFolder = document.getElementById("addFolderBtn");
    const folderList = document.getElementById("folderList");
    const formatNum = document.getElementById("formatNum");
    const pageSize = 10;
    let currentPage = 1;
    let currentLetterId;
  
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
      const filteredData = data.data.filter((data) => {
        const userMatched =
          filterUser === "" || data.nama.toLowerCase() === filterUser.toLowerCase();
        const typeMatched =
          filterType === "" ||
          data.project_type.toLowerCase() === filterType.toLowerCase();
        const statusMatched =
          filterStatus === "" || data.status_sales === filterStatus;
        const yearMatched =
          filterYear === "" || new Date(data.tanggal).getFullYear() == filterYear;
        const startDateMatched =
          startDate === "" || new Date(data.date) >= new Date(startDate);
        const endDateMatched =
          endDate === "" || new Date(data.date) <= new Date(endDate);
        const searchMatched =
          searchQuery === "" ||
          data.no_letter.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.beneficiary.toString().includes(searchQuery) ||
          data.client.toLowerCase().includes(searchQuery.toLowerCase());
  
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
        row.innerHTML = `
          <td class="d-none d-md-table-cell ta-center">${i}</td>
          <td class="d-none d-md-table-cell ta-center">${data.date}</td>
          <td class="d-none d-md-table-cell ta-center">${data.code}</td>
          <td class="d-none d-md-table-cell ta-center">${data.no_letter}</td>
          <td class="d-none d-md-table-cell ta-start">${data.subject}</td>
          <td class="d-none d-md-table-cell ta-start">${data.beneficiary}</td>
          <td class="d-none d-md-table-cell ta-start">${data.client}</td>
          <td class="d-none d-sm-table-cell ta-center">
            <center><div class="dropdown no-arrow mb-4">
            <button class="btn btn-primary dropdown-toggle mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Action
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item info-btn text-danger" onclick="deleteLetter(${data.letter_id})">Delete</a>
            </div>
            </div></center>
          </td>
        `;
        // Add event listener to row for clicking to show documents
        row.addEventListener('click', (event) => {
          if (!event.target.closest('.dropdown')) {
            showDocumentDetails(data.letter_id);
          }
        });
        tbody.appendChild(row);
        i++;
      });
      createPaginationButtonsPC(totalPages);
      createPaginationButtonsMobile(totalPages);
    }
  
    function showDocumentDetails(letterId) {
      tableContainer.style.display = 'none';
      documentDetailsContainer.style.display = 'block';
      searchAddContainer.style.display = 'none';
      currentLetterId = letterId;

      const addFolderBtn = document.getElementById("addFolderBtn");
        if (addFolderBtn) {
        addFolderBtn.addEventListener('click', function() {
            addFolder(currentLetterId);
        });
        }
  
      // Fetch untuk format nomor dokumen
      fetch(`${letterData}/${letterId}`, {
        headers: headers
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data.length === 0) {
          formatNum.innerHTML = `Data tidak ditemukan`;
        } else {
          formatNum.innerHTML = `Document : ${responseData.data[0].no_letter}`;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        formatNum.innerHTML = `Error fetching data`;
      });
  
      // Fetch untuk folder dan file dari dokumen
      fetch(`https://apiddim.booq.id/document/letter/${letterId}`, {
        headers: headers
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data.length === 0) {
          folderList.innerHTML = `<h6>No folders or files available</h6>`;
        } else {
          // Clear the existing folder list
          folderList.innerHTML = '';
          const folders = {};
          responseData.data.forEach(item => {
            if (item.doc_type === 'folder') {
              if (!folders[item.folder_id]) {
                folders[item.folder_id] = {
                  name: item.doc_name,
                  files: []
                };
              }
            } else if (item.doc_type === 'files') {
              if (folders[item.folder_id]) {
                folders[item.folder_id].files.push(item);
              }
            }
          });
          
          for (const folderId in folders) {
            const folder = folders[folderId];
            const folderItem = document.createElement('li');
            folderItem.classList.add('list-group-item');
            folderItem.innerHTML = `
              <div class="d-flex justify-content-between align-items-center">
                <span>${folder.name}</span>
                <div class="btn-group">
                  <button class="btn btn-outline-secondary btn-sm" onclick="toggleFiles(${folderId})"><i class="fas fa-folder"></i></button>
                  <button class="btn btn-outline-secondary btn-sm"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-outline-secondary btn-sm" onclick="deleteFolder(${folderId})"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <ul class="list-group mt-2 d-none" id="folder-${folderId}">
                ${folder.files.map(file => `
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${file.doc_name}
                    <div class="btn-group">
                      <button class="btn btn-outline-secondary btn-sm"><i class="fas fa-download"></i></button>
                      <button class="btn btn-outline-secondary btn-sm"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-outline-secondary btn-sm" onclick="deleteFile(${file.doc_id})"><i class="fas fa-trash"></i></button>
                    </div>
                  </li>
                `).join('')}
              </ul>
            `;
            folderList.appendChild(folderItem);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        folderList.innerHTML = `<h6>Problems with the API</h6>`;
      });
    }
  
    async function addFolder(letterId) {
        const htmlResponse = await fetch("module/" + page + "/modal/official_latter/addFolOffLatter.php");
        const htmlContent = await htmlResponse.text();
      
        Swal.fire({
          title: "Add Folder Official Latter",
          html: htmlContent,
          showCancelButton: true,
          confirmButtonText: "Save",
          cancelButtonText: "Cancel",
          focusConfirm: false,
      
          preConfirm: async () => {
            // const folderName = Swal.getPopup().querySelector("#folderName").value;
      
            const addData = {
              latter_id: letterId,
              doc_name: 'add new folder',
            };
      
            try {
              const Response = await fetch('https://apiddim.booq.id/folder/letter', {
                method: "POST",
                headers:  {
                    'Authorization': 'Bearer DpacnJf3uEQeM7 HN'
                },
                body: JSON.stringify(addData),
              });
      
              if (!Response.ok) {
                throw new Error("Failed to add folder");
              }
      
              Swal.fire({
                title: "Success",
                text: "Data updated successfully!",
                icon: "success",
              }).then(() => {
                location.reload();
              });
            } catch (error) {
              console.error("Error add folder:", error);
              Swal.fire("Error", "Failed to update data", "error");
            }
          },
        });
      }
      
      const addFolderBtn = document.getElementById("addFolderBtn");
      if (addFolderBtn) {
        addFolderBtn.addEventListener('click', function() {
          addFolder(currentLetterId);
        });
      }
  
    function createPaginationButtonsPC(totalPages) {
      const paginationContainer = document.querySelector("#pagination-container-pc");
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
      const paginationContainer = document.querySelector("#pagination-container-mobile");
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
        <td colspan="8" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </td>`;
      tbody.innerHTML = "";
      tbody.appendChild(loadingRow);
  
      fetch(version, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((responseData) => {
          tbody.innerHTML = ""; // Clear the loading row
          data = responseData;
          if (data.data.length === 0) {
            // Show "No data available" if no data
            const row = document.createElement("tr");
            row.innerHTML = `
              <td colspan="8" class="text-center">No data available</td>
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
          const errorRow = document.createElement("tr");
          errorRow.innerHTML = `
            <td colspan="8" class="text-center">Problems with the API</td>`;
          tbody.appendChild(errorRow);
        });
    }
  
    searchInput.addEventListener("input", () => {
      displayData(1, searchInput.value);
    });
  
    document.getElementById("closeDetails").addEventListener("click", () => {
      tableContainer.style.display = 'block';
      documentDetailsContainer.style.display = 'none';
      searchAddContainer.style.display = 'block';
    });
  
    addFolderBtn.addEventListener("click", () => addFolder(currentLetterId));
  
    fetchData();
  
    return {
      fetchData,
      displayData,
      createPaginationButtonsPC,
      createPaginationButtonsMobile
    };
  })();
  
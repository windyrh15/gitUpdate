let dataFilterUser;

const urlFilterUser = dataUser;
const customFilterUser = new Date().getTime();
const versionFilterUser = `${urlFilterUser}?v=${customFilterUser}`;
const dropdownNamaFilterUser = document.getElementById("dropdownUser");

fetch(versionFilterUser, {
    headers: headers
})
  .then((response) => response.json())
  .then((responseData) => {
    dataFilterUser = responseData;

    dataFilterUser.dataUser.forEach(function (filterUser) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const nama = filterUser.nama_user;
      a.textContent = filterUser.nama_user;
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", () => {
        displayData(1, searchInput.value, filterUser.nama_user);
        $("#filter").text("Filtered by user: " + nama);
      });
      li.appendChild(a);
      dropdownNamaFilterUser.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

let dataFilterType;

// const urlFilterType = "api/" + sales + dataType;
// const customFilterType = new Date().getTime();
// const versionFilterType = `${urlFilterType}?v=${customFilterType}`;
const dropdownNamaFilterType = document.getElementById("dropdownType");

fetch(dataType, {
    headers: headers
})
.then((response) => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
  .then((responseData) => {
    dataFilterType = responseData;

    dataFilterType.dataType.forEach(function (filterType) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const type = filterType.nama_type;
      a.textContent = filterType.nama_type;
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", () => {
        displayData(1, searchInput.value, "", filterType.nama_type);
        $("#filter").text("Filtered by type: " + type);
      });
      li.appendChild(a);
      dropdownNamaFilterType.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

let dataFilterStatus;

const urlFilterStatus = dataStatus;
const customFilterStatus = new Date().getTime();
const versionFilterStatus = `${urlFilterStatus}?v=${customFilterStatus}`;
const dropdownNamaFilterStatus = document.getElementById("dropdownStatus");

fetch(versionFilterStatus, {
       headers: headers
})
  .then((response) => response.json())
  .then((responseData) => {
    dataFilterStatus = responseData;

    dataFilterStatus.dataStatus.forEach(function (filterStatus) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const status = filterStatus.status_sales;
      a.textContent = filterStatus.status_sales;
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", () => {
        displayData(1, searchInput.value, "", "", filterStatus.status_id);
        $("#filter").text("Filtered by status: " + status);
      });
      li.appendChild(a);
      dropdownNamaFilterStatus.appendChild(li);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

function filterByYear() {
  const currentYear = new Date().getFullYear();
  displayData(1, searchInput.value, "", "", "", currentYear);
}

addYear.addEventListener("click", function () {
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
            Swal.showValidationMessage("Please select a year");
          } else {
            displayData(1, searchInput.value, "", "", "", filterYear);
            $("#filter").text("Filtered by year: " + filterYear);
          }
        },
      });
    });
});

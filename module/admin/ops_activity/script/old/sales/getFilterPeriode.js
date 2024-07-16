async function getUser() {
  try {
    const response = await fetch(versionFilterUser, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error("Failed to fetch User");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
}

async function getStatus() {
  try {
    const response = await fetch(versionFilterStatus, {
      method: "GET",
       headers: headers
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Status");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching Status:", error);
    throw error;
  }
}

async function filterUserDropdown() {
  let dropdownNamaUser = $("#user");
  dropdownNamaUser.empty();
  dropdownNamaUser.append(
    "<option value='' selected disabled>Select The User</option>"
  );

  try {
    const userResponse = await getUser();
    const user = userResponse.dataUser;

    user.forEach(function (item) {
      let option = `<option value='${item.nama_user}'>${item.nama_user}</option>`;
      dropdownNamaUser.append(option);
    });
  } catch (error) {
    console.error("Error filling User dropdown:", error);
  }
}

async function filterProjectTypeDropdown() {
  var dropdownNamaProjectType = $("#type");
  dropdownNamaProjectType.empty();
  dropdownNamaProjectType.append(
    "<option value='' selected disabled>Select The Project Type</option>"
  );

  try {
    const projectTypeResponse = await getProjectType();
    const projectType = projectTypeResponse.dataType;

    projectType.forEach(function (item) {
      let option = `<option value='${item.nama_type}'>${item.nama_type} (${item.kode_type})</option>`;
      dropdownNamaProjectType.append(option);
    });
  } catch (error) {
    console.error("Error filling ProjectType dropdown:", error);
  }
}

async function filterStatusDropdown() {
  let dropdownNamaStatus = $("#status");
  dropdownNamaStatus.empty();
  dropdownNamaStatus.append(
    "<option value='' selected disabled>Select The Status</option>"
  );

  try {
    const statusResponse = await getStatus();
    const status = statusResponse.dataStatus;

    status.forEach(function (item) {
      let option = `<option value='${item.status_id}'>${item.status_sales}</option>`;
      dropdownNamaStatus.append(option);
    });
  } catch (error) {
    console.error("Error filling User dropdown:", error);
  }
}

addPeriode.addEventListener("click", async function () {
  try {
    const response = await fetch(
      "module/" + page + "/modal/sales/filterPriode.php"
    );
    const htmlContent = await response.text();

    Swal.fire({
      title: "Filter By Periode",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Filter",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        await filterProjectTypeDropdown();
        await filterUserDropdown();
        await filterStatusDropdown();
      },
      preConfirm: async () => {
        const user = Swal.getPopup().querySelector("#user").value;
        const type = Swal.getPopup().querySelector("#type").value;
        const status = Swal.getPopup().querySelector("#status").value;
        const start_date = Swal.getPopup().querySelector("#start_date").value;
        const end_date = Swal.getPopup().querySelector("#end_date").value;

        let filterText = "Filtered by: ";
        let filterApplied = false;

        if (user && !type && !status && !start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += user;
          filterApplied = true;
        }
        if (!user && type && !status && !start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += type;
          filterApplied = true;
        }
        if (!user && !type && status && !start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += status;
          filterApplied = true;
        }
        if (!user && !type && !status && start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += "From " + start_date;
          filterApplied = true;
        }
        if (!user && !type && !status && !start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += " to " + end_date;
          filterApplied = true;
        }
        if (!user && !type && !status && start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += "From " + start_date + " to " + end_date;
          filterApplied = true;
        }
        if (user && type && !status && !start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += user + " and " + type;
          filterApplied = true;
        }
        if (user && !type && status && !start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += user + " and " + status;
          filterApplied = true;
        }
        if (user && !type && !status && start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += user + ", From " + start_date;
          filterApplied = true;
        }
        if (user && !type && !status && !start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += user + ", To " + end_date;
          filterApplied = true;
        }
        if (user && !type && !status && start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += user + ", From " + start_date + " to " + end_date;
          filterApplied = true;
        }
        if (!user && type && status && !start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += type + " and " + status;
          filterApplied = true;
        }
        if (!user && type && !status && start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += type + ", From " + start_date;
          filterApplied = true;
        }
        if (!user && type && !status && !start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += type + ", To " + end_date;
          filterApplied = true;
        }
        if (!user && type && !status && start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += type + ", From " + start_date + " to " + end_date;
          filterApplied = true;
        }
        if (!user && !type && status && start_date && !end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += status + ", From " + start_date;
          filterApplied = true;
        }
        if (!user && !type && status && !start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += status + ", To " + end_date;
          filterApplied = true;
        }
        if (!user && !type && status && start_date && end_date) {
          if (filterApplied) {
            filterText += ", ";
          }
          filterText += status + ", From " + start_date + " to " + end_date;
          filterApplied = true;
        }
        if (!filterApplied) {
          filterText += "None";
        }

        if (filterApplied) {
          displayData(
            1,
            searchInput.value,
            user,
            type,
            status,
            "",
            start_date,
            end_date
          );
          $("#filter").text(filterText);
        }

        if (displayData) {
          Swal.fire("Success", filterText + " successfully!", "success");
        } else {
          console.error("Error adding data:", error);
          Swal.fire("Error", "Failed to filtered data", "error");
        }
      },
    });
  } catch (error) {
    console.error("Error fetching HTML content:", error);
  }
});

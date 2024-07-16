// Tambah material update ------------------------------------------------------------------------------------------------------------------------------------------------------

function tambahMaterialUpdate() {
  const materialContainer = document.querySelector("#materialContainer");

  const materialFormRow = document.createElement("div");
  materialFormRow.classList.add("row", "mb-2");

  const materialInputCol = document.createElement("div");
  materialInputCol.classList.add("col");

  const materialInput = document.createElement("input");
  materialInput.type = "text";
  materialInput.name = "material[]";
  materialInput.placeholder = "Material";
  materialInput.classList.add("form-control");
  materialInput.required = true;

  materialInputCol.appendChild(materialInput);

  const quantityInputCol = document.createElement("div");
  quantityInputCol.classList.add("col");

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.name = "quantity[]";
  quantityInput.placeholder = "Quantity";
  quantityInput.classList.add("form-control");
  quantityInput.required = true;

  quantityInputCol.appendChild(quantityInput);

  const deleteButtonCol = document.createElement("div");
  deleteButtonCol.classList.add("col-auto");

  const deleteButton = document.createElement("div");
  deleteButton.classList.add("btn", "btn-danger"); // Mengubah warna tombol menjadi merah
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
        </svg>`;

  deleteButton.addEventListener("click", () => {
    materialContainer.removeChild(materialFormRow);
    updateDeleteButtons();
  });

  deleteButtonCol.appendChild(deleteButton);

  materialFormRow.appendChild(materialInputCol);
  materialFormRow.appendChild(quantityInputCol);
  materialFormRow.appendChild(deleteButtonCol);

  materialContainer.appendChild(materialFormRow);

  updateDeleteButtons();
}

// Update Delete Button ------------------------------------------------------------------------------------------------------------------------------------------------

function updateDeleteButtons() {
  const deleteButtonElements = document.querySelectorAll(
    "#materialContainer .btn.btn-danger"
  );
  if (deleteButtonElements.length === 1) {
    deleteButtonElements[0].style.display = "none";
  } else {
    deleteButtonElements.forEach((button) => {
      button.style.display = "block";
    });
  }
}

// Cek Material Form ---------------------------------------------------------------------------------------------------------------------------------------------------
function validateMaterials() {
  const materialInputs = document.querySelectorAll('input[name="material[]"]');
  const quantityInputs = document.querySelectorAll('input[name="quantity[]"]');

  for (let i = 0; i < materialInputs.length; i++) {
    if (materialInputs[i].value && quantityInputs[i].value) {
      return true;
    }
  }

  return false;
}

// Cek Project Name ----------------------------------------------------------------------------------------------------------------------------------------------------
async function cekProjectName(projectName) {
  try {
    // Fetch data proyek dari API
    const response = await fetch(projectData, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch project data");
    }

    const data = await response.json(); // Parsing respons JSON
    const projects = data.dataProject; // Asumsikan properti ini menyimpan daftar proyek

    // Logging data proyek untuk debugging
    // console.log("Projects data from API:", projects);

    // Filter proyek berdasarkan nama proyek yang diberikan
    const filteredProject = projects.find(
      (project) => project.project === projectName
    );

    if (filteredProject) {
      // console.log("Project found:", filteredProject);
      // Lakukan sesuatu dengan data proyek yang ditemukan
      return filteredProject;
    } else {
      console.log("Project not found for name:", projectName);
      return null;
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

async function showEditForm(deliveryId) {
  try {
    const urlDeliveryNote = `${deliveryNote}${deliveryId}`;

    // Fetch current data from API
    const response = await fetch(urlDeliveryNote, {
      headers: headersTes,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const deliveryDateFromAPI = data.data[0].date;

    // Parse date from "dd/MM/yyyy" format
    const [day, month, year] = deliveryDateFromAPI.split("/");
    const deliveryDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(deliveryDate.getTime())) {
      throw new Error("Invalid date value");
    }
    const formattedDate = deliveryDate.toISOString().split("T")[0];

    const materialDetails = data.data[0].material_detail;

    // Fetch HTML content for the edit form
    const formResponse = await fetch("module/" + page + "/modal/delivery_note/editDelNote.php");
    const htmlContent = await formResponse.text();

    Swal.fire({
      title: "Edit Delivery Note",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        var people = [];
        var projects = [];
        var nameInput = document.getElementById('pic');
        var phoneInput = document.getElementById('phone');
        var projectInput = document.getElementById('project');
        var deliverToInput = document.getElementById('deliverTo');
        var suggestions = document.getElementById('suggestions');
        var suggestionProject = document.getElementById('suggestionProject');

        // Fetch project data
        try {
          const projectResponse = await fetch('https://apiddim.booq.id/project', {
            headers: {
                'Authorization': 'Bearer DpacnJf3uEQeM7 HN'
            }
          });
          const projectData = await projectResponse.json();
          projects = projectData.dataProject.map(project => ({
            projectName: project.project_name,
            deliverTo: project.client
          }));
          // console.log("Project data fetched:", projects);
        } catch (error) {
          console.error('Error fetching project data:', error);
        }

        // Fetch PIC data
        try {
            const response = await fetch('https://apiddim.booq.id/data/pic', {
                headers: {
                    'Authorization': 'Bearer DpacnJf3uEQeM7HN'
                }
            });
            const data = await response.json();
            people = data.data.map(person => ({
                name: person.pic,
                phone: person.pic_phone
            }));
            // console.log("PIC data fetched:", people);
        } catch (error) {
            console.error('Error fetching PIC data:', error);
        }

        if (!nameInput || !phoneInput || !suggestions || !projectInput || !deliverToInput) {
          console.error("Required input elements not found.");
          return;
        }

        // Set default values
        document.getElementById('pic').value = data.data[0].pic;
        document.getElementById('phone').value = data.data[0].pic_phone;
        document.getElementById('project').value = data.data[0].project;
        document.getElementById('deliverTo').value = data.data[0].customer;
        document.getElementById("tanggal").value = formattedDate;
        document.getElementById("formatNo").value = data.data[0].no_dn;

        // Handle material details
        materialDetails.forEach((detail) => {
          tambahMaterialUpdate();
          const materialInputs = document.querySelectorAll('input[name="material[]"]');
          const quantityInputs = document.querySelectorAll('input[name="quantity[]"]');
          materialInputs[materialInputs.length - 1].value = detail.material;
          quantityInputs[quantityInputs.length - 1].value = detail.quantity;
        });

        // Populate project fields and add event listener for autocomplete
        projectInput.addEventListener('input', function () {
          const query = projectInput.value.toLowerCase();
          suggestionProject.innerHTML = '';
          if (query) {
            const filteredProjects = projects.filter(project =>
              project.projectName.toLowerCase().includes(query)
            );
            filteredProjects.forEach(project => {
              const suggestionItem = document.createElement('div');
              suggestionItem.classList.add('suggestion-item', 'list-group-item');
              suggestionItem.textContent = project.projectName;
              suggestionItem.addEventListener('click', function () {
                projectInput.value = project.projectName;
                deliverToInput.value = project.deliverTo;
                suggestionProject.innerHTML = '';
              });
              suggestionProject.appendChild(suggestionItem);
            });
          }
        });

        // Populate PIC fields and add event listener for autocomplete
        nameInput.addEventListener('input', function() {
          var query = nameInput.value.toLowerCase();
          suggestions.innerHTML = '';
          if (query) {
              var filteredPeople = people.filter(function(person) {
                  return person.name.toLowerCase().includes(query);
              });
              filteredPeople.forEach(function(person) {
                  var div = document.createElement('div');
                  div.className = 'suggestion-item';
                  div.textContent = person.name + " (" + person.phone + ")";
                  div.addEventListener('click', function() {
                      nameInput.value = person.name;
                      phoneInput.value = person.phone;
                      suggestions.innerHTML = '';
                  });
                  suggestions.appendChild(div);
              });
          }
        });

        document.addEventListener('click', function(event) {
          if (!event.target.closest('#pic') && !event.target.closest('#suggestions')) {
              suggestions.innerHTML = '';
          }
          if (!event.target.closest('#project') && !event.target.closest('#suggestionProject')) {
              suggestionProject.innerHTML = '';
          }
        });

      },
      preConfirm: async () => {
        // Validasi inputan user sebelum update
        const project = Swal.getPopup().querySelector("#project").value;
        const pic = Swal.getPopup().querySelector("#pic").value;
        const phone = Swal.getPopup().querySelector("#phone").value;
        const prefix = Swal.getPopup().querySelector("#prefix").value;
        const tanggal = Swal.getPopup().querySelector("#tanggal").value;
        const formatNo = Swal.getPopup().querySelector("#formatNo").value;
        const pelanggan = Swal.getPopup().querySelector("#deliverTo").value;

        if (!validateMaterials()) {
          Swal.showValidationMessage(
            "At least one material and quantity must be filled out."
          );
          return false;
        }

        if (!project) {
          Swal.showValidationMessage("Project is required");
          return false;
        }
        if (!tanggal) {
          Swal.showValidationMessage("Date is required");
          return false;
        }
        if (!pic) {
          Swal.showValidationMessage("PIC is required");
          return false;
        }
        if (!phone) {
          Swal.showValidationMessage("Phone is required");
          return false;
        }

        const materialInputs = Swal.getPopup().querySelectorAll('input[name="material[]"]');
        const quantityInputs = Swal.getPopup().querySelectorAll('input[name="quantity[]"]');

        const updatedMaterialDetails = [];
        for (let i = 0; i < materialInputs.length; i++) {
          if (materialInputs[i].value && quantityInputs[i].value) {
            updatedMaterialDetails.push({
              material: materialInputs[i].value,
              quantity: quantityInputs[i].value,
            });
          }
        }

        const updatedData = {
          project: project,
          pelanggan: pelanggan,
          prefix: prefix,
          date: tanggal,
          no_dn: formatNo,
          pic: pic,
          pic_phone: phone,
          material_detail: updatedMaterialDetails,
        };

        try {
          const updateResponse = await fetch(
            `${updateDeliveryNote}${deliveryId}`,
            {
              method: "PUT",
              headers: headersTes,
              body: JSON.stringify(updatedData),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update data");
          }

          Swal.fire({
            title: "Success",
            text: "Data updated successfully!",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        } catch (error) {
          console.error("Error updating data:", error);
          Swal.fire("Error", "Failed to update data", "error");
        }
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    Swal.fire("Error", "Failed to fetch data", "error");
  }
}

// Event listener for the edit button
document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const deliveryId = event.target.dataset.id;
    showEditForm(deliveryId);
  });
});

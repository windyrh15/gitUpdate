// Props -----------------------------------------------------------------------------------------------------
document.querySelector("#inputBtnDelNote").addEventListener("click", showInputForm);

// tambahMaterial --------------------------------------------------------------------------------------------------
function tambahMaterial() {
    const container = document.querySelector("#materialContainer");
  
    const materialFormInput = document.createElement("div");
    materialFormInput.classList.add("row", "mb-2");
  
    const inputMaterialCol = document.createElement("div");
    inputMaterialCol.classList.add("col");
  
    const inputMaterial = document.createElement("input");
    inputMaterial.type = "text";
    inputMaterial.name = "material[]";
    inputMaterial.placeholder = "Material";
    inputMaterial.classList.add("form-control");
    inputMaterial.required = true;
  
    inputMaterialCol.appendChild(inputMaterial);
  
    const inputQuantityCol = document.createElement("div");
    inputQuantityCol.classList.add("col");
  
    const inputQuantity = document.createElement("input");
    inputQuantity.type = "number";
    inputQuantity.name = "quantity[]";
    inputQuantity.placeholder = "Quantity";
    inputQuantity.classList.add("form-control");
    inputQuantity.required = true;
  
    inputQuantityCol.appendChild(inputQuantity);
  
    const deleteButtonCol = document.createElement("div");
    deleteButtonCol.classList.add("col-auto");
  
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
  </svg>`;
  
    deleteButton.addEventListener("click", () => {
      container.removeChild(materialFormInput);
    });
  
    deleteButtonCol.appendChild(deleteButton);
  
    materialFormInput.appendChild(inputMaterialCol);
    materialFormInput.appendChild(inputQuantityCol);
    materialFormInput.appendChild(deleteButtonCol);
  
    container.appendChild(materialFormInput);
  }
  
  // Cek Material Form ---------------------------------------------------------------------------------------
  
  // Fungsi untuk memastikan setidaknya ada satu input material dan quantity yang terisi
  function validateMaterials() {
    const materials = document.querySelectorAll('input[name="material[]"]');
    const quantities = document.querySelectorAll('input[name="quantity[]"]');
    
    for (let i = 0; i < materials.length; i++) {
        if (!materials[i].value || !quantities[i].value) {
            return false;
        }
    }
    return true;
  }
  

async function populateSelect() {
    var projects = [];
    var people = [];

    try {
        // Fetch project data
        const projectResponse = await fetch('https://apiddim.booq.id/project', {
            headers: {
                'Authorization': 'Bearer DpacnJf3uEQeM7 HN'
            }
        });
        const projectData = await projectResponse.json();
        projects = projectData.dataProject.map(project => ({
            name: project.project_name,
            client: project.client
        }));

        // Fetch PIC data
        const picResponse = await fetch('https://apiddim.booq.id/data/pic', {
            headers: {
                'Authorization': 'Bearer DpacnJf3uEQeM7HN'
            }
        });
        const picData = await picResponse.json();
        people = picData.data.map(person => ({
            name: person.pic,
            phone: person.pic_phone
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    // Populate project input
    var projectInput = document.getElementById('project');
    var deliverToInput = document.getElementById('deliverTo');
    var suggestionProject = document.getElementById('suggestionProject');

    projectInput.addEventListener('input', function() {
        var query = projectInput.value.toLowerCase();
        suggestionProject.innerHTML = '';
        if (query) {
            var filteredProjects = projects.filter(function(project) {
                return project.name.toLowerCase().includes(query);
            });
            filteredProjects.forEach(function(project) {
                var div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = project.name + " (" + project.client + ")";
                div.addEventListener('click', function() {
                    projectInput.value = project.name;
                    deliverToInput.value = project.client;
                    suggestionProject.innerHTML = '';
                });
                suggestionProject.appendChild(div);
            });
        }
    });

    // Populate PIC input
    var nameInput = document.getElementById('pic');
    var phoneInput = document.getElementById('phone');
    var suggestions = document.getElementById('suggestions');

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
        if (!event.target.closest('#project') && !event.target.closest('#suggestionProject')) {
            suggestionProject.innerHTML = '';
        }
        if (!event.target.closest('#pic') && !event.target.closest('#suggestions')) {
            suggestions.innerHTML = '';
        }
    });
}

async function run() {
    document.getElementById("materialButton").addEventListener("click", tambahMaterial);
    await populateSelect();
}

async function showInputForm() {
    try {
        const response = await fetch("module/" + page + "/modal/delivery_note/inputDelNote.php");
        if (!response.ok) throw new Error("Network response was not ok");
        const htmlContent = await response.text();

        Swal.fire({
            title: "Add New Delivery Note",
            html: htmlContent,
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            didOpen: async () => {
                run();
            },
            preConfirm: async () => {
                const owner = Swal.getPopup().querySelector("#owner_id").value;
                const user = Swal.getPopup().querySelector("#user_id").value;
                const project = Swal.getPopup().querySelector("#project").value;
                const pelanggan = Swal.getPopup().querySelector("#deliverTo").value;
                const prefix = Swal.getPopup().querySelector("#prefix").value;
                const tanggal = Swal.getPopup().querySelector("#tanggal").value;
                const formatNo = Swal.getPopup().querySelector("#formatNo").value;
                const pic = Swal.getPopup().querySelector("#pic").value;
                const phone = Swal.getPopup().querySelector("#phone").value;

                if (!validateMaterials()) {
                    Swal.showValidationMessage("At least one material and quantity must be filled out.");
                    return false; 
                }

                const materials = Swal.getPopup().querySelectorAll('input[name="material[]"]');
                const quantities = Swal.getPopup().querySelectorAll('input[name="quantity[]"]');

                const materialDetails = [];
                for (let i = 0; i < materials.length; i++) {
                    if (materials[i].value && quantities[i].value) {
                        materialDetails.push({
                            material: materials[i].value,
                            quantity: quantities[i].value,
                        });
                    }
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

                const newData = {
                    owner_id: owner,
                    user_id: user,
                    project: project,
                    pelanggan: pelanggan,
                    prefix: prefix,
                    date: tanggal,
                    no_dn: formatNo,
                    pic: pic,
                    pic_phone: phone,
                    material_detail: materialDetails,
                };

                try {
                    const res = await fetch(addDeliveryNote, {
                        method: "POST",
                        headers: headersTes,
                        body: JSON.stringify(newData),
                    });

                    const result = await res.json();
                    if (res.ok) {
                        Swal.fire({
                            title: "Success",
                            text: result.message,
                            icon: "success",
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire("Error", result.error, "error");
                    }
                } catch (error) {
                    console.error("Error adding data:", error);
                    Swal.fire("Error", "Failed to add data", "error");
                }
            },
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
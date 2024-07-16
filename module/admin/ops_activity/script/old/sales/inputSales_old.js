const urlProjectType = dataType;
const versionProjectType = `${urlProjectType}?v=${customTime}`;
const dropdownNamaProjectType = document.getElementById("project_type");

const urlLastNumber = dataLastNumber;
const versionLastNumber = `${urlLastNumber}?v=${customTime}`;

async function getProjectType() {
  try {
    const response = await fetch(versionProjectType, {
      method: "GET",
       headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Project Type");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching Project Type:", error);
    throw error;
  }
}

async function fillProjectTypeDropdown(selectedTypeId) {
  var dropdownNamaProjectType = $("#project_type");
  dropdownNamaProjectType.empty();
  dropdownNamaProjectType.append(
    "<option value='' selected disabled>Select The Project Type</option>"
  );

  try {
    const projectTypeResponse = await getProjectType();
    const projectType = projectTypeResponse.dataType;

    projectType.forEach(function (item) {
      let option = `<option value='${item.nama_type}' data-kode-type='${item.kode_type}'>${item.nama_type} (${item.kode_type})</option>`;
      if (selectedTypeId && item.nama_type === selectedTypeId) {
        option = `<option value='${item.nama_type}' data-kode-type='${item.kode_type}' selected>${item.nama_type} (${item.kode_type})</option>`;
      }
      dropdownNamaProjectType.append(option);
    });
  } catch (error) {
    console.error("Error filling ProjectType dropdown:", error);
  }
}

async function getLastNumber() {
    
  try {
   const response = await fetch(versionLastNumber, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    const last = data.dataNomor[0].terakhir;
    const lastNumber = last + 1;
    return lastNumber;
  } catch (error) {
    console.error("Error fetching last number:", error);
    throw error;
  }
}

async function createUniqueNumber() {
  try {
    const lastNumber = await getLastNumber();
    const prefix = document.getElementById("prefix").value;
    const initialName = document.getElementById("initial_name").value;
    const projectTypeSelect = document.getElementById("project_type");
    const selectedType =
      projectTypeSelect.options[projectTypeSelect.selectedIndex];
    const type_id = selectedType.value;
    const kode_type = selectedType.dataset.kodeType;

    if (!kode_type) {
      throw new Error("Selected project type code not found");
    }

    const currentYear = new Date().getFullYear();
    const currentMonthRoman = romanize(new Date().getMonth() + 1);

    const no_qtn = `${lastNumber}/${prefix}/${kode_type}/${initialName}/${currentMonthRoman}/${currentYear}`;
    document.getElementById("no_qtn").value = no_qtn;

    return no_qtn;
  } catch (error) {
    console.error("Error creating unique number:", error);
    throw error;
  }
}

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}


inputSalesButton.addEventListener("click", async function () {
  try {
    const response = await fetch(
      "module/" + page + "/modal/sales/inputSales.php"
    );
    const htmlContent = await response.text();

    Swal.fire({
      title: "Add Data",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        await fillProjectTypeDropdown();
        document
          .getElementById("client")
          .addEventListener("input", showClientSuggestions);
      },
      preConfirm: async () => {
        const owner_id = Swal.getPopup().querySelector("#owner_id").value;
        const user_id = Swal.getPopup().querySelector("#user_id").value;
        const order_date = Swal.getPopup().querySelector("#order_date").value;
        const project_type =
          Swal.getPopup().querySelector("#project_type").value;
        const prefix = Swal.getPopup().querySelector("#prefix").value;
        const initial_name =
          Swal.getPopup().querySelector("#initial_name").value;
        const no_qtn = Swal.getPopup().querySelector("#no_qtn").value;
        const project_name =
          Swal.getPopup().querySelector("#project_name").value;
        const amount = Swal.getPopup().querySelector("#amount").value;
        const client= Swal.getPopup().querySelector("#client").value;
        const fileInput = Swal.getPopup().querySelector("#file");
        const file = fileInput.files[0];
        
        console.log("Selected File:", file);

        try {
          const dataInputSales = {
            owner_id: owner_id,
            user_id: user_id,
            order_date: order_date,
            project_type: project_type,
            prefix: prefix,
            initial_name: initial_name,
            no_qtn: no_qtn,
            project_name: project_name,
            amount: amount,
            client: client
          };

        console.log(dataInputSales);

        const response = await fetch(`${salesData}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(dataInputSales),
          });

          if (!response.ok) {
            throw new Error("Failed to add data");
          }
          fetchData();
          Swal.fire("Success", "Data added successfully!", "success");
        } catch (error) {
          console.error("Error adding data:", error);
          Swal.fire("Error", "Failed to add data", "error");
        }
      },
    });
  } catch (error) {
    console.error("Error fetching HTML content:", error);
  }
});

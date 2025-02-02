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
    let lastNumber;
    if (data.dataNomor.length > 0) {
      const last = data.dataNomor[0].terakhir;
      lastNumber = (last + 1).toString().padStart(3, '0');
    } else {
       lastNumber = (1).toString().padStart(3, '0');
    }
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

function clientKapital(){
document.getElementById("client").addEventListener("input", function() {
    // Mengambil nilai input client
    let clientValue = this.value;
    // Mengubah nilai input menjadi huruf besar
    this.value = clientValue.toUpperCase();
});
}

function formatAmount(){
// Mendengarkan event input pada elemen input amount
document.getElementById("amount").addEventListener("input", function() {
    // Mengambil nilai input amount
    let amountValue = this.value;
    // Menghapus semua koma dari nilai input
    amountValue = amountValue.replace(/,/g, '');
    // Memformat nilai input dengan koma sebagai pemisah ribuan
    amountValue = Number(amountValue).toLocaleString();
    // Menetapkan nilai input yang diformat kembali ke elemen
    this.value = amountValue;
});
}


// Fungsi untuk mengirim data sales
async function sendSalesData(formData) {
    try {
        formData.set("amount", formData.get("amount").replace(/,/g, ''));
        const url = salesData;
        const response = await fetch(url, {
            method: 'POST',
            headers: headerFormData,
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to add data');
        }

        const responseData = await response.json();
        console.log('Data added successfully:', responseData);
        fetchData();
        fetchDataRecap();
        fetchFooterRecap();
        Swal.fire("Success", "Data added successfully!", "success");
    } catch (error) {
        console.error('Error adding data:', error);
        Swal.fire("Error", "Failed to add data", "error");
    }
}

// Fungsi untuk mengambil konten modal dari URL
async function fetchModalAddSales(url) {
    try {
        const response = await fetch(url);
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        throw new Error("Error fetching HTML content:", error);
    }
}

// Mendengarkan klik pada tombol untuk menambahkan data penjualan
inputSalesButton.addEventListener("click", async function () {
    try {
        const modalUrl = "module/" + page + "/modal/sales/inputSales.php";
        const modalContent = await fetchModalAddSales(modalUrl);

        Swal.fire({
            title: "Add Sales",
            html: modalContent,
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            didOpen: async () => {
                await fillProjectTypeDropdown();
                document
                    .getElementById("client")
                    .addEventListener("input", showClientSuggestions);
                clientKapital();
                formatAmount();
                
            },
            preConfirm: async () => {
                // Mendapatkan nilai input dari elemen-elemen form
                const owner_id = Swal.getPopup().querySelector("#owner_id").value;
                const user_id = Swal.getPopup().querySelector("#user_id").value;
                const order_date = Swal.getPopup().querySelector("#order_date").value;
                const project_type = Swal.getPopup().querySelector("#project_type").value;
                const prefix = Swal.getPopup().querySelector("#prefix").value;
                const initial_name = Swal.getPopup().querySelector("#initial_name").value;
                const no_qtn = Swal.getPopup().querySelector("#no_qtn").value;
                const project_name = Swal.getPopup().querySelector("#project_name").value;
                const amount = Swal.getPopup().querySelector("#amount").value;
                const client = Swal.getPopup().querySelector("#client").value;
                const fileInput = Swal.getPopup().querySelector("#file");
                const file = fileInput.files[0];
                
                // Validasi input
                if (!owner_id || !user_id || !order_date || !project_type || !prefix || !initial_name || !no_qtn || !project_name || !amount || !client ) {
                    Swal.showValidationMessage(`All fields are required`);
                    return;
                }
                
                console.log(client)

                if (file) {
                    const allowedExtensions = ["xlsx"];
                    const fileExtension = file.name.split(".").pop();
                    if (!allowedExtensions.includes(fileExtension)) {
                        Swal.showValidationMessage(`Invalid file extension. Only .xlsx files are allowed.`);
                        return;
                    }
                }

                // Membuat objek FormData
                const formData = new FormData();
                formData.append("owner_id", owner_id);
                formData.append("user_id", user_id);
                formData.append("order_date", order_date);
                formData.append("project_type", project_type);
                formData.append("prefix", prefix);
                formData.append("initial_name", initial_name);
                formData.append("no_qtn", no_qtn);
                formData.append("project_name", project_name);
                formData.append("amount", amount);
                formData.append("client", client);
                if (file) {
                    formData.append("file", file);
                }

                console.log("FormData:", formData);

                // Mengirim data menggunakan fetch API
                await sendSalesData(formData);
            },
        });
    } catch (error) {
        console.error("Error:", error);
        // Lakukan penanganan kesalahan
    }
});


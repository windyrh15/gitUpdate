const dropdownCode = document.getElementById("id");
const urlLastNumber = lastNumberLetter;
const addButtonOffLatter = document.querySelector('#inputBtnOffLatter');

async function getLetterCode() {
  try {
    const response = await fetch(letterCode, {
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

async function fillLetterCodeDropdown(selectedCodeId) {
  var dropdownCode = $("#id");
  dropdownCode.empty();
  dropdownCode.append(
    "<option value='' selected disabled>Select Classification</option>"
  );

  try {
    const codeResponse = await getLetterCode();
    const code = codeResponse.letterCode;

    // console.log(codeResponse)
    // console.log(code)

    code.forEach(function (item) {
      let option = `<option value='${item.id}' data-kode-type='${item.code}'>${item.classification} (${item.initial})</option>`;
      if (selectedCodeId && item.classification === selectedCodeId) {
        option = `<option value='${item.id}' data-kode-type='${item.code}' selected>${item.classification} (${item.initial})</option>`;
      }
      dropdownCode.append(option);
    });
  } catch (error) {
    console.error("Error filling letter code dropdown:", error);
  }
}

async function getLastNumber() {
    
  try {
   const response = await fetch(urlLastNumber, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    const last = data.dataNomor[0].terakhir;
    const lastNumber = (last + 1).toString().padStart(3, '0');
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
    const letterCodeSelect = document.getElementById("id");
    const selectedType =
      letterCodeSelect.options[letterCodeSelect.selectedIndex];
    const type_id = selectedType.value;
    const letter_code = selectedType.dataset.kodeType;

    if (!letter_code) {
      throw new Error("Selected letter not found");
    }

    const currentYear = new Date().getFullYear();
    const currentMonthRoman = romanize(new Date().getMonth() + 1);

    const no_letter = `${lastNumber}/${prefix}/${letter_code}/${currentMonthRoman}/${currentYear}`;
    document.getElementById("no_letter").value = no_letter;

    return no_letter;
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

async function populateClient() {
  var clients = [];

  try {
      // Fetch client data
      const clientResponse = await fetch('https://apiddim.booq.id/data/sales/client', {
          headers: {
              'Authorization': 'Bearer DpacnJf3uEQeM7 HN'
          }
      });
      const clientData = await clientResponse.json();
      clients = clientData.dataClient.map(client => ({
          name: client.nama_client
      }));
  } catch (error) {
      console.error('Error fetching client data:', error);
  }

  // Populate client input
  var clientInput = document.getElementById('client');
  var suggestionClient = document.getElementById('suggestionClient');

  clientInput.addEventListener('input', function() {
      var query = clientInput.value.toLowerCase();
      suggestionClient.innerHTML = '';
      if (query) {
          var filteredClients = clients.filter(function(client) {
              return client.name.toLowerCase().includes(query);
          });
          filteredClients.forEach(function(client) {
              var div = document.createElement('div');
              div.className = 'suggestion-item';
              div.textContent = client.name;
              div.addEventListener('click', function() {
                  clientInput.value = client.name;
                  suggestionClient.innerHTML = '';
              });
              suggestionClient.appendChild(div);
          });
      }
  });

  document.addEventListener('click', function(event) {
      if (!event.target.closest('#client') && !event.target.closest('#suggestionClient')) {
          suggestionClient.innerHTML = '';
      }
  });
}



async function sendLetterData(formData) {
    try {
        const response = await fetch(addLetter, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to add data');
        }

        const responseData = await response.json();
        console.log('Data added successfully:', responseData);
        fetchData();
        Swal.fire("Success", "Data added successfully!", "success");
    } catch (error) {
        console.error('Error adding data:', error);
        Swal.fire("Error", "Failed to add data", "error");
    }
}
// Mendengarkan klik pada tombol untuk menambahkan data penjualan
addButtonOffLatter.addEventListener("click", async function () {
    try {
        const response = await fetch("module/" + page + "/modal/official_latter/inputOffLatter.php");
        const htmlContent = await response.text();

        Swal.fire({
            title: "Add New Letter",
            html: htmlContent,
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            didOpen: async () => {
                await populateClient();
                await fillLetterCodeDropdown();
                document
                    .getElementById("client")
                    .addEventListener("input", showClientSuggestions);
                clientKapital();
                
            },
            preConfirm: async () => {
                // Mendapatkan nilai input dari elemen-elemen form
                const owner_id = Swal.getPopup().querySelector("#owner_id").value;
                const user_id = Swal.getPopup().querySelector("#user_id").value;
                const tanggal = Swal.getPopup().querySelector("#tanggal").value;
                const letter_code_id = Swal.getPopup().querySelector("#id").value;
                const prefix = Swal.getPopup().querySelector("#prefix").value;
                const no_letter = Swal.getPopup().querySelector("#no_letter").value;
                const subject = Swal.getPopup().querySelector("#subject").value;
                const beneficiary = Swal.getPopup().querySelector("#beneficiary").value;
                const client = Swal.getPopup().querySelector("#client").value;
                // const fileInput = Swal.getPopup().querySelector("#file");
                // const file = fileInput.files[0];
                
                if (!tanggal || !letter_code_id || !prefix || !no_letter || !subject || !beneficiary || !client) {
                        Swal.showValidationMessage("All fields are required!");
                        return;
                    }
                    
                // Membuat objek FormData
                const formData = new FormData();
                formData.append("owner_id", owner_id);
                formData.append("user_id", user_id);
                formData.append("date", tanggal);
                formData.append("later_code_id", letter_code_id);
                formData.append("prefix", prefix);
                formData.append("no_letter", no_letter);
                formData.append("subject", subject);
                formData.append("beneficiary", beneficiary);
                formData.append("client", client);

                // Mengirim data menggunakan fetch API
                await sendLetterData(formData);
            },
        });
    } catch (error) {
        console.error("Error:", error);
        // Lakukan penanganan kesalahan
    }
});
async function editLetter(idToEdit) {
  const urlLetter = letterData;
  
  try {
    // Ambil data saat ini dari API
    const response = await fetch(`${urlLetter}/${idToEdit}`, {
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const letterDateFromAPI = data.data[0].date;
    const letterDate = new Date(letterDateFromAPI).toISOString().split('T')[0];

    const htmlResponse = await fetch("module/" + page + "/modal/official_latter/editOffLatter.php");
    const htmlContent = await htmlResponse.text();

    Swal.fire({
      title: "Edit Letter",
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: async () => {
        await fillLetterCodeDropdown(data.data[0].classification);
        document.getElementById("client").addEventListener("input", showClientSuggestions);
        document.getElementById("tanggal").value = letterDate;
        document.getElementById("no_letter").value = data.data[0].no_letter;
        document.getElementById("subject").value = data.data[0].subject;
        document.getElementById("beneficiary").value = data.data[0].beneficiary;
        document.getElementById("client").value = data.data[0].client;

        const letterCodeIdSelect = document.getElementById("id");
        const selectedOption = letterCodeIdSelect.querySelector(`option[value="${data.data[0].classification}"]`);
        if (selectedOption) {
          selectedOption.selected = true;
        }
      },
      preConfirm: async () => {
        const owner_id = Swal.getPopup().querySelector("#owner_id").value;
        const user_id = Swal.getPopup().querySelector("#user_id").value;
        const prefix = Swal.getPopup().querySelector("#prefix").value;
        const date = Swal.getPopup().querySelector("#tanggal").value;
        const letter_code_id = Swal.getPopup().querySelector("#id").value;
        const no_letter = Swal.getPopup().querySelector("#no_letter").value;
        const subject = Swal.getPopup().querySelector("#subject").value;
        const beneficiary = Swal.getPopup().querySelector("#beneficiary").value;
        const client = Swal.getPopup().querySelector("#client").value;

        const updatedData = {
          owner_id: owner_id,
          user_id: user_id,
          prefix: prefix,
          date: date,
          letter_code_id: letter_code_id,
          no_letter: no_letter,
          subject: subject,
          beneficiary: beneficiary,
          client: client,
        };

        try {
          const updateResponse = await fetch(`${letterUpdate}/${idToEdit}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(updatedData),
          });

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

// Contoh penggunaan dengan onclick di HTML
// <a class="dropdown-item info-btn text-info" onclick="editLetter(${data.letter_id})">Edit</a>

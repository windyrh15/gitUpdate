tbodySales.addEventListener("click", function (event) {
  if (event.target.id === "editSalesButton") {
    const urlSales = salesData;
    const idToEdit = event.target.dataset.id;
    
    // Ambil data saat ini dari API
    fetch(`${urlSales}/${idToEdit}`, {
        headers: headers
    })

    // fetch(versionSales)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
          console.log(data);
          const orderDateFromAPI = data.data[0].tanggal;
          const orderDate = new Date(orderDateFromAPI).toISOString().split('T')[0];
          console.log(orderDate);
        // const salesData = data.dataSales.find(
        //   (item) => item.sales_id === parseInt(idToEdit)
        // );

        // if (!salesData) {
        //   throw new Error("Sales data not found");
        // }

        fetch("module/" + page + "/modal/sales/editSales.php")
          .then((response) => response.text())
          .then((htmlContent) => {
              console.log(data);
            Swal.fire({
              title: "Edit Sales",
              html: htmlContent,
              showCancelButton: true,
              confirmButtonText: "Save",
              cancelButtonText: "Cancel",
              focusConfirm: false,
              didOpen: async () => {
                await fillProjectTypeDropdown(data.data[0].project_type);
                document
                  .getElementById("client")
                  .addEventListener("input", showClientSuggestions);
                document.getElementById("order_date").value = orderDate;
                document.getElementById("no_qtn").value =
                  data.data[0].no_qtn;
                document.getElementById("project_name").value =
                  data.data[0].project_name;
                document.getElementById("amount").value = data.data[0].total_order;
                document.getElementById("client").value = data.data[0].pelanggan_nama;

                const projectTypeSelect =
                  document.getElementById("project_type");
                const selectedOption = projectTypeSelect.querySelector(
                  `option[value="${dataType.project_type}"]`
                );
                if (selectedOption) {
                  selectedOption.selected = true;
                }
              },
              preConfirm: () => {
                const owner_id =
                  Swal.getPopup().querySelector("#owner_id").value;
                const order_date =
                  Swal.getPopup().querySelector("#order_date").value;
                const project_type =
                  Swal.getPopup().querySelector("#project_type").value;
                const no_qtn = Swal.getPopup().querySelector("#no_qtn").value;
                const project_name =
                  Swal.getPopup().querySelector("#project_name").value;
                const amount = Swal.getPopup().querySelector("#amount").value;
                const client =
                  Swal.getPopup().querySelector("#client").value;

                const dataInputSales = {
                   owner_id: owner_id,
                   order_date: order_date,
                   project_type: project_type,
                   no_qtn: no_qtn,
                   project_name: project_name,
                   amount: amount,
                   client: client
                };

                console.log(dataInputSales);

                return fetch(
                  `${urlSales}/${idToEdit}`,
                  {
                    method: "PUT",
                    headers: headers,
                    body: JSON.stringify(dataInputSales),
                  }
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Failed to update data");
                    }
                     fetchData();
                     fetchDataRecap();
                     fetchFooterRecap();
                    Swal.fire(
                      "Success",
                      "Data updated successfully!",
                      "success"
                    );
                  })
                  .catch((error) => {
                    console.error("Error updating data:", error);
                    Swal.fire("Error", "Failed to update data", "error");
                  });
              },
            });
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Failed to fetch data", "error");
      });
  }
});
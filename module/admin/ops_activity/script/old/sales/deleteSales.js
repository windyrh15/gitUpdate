const urlDelete = salesDelete;
async function deleteSales(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "you want to delete this data?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      console.log(id);
      try {
        const response = await fetch(
          `${urlDelete}/${id}`,
          {
            method: "PUT",
            headers: headers
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
        fetchData();
        fetchDataRecap();
        fetchFooterRecap();
        Swal.fire("Success", "Data deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire("Error", "Failed to delete data", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your data is safe :)", "success");
    }
  });
}
async function statusHold(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to change the current status to Hold?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, change it",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const statusId = {
          status_id: 1,
        };
        console.log(id, statusId);
        try {
          const response = await fetch(
            `https://api.katib.id/data/inventory/${id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(statusId),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to change status");
          }
          displayData(currentPage);
          Swal.fire("Success", "Successfully changed status!", "success");
        } catch (error) {
          console.error("Error changing status:", error);
          Swal.fire("Error", "Failed to change status", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your status is safe :)", "info");
      }
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      Swal.fire("Error", "Failed to send request", "error");
    });
}

async function statusOnGoing(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to change the current status to On Going?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, change it",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const statusId = {
          status_id: 2,
        };
        console.log(id, statusId);
        try {
          const response = await fetch(
            `https://api.katib.id/data/inventory/${id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(statusId),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to change status");
          }
          displayData(currentPage);
          Swal.fire("Success", "Successfully changed status!", "success");
        } catch (error) {
          console.error("Error changing status:", error);
          Swal.fire("Error", "Failed to change status", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your status is safe :)", "info");
      }
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      Swal.fire("Error", "Failed to send request", "error");
    });
}

async function statusWon(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to change the current status to Won?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, change it",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const statusId = {
          status_id: 3,
        };
        console.log(id, statusId);
        try {
          const response = await fetch(
            `https://api.katib.id/data/inventory/${id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(statusId),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to change status");
          }
          displayData(currentPage);
          Swal.fire("Success", "Successfully changed status!", "success");
        } catch (error) {
          console.error("Error changing status:", error);
          Swal.fire("Error", "Failed to change status", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your status is safe :)", "info");
      }
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      Swal.fire("Error", "Failed to send request", "error");
    });
}

async function statusLost(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to change the current status to Lost?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, change it",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const statusId = {
          status_id: 4,
        };
        console.log(id, statusId);
        try {
          const response = await fetch(
            `https://api.katib.id/data/inventory/${id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(statusId),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to change status");
          }
          displayData(currentPage);
          Swal.fire("Success", "Successfully changed status!", "success");
        } catch (error) {
          console.error("Error changing status:", error);
          Swal.fire("Error", "Failed to change status", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your status is safe :)", "info");
      }
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      Swal.fire("Error", "Failed to send request", "error");
    });
}

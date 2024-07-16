function deleteLetter(deliveryId) {
  // Mengatur pesan konfirmasi penghapusan
  Swal.fire({
    title: "Apakah kamu yakin?",
    text: "Setelah dihapus, data ini tidak akan kembali",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteLetterData(deliveryId);
    }
  });
}

async function deleteLetterData(id) {
  const urlDelete = letterDelete;
  try {
    const response = await fetch(`${urlDelete}/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({ deleted: "yes" }), // Mengubah deleted menjadi "yes"
    });
    if (!response.ok) {
      throw new Error("Failed to delete data");
    }
    // Tampilkan notifikasi berhasil
    Swal.fire({
      title: "Terhapus!",
      text: "Data berhasil dihapus",
      icon: "success",
    }).then(() => {
      // Refresh daftar data setelah penghapusan berhasil
      location.reload();
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    // Tampilkan notifikasi error
    Swal.fire({
      title: "Error!",
      text: "There was an error deleting the data.",
      icon: "error",
    });
  }
}
// Fungsi untuk menampilkan modal delete

//Show modal delete alert -----------------------------------------------------------------------------
function deleteDelNote(delivertId) {
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
      deleteDelNoteData(delivertId);
      //   console.log(`data terhapus : ${delivertId}`);
    }
  });
}
// Delete process -------------------------------------------------------------------------------------
async function deleteDelNoteData(deliverId) {
  const urlDelete = deleteDeliveryNote;
  try {
    const response = await fetch(`${urlDelete}${deliverId}`, {
      method: "PUT",
      headers: headersTes,
      body: JSON.stringify({ deleted: "yes" }), // Mengubah deleted menjadi "yes"
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    // Tampilkan notifikasi berhasil
    Swal.fire({
      title: "Terhapus!",
      text: "Data berhasil dihapus",
      icon: "success",
    }).then(() => {
      // Refresh daftar produk setelah penghapusan berhasil
      location.reload();
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    // Tampilkan notifikasi error
    Swal.fire({
      title: "Error!",
      text: "There was an error deleting the product.",
      icon: "error",
    });
  }
}

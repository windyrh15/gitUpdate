async function updateStatus(bgId) {
    try{
            const response = await fetch(`https://apiddim.booq.id/bank/guarantee/${bgId}`, {
                headers: {
                    'Authorization': 'Bearer DpacnJf3uEQeM7HN'
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            
            const data = await response.json();
            const bankGrteeData = data.data[0].status_id;

            // Check status
            if(bankGrteeData === 2){
                Swal.fire({
                    title: "Gagal",
                    text: "Data sudah close",
                    icon: "error",
                });

            }else{
                const updateStatus = await fetch(`https://apiddim.booq.id/update/status/bank/guarantee/${bgId}`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer DpacnJf3uEQeM7HN'
                    }
                });
    
                if (!updateStatus.ok) {
                    throw new Error("Failed to fetch data");
                }

                Swal.fire({
                    title: "Success",
                    text: result.message,
                    icon: "success",
                }).then(() => {
                    location.reload();
                });
            }
    }catch(error){

    }
}
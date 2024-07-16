/**
 * 
 * masih ada perbaikan (deadline besok!)
 * 1. file yang di input harus berupa PDF tidak boleh yang lain
 * 2. Edit belum selesai
 * 3. file belum di tamilkan ke table
 */

document.querySelector('#inputBtnGrtee').addEventListener('click', showInputGrtee);

async function populateProjectGrtee() {
    var projects = [];

    try {
        const projectResponse = await fetch('https://apiddim.booq.id/project', {
            headers: {
                'Authorization': 'Bearer DpacnJf3uEQeM7HN'
            }
        });
        const projectData = await projectResponse.json();
        projects = projectData.dataProject.map(project => ({
            name: project.project_name,
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    var projectInput = document.getElementById('project');
    var suggestionProject = document.getElementById('suggestionProject');

    projectInput.addEventListener('input', function() {
        var query = projectInput.value.toLowerCase();
        suggestionProject.innerHTML = '';
        if (query) {
            var filteredProjects = projects.filter(function(project) {
                return project.name.toLowerCase().includes(query);
            });
            filteredProjects.forEach(function(project) {
                var div = document.createElement('div');
                div.textContent = project.name;
                div.className = 'suggestion-item';
                div.addEventListener('click', function() {
                    projectInput.value = project.name;
                    suggestionProject.innerHTML = '';
                });
                suggestionProject.appendChild(div);
            });
        }
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#project') && !event.target.closest('#suggestionProject')) {
            suggestionProject.innerHTML = '';
        }
    });
}

async function showInputGrtee() {
    try {
        const response = await fetch("module/" + page + "/modal/bank_guarantee/inputGrtee.php");
        const htmlContent = await response.text();

        Swal.fire({
            title: "Add Bank Guarantee",
            html: htmlContent,
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            didOpen: async () => {
                // Panggil fungsi populateProjectGrtee jika diperlukan
                populateProjectGrtee();

                // Tambahkan event listener untuk memperbarui label file
                const fileInput = document.querySelector('.custom-file-input');
                const fileLabel = document.querySelector('.custom-file-label');

                fileInput.addEventListener('change', function (e) {
                    if (fileInput.files.length > 0) {
                        fileLabel.innerText = fileInput.files[0].name;
                    }
                });
            },
            preConfirm: async () => {
                const owner = Swal.getPopup().querySelector("#owner_id").value;
                const user = Swal.getPopup().querySelector("#user_id").value;
                const start_date = Swal.getPopup().querySelector("#start_date").value;
                const close_date = Swal.getPopup().querySelector("#close_date").value;
                const project = Swal.getPopup().querySelector("#project").value;
                const bond_n = Swal.getPopup().querySelector("#bond_number").value;
                const bond = Swal.getPopup().querySelector("#bond").value;
                const amount = Swal.getPopup().querySelector("#amount").value;
                const collateral = Swal.getPopup().querySelector("#collateral").value;
                const bank = Swal.getPopup().querySelector("#bank").value;
                const counter_guarantee = Swal.getPopup().querySelector("#counter_guarantee").value;
                const beneficiary = Swal.getPopup().querySelector("#beneficiary").value;
                const fileInput = Swal.getPopup().querySelector("#fileInput");
                const file = fileInput.files[0];

                const formData = new FormData();
                formData.append("owner_id", owner);
                formData.append("user_id", user);
                formData.append("status_id", 1);
                formData.append("start_date", start_date);
                formData.append("close_date", close_date);
                formData.append("project", project);
                formData.append("bond_number", bond_n);
                formData.append("bond", bond);
                formData.append("amount", amount);
                formData.append("collateral", collateral);
                formData.append("bank", bank);
                formData.append("counter_guarantee", counter_guarantee);
                formData.append("beneficiary", beneficiary);
                if (file) {
                    formData.append("file", file);
                }

                try {
                    const res = await fetch('https://apiddim.booq.id/bank/guarantee', {
                        method: "POST",
                        headers: {
                            'Authorization': 'Bearer DpacnJf3uEQeM7HN'
                        },
                        body: formData,
                    });

                    const result = await res.json();
                    if (res.ok) {
                        Swal.fire({
                            title: "Success",
                            text: result.message,
                            icon: "success",
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire("Error", result.error, "error");
                    }
                } catch (error) {
                    console.error("Error adding data:", error);
                    Swal.fire("Error", "Failed to add data", "error");
                }
            },
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

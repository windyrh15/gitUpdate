document.querySelector('#inputBtnUpdateGrtee').addEventListener('click', showUpdateGrtee);

async function populateUpdateProjectGrtee() {
    var updateProjects = [];

    try {
        const projectResponse = await fetch('https://apiddim.booq.id/project', {
            headers: {
                'Authorization': 'Bearer DpacnJf3uEQeM7HN'
            }
        });
        const projectData = await projectResponse.json();
        updateProjects = projectData.dataProject.map(project => ({
            name: project.project_name,
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    var projectInput = document.getElementById('update_project');
    var suggestionProject = document.getElementById('update_suggestionProject');

    projectInput.addEventListener('input', function() {
        var query = projectInput.value.toLowerCase();
        suggestionProject.innerHTML = '';
        if (query) {
            var filteredProjects = updateProjects.filter(function(project) {
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
        if (!event.target.closest('#update_project') && !event.target.closest('#update_suggestionProject')) {
            suggestionProject.innerHTML = '';
        }
    });
}

document.querySelector('#inputBtnUpdateGrtee').addEventListener('click', () => showUpdateGrtee(grteeId));

async function showUpdateGrtee(grteeId) {
    try {
        const response = await fetch(`https://apiddim.booq.id/bank/guarantee/${grteeId}`, {
            headers: {
                'Authorization': 'Bearer DpacnJf3uEQeM7HN'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const grteeData = data.data[0];

        const formData = {
            start_date: formatTanggal(grteeData.start_date),
            close_date: formatTanggal(grteeData.close_date),
            project: grteeData.project,
            bond_number: grteeData.bond_number,
            bond: grteeData.bond,
            amount: grteeData.amount,
            collateral: grteeData.collateral,
            bank: grteeData.bank,
            counter_guarantee: grteeData.counter_guarantee,
            beneficiary: grteeData.beneficiary,
        };

        const responseHTML = await fetch("module/" + page + "/modal/bank_guarantee/updateGrtee.php");
        const htmlContent = await responseHTML.text();

        Swal.fire({
            title: "Update Bank Guarantee",
            html: htmlContent,
            showCancelButton: true,
            confirmButtonText: "Update",
            cancelButtonText: "Cancel",
            focusConfirm: false,
            didOpen: async () => {
                document.getElementById('update_start_date').value = formData.start_date;
                document.getElementById('update_close_date').value = formData.close_date;
                document.getElementById('update_project').value = formData.project;
                document.getElementById('update_bond_number').value = formData.bond_number;
                document.getElementById('update_bond').value = formData.bond;
                document.getElementById('update_amount').value = formData.amount;
                document.getElementById('update_collateral').value = formData.collateral;
                document.getElementById('update_bank').value = formData.bank;
                document.getElementById('update_counter_guarantee').value = formData.counter_guarantee;
                document.getElementById('update_beneficiary').value = formData.beneficiary;

                populateUpdateProjectGrtee();

                const fileInput = document.querySelector('.custom-file-input');
                const fileLabel = document.querySelector('.custom-file-label');

                fileInput.addEventListener('change', function (e) {
                    if (fileInput.files.length > 0) {
                        fileLabel.innerText = fileInput.files[0].name;
                    }
                });
            },
            preConfirm: async () => {
                const owner = Swal.getPopup().querySelector("#update_owner_id").value;
                const user = Swal.getPopup().querySelector("#update_user_id").value;
                const start_date = Swal.getPopup().querySelector("#update_start_date").value;
                const close_date = Swal.getPopup().querySelector("#update_close_date").value;
                const project = Swal.getPopup().querySelector("#update_project").value;
                const bond_n = Swal.getPopup().querySelector("#update_bond_number").value;
                const bond = Swal.getPopup().querySelector("#update_bond").value;
                const amount = Swal.getPopup().querySelector("#update_amount").value;
                const collateral = Swal.getPopup().querySelector("#update_collateral").value;
                const bank = Swal.getPopup().querySelector("#update_bank").value;
                const counter_guarantee = Swal.getPopup().querySelector("#update_counter_guarantee").value;
                const beneficiary = Swal.getPopup().querySelector("#update_beneficiary").value;
                const fileInput = Swal.getPopup().querySelector("#update_fileInput");
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
                    const res = await fetch('https://apiddim.booq.id/update/bank/guarantee', {
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
                    console.error("Error updating data:", error);
                    Swal.fire("Error", "Failed to update data", "error");
                }
            },
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

function formatTanggal(tanggal) {
    const [day, month, year] = tanggal.split('/');
    return `${year}-${month}-${day}`;
}

const urlClient = clientData;
const versionClient = `${urlClient}?v=${customTime}`;

async function getClients() {
  try {
    const response = await fetch(versionClient, {
      method: "GET",
       headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch client data");
    }
    const data = await response.json();
    return data.dataClient;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw error;
  }
}

async function showClientSuggestions() {
  const inputClient = document.getElementById("client");
  const clientList = document.getElementById("clientList");

  clientList.innerHTML = "";

  try {
    const clients = await getClients();
    const userInput = inputClient.value.toLowerCase();

    const filteredClients = clients.filter((client) =>
      client.nama_client.toLowerCase().includes(userInput)
    );

    filteredClients.forEach((client) => {
      const listItem = document.createElement("li");
      listItem.textContent = client.nama_client;
      listItem.classList.add("ui-autocomplete-row"); 
      listItem.addEventListener("click", () => {
        inputClient.value = client.nama_client;
        document.getElementById("client").value = client.nama_client;
        clientList.innerHTML = "";
      });
      clientList.appendChild(listItem);
    });

    if (filteredClients.length > 0) {
      clientList.style.display = "block";
    } else {
      clientList.style.display = "none";
    }
  } catch (error) {
    console.error("Error showing client suggestions:", error);
  }
}

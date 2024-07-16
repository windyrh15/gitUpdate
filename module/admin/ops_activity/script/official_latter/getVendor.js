async function getClients() {
  try {
    const response = await fetch(getVendor, {
      method: "GET",
       headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch client data");
    }
    const data = await response.json();
    return data.data;
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
      client.vendor.toLowerCase().includes(userInput)
    );

    filteredClients.forEach((client) => {
      const listItem = document.createElement("li");
      listItem.textContent = client.vendor;
      listItem.classList.add("ui-autocomplete-row"); 
      listItem.addEventListener("click", () => {
        inputClient.value = client.vendor;
        document.getElementById("client").value = client.vendor;
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

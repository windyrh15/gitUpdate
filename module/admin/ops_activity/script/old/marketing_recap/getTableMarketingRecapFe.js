let dataMp;
let totalMp;
let currentYear = new Date().getFullYear();

const urlMp = "api/" + sales + mpData;
const urlFooterMp = "api/" + sales + dataTotalMp;
const customMp = new Date().getTime();
const versionMp = `${urlMp}?v=${customMp}`;
const versionFooterMp = `${urlFooterMp}?v=${customMp}`;
const tbodyMp = document.querySelector("#marketing_recap tbody");
const tfootMp = document.querySelector("#marketing_recap tfoot");

function renderData(data) {
  tbodyMp.innerHTML = "";

  data.forEach((marketingRecap) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td style="display: flex; align-items: center;">
                <div style="text-align: left; flex-grow: 1;">
                    ${marketingRecap.type}
                </div>
                <div class="d-block d-md-none d-lg-none d-sm-none" style="margin-left: auto;">
                    <button class="btn btn-success btn-sm mr-2" onclick="showDetailsMp('${
                      marketingRecap.mp_id
                    }')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </td>
            <td class="ta-end d-none d-sm-table-cell">${marketingRecap.total_po.toLocaleString()}</td>
            <td class="ta-end d-none d-md-table-cell">${marketingRecap.pipe_line.toLocaleString()}</td>
            <td class="ta-end d-none d-sm-table-cell">${marketingRecap.target.toLocaleString()}</td>
            <td class="ta-end d-none d-md-table-cell">${
              marketingRecap.sales_rate
            } %</td>
            <td class="ta-end d-none d-sm-table-cell">${marketingRecap.remaining_target.toLocaleString()}</td>
        `;
    tbodyMp.appendChild(row);
  });
}


fetch(versionMp)
  .then((response) => response.json())
  .then((responseData) => {
    dataMp = responseData;
    const filteredData = filterDataByYear(dataMp.data, currentYear);
    renderData(filteredData);
  })
  .catch((error) => console.error("Error fetching data:", error));

function renderFooterData(footerData) {
  tfootMp.innerHTML = "";

  const footerRow = document.createElement("tr");
  footerRow.classList.add("ta-center");
  footerRow.innerHTML = `
        <td class="cl-white d-none d-sm-table-cell"><b>${
          footerData.total
        }</b></td>
        <td class="cl-white d-none d-sm-table-cell"><b>${footerData.total_po_acievement.toLocaleString()}</b></td>
        <td class="cl-white d-none d-md-table-cell"><b>${footerData.total_pipe_line.toLocaleString()}</b></td>
        <td class="cl-white d-none d-sm-table-cell"><b>${footerData.total_target.toLocaleString()}</b></td>
        <td class="cl-white d-none d-md-table-cell"><b>${
          footerData.total_sales_rate
        } %</b></td>
        <td class="cl-white d-none d-sm-table-cell"><b>${footerData.total_remaining_target.toLocaleString()}</b></td>
    `;
  tfootMp.appendChild(footerRow);
}

fetch(versionFooterMp)
  .then((response) => response.json())
  .then((footerData) => {
    totalMp = footerData;
    // Filter data total berdasarkan tahun saat ini
    const filteredData = filterDataTotalYear(totalMp.data, currentYear);
    if (filteredData.length > 0) {
      renderFooterData(filteredData.find((item) => item.year === currentYear));
    } else {
      console.error("No data found for the current year.");
    }
  })
  .catch((error) => console.error("Error fetching footer data:", error));

function showDetailsMp(mpId) {
  var detailDataMp = getDetailDataMp(mpId);

  var modalBodyMp = document.getElementById("detailsModalMpBody");
  modalBodyMp.innerHTML = `
                <p>Type : ${detailDataMp.type}</p>
                <p>Total PO Acievement : ${detailDataMp.total_po.toLocaleString()}</p>
                <p>Pipe Line : ${detailDataMp.pipe_line.toLocaleString()}</p>
                <p>Kredit : ${detailDataMp.target.toLocaleString()}</p>
                <p>Target : ${detailDataMp.sales_rate} %</p>
                <p>Remaining Target : ${detailDataMp.remaining_target.toLocaleString()}</p>
                `;

  $("#detailsModalMp").modal("show");
}

function getDetailDataMp(mpId) {
  console.log("All Summary:", dataMp.data);
  const foundMp = dataMp.data.find(
    (marketingRecap) => marketingRecap.mp_id == mpId
  );

  console.log("Found Mp", foundMp);
  return foundMp || {};
}

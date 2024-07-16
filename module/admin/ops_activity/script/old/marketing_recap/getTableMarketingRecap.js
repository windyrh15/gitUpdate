let dataMp;
let totalMp;
let currentYear = new Date().getFullYear();

const urlMp = mpData;
const urlFooterMp = dataTotalMp;
const customMp = new Date().getTime();
const versionMp = `${urlMp}?v=${customMp}`;
const versionFooterMp = `${urlFooterMp}?v=${customMp}`;
const tbodyMp = document.querySelector("#marketing_recap tbody");
const tfootMp = document.querySelector("#marketing_recap tfoot");
const urlDetailSales = detailSales;

function renderData(data) {
  tbodyMp.innerHTML = "";

  data.forEach((marketingRecap) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td style="display: flex; align-items: center;">
                <div style="text-align: left; flex-grow: 1;">
                    <button class="btn btn-link text-dark" onclick="showProject(${
                  marketingRecap.sales_year
                }, '${marketingRecap.project_type}')"><b>${
      marketingRecap.project_type
    }</b></button>    
                </div>
                <div class="d-block d-md-none d-lg-none d-sm-none" style="margin-left: auto;">
                    <button class="btn btn-success  mr-2" onclick="showDetailsMp('${marketingRecap.sales_year}')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </td>
          <td class="ta-end d-none d-sm-table-cell">${parseFloat(marketingRecap.total_po).toLocaleString()}</td>
          <td class="ta-end d-none d-md-table-cell">${parseFloat(marketingRecap.pipe_line).toLocaleString()}</td>
          <td class="ta-end d-none d-sm-table-cell">${marketingRecap.target.toLocaleString()}</td>
          <td class="ta-end d-none d-md-table-cell">${marketingRecap.sales_rate.toLocaleString()} %</td>
          <td class="ta-end d-none d-sm-table-cell">${parseFloat(marketingRecap.remaining_target).toLocaleString()}</td>

        `;
    tbodyMp.appendChild(row);
  });
}


// function fetchDataRecap() {
//   fetch(versionMp, {
//       headers: headers
//     })
//     .then((response) => response.json())
//     .then((responseData) => {
//       dataMp = responseData;
//       const filteredData = filterDataByYear(dataMp.data, currentYear);
//       renderData(filteredData);
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }

function fetchDataRecap() {
  // Menampilkan elemen loading dengan animasi
  const loadingRows = document.createElement('tr');
  loadingRows.innerHTML = `
    <td colspan="6" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </td>`;
  tbodyMp.innerHTML = '';
  tbodyMp.appendChild(loadingRows);

  // Mengatur waktu tampilan loading sebelum memuat data
  const loadingTimeouts = setTimeout(() => {
    // Hapus elemen loading jika waktu tampilan telah berakhir
    tbodyMp.removeChild(loadingRows);
  }, 1500); // Waktu tampilan loading dalam milidetik

  fetch(versionMp, {
    headers: headers
  })
    .then((response) => response.json())
    .then((responseData) => {
      clearTimeout(loadingTimeouts); // Menghapus timeout jika data berhasil dimuat
      dataMp = responseData;
      if (dataMp.data.length === 0) {
        // Tampilkan pesan "Belum ada data" jika tidak ada data yang dimuat
        const noDataRows = document.createElement('tr');
        noDataRows.innerHTML = '<td colspan="6" class="text-center">Belum ada data</td>';
        tbodyMp.appendChild(noDataRows);
      } else {
        const filteredData = filterDataByYear(dataMp.data, currentYear);
        renderData(filteredData);
      }
    })
    .catch((error) => {
      clearTimeout(loadingTimeouts); // Menghapus timeout jika terjadi kesalahan
      console.error("Error fetching data:", error);
      // Tampilkan pesan "Ada masalah dengan API" jika terjadi kesalahan
      const errorRows = document.createElement('tr');
      errorRows.innerHTML = '<td colspan="6" class="text-center">Ada masalah dengan API</td>';
      tbodyMp.appendChild(errorRows);
    });
}

fetchDataRecap();

function showDetailsMp(Year) {
  const detailDataMp = getDetailDataMp(Year);

  const modalBodyMp = document.getElementById("detailsModalMpBody");
  modalBodyMp.innerHTML = `
                <p>Type : ${detailDataMp.project_type}</p>
                <p>Total PO achievement : ${detailDataMp.total_po.toLocaleString()}</p>
                <p>Pipe Line : ${detailDataMp.pipe_line.toLocaleString()}</p>
                <p>Kredit : ${detailDataMp.target.toLocaleString()}</p>
                <p>Target : ${detailDataMp.sales_rate} %</p>
                <p>Remaining Target : ${detailDataMp.remaining_target.toLocaleString()}</p>
                `;

  $("#detailsModalMp").modal("show");
}

function getDetailDataMp(Year) {
  console.log("All Summary:", dataRecapByYear);
  const foundMp = data.find((marketingRecap) => marketingRecap.sales_year == Year);

  console.log("Found Mp", foundMp);
  return foundMp || {};
}

function renderFooterData(footerData) {
  tfootMp.innerHTML = "";

  const footerRow = document.createElement("tr");
  footerRow.classList.add("ta-center");
  footerRow.innerHTML = `
        <td class="d-none d-sm-table-cell"><b style="font-size: 1rem;">Total</b></td>
        <td class="ta-end d-none d-sm-table-cell" onclick="showTotalPoDetail(${
          footerData.sales_year
        })"><b style="font-size: 1rem; cursor: pointer;" class="resume">${parseFloat(
    footerData.total_po_achievement
  ).toLocaleString()}</b></td>
        <td class="ta-end d-none d-md-table-cell"><b style="font-size: 1rem;">${parseFloat(footerData.total_pipeline).toLocaleString()}</b></td>
        <td class="ta-end d-none d-sm-table-cell"><b style="font-size: 1rem;">${parseFloat(footerData.total_target).toLocaleString()}</b></td>
        <td class="ta-end d-none d-md-table-cell"><b style="font-size: 1rem;">${footerData.total_sales_rate} %</b></td>
        <td class="ta-end d-none d-sm-table-cell"><b style="font-size: 1rem;">${parseFloat(footerData.total_remaining_target).toLocaleString()}</b></td>
    `;
  tfootMp.appendChild(footerRow);
}


function fetchFooterRecap() {
fetch(versionFooterMp, {
    headers: headers
})
  .then((response) => response.json())
  .then((footerData) => {
    totalMp = footerData;
    const filteredData = filterDataTotalYear(totalMp.data, currentYear);
    if (filteredData.length > 0) {
      renderFooterData(filteredData.find((item) => item.sales_year === currentYear));
    } else {
      console.error("No data found for the current year.");
    }
  })
  .catch((error) => console.error("Error fetching footer data:", error));
}

fetchFooterRecap();
 
function showTotalPoDetail(year) {
  const modalBodyTotalPo = document.getElementById("detailsModalTotalPoBody");
  modalBodyTotalPo.innerHTML = `
        <p>Select month:</p>
<div class="btn-group" role="group" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 1)">Jan</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 2)">Feb</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 3)">Mar</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 4)">Apr</button>
</div>
<div class="btn-group" role="group" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 5)">May</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 6)">Jun</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 7)">Jul</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 8)">Aug</button>
</div>
<div class="btn-group" role="group" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 9)">Sep</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 10)">Oct</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 11)">Nov</button>
    <button type="button" class="btn btn-secondary" onclick="showMonthDetail(${year}, 12)">Dec</button>
</div>
    `;
  $("#detailsModalTotalPo").modal("show");
}

function showMonthDetail(year, month) {
    fetch(`${urlDetailSales}/${year}/${month}`, {
        headers: headers
    })
    .then((response) => response.json())
    .then((data) => {
      const modalBodyDetailPo = document.getElementById(
        "detailsModalDetailPoBody"
      );
      modalBodyDetailPo.innerHTML = `
              <h5>Detail Total PO Achievement ${getMonthName(month)} ${year}</h5><br>
              <table class="table table-striped table-bordered" style="overflow-y: auto;">
                  <thead class="bg-warna">
                      <tr class="ta-center">
                          <th class="cl-white">Date</th>
                          <th class="cl-white">Quotation</th>
                          <th class="cl-white">Amount</th>
                          <th class="cl-white">Category</th>
                          <th class="cl-white">Client</th>
                          <th class="cl-white">Description</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${data.data
                        .map(
                          (po) => `
                          <tr>
                              <td class="ta-center">${po.date}</td>
                              <td class="ta-center">${po.no_qtn}</td>
                              <td class="ta-end">${parseFloat(po.amount).toLocaleString()}</td>
                              <td class="ta-center">${po.category}</td>
                              <td class="ta-start">${po.client}</td>
                              <td class="ta-start">${po.description}</td>
                          </tr>
                      `
                        )
                        .join("")}
                  </tbody>
                   <tfoot class="sticky">
                          <tr>
                              <td colspan="2"></td>
                              <td><b>Total :<b></td>
                              <td colspan="3"><b>${parseFloat(
                                data.total[0].total
                              ).toLocaleString()}<b></td>
                          </tr>
                      </tfoot>
              </table>
          `;
      $("#detailsModalTotalPo").modal("hide");
      $("#detailsModalDetailPo").modal("show");
    })
    .catch((error) =>
      console.error("Error fetching total PO detail by month:", error)
    );
}

function getMonthName(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1];
}


function showProject(year, project) {
  const projectMapping = {
    Material: 116,
    Service: 117,
    "Turn Key": 118,
  };

  // Mendapatkan ID proyek dari objek pemetaan
  const projectId = projectMapping[project];

  const modalBodyProject = document.getElementById("detailsModalProjectBody");
  modalBodyProject.innerHTML = `
      <p>Select month: </p>
<div class="btn-group" role="group" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 1)">Jan</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 2)">Feb</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 3)">Mar</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 4)">Apr</button>
</div>
<div class="btn-group" role="group" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 5)">May</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 6)">Jun</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 7)">Jul</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 8)">Aug</button>
</div>
<div class="btn-group" role="group" style="display: flex; flex-wrap: wrap; justify-content: center;">
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 9)">Sep</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 10)">Oct</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 11)">Nov</button>
    <button type="button" class="btn btn-secondary" onclick="showProjectDetail(${year}, ${projectId}, 12)">Dec</button>
</div>
  `;
  $("#detailsModalProject").modal("show");
}
function showProjectDetail(year, projectId, month) {
  // Objek untuk melakukan pemetaan antara ID proyek dan jenis proyek
  const projectMapping = {
    116: "Material",
    117: "Service",
    118: "Turn Key",
    // Tambahkan pemetaan ID proyek dan jenis proyek lainnya di sini jika diperlukan
  };

  // Mendapatkan jenis proyek dari objek pemetaan berdasarkan ID proyek
  const projectType = projectMapping[projectId];

  fetch(
    `${urlDetailSales}/${projectId}/${year}/${month}`,
    {
      headers: headers,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const modalBodyDetailProject = document.getElementById(
        "detailsModalDetailProjectBody"
      );
      modalBodyDetailProject.innerHTML = `
                <h5>${projectType} Project Detail ${getMonthName(
        month
      )} ${year}</h5><br>
                <table class="table table-striped table-bordered" style="overflow-y: auto;">
                    <thead class="bg-warna">
                      <tr class="ta-center">
                          <th class="cl-white">Date</th>
                          <th class="cl-white">Quotation</th>
                          <th class="cl-white">Amount</th>
                          <th class="cl-white">Category</th>
                          <th class="cl-white">Client</th>
                          <th class="cl-white">Description</th>
                      </tr>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.data
                          .map(
                            (po) => `
                            <tr>
                                <td class="ta-center">${po.date}</td>
                                <td class="ta-center">${po.no_qtn}</td>
                                <td class="ta-end">${parseFloat(
                                  po.amount
                                ).toLocaleString()}</td>
                                <td class="ta-center">${po.category}</td>
                                <td class="ta-start">${po.client}</td>
                                <td class="ta-start">${po.description}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                     <tfoot class="sticky">
                            <tr>
                                <td colspan="2"></td>
                                <td><b>Total :</b></td>
                                <td colspan="3"><b>${parseFloat(
                                  data.total[0].total
                                ).toLocaleString()}</b></td>
                            </tr>
                        </tfoot>
                </table>
            `;
      $("#detailsModalProject").modal("hide");
      $("#detailsModalDetailProject").modal("show");
    })
    .catch((error) =>
      console.error("Error fetching total PO detail by month:", error)
    );
}

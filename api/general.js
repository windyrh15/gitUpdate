let queryString = window.location.search;
let params = new URLSearchParams(queryString);

let page = params.get("page");

const token = "DpacnJf3uEQeM7 HN";

// Just Tes -------------------------------------------------------
const token2Tes = "DpacnJf3uEQeM7HN";
// ----------------------------------------------------------------

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

// HeadersTes -------------------------------------------------------
const headersTes = {
  Authorization: `Bearer ${token2Tes}`,
  "Content-Type": "application/json",
};
// -----------------------------------------------------------------

const headerFormData = {
  Authorization: `Bearer ${token}`,
};

const baseUrl = "https://apiddim.booq.id";

let sales = "sales";
let dataUser = `${baseUrl}/data/sales/user`;
let dataType = `${baseUrl}/data/sales/type`;
let dataStatus = `${baseUrl}/data/sales/status`;
let salesData = `${baseUrl}/sales`;
let salesFile = `${baseUrl}/ddim/calculation/file`;
let salesDelete = `${baseUrl}/delete/sales`;
let salesStatusUpdate = `${baseUrl}/update/status/sales`;
let dataBarChart = `${baseUrl}/data/sales/recapchart`;
let mpData = `${baseUrl}/data/sales/recap`;
let dataTotalMp = `${baseUrl}/data/sales/recaptotal`;
let dataLastNumber = `${baseUrl}/data/sales/lastnumber`;
let detailSales = `${baseUrl}/detail/sales/summary`;
let clientData = `${baseUrl}/data/sales/client`;

let project = "project";
let projectData = `${baseUrl}/project`;
let dataPm = `${baseUrl}/manager/project`;
let editPm = `${baseUrl}/update/manager/project`;
let vendorProjectData = `${baseUrl}/vendor/project`;
let projectName = `${baseUrl}/won/project`;
let dataBranch = "/branch.json";
let uploadFolderProject = `${baseUrl}/folder/project`;
let editFolderProject = `${baseUrl}/update/folder/project`;
let uploadFileProject = `${baseUrl}/file/project`;
let deleteFileProject = `${baseUrl}/delete/file/project`;
let getFolderProject = `${baseUrl}/document/project`;
let getFileProject = `${baseUrl}/doc/project/file`;
let getExpensesProject = `${baseUrl}/project/expenses/finance`;
let cancelProject = `${baseUrl}/cancel/project`;
let delProject = `${baseUrl}/delete/project`;
let finishProject = `${baseUrl}/update/status/project`;

let finance = "finance";
let financeData = `${baseUrl}/finance`;
let accountFinance = `${baseUrl}/account/finance`;
let categoryFinance = `${baseUrl}/transaction/category/finance`;
let addExpensesFinance = `${baseUrl}/project/expenses/finance`;
let cashflowFinance = `${baseUrl}/cashflow/finance`;

let admin = "admin";
let getVendor = `${baseUrl}/vendor`;

// Delivery Note -----------------------------------------------------------------------------------------

let deliveryNote = `${baseUrl}/delivery/note/`; // new API delivery note
let picData = `${baseUrl}/data/pic`; //PIC DATA

let addDeliveryNote = `${baseUrl}/delivery/note/`; //setting ke POST
let updateDeliveryNote = `${baseUrl}/update/delivery/note/`; //setting ke PUT
let deleteDeliveryNote = `${baseUrl}/delete/delivery/note/`; //setting ke PUT

let lastNumberDelivery = `${baseUrl}/lastnumber/delivery/note`; //new API lastnumber Delivery note

// Bank Guarantee ----------------------------------------------------------------------------------------

let getBgData = `${baseUrl}/bank/guarantee`;
let addBgData = `${baseUrl}/bank/guarantee`;
let updateBgData = `${baseUrl}/update/bank/guarantee`;
let deleteBgData = `${baseUrl}/delete/bank/guarantee`

// -------------------------------------------------------------------------------------------------------

let purchaseOrder = `${baseUrl}/purchase/order`;
let lastNumberPo = `${baseUrl}/lastnumber/purchase/order`;

let getClient = "api/admin/client.json";
let getEmployee = "api/admin/employee.json";

let letterCode = `${baseUrl}/letter/code`;
let lastNumberLetter = `${baseUrl}/lastnumber/official/letter`;
let addLetter = `${baseUrl}/add/letter`;
let letterData = `${baseUrl}/data/letter`;
let letterDelete = `${baseUrl}/delete/letter`;
let letterUpdate = `${baseUrl}/update/letter`;

let getLetterDoc = `${baseUrl}/document/letter`
let addLetterFolder = `${baseUrl}/folder/letter`
let addLetterFile = `${baseUrl}/file/letter`

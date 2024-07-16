<div class="section">
    <div class='row'>
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div id="search-add-container" class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center">
                    <input type="text" id="search-input" class="style-input" placeholder="Search...">
                    <div class="d-flex align-items-center justify-content-center flex-grow-1">
                        <b class="text-primary" id="filter"></b>
                    </div>
                    <a href='#' id="inputBtnOffLatter" data-bs-toggle="modal" data-bs-target="#inputModal" class='btn btn-danger ml-auto'>
                        <i class='fas fa-envelope fa-xl text-white-50'></i> Add Official Letter
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="table-container">
    <table class="table table-striped table-bordered" id="official_letter" width="100%" cellspacing="0">
        <thead class="bg-warna">
            <tr class="ta-center">
                <th class="d-none d-md-table-cell cl-white">No</th>
                <th class="d-none d-md-table-cell cl-white">Date</th>
                <th class="cl-white">Letter Code</th>
                <th class="d-none d-md-table-cell cl-white">Format Number</th>
                <th class="cl-white">Letter Subject</th>
                <th class="d-none d-md-table-cell cl-white">Beneficiary</th>
                <th class="d-none d-md-table-cell cl-white">Customer</th>
                <th class="d-none d-sm-table-cell cl-white">Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <!-- pagination pc -->
    <div class="d-none d-md-block d-lg-block">
        <div id="pagination-container-pc" class="pagination-custom"></div>
    </div>
    <!-- pagination mobile -->
    <div class="d-block d-md-none d-lg-none">
        <div id="pagination-container-mobile" class="pagination-custom"></div>
    </div>
</div>

<div id="document-details" style="display:none;">
    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary" id="formatNum"></h6>
            <button id="closeDetails" class="btn btn-secondary"><i class="fas fa-times"></i></button>
        </div>
        <div class="card-body">
            <button id="addFolderBtn" class="btn btn-primary mb-3">Add Folder</button>
            <ul id="folderList" class="list-group">
            </ul>
        </div>
    </div>
</div>

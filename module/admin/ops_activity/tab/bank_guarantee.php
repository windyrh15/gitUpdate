<div class="section">
    <div class='row'>
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center">
                    <input type="text" id="search-input" class="style-input" placeholder="Search...">
                    <div class="d-flex align-items-center justify-content-center flex-grow-1">
                        <b class="text-primary" id="filter"></b>
                    </div>
                    <a href='#' id="inputBtnGrtee" data-bs-toggle="modal" data-bs-target="#inputModal" class='btn btn-danger ml-auto'>
                        <i class='fas fa-shopping-cart fa-xl text-white-50'></i> Add Bank Guarantee
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="table-container" class="table-responsive">
    <table class="table table-striped table-bordered" id="purchase_order" width="100%" cellspacing="0">
        <thead class="bg-warna">
            <tr class="ta-center">
                <th class="d-none d-md-table-cell cl-white">No</th>
                <th class="d-none d-md-table-cell cl-white">Project Name</th>
                <th class="d-none d-md-table-cell cl-white">File Upload</th>
                <th class="cl-white">Start date</th>
                <th class="d-none d-md-table-cell cl-white">Close date</th>
                <th class="d-none d-md-table-cell cl-white">Bond Number</th>
                <th class="d-none d-md-table-cell cl-white">Bond</th>
                <th class="cl-white">Amount</th>
                <th class="d-none d-md-table-cell cl-white">Collateral</th>
                <th class="d-none d-md-table-cell cl-white">Bank</th>
                <th class="d-none d-md-table-cell cl-white">Counter Guarantee</th>
                <th class="cl-white">Beneficiary</th>
                <th class="d-none d-md-table-cell cl-white">Status</th>
                <th class="d-none d-md-table-cell cl-white">Period Days</th>
                <th class="d-none d-sm-table-cell cl-white">Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    
    <!-- pagination pc -->
    <div class="d-none d-md-block d-lg-block mb-3">
        <div id="pagination-container-pc-grtee" class="pagination-custom">
        </div>
    </div>
    <!-- pagination mobile -->
    <div class="d-block d-md-none d-lg-none mb-3">
        <div id="pagination-container-mobile" class="pagination-custom">
        </div>
    </div>
</div>

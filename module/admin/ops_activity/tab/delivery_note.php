<div class="section">
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center">
                    <input type="text" id="search-input" class="style-input" placeholder="Search...">
                    <div class="d-flex align-items-center justify-content-center flex-grow-1">
                        <b class="text-primary" id="filter"></b>
                    </div>
                    <a href='#' id="inputBtnDelNote" data-bs-toggle="modal" data-bs-target="#inputModal" class='btn btn-danger ml-auto'>
                        <i class='fas fa-shopping-cart fa-xl text-white-50'></i> Add Delivery Note
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="table-container" class="table-responsive">
    <table class="table table-striped table-bordered" id="deliveryNote" width="100%" cellspacing="0">
        <thead class="bg-warna">
            <tr class="ta-center">
                <th class="d-none d-md-table-cell cl-white">No</th>
                <th class="d-none d-md-table-cell cl-white">Date</th>
                <th class="cl-white">Material Name</th>
                <th class="d-none d-md-table-cell cl-white">Project Name</th>
                <th class="d-none d-md-table-cell cl-white">Deliver To</th>
                <th class="cl-white">Format No</th>
                <th class="d-none d-md-table-cell cl-white">PIC</th>
                <th class="d-none d-sm-table-cell cl-white">Phone</th>
                <th class="d-none d-sm-table-cell cl-white">Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    
    <!-- pagination pc -->
    <div class="d-none d-md-block d-lg-block mb-3">
        <div id="pagination-container-pc-dn" class="pagination-custom">
        </div>
    </div>
    <!-- pagination mobile -->
    <div class="d-block d-md-none d-lg-none mb-3">
        <div id="pagination-container-mobile" class="pagination-custom">
        </div>
    </div>
</div>
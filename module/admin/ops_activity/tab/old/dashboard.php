<div class="section <?= $tPc; ?>">
    <div class='row'>
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center">
                    <h5>
                        <b class="text-primary">MARKETING RECAP </b><b id="year">2024</b>
                    </h5>
                    <!-- <a href='#' id="filterYearButton" data-bs-toggle="modal" data-bs-target="#filterYearModal" class='btn btn-primary ml-auto'>
                        <i class='fa-solid fa-filter fa-xl text-white-50'></i> Filter Year
                    </a> -->
                    <button class='btn btn-primary ml-auto' id="addFilter"><i class='fa-solid fa-filter fa-xl text-white-50'></i> Filter Tahun</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section <?= $tMobile; ?>">
    <div class='row'>
        <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center">
                    <p>
                        <b class="text-primary">MARKETING RECAP </b><br><b>2024</b>
                    </p>
                    <!-- <a href='#' id="filterYearButton" data-bs-toggle="modal" data-bs-target="#filterYearModal" class='btn btn-primary ml-auto'>
                        <i class='fa-solid fa-filter fa-xl text-white-50'></i>
                    </a> -->
                    <div class="dropdown no-arrow ml-auto">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class='fa-solid fa-filter fa-xl text-white-50'></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <li><a data-toggle="modal" data-target="#filterYearModal" class="dropdown-item">Filter Data</a></li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12 col-md-6 col-lg-6">
        <div class="card">
            <div class="card-body">
                <canvas id="myChart1"></canvas>
            </div>
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-6">
        <div class="card">
            <div class="card-body">
                <canvas id="myChart2"></canvas>
            </div>
        </div>
    </div>
</div>

<table class="table table-striped table-bordered" id="marketing_recap" width="100%" cellspacing="0">
    <thead class="bg-warna">
        <tr class="ta-center">
            <th class="cl-white">Type</th>
            <th class="d-none d-sm-table-cell cl-white">Total PO Acievement</th>
            <th class="d-none d-md-table-cell cl-white">Pipe Line</th>
            <th class="d-none d-sm-table-cell cl-white">Target</th>
            <th class="d-none d-md-table-cell cl-white">Sales Rate</th>
            <th class="d-none d-sm-table-cell cl-white">Remaining Target</th>
        </tr>
    </thead>
    <tbody></tbody>
    <tfoot>
    </tfoot>
</table>
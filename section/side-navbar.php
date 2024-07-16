<?php
$logo1 = "<img src='https://office.katib.id/assets/img/18/DDiM Logo Official.png' style='height: 50px'>";
$logo2 = "<img src='https://office.katib.id/assets/img/18/DDiM Logo Official.png' style='height: 20px'>";

$dashboard = ($page == "dashboard") ? "active" : false;
$sales = ($page == "sales") ? "active" : false;
$project = ($page == "project") ? "active" : false;

$finance = ($page == "finance/financial_report" || $page == "finance/project_expanses" || $page == "finance/operational_expanses" || $page == "finance/cashflow_report") ? "active" : false;
$financial_report = ($page == "finance/financial_report") ? "active" : false;
$project_expanses = ($page == "finance/project_expanses") ? "active" : false;
$operational_expanses = ($page == "finance/operational_expanses") ? "active" : false;
$cashflow_report = ($page == "finance/cashflow_report") ? "active" : false;

// Ops Activity (in progress)
$admin = ($page == "admin/employe" || $page == "admin/purchase_order" || $page == "admin/client" || $page == "admin/vendor" || $page == "admin/official_letter" || $page == "admin/delivery_note" || $page == "admin/bank_guarantee" || $page == "admin/ops_activity" ) ? "active" : false;

$employe = ($page == "admin/employe") ? "active" : false;
$client = ($page == "admin/client") ? "active" : false;
$vendor = ($page == "admin/vendor") ? "active" : false;
$purchase_order = ($page == "admin/purchase_order") ? "active" : false;
$official_letter = ($page == "admin/official_letter") ? "active" : false;
$delivery_note = ($page == "admin/delivery_note") ? "active" : false;

// OpsActivity (in Progress)
$ops_activity = ($page == "admin/ops_activity") ? "active" : false;

$bank_guarantee = ($page == "admin/bank_guarantee") ? "active" : false;

$purchasing = ($page == "purchasing/asset" || $page == "purchasing/product" || $page == "purchasing/inventory") ? "active" : false;
$asset = ($page == "purchasing/asset") ? "active" : false;
$product = ($page == "purchasing/product") ? "active" : false;
$inventory = ($page == "purchasing/inventory") ? "active" : false;

$setting = ($page == "setting") ? "active" : false;
?>

<div class="main-sidebar sidebar-style-2" tabindex="1" style="overflow: hidden; outline: none; touch-action: none;">
  <aside id="sidebar-wrapper">
    <div class="sidebar-brand">
      <a href="#"><?= $logo1 ?></a>
    </div>
    <div class="sidebar-brand sidebar-brand-sm">
      <a href="#"><?= $logo2 ?></a>
    </div>

    <hr>
    
    <?php
    echo '<ul class="sidebar-menu">
      <li class="menu-header bg-warna cl-white ta-center">MAIN MENU</li>
      <li class="dropdown ' . $dashboard . '">
        <a href="?page=dashboard" class="nav-link"><i class="fas fa-house"></i><span>Dashboard</span></a>
      </li>
      <li class="dropdown ' . $sales . '">
        <a href="?page=sales" class="nav-link"><i class="fas fa-tags"></i><span>Sales</span></a>
      </li>
      <li class="dropdown ' . $project . '">
        <a href="?page=project" class="nav-link"><i class="fas fa-diagram-project"></i><span>Project</span></a>
      </li>
      <li class="dropdown ' . $finance . '">
        <a href="#" class="nav-link has-dropdown"><i class="fas fa-money-check-dollar"></i><span>Finance</span></a>
        <ul class="dropdown-menu">
          <li class="' . $financial_report . '"><a class="nav-link" href="?page=finance/financial_report">Financial Report</a></li>
          <li class="' . $project_expanses . '"><a class="nav-link" href="?page=finance/project_expanses">Project Expanses</a></li>
          <li class="' . $operational_expanses . '"><a class="nav-link" href="?page=finance/operational_expanses">Operational Expanses</a></li>
        </ul>
      </li>
      <li class="dropdown ' . $admin . '">
        <a href="#" class="nav-link has-dropdown"><i class="fas fa-users-line"></i><span>Admin</span></a>
        <ul class="dropdown-menu">
          <li class="' . $employe . '"><a class="nav-link" href="?page=admin/employe">Employe</a></li>
          <li class="' . $client . '"><a class="nav-link" href="?page=admin/client">Client</a></li>
          <li class="' . $vendor . '"><a class="nav-link" href="?page=admin/vendor">Vendor</a></li>
          <li class="' . $purchase_order . '"><a class="nav-link" href="?page=admin/purchase_order">Purchase Order</a></li>


          <li class="' . $ops_activity . '"><a class="nav-link" href="?page=admin/ops_activity">Ops Activity</a></li>

          
        </ul>
      </li>
      <li class="dropdown ' . $purchasing . '">
        <a href="#" class="nav-link has-dropdown"><i class="fas fa-dolly-flatbed"></i><span>Purchasing</span></a>
        <ul class="dropdown-menu">
          <li class="' . $asset . '"><a class="nav-link" href="?page=purchasing/asset">Asset</a></li>
          <li class="' . $product . '"><a class="nav-link" href="?page=purchasing/product">Product</a></li>
          <li class="' . $inventory . '"><a class="nav-link" href="?page=purchasing/inventory">Inventory</a></li>
        </ul>
      </li>
      <li class="dropdown ' . $setting . '">
        <a href="?page=setting" class="nav-link"><i class="fas fa-gear"></i><span>Setting</span></a>
      </li>
    </ul>';
    ?>
  </aside>
</div>
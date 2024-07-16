<?
session_start();
?>
<label for="order_date" class="swal2-label">Order Date<small class="text-danger pl-1">*</small></label>
<input type="date" class="swal2-input form-add" name="order_date" id="order_date" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>
<label for="project_type" class="swal2-label">Project Type<small class="text-danger pl-1">*</small></label>
<select class="swal2-input form-add" name="project_type" id="project_type" required>
    <option value="">Select The Project Type</option>
</select>
<input type="hidden" value="<?= isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : '' ?>" class="swal2-input form-add" name="owner_id" id="owner_id">
<input type="hidden" value="QT" class="swal2-input form-add" name="prefix" id="prefix">
<input type="hidden" value="<?= isset($_SESSION['inisial_nama']) ? $_SESSION['inisial_nama'] : '' ?>" class="swal2-input form-add" name="initial_name" id="initial_name">
<label for="no_qtn" class="swal2-label">Quotation Number<small class="text-danger pl-1">*</small></label>
<input type="text" name="no_qtn" id="no_qtn" autocomplete="off" placeholder="Generate Quotation Number" class="swal2-input form-add" readonly required>
<label for="project_name" class="swal2-label">Project Name<small class="text-danger pl-1">*</small></label>
<input type="text" name="project_name" id="project_name" autocomplete="off" class="swal2-input form-add" placeholder="Fill The Project Name" required>
<label for="amount" class="swal2-label">Amount (IDR)<small class="text-danger pl-1">*</small></label>
<input type="text" class="swal2-input form-add" name="amount" id="amount" placeholder="Fill Amount" min="1" required>
<label for="client" class="swal2-label">Client<small class="text-danger pl-1">*</small></label>
<input type="text" class="swal2-input form-add" name="client" id="client" placeholder="Who's The Client?" required>
<input type="hidden" name="client_id" id="client_id" class="swal2-input form-add">
<ul id="clientList" class="client-list"></ul>
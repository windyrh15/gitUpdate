<?php
session_start();
?>

<div style="display: flex; justify-content: space-between;">
    <div style="width: 48%;">
        <label for="update_start_date" class="swal2-label">Start Date<small class="text-danger pl-1">*</small></label>
        <input type="date" class="form-control form-add" name="update_start_date" id="update_start_date" max="<?= date('Y-m-d'); ?>" required>
    </div>
    <div style="width: 48%;">
        <label for="update_close_date" class="swal2-label">Close Date<small class="text-danger pl-1">*</small></label>
        <input type="date" class="form-control form-add" name="update_close_date" id="update_close_date" max="<?= date('Y-m-d'); ?>" required>
    </div>
</div>

<div class="form-group">
    <input type="text" id="update_project" class="form-control form-add" placeholder="Search or Add new Project">
    <div id="update_suggestionProject" class="suggestions-container"></div>
</div>

<div class="form-group">
    <input type="text" class="form-control form-add" name="update_bond_number" id="update_bond_number" placeholder="Bond Number" required>
</div>
<div class="form-group">
    <input type="text" class="form-control form-add" name="update_bond" id="update_bond" placeholder="Bond" required>
</div>
<div class="form-row">
    <div class="form-group col-md-6">
        <input type="number" class="form-control form-add" name="update_amount" id="update_amount" placeholder="Amount" required>
    </div>
    <div class="form-group col-md-6">
        <input type="number" class="form-control form-add" name="update_collateral" id="update_collateral" placeholder="Collateral" required>
    </div>
</div>
<div class="form-group">
    <input type="text" class="form-control form-add" name="update_bank" id="update_bank" placeholder="Bank" required>
</div>
<div class="form-group">
    <input type="text" class="form-control form-add" name="update_counter_guarantee" id="update_counter_guarantee" placeholder="Counter Guarantee" required>
</div>
<div class="form-group">
    <input type="text" class="form-control form-add" name="update_beneficiary" id="update_beneficiary" placeholder="Beneficiary" required>
</div>

<div class="form-group custom-file">
    <input type="file" class="form-control custom-file-input" name="update_fileInput" id="update_fileInput" required>
    <label class="custom-file-label" for="update_fileInput">Choose file</label>
</div>

<?php
session_start();
?>

<input type="hidden" value="<?= isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : '' ?>" class="form-add" name="owner_id" id="owner_id">
<input type="hidden" value="<?= isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '' ?>" class="form-add" name="user_id" id="user_id">
<input type="hidden" value="1" class="form-add" name="status" id="status">

<div style="display: flex; justify-content: space-between;">
        <div style="width: 48%;">
            <label for="start_date" class="swal2-label">Start Date<small class="text-danger pl-1">*</small></label>
            <input type="date" class="form-control form-add" name="start_date" id="start_date" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>
</div>
<div style="width: 48%;">
        <label for="close_date" class="swal2-label">Close Date<small class="text-danger pl-1">*</small></label>
        <input type="date" class="form-control form-add" name="close_date" id="close_date" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>
</div>
</div>

            <div class="form-group">
                <input type="text" id="project" class="form-control form-add" placeholder="Search or Add new Project">
                <div id="suggestionProject" class="suggestions-container"></div>
            </div>

            <div class="form-group">
                <input type="text" class="form-control form-add" name="bond_number" id="bond_number" placeholder="Bond Number" required>
            </div>
            <div class="form-group">
                <input type="text" class="form-control form-add" name="bond" id="bond" placeholder="Bond" required>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="number" class="form-control form-add" name="amount" id="amount" placeholder="Amount" required>
                </div>
                <div class="form-group col-md-6">
                    <input type="number" class="form-control form-add" name="collateral" id="collateral" placeholder="Collateral" required>
                </div>
            </div>
            <div class="form-group">
                <input type="text" class="form-control form-add" name="bank" id="bank" placeholder="Bank" required>
            </div>
            <div class="form-group">
                <input type="text" class="form-control form-add" name="counter_guarantee" id="counter_guarantee" placeholder="Counter Guarantee" required>
            </div>
            <div class="form-group">
                <input type="text" class="form-control form-add" name="beneficiary" id="beneficiary" placeholder="Beneficiary" required>
            </div>

            <div class="form-group custom-file">
                <input type="file" class="form-control custom-file-input" name="fileInput" id="fileInput" required>
                <label class="custom-file-label" for="fileInput">Upload file</label>
            </div>
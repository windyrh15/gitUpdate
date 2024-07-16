<label for="user" class="swal2-label">User</label>
<select class="swal2-input" name="user" id="user" required>
    <option value="">Select User</option>
</select>
<label for="type" class="swal2-label">Type</label>
<select class="swal2-input" name="type" id="type" required>
    <option value="">Select Type</option>
</select>
<label for="status" class="swal2-label">Status</label>
<select class="swal2-input" name="status" id="status" required>
    <option value="">Select Status</option>
</select>
<label for="start_date" class="swal2-label">Start Date</label>
<input type="date" class="swal2-input" name="start_date" id="start_date" max="<?= date("Y-m-d"); ?>" required>
<label for="end_date" class="swal2-label">End Date</label>
<input type="date" class="swal2-input" name="end_date" id="end_date" max="<?= date("Y-m-d"); ?>" required>
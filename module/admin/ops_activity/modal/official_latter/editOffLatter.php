<?
session_start();
?>
<input type="hidden" value="OL.DDiM" class="swal2-input form-add" name="prefix" id="prefix">
<input type="hidden" value="<?= isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : '' ?>" class="swal2-input form-add" name="owner_id" id="owner_id">
<input type="hidden" value="<?= isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '' ?>" class="swal2-input form-add" name="user_id" id="user_id">
<input type="date" class="swal2-input form-add" name="tanggal" id="tanggal" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>
<select class="swal2-input form-add" name="id" id="id" onchange="createUniqueNumber(this.value)" required>
    <option value="">Select Classification</option>
</select>
<input type="text" name="no_letter" id="no_letter" autocomplete="off" placeholder="Generate Letter Number" class="swal2-input form-add" readonly required>
<input type="text" name="subject" id="subject" autocomplete="off" class="swal2-input form-add" placeholder="Letter Subject" required>
<input type="text" name="beneficiary" id="beneficiary" autocomplete="off" class="swal2-input form-add" placeholder="Beneficiary" required>
<input type="text" class="swal2-input form-add custom-input" name="client" id="client" placeholder="Customer" required>
<input type="hidden" name="client" id="client" class="swal2-input form-add">
<ul id="clientList" class="client-list scrollable-card-body" style="list-style-type: none; text-align: left;"></ul>
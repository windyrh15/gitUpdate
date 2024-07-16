<?php
session_start();

// Set these session variables for testing purposes
// In a real application, these would be set upon user login or some other process
?>

<input type="hidden" value="Dn" class="swal2-input form-add" name="prefix" id="prefix">
<input type="hidden" value="<?= isset($_SESSION['owner_id']) ? $_SESSION['owner_id'] : '' ?>" class="swal2-input form-add" name="owner_id" id="owner_id">
<input type="hidden" value="<?= isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '' ?>" class="swal2-input form-add" name="user_id" id="user_id">

<!-- input tanggal -->
<input type="date" class="swal2-input form-add" name="tanggal" id="tanggal" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>


<input type="text" id="project" class="swal2-input form-add" placeholder="Search or Add new Project">
<div id="suggestionProject" class="suggestions-container"></div>
<input type="text" name="deliverTo" id="deliverTo" autocomplete="off" placeholder="Delivery To" class="swal2-input form-add" required>

<!-- FormatNo -->
<input type="text" name="formatNo" id="formatNo" autocomplete="off" class="swal2-input form-add" placeholder="FormatNo" required>


<!-- Bagian PIC dan Phone harus punya sugest ----------------------------------------------------------------------------------------- -->

<input type="text" id="pic" class="swal2-input form-add" placeholder="Search or Add new PIC">
<div id="suggestions"></div>

<input type="text" id="phone" class="swal2-input form-add" placeholder="Enter phone number">

          
<!-- Button material -->
<div class="btn btn-outline-primary mt-2 mb-4" id="materialButton">Tambah detail material</div>

<!-- material -->
<div id="materialContainer" class="container">
    <div class="row mb-2">
        <div class="col">
            <input type="text" class="form-control" name="material[]" placeholder="Material" required>
        </div>
        <div class="col">
            <input type="number" class="form-control" name="quantity[]" placeholder="Quantity" required>
        </div>
        <div class="col-auto">
            <div class="btn btn-info" role="button" id="customButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
            </div>
        </div>
    </div>
</div>

<ul id="clientList" class="client-list scrollable-card-body" style="list-style-type: none; text-align: left;"></ul>
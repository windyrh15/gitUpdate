<?php
session_start();
?>

<input type="hidden" value="Dn" class="swal2-input form-add" name="prefix" id="prefix"> 

<!-- input tanggal -->
<input type="date" class="swal2-input form-add" name="tanggal" id="tanggal" max="<?= date_default_timezone_set('Asia/Jakarta'); echo date("Y-m-d"); ?>" required>

<!-- pilih project -->
<input type="text" id="project" class="swal2-input form-add" placeholder="Search or Add new Project">   
<div id="suggestionProject" class="suggestions-container"></div>

<!-- DeliverTo -->
<input type="text" name="deliverTo" id="deliverTo" autocomplete="off" placeholder="Delivery To" class="swal2-input form-add" required>

<!-- FormatNo -->
<input type="text" name="formatNo" id="formatNo" autocomplete="off" class="swal2-input form-add" placeholder="FormatNo" required >

<!-- Bagian PIC dan Phone harus punya sugest ----------------------------------------------------------------------------------------- -->

<input type="text" id="pic" class="swal2-input form-add" placeholder="Search or Add new PIC">
<div id="suggestions"></div>

<input type="text" id="phone" class="swal2-input form-add" placeholder="Enter phone number">

<!-- Button material -->
<div class="btn btn-outline-primary mt-2 mb-4" id="materialButton" onclick="tambahMaterialUpdate()">Tambah detail material</div>

<!-- material -->
<div id="materialContainer" class="container"></div>

<ul id="clientList" class="client-list scrollable-card-body" style="list-style-type: none; text-align: left;"></ul>

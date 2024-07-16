<select id="filterYear" class="swal2-input">
    <option value="">-- Select Year --</option>
    <?php
    $currentYear = date("Y");
    for ($i = $currentYear; $i >= 2022; $i--) {
        echo "<option value=\"$i\">$i</option>";
    }
    ?>
</select>
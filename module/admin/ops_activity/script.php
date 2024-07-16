<?php
$general = filemtime("api/general.js");
?>
<script src="api/general.js?v=<?= $general ?>"></script>

<?php
if ($detail) {
  // $getProduct=filemtime("module/$page/script/getProduct.js");
  // $getDetail=filemtime("module/$page/script/getDetail.js");
  // $getVariant=filemtime("module/$page/script/getVariant.js");
  // $carousel=filemtime("module/$page/script/carousel.js");
  // $addCart=filemtime("module/$page/script/addCart.js");
  // echo "
  //   <script src='module/$page/script/getProduct.js?v=$getProduct'></script>
  //   <script src='module/$page/script/getDetail.js?v=$getDetail'></script>
  //   <script src='module/$page/script/getVariant.js?v=$getVariant'></script>
  //   <script src='module/$page/script/carousel.js?v=$carousel'></script>
  //   <script src='module/$page/script/addCart.js?v=$addCart'></script>
  //   ";
} else {

  // Official Latter ----------------------------------------------------------------------------------------------------
  
  $getOffLatter = filemtime("module/" . $page . "/script/official_latter/getOffLatter.js");
  $getVenOffLatter = filemtime("module/" . $page . "/script/official_latter/getVendor.js");
  $inputOffLatter = filemtime("module/" . $page . "/script/official_latter/inputOffLatter.js");
  $updateOffLatter = filemtime("module/" . $page . "/script/official_latter/editOffLatter.js");
  $deleteOffLatter = filemtime("module/" . $page . "/script/official_latter/deleteOffLatter.js");

  // Delivery Note ------------------------------------------------------------------------------------------------------

  $getDelNote = filemtime("module/" . $page . "/script/delivery_note/getDelNote.js");
  $getVenDelNote = filemtime("module/" . $page . "/script/delivery_note/getVenDelNote.js");
  $inputDelNote = filemtime("module/" . $page . "/script/delivery_note/inputDelNote.js");
  $updateDelNote = filemtime("module/" . $page . "/script/delivery_note/updateDelNote.js");
  $deleteDelNote = filemtime("module/" . $page . "/script/delivery_note/deleteDelNote.js");

  // Bank Guarantee ------------------------------------------------------------------------------------------------------

  $getGrtee = filemtime("module/" . $page . "/script/bank_guarantee/getGrtee.js");
  $getVenGrtee = filemtime("module/" . $page . "/script/bank_guarantee/getVenGrtee.js");
  $inputGrtee = filemtime("module/" . $page . "/script/bank_guarantee/inputGrtee.js");
  $updateGrtee = filemtime("module/" . $page . "/script/bank_guarantee/updateGrtee.js");
  $deleteGrtee = filemtime("module/" . $page . "/script/bank_guarantee/deleteGrtee.js");
  $updateStatusGrtee = filemtime("module/" . $page . "/script/bank_guarantee/updateStatusGrtee.js");
 

  echo "

    <script src='module/$page/script/official_latter/getOffLatter.js?v=$getOffLatter'></script>
    <script src='module/$page/script/official_latter/getVendor.js?v=$getVenOffLatter'></script>
    <script src='module/$page/script/official_latter/inputOffLatter.js?v=$inputOffLatter'></script>
    <script src='module/$page/script/official_latter/editOffLatter.js?v=$updateOffLatter'></script>
    <script src='module/$page/script/official_latter/deleteOffLatter.js?v=$deleteOffLatter'></script>

    <script src='module/$page/script/delivery_note/getDelNote.js?v=$getDelNote'></script>
    <script src='module/$page/script/delivery_note/getVenDelNote.js?v=$getVenDelNote'></script>
    <script src='module/$page/script/delivery_note/inputDelNote.js?v=$inputDelNote'></script>
    <script src='module/$page/script/delivery_note/updateDelNote.js?v=$updateDelNote'></script>
    <script src='module/$page/script/delivery_note/deleteDelNote.js?v=$deleteDelNote'></script>

    <script src='module/$page/script/bank_guarantee/getGrtee.js?v=$getGrtee'></script>
    <script src='module/$page/script/bank_guarantee/getVenGrtee.js?v=$getVenGrtee'></script>
    <script src='module/$page/script/bank_guarantee/inputGrtee.js?v=$inputGrtee'></script>
    <script src='module/$page/script/bank_guarantee/updateGrtee.js?v=$updateGrtee'></script>
    <script src='module/$page/script/bank_guarantee/deleteGrtee.js?v=$deleteGrtee'></script>
    <script src='module/$page/script/bank_guarantee/updateStatusGrtee.js?v=$updateStatusGrtee'></script>
    ";
}
//   $getDomSales = filemtime("module/" . $page . "/script/sales/getDomSales.js");
//   $getTableSales = filemtime("module/" . $page . "/script/sales/getTableSales.js");
//   $inputSales = filemtime("module/" . $page . "/script/sales/inputSales.js");
//   $deleteSales = filemtime("module/" . $page . "/script/sales/deleteSales.js");
//   $getTableMarketingRecap = filemtime("module/" . $page . "/script/marketing_recap/getTableMarketingRecap.js");
//   $getFilter = filemtime("module/" . $page . "/script/marketing_recap/getFilter.js");
//   $getCurve = filemtime("module/" . $page . "/script/marketing_recap/getCurve.js");
//   echo "
//     <script src='module/$page/script/sales/getDomSales.js?v=$getDomSales'></script>
//     <script src='module/$page/script/sales/getTableSales.js?v=$getTableSales'></script>
//     <script src='module/$page/script/sales/inputSales.js?v=$inputSales'></script>
//     <script src='module/$page/script/sales/deleteSales.js?v=$deleteSales'></script>
//     <script src='module/$page/script/marketing_recap/getTableMarketingRecap.js?v=$getTableMarketingRecap'></script>
//     <script src='module/$page/script/marketing_recap/getFilter.js?v=$getFilter'></script>
//     <script src='module/$page/script/marketing_recap/getCurve.js?v=$getCurve'></script>
//     ";
?>
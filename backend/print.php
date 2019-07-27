<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
require './connection.php';
$datarows = [];
$result = $conn->query('SELECT group_kind_unit_zones.input_items,group_kind_unit_zones.name as group_name ,kind_unit_zones.name as zone_name,kind_units.name as kind_name,unit_users.name as unit_name
FROM 
(SELECT groups.name,group_kind_unit_zones.* FROM group_kind_unit_zones INNER JOIN groups ON groups.id = group_kind_unit_zones.group_id)`group_kind_unit_zones` 
INNER JOIN (SELECT zones.name,kind_unit_zones.* FROM kind_unit_zones INNER JOIN zones ON kind_unit_zones.zone_id = zones.id) kind_unit_zones ON group_kind_unit_zones.kind_unit_zone_id = kind_unit_zones.id 
INNER JOIN (SELECT kinds.name,kind_units.* FROM kind_units INNER JOIN  kinds ON kind_units.kind_id = kinds.id) kind_units ON kind_unit_zones.kind_unit_id = kind_units.id
INNER JOIN (SELECT unit_users.*,units.name FROM unit_users INNER JOIN units ON unit_users.unit_id = units.id)unit_users ON kind_units.unit_user_id = unit_users.id
ORDER BY unit_name,zone_name,group_name');
while($row = $result->fetch_assoc()){
    array_push($datarows,(object)$row);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cetak Dokumen</title>
    <style>
        table, th, td {
            border: 1px solid black;
            }
        @media print and (min-width: 1024px) {
            }
    </style>
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.bootstrap4.min.css">

</head>
<body>
    <table style="border:solid 1px black" width="100%" id="list-inputs">
        <tr>
            <th>No.</th>
            <th>Description</th>
            <th>Condition</th>
            <th>Note</th>
            <th>Priority</th>
            <th>Remarks</th>
            <th>Foto</th>
        </tr>
<?php foreach($datarows as $i=> $pi):?>
    <?php $input_items = json_decode($pi->input_items);
    // var_dump($input_items);
    ?>
    <tr><td>#</td>
        <td><?php echo $pi->group_name; ?></td></tr>
        <?php foreach($input_items as $j=> $input):?>
        <tr>
            <td><?php echo $j+1 ?></td>
            <td><?php echo $input->name." $input->subname" ?></td>
            <td><?php echo $input->condition ?></td>
            <td><?php echo $input->note ?></td>
            <td><?php echo $input->priority ?></td>
            <td><?php echo $input->remark ?></td>
            <td><?php echo $input->foto->name ?></td>
        </tr>
        <?php endforeach; ?>
<?php endforeach; ?>            
    </table>


    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>

    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.bootstrap4.min.js"></script>

    <script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.flash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.print.min.js"></script>
    <script>
        $('#list-inputs').dataTable({
            dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf', 'print'
            ]
        })
    </script>
</body>
</html>

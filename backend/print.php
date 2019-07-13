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
</style>
</head>
<body>
    <table style="border:solid 1px black">
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
</body>
</html>

<?php
require_once 'connection.php';
$datainputs = array();
if ( isset( $_GET['unit'] ) and isset( $_GET['zone'] ) ) {
	$q_input_items      = "SELECT group_kind_unit_zones.input_items,group_kind_unit_zones.name as group_name ,kind_unit_zones.name as zone_name,kind_units.name as kind_name,unit_users.name as unit_name
    FROM 
    (SELECT groups.name,group_kind_unit_zones.* FROM group_kind_unit_zones INNER JOIN groups ON groups.id = group_kind_unit_zones.group_id)`group_kind_unit_zones` 
    INNER JOIN (SELECT zones.name,kind_unit_zones.* FROM kind_unit_zones INNER JOIN zones ON kind_unit_zones.zone_id = zones.id) kind_unit_zones ON group_kind_unit_zones.kind_unit_zone_id = kind_unit_zones.id 
    INNER JOIN (SELECT kinds.name,kind_units.* FROM kind_units INNER JOIN  kinds ON kind_units.kind_id = kinds.id  WHERE kind_units.kind_id = 'KIND1') kind_units ON kind_unit_zones.kind_unit_id = kind_units.id
    INNER JOIN (SELECT unit_users.*,units.name FROM unit_users INNER JOIN units ON unit_users.unit_id = units.id)unit_users ON kind_units.unit_user_id = unit_users.id
    WHERE unit_users.name = '$_GET[unit]' AND kind_unit_zones.zone_id = '$_GET[zone]'
    ORDER BY unit_name,zone_name,group_name";
	$result_input_items = $conn->query( $q_input_items );

	while ( $input_items = $result_input_items->fetch_assoc() ) {
		array_push( $datainputs, (object) $input_items );
	}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pisaic Database</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    <link rel="stylesheet"
          href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"
          integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/rowreorder/1.2.5/css/rowReorder.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.bootstrap4.min.css">
</head>

<body>
<nav class="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between" style="background-color: #FEDA01 !important;">
    <div>
        <a class="navbar-brand" href="#">Zones Unit <?php echo $_GET['unit'] ?> | Periodic Inspection</a>
    </div>
</nav>
<div class="container">
    <div class="row mt-4">
        <div class="col-md-12">
            <table width="100%" id="list-inputs" class="display nowrap">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Description</th>
                    <th>Condition</th>
                    <th>Note</th>
                    <th>Priority</th>
                    <th>Remarks</th>
                    <th>Foto</th>
                    <th>Link Foto</th>
                </tr>
                </thead>
                <tbody>
				<?php foreach ( $datainputs as $item ): ?>

					<?php $input_items = json_decode( $item->input_items ); ?>
					<?php foreach ( $input_items as $j => $input ): ?>
                        <tr>
                            <td><?php echo $j + 1 ?></td>
                            <td><?php echo $input->name . " $input->subname" ?></td>
                            <td><?php echo $input->condition ?></td>
                            <td><?php echo $input->note ?></td>
                            <td><?php echo $input->priority ?></td>
                            <td><?php echo $input->remark ?></td>
                            <td><img width="200px" src="uploads/<?php echo $input->foto->name ?>"
                                     alt="<?php echo $input->foto->name ?>"></td>
                            <td><a href="/uploads/<?php echo $input->foto->name ?>"><?php echo $input->foto->name ?></a>
                            </td>
                        </tr>
					<?php endforeach; ?>

				<?php endforeach; ?>
                </tbody>
            </table>
        </div>
		<?php if ( count( $datainputs ) == 0 ): ?>
            <div class="col-md-12">
                <h4 class="mt-4" style="text-align: center;">DATA MASIH KOSONG</h4>
            </div>
		<?php endif; ?>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.js">
</script>
<script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js"
        integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous">
</script>
<script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js"
        integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous">
</script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/rowreorder/1.2.5/js/dataTables.rowReorder.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>
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
        columnDefs: [
            {
                "render": function ( data, type, row ) {
                    let res = '';
                    if(row[7] !== '<a href="/uploads/"></a>'){
                        res = '<?php echo $_SERVER["SERVER_NAME"] ?>/uploads/'+ row[7];
                    }
                    return res;
                },
                "targets": 7
            },
            { "visible": false,  "targets": [ 7 ] }
        ],
        buttons: [
            {
                extend: 'excelHtml5',
                text: 'Export Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 7]
                },
            }, {
                extend: 'pdfHtml5',
                text: 'Export PDF',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 7]
                },
            }, 'print'
        ],
        responsive: true,
    })
</script>

</body>

</html>

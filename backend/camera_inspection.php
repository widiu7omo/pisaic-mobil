<?php
require_once 'connection.php';
$units        = array();
$q_units      = "SELECT unit_id FROM camera_inspection ORDER BY unit_id";
$result_units = $conn->query( $q_units );

while ( $unit = $result_units->fetch_assoc() ) {
	array_push( $units, (object) $unit );
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
<nav class="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between"
     style="background-color: #FEDA01 !important;">
    <div>
        <a class="navbar-brand" href="#"><?php if ( isset( $_GET['unit'] ) ): ?>
                Unit <?php echo $_GET['unit'] ?> | <?php endif; ?>Camera Inspection</a>
    </div>
</nav>
<?php if ( ! isset( $_GET['unit'] ) ): ?>
    <div class="container">
        <div class="row">
			<?php foreach ( $units as $item ): ?>
                <div class="col-md-4">
                    <a style="text-decoration:none;color:#000" href="?uri=ci&unit=<?php echo $item->unit_id ?>">
                        <div class="card mt-4">
                            <div class="card-body">
                                <h4 class="card-title"><?php echo $item->unit_id ?></h4>
                                <p class="card-text">Nama Unit</p>
                            </div>
                        </div>
                    </a>
                </div>
			<?php endforeach; ?>
        </div>
    </div>
<?php endif; ?>
<?php if ( isset( $_GET['unit'] ) ): ?>
	<?php
	$input_items   = array();
	$q_input_items = "SELECT input_items FROM camera_inspection WHERE unit_id = '$_GET[unit]' ORDER BY unit_id ";
	$result_input_items  = $conn->query( $q_input_items );

	while ( $input_item = $result_input_items->fetch_assoc() ) {
		array_push( $input_items, (object) $input_item );
	}
	?>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <table width="100%" id="list-inputs" class="display nowrap">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Tanggal Pemeriksaan</th>
                        <th>Pemeriksa</th>
                        <th>Komponen</th>
                        <th>Foto</th>
                        <th>Catatan</th>
	                    <th>Tanda Tangan</th>
                    </tr>
                    </thead>
                    <tbody>
					<?php foreach ( $input_items as $item ): ?>

						<?php $input_items = json_decode( $item->input_items ); ?>
						<?php foreach ( $input_items as $j => $input ): ?>
                            <tr>
                                <td><?php echo $j + 1 ?></td>
                                <td><?php echo $input->date ?></td>
                                <td><?php echo $input->id_pemeriksa ?></td>
                                <td><?php echo $input->nama_komponen ?></td>
                                <td><img width="200px" src="/uploads/<?php echo $input->foto->name ?>" alt="<?php echo $input->foto->name ?>"></td>
                                <td><?php echo $input->foto->catatan ?></td>
	                            <td><img width="200px" src="<?php echo $input->ttd!=''?$input->ttd->signature:''?>" alt="TTD"></td>
                            </tr>
						<?php endforeach; ?>

					<?php endforeach; ?>
                    </tbody>
                </table>
            </div>
			<?php if ( count( $input_items ) == 0 ): ?>
                <div class="col-md-12">
                    <h4 class="mt-4" style="text-align: center;">DATA MASIH KOSONG</h4>
                </div>
			<?php endif; ?>
        </div>
    </div>
<?php endif; ?>

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
        buttons: [
            'excel', 'pdf', 'print'
        ],
        responsive: true,
    })
</script>

</body>

</html>

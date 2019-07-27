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
</head>

<body>
<nav class="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between" style="background-color: #FEDA01 !important;">
	<div>
		<a class="navbar-brand" href="#">Daftar Unit Periodic Inspection</a>
	</div>
	<div>

	</div>

</nav>
<?php
include_once 'connection.php';




$q_unit_user = "SELECT unit_users.name as unit_name,unit_users.id FROM 
    (SELECT unit_users.*,units.name FROM unit_users INNER JOIN units ON unit_users.unit_id = units.id)unit_users 
    GROUP BY unit_name";
$result_unit_user = $conn->query($q_unit_user);
$units = array();
while($unit_user = $result_unit_user->fetch_assoc()){
	array_push($units,(object)$unit_user);
}

?>
<div class="container">
	<div class="row">
		<?php foreach($units as $item): ?>
			<div class="col-md-4">
				<a style="text-decoration:none;color:#000" href="zones.php?unit=<?php echo $item->unit_name ?>">
					<div class="card mt-4">
						<div class="card-body">
							<h4 class="card-title"><?php echo $item->unit_name ?></h4>
							<p class="card-text">Nama Unit</p>
						</div>
					</div>
				</a>
			</div>
		<?php endforeach; ?>
	</div>
</div>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
</script>
<script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js"
        integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous">
</script>
<script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js"
        integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous">
</script>

</body>

</html>
<?php
use ___PHPSTORM_HELPERS\object;

if(isset($_GET['unit'])){
    //data focus on PI
    include_once 'connection.php';
    $q_zones = "SELECT kind_unit_zones.name as zone_name,kind_unit_zones.zone_id,kind_units.name as kind_name,unit_users.name as unit_name FROM 
    (SELECT zones.name,kind_unit_zones.* FROM kind_unit_zones INNER JOIN zones ON kind_unit_zones.zone_id = zones.id) kind_unit_zones 
    INNER JOIN (SELECT kinds.name,kind_units.* FROM kind_units INNER JOIN  kinds ON kind_units.kind_id = kinds.id WHERE kind_units.kind_id = 'KIND1') kind_units ON kind_unit_zones.kind_unit_id = kind_units.id
    INNER JOIN (SELECT unit_users.*,units.name FROM unit_users INNER JOIN units ON unit_users.unit_id = units.id)unit_users ON kind_units.unit_user_id = unit_users.id
    WHERE unit_users.name = '$_GET[unit]'
    GROUP BY unit_name,zone_name
    ORDER BY unit_name,zone_name";
    $result_zones = $conn->query($q_zones);
    $zones = array();
    while($row = $result_zones->fetch_assoc()){
        array_push($zones,(object)$row);
    }
    $filtered_zones = array();
    foreach($zones as $zone){
        if($zone->zone_id != 'ZONE1' && $zone->zone_id != 'ZONE2'){
            array_push($filtered_zones,$zone);
        }
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
</head>

<body>
    <nav class="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between" style="background-color: #FEDA01 !important;">
        <div>
            <a class="navbar-brand" href="#">Zones Unit <?php echo $_GET['unit'] ?> | Periodic Inspection</a>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <?php foreach($filtered_zones as $item): ?>
            <div class="col-md-4">
                <a style="text-decoration:none;color:#000" href="datainput.php?unit=<?php echo $_GET['unit']?>&zone=<?php echo $item->zone_id ?>",>
                    <div class="card mt-4">
                        <div class="card-body">
                            <h4 class="card-title"><?php echo $item->zone_name ?></h4>
                            <p class="card-text">Zone Unit</p>
                        </div>
                    </div>
                </a>
            </div>
            <?php endforeach; ?>
	        <?php if(count($filtered_zones)== 0):?>
            <div class="col-md-12">
                <h4 class="mt-4" style="text-align: center;">DATA MASIH KOSONG</h4>
            </div>
	        <?php endif;?>
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
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
    <nav class="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between">
        <div>
            <a class="navbar-brand" href="#">Daftar Unit Periodic Inspection</a>
        </div>
        <div>
            
        </div>

    </nav>
    <?php
    include_once 'connection.php';
    $q_input_items = "SELECT group_kind_unit_zones.input_items,group_kind_unit_zones.name as group_name ,kind_unit_zones.name as zone_name,kind_units.name as kind_name,unit_users.name as unit_name
    FROM 
    (SELECT groups.name,group_kind_unit_zones.* FROM group_kind_unit_zones INNER JOIN groups ON groups.id = group_kind_unit_zones.group_id)`group_kind_unit_zones` 
    INNER JOIN (SELECT zones.name,kind_unit_zones.* FROM kind_unit_zones INNER JOIN zones ON kind_unit_zones.zone_id = zones.id) kind_unit_zones ON group_kind_unit_zones.kind_unit_zone_id = kind_unit_zones.id 
    INNER JOIN (SELECT kinds.name,kind_units.* FROM kind_units INNER JOIN  kinds ON kind_units.kind_id = kinds.id) kind_units ON kind_unit_zones.kind_unit_id = kind_units.id
    INNER JOIN (SELECT unit_users.*,units.name FROM unit_users INNER JOIN units ON unit_users.unit_id = units.id)unit_users ON kind_units.unit_user_id = unit_users.id
    ORDER BY unit_name,zone_name,group_name";
    $result_input_items = $conn->query($q_input_items);

    $input_items = $result_input_items->fetch_assoc();
    $q_zones = "SELECT kind_unit_zones.name as zone_name,kind_units.name as kind_name,unit_users.name as unit_name FROM 
    (SELECT zones.name,kind_unit_zones.* FROM kind_unit_zones INNER JOIN zones ON kind_unit_zones.zone_id = zones.id) kind_unit_zones 
    INNER JOIN (SELECT kinds.name,kind_units.* FROM kind_units INNER JOIN  kinds ON kind_units.kind_id = kinds.id) kind_units ON kind_unit_zones.kind_unit_id = kind_units.id
    INNER JOIN (SELECT unit_users.*,units.name FROM unit_users INNER JOIN units ON unit_users.unit_id = units.id)unit_users ON kind_units.unit_user_id = unit_users.id
    GROUP BY unit_name,zone_name
    ORDER BY unit_name,zone_name";
    $result_zones = $conn->query($q_zones);
    $zones = $result_zones->fetch_assoc();

    $q_unit_user = "SELECT unit_users.name as unit_name FROM 
    (SELECT unit_users.*,units.name FROM unit_users INNER JOIN units ON unit_users.unit_id = units.id)unit_users 
    GROUP BY unit_name";
    $result_unit_user = $conn->query($q_unit_user);
    $unit_user = $result_unit_user->fetch_assoc();
    
    ?>
    <div class="container">
        <div class="row">
            <?php foreach([1,2,3,4,5] as $item): ?>
            <div class="col-md-4">
                <div class="card mt-4">
                    <img class="card-img-top" src="holder.js/100x180/" alt="">
                    <div class="card-body">
                        <h4 class="card-title">Title</h4>
                        <p class="card-text">Text</p>
                    </div>
                </div>
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
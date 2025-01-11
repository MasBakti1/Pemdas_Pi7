<?php
header('Content-Type: application/json');

$servername = "sql102.infinityfree.com";
$username = "if0_38078900";
$password = "2hPbXe2yDoj";
$dbname = "if0_38078900_ff_pemweb";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$sql = "SELECT * FROM pemdas";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = [];
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}

$conn->close();
?>
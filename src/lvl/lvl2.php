<?php
header("Content-type: application/json");

require '../model/GetData.php';
$data = new GetData('question_stat');
$data->connection = new DbConnect();
$contents = $data->getContents(2);
$contents = json_encode($contents);
echo $contents;
<?php
header("Content-type: application/json");

require 'GetData.php';
$data = new GetData('question_stat');
$data->connection = new DbConnect();
$contents = $data->getContents();
$contents = json_encode($contents);
echo $contents;
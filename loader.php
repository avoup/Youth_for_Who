<?php
//error_reporting(0);
session_start();
include_once('php/database/mysql.php');
include_once('php/database/connect.php');

if(!isset($_REQUEST['a'])) {
	json_encode(array('success' => false, 'error' => 'fatal error! code: 0'));
	die;
}

$a = explode('.', $_REQUEST['a']);
$class; $method; $file = $a[0];
if(isset($a[1])) {
	$class = $a[1].'Controller';
	$method = $a[2];
}

include('php/controllers/'.$file.'.php');
if(isset($class)) {
	$class = new $class();
	$response = $class->$method();
	echo json_encode($response);

	unset($response);
	unset($class);
	unset($method);
}

unset($file);
?>
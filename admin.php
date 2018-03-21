<?php
error_reporting(E_ALL);
session_start();
include('php/database/mysql.php');
include_once('php/database/connect.php');
require_once('php/controllers/UserController.php');
include_once('php/session.php');

$userControler = new userController();

if (isset($_REQUEST['register'])) {
    $userControler->register();
} else if (isset($_REQUEST['logout'])) {
    $userControler->logout();
} else {
    $userControler->login();
}

if(!isset($_SESSION['id11'])) {
    include('views/login.html');
    exit;
}

if (!isset($_REQUEST['view']) || $_REQUEST['view'] == 'starter') {
    include('views/AdminLTE-2.4.3/starter.html');
    exit;
}

$view = 'views/AdminLTE-2.4.3/pages/custom/';
$view .= isset($_REQUEST['view']) ? $_REQUEST['view'] : 'add';
$view .= '.html';
include($view);
?>

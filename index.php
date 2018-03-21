<?php

error_reporting(E_ALL);
session_start();
include('php/database/mysql.php');
include_once('php/database/connect.php');
require_once('php/controllers/UserController.php');
include_once('php/session.php');

//$array['7ae01c752491d404476865e4e8f0a369'] = 'a';
//unset($_COOKIE['f91c0a0e197da5f89a3fe820c0bf01edcc1990696c42a3e66878f0b37ad0f11d']);
//echo $array['7ae01c752491d404476865e4e8f0a369']; die;
$userControler = new userController();


if (isset($_REQUEST['register'])) {
    $userControler->register();
} else if (isset($_REQUEST['logout'])) {
    $userControler->logout();
} else {
    $userControler->login();
}
// session_destroy();

if (isset($_REQUEST['adminpage'])) {
    include('views/AdminLTE-2.4.3/starter.html');
} else if (isset($_REQUEST['add'])) {
    include('views/AdminLTE-2.4.3/pages/custom/add.html');
} else if (isset($_REQUEST['edit'])) {
    include('views/AdminLTE-2.4.3/pages/custom/edit.html');
} else if (isset($_REQUEST['logs'])) {
    include('views/AdminLTE-2.4.3/pages/custom/logs.html');
} else {
    $view = 'views/';
    $view .= isset($_REQUEST['view']) ? $_REQUEST['view'] : 'index';
    $view .= '.html';
    include($view);
}
/*
  if(isset($_REQUEST['adminpage'])) {
  include('views/AdminLTE-2.4.3/starter.html');
  } else if(isset($_REQUEST['register'])) {
  include('views/register.html');
  } else if(isset($_REQUEST['login'])) {
  include('views/login.html');
  } elseinclude('views/index.html'); */
?>

<?php

class MenuModel {
	private $sql;

	function __construct() {
		$this->sql = new sql();
	}

	function getMenuItems() {
		$query = "select id, name, hover from main_menu where active = 1";

		$db = $this->sql;

		$response = $db->execQuery($query);

		return $response;
	}

	function changeItemVisibility($active, $id) {
		$db = $this->sql;
		$uParams = array(0 => 'active');
		$uValues = array(0 => array('active' => $active));
		$wParams = array(0 => 'id');
		$wValues = array(0 => array('id' => $id));

		$db->update($uParams, $uValues, $wParams, $wValues, 'main_menu');
	}
}


?>
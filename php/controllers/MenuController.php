<?php
include('php/models/MenuModel.php');
include('php/library/functions.php');

class MenuController {

	function __construct() {
	}

	function getMenuItems() {
		$model = new MenuModel();
		$response = $model->getMenuItems();

		return $response;
	}

	function changeItemVisibility() {
		$active = isset($_REQUEST['visibility']) ? $_REQUEST['visibility'] : 0;
		
		if(!isset($_REQUEST['item'])) {
			$response = array('success' => false, 'error' => 'item not set');
			return $response;
		}

		$model = new MenuModel();
		$response = $model->changeItemVisibility($active, $_REQUEST['item']);

		$response = array('success' => true, 'response' => 'saved successfully');
		return $response;	
	}
}

?>
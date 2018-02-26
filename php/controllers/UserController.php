<?php
//session_start();
include('php/models/UserModel.php');
include('php/library/functions.php');

class UserController {

	function __construct() {
	}

	function login() {
		$response = array();
		if(!isset($_REQUEST['username']) || !isset($_REQUEST['password'])) {
			$response = array('success' => false, 'response' => 'wrong username/password');
		} else {
			$userModel = new UserModel();
			$response = $userModel->getLoginInfo($_REQUEST['username'], $_REQUEST['password']);
			if($response['success']) {
                            //print_r($response); die;
				$_SESSION['id11'] = $response['response']['username'];
				$_SESSION['role'] = $response['response']['role'];

				if(isset($_REQUEST['stayloggedin']) && $_REQUEST['stayloggedin'] == 'on') {
					$this->logSession($_REQUEST['username']);
				}
			}
		}

		return $response;
	}

	function register() {
		$response = array('success' => true, 'response' => 'Invalid data');
		$detailed_error = array('username' => '0', 'password' => '0', 'email' => '0', 'repeated_password' => '0');
		$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
		$repeated_password = isset($_REQUEST['repeated_password']) ? $_REQUEST['repeated_password'] : '';
		$model = new UserModel();
		$nameCheck = $this->checkUserName();
		$mailCheck = $this->checkEMail();

		/*if(empty($_REQUEST['username']) || empty($_REQUEST['password']) || empty($_REQUEST['email'])) {
			$respose = array('success' => false, 'response' => 'invalid data');
			return $response;
		}*/
		if(!$nameCheck['success']) {
			$detailed_error['username'] = $nameCheck['response'];
			$response['success'] = false;
		}

		if(!$mailCheck['success']) {
			$detailed_error['email'] = $mailCheck['response'];
			$response['success'] = false;
		}
		if(strlen($password) < 4 || strlen($password) > 20) {
			$detailed_error['password'] = 'password length should be between 4-20';
			$response['success'] = false;
		}

		if($password != $repeated_password) {
			$detailed_error['repeated_password'] = 'Passwords don\'t match';
			$response['success'] = false;
		}

		$response['errors'] = $detailed_error;

		if($response['success']) {
			$userInfo = array('username'=>$_REQUEST['username'],
						'password'=>$_REQUEST['password'],
						'email'=>$_REQUEST['email'],
						'cityid'=>$_REQUEST['cityid'],
						'salt'=>rand(1000,9999));
			$userInfo['password'] = hash("sha256", $userInfo['password'].$userInfo['salt']);
			$response = $model->register($userInfo);
		}
		return $response;
	}

	function logout() {
		$model = new UserModel();
		$name = hash("sha256", $_SERVER['REMOTE_ADDR'].'GL Bros');

		if(isset($_COOKIE[$name])) {
			$array = explode('&&', $_COOKIE[$name]);
			$model->destroyCookies($array[0], $array[1]);
			unset($_COOKIE[$name]);
			setcookie($name, '', time()-3600);
		}

		if(isset($_SESSION['id11'])) unset($_SESSION['id11']);
		if(isset($_SESSION['role'])) unset($_SESSION['role']);
		session_destroy();
	}

	private function logSession($username) {
		$model = new UserModel();

		$model->logSession($username);
	}

	public function checkUserName() {
		$response = array('success' => false, 'response' => 'invalid username');
		
		if(isset($_REQUEST['username']) && !empty($_REQUEST['username'])) {
			$name = test_input($_REQUEST["username"]);
		    if (!preg_match("/^[a-zA-Z0-9]*$/",$name)) {
		    	return $response;
		    }

			$model = new UserModel();
			$response = $model->checkUserName($_REQUEST['username']);
		}

		return $response;
	}

	public function checkEMail() {
		$response = array('success' => false, 'response' => 'invalid email');
		
		if(isset($_REQUEST['email'])  && !empty($_REQUEST['email'])) {
			$email = test_input($_REQUEST["email"]);
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			  return $response;
			}

			$model = new UserModel();
			$response = $model->checkEMail($_REQUEST['email']);
		}

		return $response;
	}
}


?>
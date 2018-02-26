<?php
//session_start();

class UserModel {
	private $sql;

	function __construct() {
		$this->sql = new sql();
	}

	function getLoginInfo($username, $password) {
		$salt = 0;
		$response = array();
		$db = ($this->sql);

		$query = "select salt from users where username = :uname";
		$params = array(0 => array('name' => ':uname', 'value' => $username, 'type' => PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 'size' => 45));
		$salt = $db->execStatement($query, $params);
                
		$salt = $salt[0]['salt'];
		$password = hash("sha256", $password.$salt);

		$query = "select t.id, t.username, r.name role, t.email from users t, roles r where roleid = r.id
    						and username = :uname and password = :pwd";
		$params = array(0 => array('name' => ':uname', 'value' => $username, 'type' => PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 'size' => 45),
			1 => array('name' => ':pwd', 'value' => $password, 'type' => PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 'size' => 45));
		$row = $db->execCursor($query, $params);
                //print_r($row); die;
                //echo $password; die;
		if(isset($row['cursor']['id']))
			$response = array('success' => true, 'response' => $row['cursor']);
		else $response = array('success' => false, 'response' => 'wrong id/password');
                
		return $response;
	}

	function register($userInfo) {
		$params = array_keys($userInfo);
		$values = array(0 => $userInfo);
		$db = ($this->sql);
		try{
			$db->insert($params, $values, 'users');
		} catch(PDOException $ex) {
			return array('success' => false, 'response' => 'can\'t retgister the user');
		}

		return array('success' => true, 'response' => 'registered successfully');
	}

	function logSession($username) {
		$db = ($this->sql);
		$name = hash("sha256", $_SERVER['REMOTE_ADDR'].'GL Bros');
		if(isset($_COOKIES[$name])) unset($_COOKIES[$name]);

		$time = time();
		$query = "select date_add(CURRENT_TIMESTAMP, INTERVAL 30 DAY) as date";
		$date = $db->execQuery($query);
		$query = "select password from users where username = '".$username ."'";
		$pwd = $db->execQuery($query);

		$sid = hash('sha256', $pwd[0]['password'].$time);
		$query = "delete from sessions where username = '".$username ."' 
				and session_id = '". $sid ."'";
		$db->execQuery($query, -1);

		if(isset($_COOKIES[$name])) 
			unset($_COOKIES[$name]);
		setcookie($name, $username.'&&'.$sid, $time+3600*24*30);
		$params = array('session_id', 'username', 'createtime', 'auto_login', 'expiry_date');
		$values = array( 0=> array('session_id' => $sid, 'username' => $username, 'createtime' => $time, 'auto_login' => 1, 'expiry_date' => $date[0]['date']));
		$db->insert($params, $values, "sessions");
	}

	function destroyCookies($username, $sid) {
		$db = ($this->sql);
		$query = "delete from sessions where username = '".$username ."' 
				and session_id = '". $sid ."'";
		$db->execQuery($query, -1);
	}

	function checkUserName($username) {
		$db = ($this->sql);
		$query = "select exists(select 1 from users where username = '".$username."') as check_name";
		$data = $db->execQuery($query, PDO::FETCH_ASSOC);
		$response['success'] = $data[0]['check_name'] == 1 ? false : true;
		$response['response'] =  !$response['success'] ? 'User already exists' : 'username available';

		return $response;
	}

	function checkEMail($email) {
		$db = ($this->sql);
		$query = "select exists(select 1 from users where email = '".$email."') as check_mail";
		$data = $db->execQuery($query, PDO::FETCH_ASSOC);
		$response['success'] = $data[0]['check_mail'] == 1 ? false : true;
		$response['response'] =  !$response['success'] ? 'email already exists' : 'email available';

		return $response;
	}
}

?>

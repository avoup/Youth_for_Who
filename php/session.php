<?php
if(!isset($_SESSION['id11'])) {
	$name = hash("sha256", $_SERVER['REMOTE_ADDR'].'GL Bros');
	//$name .= '&&asdasdasdasdas';
	if(isset($_COOKIE[$name])) {
		$array = explode('&&', $_COOKIE[$name]);
		$sql = new sql();

		$query = "select u.username, u.password, r.name role, s.session_id, s.createtime from users u, sessions s, roles r
				   where u.username = s.username
  					 and u.roleid = r.id
  					 and CURRENT_TIMESTAMP <= s.expiry_date
  					 and s.auto_login = 1
  					 and u.username = :username
  					 and s.session_id = :session_id";

		$params = array(0 => array('name' => ':username', 'value' => $array[0], 'type' => PDO::PARAM_STR, 'size' => 45),
				1 => array('name' => ':session_id', 'value' => $array[1], 'type' => PDO::PARAM_STR, 'size' => 100));
		$userInfo = $sql->execCursor($query, $params);

		//print_r($userInfo);
		//die;
		if(isset($userInfo['cursor'][0]['password'])) {
			$sid = hash('sha256', $userInfo['cursor'][0]['password'].$userInfo['cursor'][0]['createtime']);
			
			if($sid == $userInfo['cursor'][0]['session_id']) {
				$_SESSION['id11'] = $userInfo['cursor'][0]['username'];
				$_SESSION['role'] = $userInfo['cursor'][0]['role'];
			}
		}
	}
}

?>
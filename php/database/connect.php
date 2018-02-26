<?php
//include('php/database/mysql.php');

class sql {
	public $connection;

	function __construct() {
		try {
			$this->connection = new PDO(connection_string, dbuser, password);
			$db = ($this->connection);
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch(Exception $e) {
			die('fatal error! (code: 1)');
		}
	}

	function execQuery($query, $option = PDO::FETCH_ASSOC /*-1 => fetchable object*/) {
		$db = ($this->connection);
		$query = $db->query($query);
		if(!$query) {
			throw new Exception('error! (code: 2)');
			return;
		}

		if($option > 1 && $option < 5)
			// PDO::FETCH_ASSOC(2) | PDO::FETCH_NUM(3) | PDO::FETCH_BOTH(4)
			return $query->fetchAll($option);

		return $query;
		/*} catch(Exception $e) {
			//print_r(($this->connection)->errorInfo());
			return json_encode(array('success' => false, 'error' => $e->getMessage()));
		}*/
	}

	function execNonQuery($query) {
		$db = ($this->connection);
		$query = $db->query($query);
		if(!$query) {
			throw new Exception('error! (code: 2)');
			return;
		}

		$query->execute();
	}

	function array2params($params) {
		// You might need to add this function with [] => [name], [size], [type] - like params structure in the future, but... not now ya know (the same goes for bindValues)
		$paramsStr = "";
		for($i = 0; $i < sizeof($params) - 1; $i++) {
			$paramsStr .= ":".$params[$i].",";
		}

		return $paramsStr . ":".$params[sizeof($params)-1];
	}

	function array2fields($params) {
		// You might need to add this function with [] => [name], [size], [type] - like params structure in the future, but... not now ya know (the same goes for bindValues)
		$paramsStr = "";
		for($i = 0; $i < sizeof($params) - 1; $i++) {
			$paramsStr .= $params[$i].",";
		}

		return $paramsStr . $params[sizeof($params)-1];
	}

	function bindValues($statement, $params, $values) {
		// You might need to add this function with [] => [name], [size], [type] - like params structure in the future, but... not now ya know (the same goes for array2params)

		foreach($params as $param) {
			//echo $param.'<br>';
			$statement->bindValue(':'.$param, $values[$param]);
		}
	}

	function insert($params, $values, $table) {
		$db = ($this->connection);
		// or mb just $values and get parameter names as  keys to $values?
		$query = "insert into ". $table ." (".$this->array2fields($params) .") values (".$this->array2params($params).")";
		//echo $query;
		$statement = $db->prepare($query);

		foreach($values as $v) {
			$this->bindValues($statement, $params, $v);
			$statement->execute();
		}

		$statement->closeCursor();
	}

	function update($uParams, $uValues, $wParams, $wValues, $table) {
		$db = ($this->connection);
		// or mb just $values and get parameter names as  keys to $values?
		$query = "update ". $table . " set ";

		for($i = 0; $i < sizeof($uParams) - 1; $i++) {
			$query .= $uParams[$i]." = :".$uParams[$i].",";
		}
		$query .= $uParams[sizeof($uParams) - 1]." = :".$uParams[sizeof($uParams) - 1] ." where ";

		for($i = 0; $i < sizeof($wParams) - 1; $i++) {
			$query .= $wParams[$i]." = :".$wParams[$i].",";
		}
		$query .= $wParams[sizeof($wParams) - 1]." = :".$wParams[sizeof($wParams) - 1];

		$statement = $db->prepare($query);
		//echo '<pre>'; echo $query; die;

		foreach($uValues as $v)
			$this->bindValues($statement, $uParams, $v);

		foreach($wValues as $v) {
			$this->bindValues($statement, $wParams, $v);
			$statement->execute();
		}

		$statement->closeCursor();
	}

	function delete($params, $values, $table) {
		$db = ($this->connection);
		// or mb just $values and get parameter names as  keys to $values?
		$query = "delete from ". $table ." where ";
		for($i = 0; $i < sizeof($params) - 1; $i++) {
			$query .= $params[$i]." = :".$params[$i].",";
		}
		$query .= $params[sizeof($params) - 1]." = :".$params[sizeof($params) - 1];
		//echo $query;
		$statement = $db->prepare($query);

		foreach($values as $v) {
			$this->bindValues($statement, $params, $v);
			$statement->execute();
		}

		$statement->closeCursor();
	}

	public function execStatement($query, $params = array(), $option = PDO::FETCH_ASSOC) {
		$db = ($this->connection);
		$statement = $db->prepare($query);
		foreach($params as $param)
			$statement->bindParam($param['name'], $param['value'], $param['type'], $param['size']);

		$statement->execute();
		$out = array();
		if($option > 1 && $option < 5)
			$out = $statement->fetchAll($option);
		$statement->closeCursor();
		return $out;
	}

	function execCursor($query, $params = array(), $option = PDO::FETCH_ASSOC) {
		$db = ($this->connection);
		$statement = $db->prepare($query);
		foreach($params as $param) {
			$statement->bindParam($param['name'], $param['value'], $param['type'], $param['size']);
		}

		$statement->execute();
		$row['cursor'] = $statement->fetchAll($option);
		if(isset($row['cursor'][0]))
			$row['cursor'] = $row['cursor'][0];

		return $row;
	}
}


?>

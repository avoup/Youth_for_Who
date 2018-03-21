<?php

class ProjectModel {

    private $sql;

    public function __construct() {
        $this->sql = new sql();
    }

    public function getProjectsList($status, $page, $num) {
        $db = ($this->sql);
        $response = array();
        $startNum = ($page - 1) * $num + 1;
        $finishNum = $page * $num;

        $query = "select proj.id,
                         proj.name,
                         proj.description,
                         proj.donated_amount,
                         full_amount-current_amount as in_need,
                         a.href img
                    from (SELECT t.*,
			         @rownum := @rownum + 1 as rank
                            FROM company.projects t,
                         (select @rownum := 0) r
                   where t.status = :status) proj,
                         project_attachments a
                   where proj.rank between :start and :finish
                     and a.id = proj.main_img";

        $params = array(0 => array('name' => ':status', 'value' => $status, 'type' => PDO::PARAM_INPUT_OUTPUT, 'size' => -1),
            1 => array('name' => ':start', 'value' => $startNum, 'type' => PDO::PARAM_INPUT_OUTPUT, 'size' => -1),
            2 => array('name' => ':finish', 'value' => $finishNum, 'type' => PDO::PARAM_INPUT_OUTPUT, 'size' => -1));

        $row = $db->execCursor($query, $params);

        if (isset($row['cursor'][0]['id'])) {
            $query = "select count(id) cnt from projects where status = ".$status;
            $data = $db->execQuery($query);
            $response = array('success' => true, 'response' => $row['cursor'], 'cnt' => ceil($data[0]['cnt']/$num));
        } else
            $response = array('success' => false, 'response' => 'no projects to view');

        return $response;
    }

    public function getProjectById($id) {
        $db = ($this->sql);
        $response = array();

        $query = "select proj.id,
	   proj.name,
       proj.full_desc,
       proj.description,
       proj.age,
       proj.location,
       diagnoses,
       needs,
       full_amount,
       current_amount,
       proj.donated_amount,
       full_amount-current_amount as in_need,
       a.id cover_img_id,
       a.href cover_img
  FROM company.projects proj,
       company.project_attachments a
 where proj.id = :id
   and proj.main_img = a.id";

        $params = array(0 => array('name' => ':id', 'value' => $id, 'type' => PDO::PARAM_INPUT_OUTPUT, 'size' => -1));

        $row = $db->execCursor($query, $params);

        if (isset($row['cursor'][0]['id'])) {
            $response = array('success' => true, 'response' => $row['cursor'][0]);
            $response['response']['files'] = $this->getAttachments($id, 1); 
            $response['response']['main_imgs'] = $this->getAttachments($id, 2);
        } else
            $response = array('success' => false, 'response' => 'no projects to view');

        return $response;
    }

    function getAttachments($id, $type) {
        $db = ($this->sql);
        $response = array();

        $query = "select id attach_id,
                         href
                    FROM company.project_attachments a
                   where a.project_id = :id
                     and a.type = $type";

        $params = array(0 => array('name' => ':id', 'value' => $id, 'type' => PDO::PARAM_INPUT_OUTPUT, 'size' => -1));

        $response = $db->execCursor($query, $params);

        return $response['cursor'];
    }

    public function logFiles($id, $type, $location) {
        $query = "insert into project_attachments (project_id,type,href) "
                . " values (" . $id . ",'" . $type . "','$location')";

        $db = ($this->sql);
        $db->execNonQuery($query);
    }
    
    public function updateFiles($id, $type, $location) {
        $query = "update project_attachments set href = '$location', type = $type "
                . " where id = $id";

        $db = ($this->sql);
        $db->execNonQuery($query);
    }

    public function createProject() {
        $db = ($this->sql);
        $ids = array();

        $query = "insert into projects () values ()";
        $db->execNonQuery($query);

        $query = "select max(id) id from projects";
        $data = $db->execQuery($query);
        $ids['project_id'] = $data[0]['id'];

        $query = "insert into project_attachments (href,project_id,type) values (''," . $ids['project_id'] . ",2)";
        $db->execNonQuery($query);

        $query = "select max(id) id from project_attachments";
        $data = $db->execQuery($query);
        $ids['img_id_main'] = $data[0]['id'];
        
        $query = "insert into project_attachments (href,project_id,type) values (''," . $ids['project_id'] . ",3)";
        $db->execNonQuery($query);

        $query = "select max(id) id from project_attachments";
        $data = $db->execQuery($query);
        $ids['img_id'] = $data[0]['id'];

        return $ids;
    }

    public function updateProject($id, $name, $desc, $fullDesc, $age, $location, $diagnoses, $needs, $fullAmount, $currentAmount, $donatedAmount, $status, $mainImg) {
        $db = $this->sql;
        $uParams = array(0 => 'name', 1 => 'description', 2 => 'full_desc', 3 => 'age', 4 => 'location', 5 => 'diagnoses', 6 => 'needs', 7 => 'full_amount',
            8 => 'current_amount', 9 => 'donated_amount', 10 => 'status', 11 => 'main_img');
        $uValues = array(0 => array('name' => $name, 'description' => $desc, 'full_desc' => $fullDesc, 'age' => $age, 'location' => $location, 'diagnoses' => $diagnoses, 'needs' => $needs,
                'full_amount' => $fullAmount, 'current_amount' => $currentAmount, 'donated_amount' => $donatedAmount, 'status' => $status, 'main_img' => $mainImg));
        $wParams = array(0 => 'id');
        $wValues = array(0 => array('id' => $id));

        $db->update($uParams, $uValues, $wParams, $wValues, 'projects');
    }

    public function logDonation($donation) {
        $params = array_keys($donation);
        $values = array(0 => $donation);
        $db = ($this->sql);
        try {
            $db->insert($params, $values, 'log');
        } catch (PDOException $ex) {
            return array('success' => false, 'response' => 'can\'t log the donation');
        }

        $query = "select max(id) id from log";
        $data = $db->execQuery($query);
        $logId = $data[0]['id'];

        $query = "update log set create_date = now() where id = " . $logId;
        $db->execNonQuery($query);

        return array('success' => true, 'response' => 'registered successfully');
    }

    public function deleteProject($id) {
        $db = ($this->sql);
        $query = "delete from projects where id = " . $id;
        $db->execNonQuery($query);
    }

}

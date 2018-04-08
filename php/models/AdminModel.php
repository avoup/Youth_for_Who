<?php

class AdminModel {
    
    private $sql;

    public function __construct() {
        $this->sql = new sql();
    }

    public function addTeamMember($memberInfo) {
        $params = array_keys($memberInfo);
        $values = array(0 => $memberInfo);
        $db = ($this->sql);
        try {
            $db->insert($params, $values, 'team_members');
        } catch (PDOException $ex) {
            return array('success' => false, 'response' => 'can\'t retgister the user');
        }

        return array('success' => true, 'response' => 'registered successfully');
    }

    public function deleteTeamMember($id) {
        $db = ($this->sql);
        
        $params = array(0 => 'id');
        $values = array(0 => array('id' => $id));
        
        $db->delete($params, $values, 'team_members');
    }

    public function updateTeamMember() {
        
    }
    
    public function getTeamMembers() {
        $db = ($this->sql);
        $response  = array('success' => true, 'response' => array());
        
        $query = "select * from team_members";
        $response['response'] = $db->execQuery($query);
        
        return $response;
    }

}

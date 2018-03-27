<?php

include('php/models/AdminModel.php');
include('php/library/functions.php');

class AdminController {

    public function __construct() {
        
    }

    public function addTeamMember() {
        $response = array('success' => true, 'error' => '');
        
        $imgPath = uploadFile("members");
        if($imgPath == -1) {
            $response['success'] = false;
            $response['error'] = 'failed to upload an image file';
            return $response;
        }/**/
        
        $memberInfo = array('name' => get_request('name'),
            'status' => get_request('status'),
            'description' => get_request('desc'),
            'fb_link' => get_request('fb_link'),
            'img' => $imgPath);
        
        $model = new AdminModel();
        $model->addTeamMember($memberInfo);
        
        return $response;
    }

    public function deleteTeamMember() {
        $id = get_request('id', 'number');
        
        $model = new AdminModel();
        $model ->deleteTeamMember($id);
        
        $response = array('success' => true, 'error' => '');
        return $response;
    }

}

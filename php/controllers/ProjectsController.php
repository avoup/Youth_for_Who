<?php

include('php/models/ProjectsModel.php');
include('php/library/functions.php');

class ProjectsController {

    public function __construct() {

    }

    public function getProjectsList() {
        $status = isset($_REQUEST['status']) ? $_REQUEST['status'] : 1;
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $perPageNum = isset($_REQUEST['num']) ? $_REQUEST['num'] : 6;

        $model = new ProjectModel();
        $projectsList = array();
        $projectsList = $model->getProjectsList($status, $page, $perPageNum);

        return $projectsList;
    }

    public function getProjectById() {
        $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : -1;

        $model = new ProjectModel();
        $project = array();
        $project = $model->getProjectById($id);

        return $project;
    }

    public function getAttachments() {
        $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : -1;

        $model = new ProjectModel();
        $attachment = array();
        $attachment = $model->getAttachments($id);

        return $attachment;
    }

    public function uploadFile($key, $id, $type, $project_id) {
        $response = array('success' => true, 'file' => '', 'error' => '');
        if($_FILES[$key]['error'] > 0) {
            $response['error'] = 'failed to upload file';
            return $response;
        }
        ini_set('display_errors', 1);
        $target_dir = ("attachment/uploads/" . $project_id . "/");
        $file = rand();
        $imageFileType = pathinfo($_FILES[$key]["name"], PATHINFO_EXTENSION);

        $target_file = $target_dir . basename($file . '.' . $imageFileType);
        move_uploaded_file($_FILES[$key]["tmp_name"], $target_file);
        $response['success'] = true;

        $model = new ProjectModel();
        /* if($type == 2)
          $model->logFiles($id, $type, basename($file . '.' . $imageFileType));
          else */ $model->updateFiles($id, $type, $target_file);

        return $response;
    }

    public function createProject() {
        $response = array('success' => true);

        $name = get_request('name');
        $desc = get_request('desc');
        $fullDesc = get_request('full_desc');
        $age = get_request('age', 'number');
        $location = get_request('loc');
        $diagnoses = get_request('diag');
        $needs = get_request('needs');
        $fullAmount = get_request('f_amount', 'number');
        $currentAmount = get_request('c_amount', 'number');
        $donatedAmount = get_request('d_amount', 'number');
        $status = get_request('status', 'number');
        $link = get_request('link');

        $model = new ProjectModel();
        $ids = $model->createProject();
        $model->insertProject($ids['project_id'], $name, $desc, $fullDesc, $age, $location, $diagnoses, $needs, $fullAmount, $currentAmount, $donatedAmount, $status, $link, $ids['img_id']);
//return($_FILES);
        mkdir("attachment/uploads/" . $ids['project_id'] . "/", 0700);

        if (isset($_FILES['imgInput']))
            $response = $this->uploadFile('imgInput', $ids['img_id'], 3, $ids['project_id']);
        if (isset($_FILES['imgInput_main']))
            $response = $this->uploadFile('imgInput_main', $ids['img_id_main'], 2, $ids['project_id']);

        return $response;
    }

    public function updateProject() {
        $response = array('success' => true);

        $id = get_request('project_id', 'number');
        $name = get_request('name');
        $desc = get_request('desc');
        $fullDesc = get_request('full_desc');
        $age = get_request('age', 'number');
        $location = get_request('loc');
        $diagnoses = get_request('diag');
        $needs = get_request('needs');
        $fullAmount = get_request('f_amount', 'number');
        $currentAmount = get_request('c_amount', 'number');
        $donatedAmount = get_request('d_amount', 'number');
        $status = get_request('status', 'number');
        $img_cover = get_request('cover_img_id', 'number');
        $img_main = get_request('main_img_id', 'number');
        $link = get_request('link');

        $model = new ProjectModel();
        $model->updateProject($id, $name, $desc, $fullDesc, $age, $location, $diagnoses, $needs, $fullAmount, $currentAmount, $donatedAmount, $status, $link);

        if (isset($_FILES['imgInput']))
            $this->uploadFile('imgInput', $img_cover, 3, $id);
        if (isset($_FILES['imgInput_main']))
            $this->uploadFile('imgInput_main', $img_main, 2, $id);

        return $response;
    }

    public function logDonation() {
        $donation = array('project_id' => get_request('project_id', 'number'),
            'name' => get_request('name'),
            'phone' => get_request('phone'),
            'amount' => get_request('amount', 'number'));

        $model = new ProjectModel();
        $model->logDonation($donation);

        $response = array('success' => true);

        return $response;
    }
    
    public function getDonationlogs() {
        $startDate = get_request('start_date');
        $endDate = get_request('end_date');
        $amount = get_request('amount', 'number', -1);
        
        $model = new ProjectModel();
        $logs = array();
        $logs = $model->getDonationLogs($startDate,$endDate,$amount);

        return $logs;
    }

    public function deleteProject() {
        $id = get_request('project_id', 'number');
        $model = new ProjectModel();
        $model->deleteProject($id);

        $response = array('success' => true);

        return $response;
    }

}

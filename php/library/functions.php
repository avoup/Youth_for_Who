<?php

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function get_request($name, $type = 'str', $dfv = '') {
    $value;

    switch ($type) {
        case 'number':
            if ($dfv == '')
                $dfv = 0;
            $value = isset($_REQUEST[$name]) ? $_REQUEST[$name] : $dfv;
            break;
        default:
            $value = isset($_REQUEST[$name]) ? $_REQUEST[$name] : $dfv;
    }

    return $value;
}

function uploadFile($path) {
    if ($_FILES['imgInput']['error'] > 0) {
        return -1;
    }
    ini_set('display_errors', 1);
    $target_dir = ("attachment/uploads/" . $path . "/");
    $file = rand();
    $imageFileType = pathinfo($_FILES['imgInput']["name"], PATHINFO_EXTENSION);

    $target_file = $target_dir . basename($file . '.' . $imageFileType);
    move_uploaded_file($_FILES['imgInput']["tmp_name"], $target_file);

    return $target_file;
}

?>
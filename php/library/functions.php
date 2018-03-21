<?php
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function get_request($name,$type = 'str', $dfv = '') {
    $value;
    
    switch($type) {
        case 'number': 
            if($dfv == '')
                $dfv = 0;
            $value = isset($_REQUEST[$name]) ? $_REQUEST[$name] : $dfv;
            break;
        default:
            $value = isset($_REQUEST[$name]) ? $_REQUEST[$name] : $dfv;
    }
    
    return $value;
}

?>
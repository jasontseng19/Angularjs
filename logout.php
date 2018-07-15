<?php
session_start();
session_destroy();
session_commit();
header("location:index.php");
?>
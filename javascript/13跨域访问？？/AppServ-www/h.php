<?php header("content-type:text/html;charset='utf-8'");

	$arr=array("001"=>90,"003"=>100,"010"=>99);
	if($_GET["cb"]){
		$op=$_GET["cb"];
	}else{
		$op="fun";
	}
	if($_GET["xh"]){
		$xh=$_GET["xh"];
	}else{
		$xh="001";
	}
	echo "$op(".$arr[$xh].")";	//.字符串的连接符
?>
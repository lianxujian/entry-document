<?php header("content-type:text/html;charset='utf-8'");

	$arr1=array("001"=>90,"003"=>100,"010"=>99);//js1
	$arr2=array("001"=>91,"003"=>87,"010"=>66); //js2
	$arr3=array("001"=>55,"003"=>77,"010"=>79); //js3
	if($_GET["cb"]){	///$_GET
		$op=$_GET["cb"];
	}else{
		$op="fun";
	}
	if($_GET["kc"]){
		$kc=$_GET["kc"];
		if($kc=="js1"){
			$kc=json_encode($arr1);
		}else if($kc=="js2"){
			$kc=json_encode($arr2);
		}else if($kc=="js3"){
			$kc=json_encode($arr3);
		}
	}else{
		$kc=json_encode($arr1);
	}
	echo "$op(".$kc.")";	//.字符串的连接符
?>
<?php
//获取某目录下所有文件、目录名（不包括子目录下文件、目录名）
//获取某目录下所有文件、目录名（不包括子目录下文件、目录名）

$dir="./";
$files=[];
$handler = opendir($dir);
while (($filename = readdir($handler)) !== false) {//务必使用!==，防止目录下出现类似文件名“0”等情况
  if ($filename != "." && $filename != "..") {
      $files[] = $filename ;
      }
    }
closedir($handler);

$resultFile=fopen("index.js",'w') or die("Unable to open file!");
$fileList=[];
foreach ($files as $value) {
  $tmpFileInfo=explode(".", $value);
  //todo Format file name fllow js variable
  if($tmpFileInfo[1]=="png"||$tmpFileInfo[1]=="jpg"||$tmpFileInfo[1]=="png"||$tmpFileInfo[1]=="jpg"){
    $fileList[]=$tmpFileInfo[0];
    $fileListLength= count($fileList);
    $fileList=array_unique($fileList);
    if($fileListLength==count($fileList)){
      fwrite($resultFile,"import $tmpFileInfo[0] from './$value';");
    }
  }
}
fwrite($resultFile,"export {");

foreach ($fileList as $value) {
  fwrite($resultFile,"$value,");
}

fwrite($resultFile,"};");

fclose($resultFile);


 ?>

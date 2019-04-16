<?php
// this file generates the index.js file which imports all images from a given img folder

$dir="./";
$files=[];
$handler = opendir($dir);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != "..") {
      $files[] = $filename ;
      }
    }
closedir($handler);

$resultFile=fopen("index.js",'w') or die("Unable to open file!");
$fileList=[];
foreach ($files as $value) {
  $tmpFileInfo=explode(".", $value);
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

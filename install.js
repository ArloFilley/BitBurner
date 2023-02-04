/** @param {NS} ns */
export async function main(ns) {
    await ns.wget("https://raw.githubusercontent.com/arlofilley/bitburner/master/main.js", "main.js");
    await ns.wget("https://raw.githubusercontent.com/arlofilley/bitburner/master/lib.js", "lib.js");
    await ns.wget("https://raw.githubusercontent.com/arlofilley/bitburner/master/wipefiles.js", "wipefiles.js");
}
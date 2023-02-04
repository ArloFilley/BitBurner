/** @param {NS} ns */
export async function main(ns) {
    let url = "https://raw.githubusercontent.com/arlofilley/bitburner/master/";
    await ns.wget(`${url}wipefiles.js`, "/utilities/wipefiles.js");
    await ns.run("/utilities/wipefiles.js");

    await ns.wget(`${url}main.js`,  "main.js");
    await ns.wget(`${url}lib.js`,   "/lib/lib.js");
    await ns.wget(`${url}ui.js`,    "/lib/ui.js");
}
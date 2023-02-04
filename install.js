/** @param {NS} ns */
export async function main(ns) {
    await ns.wget("https://raw.githubusercontent.com/arlofilley/bitburner/master/main.js", "main.js");
}
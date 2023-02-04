import * as lib from "lib.js"

/** @param {NS} ns */
export async function main(ns) {
	let targets = await lib.readFile("nuketargets.txt", ns);

	let hackingLevel = await ns.getHackingLevel();
	let nuke = await ns.fileExists("NUKE.exe");
	let ssh  = await ns.fileExists("BruteSSH.exe");
	let ftp  = await ns.fileExists("FTPCrack.exe");
	let smtp = await ns.fileExists("relaySMTP.exe");
	let http = await ns.fileExists("HTTPWorm.exe");
	let sql  = await ns.fileExists("SQLInject.exe");

	targets.forEach( (target) => {
		if (! (hackingLevel >= ns.getServerRequiredHackingLevel(target))) {
			return;
		}
		
		let ports = ns.getServerNumPortsRequired(target)
		let currentports = ports

		if (!nuke) return;

		if (ssh)  ns.brutessh(target) ; currentports--;
		if (ftp)  ns.ftpcrack(target) ; currentports--;
		if (smtp) ns.relaysmtp(target); currentports--;
		if (http) ns.httpworm(target) ; currentports--;
		if (sql)  ns.sqlinject(target); currentports--;

		if(currentports<=0 && nuke) ns.nuke(target); ns.tprint("Nuked "+target);
	});
}
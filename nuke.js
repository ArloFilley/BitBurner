/** @param {NS} ns */
export async function main(ns) {
	let targets = JSON.parse(ns.read("nuketargets.txt"));

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

		if (!nuke) return;
		if (ssh)  ns.brutessh(target);
		if (ftp)  ns.ftpcrack(target);
		if (smtp) ns.relaysmtp(target);
		if (http) ns.httpworm(target);
		if (sql)  ns.sqlinject(target);
		ns.nuke(target);
	});
}

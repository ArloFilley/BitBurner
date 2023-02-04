import * as lib from "/lib/lib.js";

/** @param {NS} ns */
export async function main(ns) {
	const targets = await lib.readFile("hacktargets.txt", ns);
	const servers = await lib.readFile("hackservers.txt", ns);

	const hackRam = ns.getScriptRam("hack.js");
	const growRam = ns.getScriptRam("grow.js");
	const weakenRam = ns.getScriptRam("weaken.js");

	if (servers.length == 0) {
		await ns.run("hack.js",   5, "foodnstuff");
		await ns.run("grow.js",   5, "foodnstuff");
		await ns.run("weaken.js", 4, "foodnstuff");
	} else if (servers.length <= 3) {
		let i = targets.length - 2
		servers.forEach( (server) => {
			let target = targets[i];
			
			ns.exec("hack.js", server, 4, target);
			ns.exec("grow.js", server, 3, target);
			ns.exec("weaken.js", server, 2, target);
			i -= 1;
		});
	} else {
		for (let i = 0; i < Math.floor(servers.length / 3); i++) {
			let target = targets[i];
			let serverRam = [
				ns.getServerMaxRam(servers[i * 3 + 0]), 
				ns.getServerMaxRam(servers[i * 3 + 1]), 
				ns.getServerMaxRam(servers[i * 3 + 2])
			];
			let threads = [serverRam[0] / hackRam, serverRam[1] / growRam, serverRam[2] / weakenRam];

			ns.exec("hack.js", 	servers[i * 3 + 0], threads[0], target);
			ns.exec("grow.js", 	servers[i * 3 + 1], threads[1], target);
			ns.exec("weaken.js",  servers[i * 3 + 2], threads[2], target);
		}
	}
}

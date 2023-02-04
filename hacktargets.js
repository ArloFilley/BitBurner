/** @param {NS} ns */
export async function main(ns) {

	let servers = ns.getPurchasedServers();
	let targets = ns.scan()

	for (let i = 0; i < targets.length; i++) {
		ns.scan(targets[i]).forEach( (target) => {
			if (!targets.includes(target)) {
				targets.push(target);
			};
		});
	};

	targets = targets.filter( (target) => {
		return ns.hasRootAccess(target);
	});

	targets = targets.filter( (target) => {
		return ! (servers.includes(target));
	});

	targets = targets.sort( (a, b) => {
		if (ns.hackAnalyze(a) * ns.getServerMoneyAvailable(a) * ns.hackAnalyzeChance(a) < ns.hackAnalyze(b) * ns.getServerMoneyAvailable(b) * ns.hackAnalyzeChance(b)) {
			return 1;
		} else if (ns.hackAnalyze(a) * ns.getServerMoneyAvailable(a) * ns.hackAnalyzeChance(a) > ns.hackAnalyze(b) * ns.getServerMoneyAvailable(b) * ns.hackAnalyzeChance(b)) {
			return -1;
		}
		return 0;
	});

	targets.forEach( (target) => {
		servers.push(target);
	});

	servers = servers.sort( (a, b) => {
		if (ns.getServerMaxRam(a) < ns.getServerMaxRam(b)) {
			return 1;
		} else if (ns.getServerMaxRam(a) < ns.getServerMaxRam(b)) {
			return -1;
		}
		return 0;
	});

	servers = servers.filter( (server) => {
		return server !== "home";
	});

	await ns.rm("hacktargets.txt");
	await ns.write("hacktargets.txt", JSON.stringify(targets));
	await ns.rm("hackservers.txt");
	await ns.write("hackservers.txt", JSON.stringify(servers));
}

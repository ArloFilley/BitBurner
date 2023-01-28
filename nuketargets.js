/** @param {NS} ns */
export async function main(ns) {
	await ns.rm("nuketargets.txt");
	const servers = ns.getPurchasedServers();
	let targets = ns.scan()

	for (let i = 0; i < targets.length; i++) {
		ns.scan(targets[i]).forEach( (target) => {
			if (!targets.includes(target)) {
				targets.push(target);
			};
		});
	};

	ns.tprint(targets);

	targets = targets.filter( (target) => {
		return ! (ns.hasRootAccess(target));
	});

	ns.tprint(targets);

	targets = targets.filter( (target) => {
		return ! (servers.includes(target));
	});

	ns.tprint(targets);

	await ns.write("nuketargets.txt", JSON.stringify(targets));
}

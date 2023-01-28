/** @param {NS} ns */
export async function main(ns) {
	let servers = JSON.parse(ns.read("hackservers.txt"));

	for (let i = 0; i < servers.length; i++) {
		ns.killall(servers[i]);
	}
}
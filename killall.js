import * as lib from "/lib/lib.js";

/** @param {NS} ns */
export async function main(ns) {
	let servers = await lib.readFile("hackservers.txt");

	for (let i = 0; i < servers.length; i++) {
		ns.killall(servers[i]);
	}
}
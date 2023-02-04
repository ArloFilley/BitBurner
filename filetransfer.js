import * as lib from "/lib/lib.js"

/** @param {NS} ns */
export async function main(ns) {
	let servers = await lib.readFile("hackservers.txt");
	
	for (let i in servers) {
		let server = servers[i];
		
		if ( ! ns.fileExists("hack.js", server) ) {
			ns.scp("hack.js", server);
		}

		if ( ! ns.fileExists("weaken.js", server) )
			ns.scp("weaken.js", server);{
		}

		if ( ! ns.fileExists("grow.js", server) ) {
			ns.scp("grow.js", server);
		}
	}
}

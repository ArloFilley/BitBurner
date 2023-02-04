import * as lib from "/lib/lib.js";
import * as ui 	from "/lib/ui.js";

/** @param {NS} ns */
export async function main(ns) {
	let CONFIG;
	if (await ns.fileExists("config.txt") && await ns.prompt("Load Saved Configuration?")) {
		CONFIG = await lib.readFile("config.txt", ns);
	} else {
		// [OPTIONS]
		CONFIG = {
			files: [
				"nuketargets.js", "nuke.js", 
				"hacktargets.js", 
				"filetransfer.js", "hacks.js", 
				"buyservers.js", "killall.js", 
				"hack.js", "grow.js", "weaken.js",
			],

			refresh_time: parseInt(await ns.prompt(
				"Please Enter The amount of time to refresh in Minutes\nRecommended 15 mins", 
				{ type: "text"} 
			)),

			money_output: await ns.prompt(
				"What Output Would You Like To See From The Script?",{ 
					type: "select", 
					choices: ["$/M", "$/H"]
				}
			),

			hz: parseInt(await ns.prompt(
				"please Enter The Amount of time to update UI\nin ms\nRecommended: 100",
				{ type: "text" }
			)),

			verbose: await ns.prompt(
				"Run in verbose config?"
				
			),

			wget_url: "https://raw.githubusercontent.com/ArloFilley/BitBurner/master/",

			multiplier: 60,

			date: new Date(),
		}
	}

	if (await ns.fileExists("config.txt")) await ns.rm("config.txt");
	await ns.write("config.txt", JSON.stringify(CONFIG));

	if (CONFIG.money_output === "$/H") CONFIG.multiplier = 360;

	// [MAIN LOOP]
	let time;
	const start = Date.now();
	while (true) {
		await hackTargets(ns, CONFIG);
		time = 0;
		while (time < CONFIG.refresh_time * 60_000) {
			CONFIG.date = new Date();

			if (! CONFIG.verbose) ui.draw(ns);
			
			time += CONFIG.hz;
			await ns.sleep(CONFIG.hz);
		}
	}
}

async function hackTargets(ns, config) {
	// Finds all possible Nuke targets and attempts to nuke them
	const FILES = config.files;
	for (let i in FILES) {
		let file = FILES[i];
		await lib.getFile(file, config.wget_url, ns);
	}

	await ns.run("killall.js");
	ns.toast("Killed Running Processes");

	await ns.run("nuketargets.js");
	await ns.run("nuke.js");
	ns.toast("Nuked Servers");

	await ns.run("buyservers.js");
	ns.toast("Brought More Servers");

	await ns.run("hacktargets.js");
	await ns.run("filetransfer.js");

	ns.toast("HACKED SERVERS");
}
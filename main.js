/** @param {NS} ns */
export async function main(ns) {
	// [OPTIONS]
	let CONFIG = {
		files: [
			"nuketargets.js", "nuke.js", 
			"hacktargets.js", 
			"filetransfer.js", "hacks.js", 
			"buyservers.js", "killall.js", 
			"hack.js", "grow.js", "weaken.js"
		],

		refresh_time: parseInt(await ns.prompt(
			"Please Enter The amount of time to refresh in Minutes", 
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

		multiplier: 60,

		date: new Date(),
	}

	if (CONFIG.money_output === "$/H") CONFIG.multiplier = 360;

	// [MAIN LOOP]
	let time;
	const start = Date.now();
	ns.tprint(CONFIG)
	while (true) {
		await doSomething(ns, CONFIG.files);
		time = 0;
		while (time < CONFIG.refresh_time * 60_000) {
			CONFIG.date = new Date();
			ns.ui.clearTerminal();
			ns.tprint(`Current Time    : ${CONFIG.date.toLocaleTimeString()}`)
			ns.tprint(`Current Uptime  : ${Math.floor((Date.now() - start) / 1000)}S`);
			ns.tprint(`Current Earnings: ${Math.round(ns.getTotalScriptIncome()[0] * CONFIG.multiplier / 1000)}K${CONFIG.money_output}`);
			ns.tprint(`Overall Earining: ${Math.round(ns.getTotalScriptIncome()[1] * CONFIG.multiplier / 1000)}K${CONFIG.money_output}`);
			ns.tprint("");
			ns.tprint(`Hacking Servers : ${ns.getPurchasedServers().length}`);
			
			time += CONFIG.hz;
			await ns.sleep(CONFIG.hz);
		}
	}
}

async function doSomething(ns, FILES) {
	// Finds all possible Nuke targets and attempts to nuke them
	for (let i in FILES) {
		let file = FILES[i];
		await getFile(file, ns);
	}

	await ns.run("killall.js");
	ns.toast("Killed Running Processes");

	await ns.run("nuketargets.js");
	await ns.run("nuke.js");
	ns.toast("Nuked Servers");

	await ns.run("buyservers.js");
	ns.toast("Brought More Servers");

	await ns.run("hacktargets.js");
	await ns.run("hackservers.js");
	await ns.run("filetransfer.js");

	await ns.run("hacks.js");
	ns.toast("HACKED SERVERS");
}

async function getFile(filename, ns) {
	if (! ns.fileExists(filename)) await ns.wget(`http://arlofilley.com/BitBurner/${filename}`, filename)
}

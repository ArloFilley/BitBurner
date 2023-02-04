import * as lib from "/lib/lib.js";

export async function draw(ns) {
    ns.ui.clearTerminal();
	ns.tprint(`
Current Time    : ${CONFIG.date.toLocaleTimeString()}
Current Uptime  : ${Math.floor((Date.now() - start) / 1000)}S
Current Earnings: ${lib.NumFormat(ns.getTotalScriptIncome()[0] * CONFIG.multiplier)}${CONFIG.money_output}
Overall Earining: ${lib.NumFormat(ns.getTotalScriptIncome()[1] * CONFIG.multiplier)}${CONFIG.money_output}

Hacking Servers : ${ns.getPurchasedServers().length}`
    );
}

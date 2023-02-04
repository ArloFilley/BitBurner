export async function draw(ns, date) {
    ns.ui.clearTerminal();
	ns.tprint(`
Current Time    : ${date.toLocaleTimeString()}
Current Uptime  : ${Math.floor((Date.now() - start) / 1000)}S
Current Earnings: ${numFormat(ns.getTotalScriptIncome()[0] * CONFIG.multiplier)}${CONFIG.money_output}
Overall Earining: ${numFormat(ns.getTotalScriptIncome()[1] * CONFIG.multiplier)}${CONFIG.money_output}

Hacking Servers : ${ns.getPurchasedServers().length}`
    );
}

function numFormat(number){
	if (number >= 1_000){
		number /= 1000;
		return `${number.toFixed(1)}K`
	} else if (number >= 999_999){
		number /= 1_000_000
		return `${number.toFixed(1)}M`
	} else if (number >= 999_999_999){
		number /= 1_000_000_000
		return `${number.toFixed(1)}B`
	}
}
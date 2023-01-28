/** @param {NS} ns */
export async function main(ns) {
	const AVAILABLEMONEYRATIO = 1.0;
	const AVAILABLEMONEY = ns.getServerMoneyAvailable("home") * AVAILABLEMONEYRATIO;
	const MAXRAM = ns.getPurchasedServerMaxRam();

	const MINRAM = 15.9;

	for (let i = MAXRAM; i > MINRAM; i = i / 2) {
		if (ns.getPurchasedServerCost(i) <= AVAILABLEMONEY) {
			ns.purchaseServer("hacker", i);
			i = 0;
		}
	}
}

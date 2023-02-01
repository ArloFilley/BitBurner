/** @param {NS} ns */
export async function main(ns) {
    let config = await ns.read("config.txt");

    const files = config.files
    let file;
    for (let i in files) {
        file = config.files[i];
        await ns.rm(file);
    }
}

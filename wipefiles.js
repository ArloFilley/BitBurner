import * as lib from "lib.js";

/** @param {NS} ns */
export async function main(ns) {
    let config = lib.readFile("config.txt", ns);

    const files = config.files
    let file;
    for (let i in files) {
        file = config.files[i];
        await ns.rm(file);
    }
}

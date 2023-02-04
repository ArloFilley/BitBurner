export async function readFile(filename, ns) {
	return JSON.parse(await ns.read(filename))
}

export async function getFile(filename, url, ns) {
	if (! ns.fileExists(filename)) await ns.wget(`${url}${filename}`, filename)
}
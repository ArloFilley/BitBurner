export function readFile(filename, ns) {
  return JSON.parse(ns.read(filename))
}

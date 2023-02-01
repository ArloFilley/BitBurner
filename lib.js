export function readFile(filename) {
  return JSON.parse(ns.read(filename))
}

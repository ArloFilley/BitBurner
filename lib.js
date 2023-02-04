export async function readFile(filename, ns) {
  return JSON.parse(ns.read(filename))
}

export function NumFormat(number){
  if (number >= 1_000){
    number/= 1000;

    return `${number.toFixed(1)}K`
  }
  else if (number >= 999_999){
    number/= 1_000_000

    return `${number.toFixed(1)}M`
  }
  else if (number >= 999_999_999){
    number/= 1_000_000_000

    return `${number.toFixed(1)}B`
  }
  //4000 = 4k
  // while nummber > 999 s
  // show as xxxk$/h or xxxm$/h 
}
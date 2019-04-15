const { readFileSync } = Deno;

function main() {
    console.time('Counter');
    const TXT_FILE = "./odyssey.mb-2.txt";
    const decoder = new TextDecoder('utf-8');
    const content = decoder.decode(readFileSync(TXT_FILE));
    const words = content.match(/\w+/gi)

    const counterMap = new Map<string, number>();
    
    words.forEach(word => {
        if(counterMap.has(word)) {
            counterMap.set(word, counterMap.get(word) + 1);
        } else {
            counterMap.set(word, 1);
        }
    });

    counterMap.forEach((value, key) => {
        console.log(`${key} : ${value}`);
    });

    console.timeEnd('Counter')
}

main();
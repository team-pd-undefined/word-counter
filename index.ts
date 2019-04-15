const { readFileSync } = Deno;

function main() {
    console.time('Counter');
    const TXT_FILE = "./odyssey.mb-2.txt";
    const decoder = new TextDecoder('utf-8');
    const content = decoder.decode(readFileSync(TXT_FILE));
    const words = content.match(/\w+/gi)

    const counterMap = new Map<string, number>();
    
    words.forEach(word => {
        let lowercaseWord = word.toLowerCase();
        if(counterMap.has(lowercaseWord)) {
            counterMap.set(lowercaseWord, counterMap.get(lowercaseWord) + 1);
        } else {
            counterMap.set(lowercaseWord, 1);
        }
    });

    counterMap.forEach((value, key) => {
        console.log(`${key} : ${value}`);
    });

    console.timeEnd('Counter');
}

main();
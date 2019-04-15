const { readFileSync } = Deno;

function main() {
    console.time('Counter');
    const words = getWords("./odyssey.mb-2.txt");
    const counterMap = getCounterMap(words);

    print(counterMap);

    console.timeEnd('Counter');
}

function getWords(path: string): string[] {
    const decoder = new TextDecoder('utf-8');
    const content = decoder.decode(readFileSync(path));
    return content.match(/\w+/gi);
}

function getCounterMap(words: string[]): Map<string, number> {
    const counterMap = new Map<string, number>();
    
    words.forEach(word => {
        let lowercaseWord = word.toLowerCase();
        if(counterMap.has(lowercaseWord)) {
            counterMap.set(lowercaseWord, counterMap.get(lowercaseWord) + 1);
        } else {
            counterMap.set(lowercaseWord, 1);
        }
    });
    return counterMap;
}

function print(counterMap: Map<string, number>): void {
    counterMap.forEach((value, key) => {
        console.log(`${key} : ${value}`);
    });
}

main();
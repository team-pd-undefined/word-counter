const { open, read, copy, stdout } = Deno;

console.time("word-count");

let dic = {};
let prev: string = "";

async function run() {
    const file = await open("./odyssey.mb-2.txt");
    const buf = new Uint8Array(2000);

    while (true) {
        const { eof } = await read(file.rid, buf);

        if (eof) {
            count([prev]);
            break;
        }

        const text = new TextDecoder().decode(buf);
        const sentence = prev + text;

        // FIXME 딱 떨어지는 단어 (\n, space 로 끝나는 경우)
        let matched = sentence.match(/\w+/gm);
        prev = matched.splice(matched.length - 1)[0];

        if (!/\w/.test(sentence[sentence.length-1])) {
            prev = prev + sentence[sentence.length-1];
        }

        count(matched);
    }

    console.log(JSON.stringify(dic));
}

function count(matched: string[]) {
    for (let word of matched) {
        const key = word.toLowerCase();
        dic[key] = (dic[key] || 0) + 1;
    }
}

run().then(() => {
    console.timeEnd("word-count");
});
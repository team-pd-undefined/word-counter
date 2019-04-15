const { open, read, run } = Deno;

console.time("word-count");

let dic = {};
let prev: string = "";

async function main() {
    const file = await open("./odyssey.mb-2.txt");
    const buf = new Uint8Array(5000);

    while (true) {
        const { nread, eof } = await read(file.rid, buf);

        if (eof) {
            count([prev]);
            break;
        }

        const text = new TextDecoder().decode(buf.slice(0, nread));
        const sentence = prev + text.toLowerCase();

        let matched = sentence.match(/\w+/gm);

        if (/\w$/.test(sentence)) {
            prev = matched.splice(matched.length - 1)[0];
        } else {
            prev = '';
        }

        count(matched);
    }

    console.log(JSON.stringify(dic));
}

function count(matched: string[]) {
    for (let word of matched) {
        dic[word] = (dic[word] || 0) + 1;
    }
}

main().then(() => {
    console.timeEnd("word-count");
});
console.time('wordCounter');
const wordCounter = (fullString: string) => {
    let countObj = {};
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gim;
    const space = /\r\n|\r|\n/gim;
    const wordArray = fullString.replace(reg, ' ').replace(space, ' ').split(' ');
    wordArray.forEach((val, idx) => {
        let lowerVal = val.toLocaleLowerCase().trim(); 
        if(countObj[lowerVal]){
            countObj[lowerVal] = countObj[lowerVal] + 1;
        } else {
            countObj[lowerVal] = 1;
        }
    })

    return JSON.stringify(countObj);
}

(async () => {
    const fileName = Deno.args[1];
    const utf8Decoder = new TextDecoder('utf-8');
    const utf8Encoder = new TextEncoder();

    const file = Deno.readFileSync(`./${fileName}`);
    const fileText = utf8Decoder.decode(file);

    const result = wordCounter(fileText);

    await Deno.writeFile('result.json', utf8Encoder.encode(result))

  })();

console.timeEnd('wordCounter');
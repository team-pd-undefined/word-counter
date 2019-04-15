const wordCounter = (fullString: string, targetWord: string) => {
    const reg = new RegExp(targetWord, 'gim');
    const match = fullString.match(reg);
    return match.length;
} 

(async () => {
    const fileName = Deno.args[1];
    const targetWord = Deno.args[2];
    const utf8Decoder = new TextDecoder('utf-8');

    const file = Deno.readFileSync(`./${fileName}`);
    const fileText = utf8Decoder.decode(file);

    const count = wordCounter(fileText, targetWord)
    console.log(`'${targetWord}'의 개수는 ${count}개 입니다.`);
  })();
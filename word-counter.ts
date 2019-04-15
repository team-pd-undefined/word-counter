(async () => {
    console.time();
    let filename = Deno.args[1];
    const decoder = new TextDecoder("utf-8");
      let file:Uint8Array = await Deno.readFile(filename);
      
      let data:string = decoder.decode(file).toString();

      find(data);
      console.timeEnd();
  })();


let find = function(data:string) {
    let map:Map<String, number> = new Map<String, number>();
    // console.log(data);
    let count = data.split(' ');

    let size = count.length;
    for(let i = 0; i < size; i++) {
        let str:string = count.pop();
        
        if(map.has(str)) {
            map.set(str, map.get(str)+1);
        } else {
            
            map.set(str,1);
        }
    }
    
    console.log(JSON.stringify(Array.from(map.entries())));
    
}
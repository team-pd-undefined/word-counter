(async () => {
    console.time();
    let filename = Deno.args[1];
      let file:Uint8Array = await Deno.readFile(filename);
      
      let data:string = new TextDecoder().decode(file).toString();

      data = data.replace(/[\r\n|\n|\[\]]/g, " ");
      data = data.replace(/[^A-z]/g," ");
      

      find(data);
      console.timeEnd();
  })();


let find = function(data:string) {
    let map:Map<String, number> = new Map<String, number>();

    data = data.toLowerCase();
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

    

    const encoder = new TextEncoder();
  const txt = encoder.encode(JSON.stringify(Array.from(map.entries())));
  Deno.writeFile("result.txt", txt);
    
    // console.log();
    
}
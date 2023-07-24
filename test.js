//freq array using javascript
function duplicateCount(text){
    let size = text.length;
    let freq = Array.from(new Array(100) , ()=> 0); //new Array(size)
    text = text.toUpperCase();
    for(let i=0; i<size; i++){
      freq[text.charCodeAt(i)-'A'.charCodeAt(0)]++;
    }
    let cnt = 0;
    for(let i=0; i<100; i++){
      if(freq[i]>1) cnt++;
      console.log(freq[i]);
    }
    return cnt;
  }
  let visited = Array.from({length: n}, () => false);

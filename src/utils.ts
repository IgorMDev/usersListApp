
export function objToQuery(obj: object){
  if(!obj) return '';
  const res = Object.entries(obj).reduce((acc, el, i, arr) => {
    const [key, value] = el;
    if(value){
      acc += key+'='+value;
    }
    if(i < arr.length-1){
      acc += '&'
    }
    return acc;
  }, '');
  return res ? '?' + res : res;
}
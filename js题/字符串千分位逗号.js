function convert(str='') {
  let arr = str.split('');
  let len = arr.length;
  let result ='';
  let count = 0;
  for (let i = len - 1; i >= 0; i--) {
    count++;
    result=arr[i]+result;
    if (count === 3 && i !== 0) {
      result=','+result;
      count = 0;
    }
  }
  return result
}


console.log(convert('123456789'));;

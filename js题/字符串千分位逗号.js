function convert(str='') {
  let arr = str.split('');
  let len = arr.length;
  let result = [];
  let count = 0;
  for (let i = len - 1; i >= 0; i--) {
    count++;
    result.unshift(arr[i]);
    if (count === 3 && i !== 0) {
      result.unshift(',');
      count = 0;
    }
  }
  return result.join('');
}


console.log(convert('123456789'));;

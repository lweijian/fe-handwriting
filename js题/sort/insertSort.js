//插入排序
  function insertSort(arr) {

    for (let i = 0; i < arr.length; i++) {
        let temp=arr[i]
        let j=i-1;
      while (j>=0&&arr[j]>temp){
          arr[j+1]=arr[j]
          j--
      }
      arr[j+1]=temp
    }
    return arr
}


console.log(insertSort([1, 2, 3, 0]));

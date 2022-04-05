//插入排序
  function insertSort(arr) {

    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j >= 1 && arr[j] < arr[j - 1]; j--) {
            swap(arr, j, j - 1)
        }
    }
}
function swap(arr,i,j) {
    [arr[i],arr[j]]=[arr[j],arr[i]]
}



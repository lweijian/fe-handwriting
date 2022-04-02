//插入排序
export  function insertSort(arr) {

    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j - 1 >= 0 && arr[j] < arr[j - 1]; j--) {
            swap(arr, j, j - 1)
        }
    }
}

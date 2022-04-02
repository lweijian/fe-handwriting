/*
   归并排序算法 参数：（数组），（第一个元素索引），（最后一个元素索引）
 */
export function mergeSort(arr, leftBount, rightBount) {
    //终止条件
    if (leftBount >= rightBount) {
        return
    }
    //找到中间值
    let mid = leftBount + Math.floor((rightBount - leftBount) / 2);
    //排序左边
    mergeSort(arr, leftBount, mid);
    // 排序右边
    mergeSort(arr, mid + 1, rightBount)
    //归并
    merge(arr, leftBount, mid + 1, rightBount);

}

/*
   归并 参数：（数组），（有序左序列的第一个元素索引），（有序右序列的第一个元素索引），（右边最后一个元素索引）
 */
function merge(arr, left, right, rightBount) {
    let lIndex = left;
    let rIndex = right
    if (lIndex > rIndex || rightBount< rIndex) {
        throw "参数错误";
    }
    let newArr = new Array(rightBount - lIndex + 1);
    let newArrIndex = 0;
    let mid = rIndex - 1;
    while (rIndex <= rightBount && lIndex <= mid) {
        if (arr[lIndex] <= arr[rIndex]) {
            newArr[newArrIndex] = arr[lIndex];
            lIndex++;
            newArrIndex++;
        } else {
            newArr[newArrIndex++] = arr[rIndex++];

        }

    }
    while (rIndex <= rightBount) {
        newArr[newArrIndex++] = arr[rIndex++];

    }
    while (lIndex <= mid) {
        newArr[newArrIndex++] = arr[lIndex++];

    }
    //新数组赋值到旧数组
    for (val of newArr) {
        arr[left++] = val;
    }
}

/*
快速排序 参数：数组、最左边元素索引，最右边元素索引
 */
function quickSort(arr, leftBount = 0, rightBount = arr.length - 1) {
    if (leftBount >= rightBount) {
        return
    }
    //左右指针
    let left = leftBount;
    let right = rightBount;
    //轴的值和索引
    let axisValue = arr[Math.floor((leftBount+rightBount)/2)];
    while (left <= right) {
        while ( arr[right] > axisValue) {
            right--;
        }
        while (arr[left] < axisValue) {
            left++;
        }
        if (left <= right) {
            swap(arr, left, right)
            left++
            right--
        }
    }
    if(leftBount<left){

    }
    quickSort(arr, leftBount, right )

    quickSort(arr, left, rightBount)
    return arr
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

console.log(quickSort([3, 2, 1, 0,99]));

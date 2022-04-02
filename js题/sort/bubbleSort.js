//冒泡排序
export function bubbleSort(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j + 1 < arr.length - i; j++)
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
    }
}


//希尔排序
export function shellSort(arr) {
    let h = 1;
    while (h <= Math.floor(arr.length / 3)) {
        h = h * 3 + 1
    }
    for (let gap = h; gap > 0; gap = Math.floor((gap - 1) / 3)) {
        for (let i = gap; i < arr.length; i++) {
            for (let j = i; j - gap >= 0 && arr[j] < arr[j - gap]; j -= gap) {
                swap(arr, j, j - gap)
            }
        }
    }
}

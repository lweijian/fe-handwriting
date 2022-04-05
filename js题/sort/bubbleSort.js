//冒泡排序
 function bubbleSort(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j<arr.length-1-i ; j++) {
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1)
            }
        }
    }
}

function swap(arr,i,j) {
    [arr[i],arr[j]]=[arr[j],arr[i]]
}
arr=[12,3,0,-3]
bubbleSort(arr)
console.log(arr)

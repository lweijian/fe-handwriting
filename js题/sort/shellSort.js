//希尔排序
 function shellSort(arr) {
    for (let gap=Math.floor(arr.length/2);gap>0;gap=Math.floor(gap/=2)){
        for (let i = 0; i < arr.length; i++) {
            let temp=arr[i]
            let j=i-gap;
            while (j>=0&&arr[j]>temp){
                arr[j+gap]=arr[j]
                j-=gap
            }
            arr[j+gap]=temp
        }
    }

    return arr

}
function swap(arr,i,j) {
    [arr[i],arr[j]]=[arr[j],arr[i]]
}

console.log(shellSort([1, 8,3,0,-1,11, 3]));

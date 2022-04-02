/*
快速排序 参数：数组、最左边元素索引，最右边元素索引
 */
export function quickSort(arr, leftBount,rightBount) {
    if(leftBount>=rightBount){
        return
    }
    //左右指针
    let left=leftBount;
    let right=rightBount;
    //轴的值和索引
    let axisValue=arr[leftBount];
    while(left<right){
        while (left<right&&arr[right]>=axisValue){
            right--;
        }
        if(left<right){
            arr[left++]=arr[right];
        }
        while (left<right&&arr[left]<=axisValue){
            left++;
        }
        if(left<right){
            arr[right--]=arr[left];
        }
    }
    //此时left==right，轴应该在这个位置，轴左边比轴小，轴右边比轴大
    arr[left]=axisValue;
    //轴左边排序
    quickSort(arr,leftBount,left-1)
    //轴右边排序
    quickSort(arr,left+1,rightBount)
}


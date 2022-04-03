/*
/计数排序；值作为key，value为值的数量；
 */
export function countSort(arr) {
    //取值范围
    let tempArr=new Array(6)

    for (let i = 0; i <tempArr.length ; i++) {
        tempArr[i]=0
    }
    for ( val of test) {
        tempArr[val]=tempArr[val]+1
    }
    let j=0;

    for (let i = 0; i <tempArr.length ; i++) {
        while (tempArr[i]>0){
            arr[j++]=
                tempArr[i]-=1;
        }
    }

}
function swap(arr,i,j) {
    [arr[i],arr[j]]=[arr[j],arr[i]]
}

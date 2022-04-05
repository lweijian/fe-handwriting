/*
/计数排序；值作为key，value为值的数量；
 */

 function countSort(arr) {
    //取值范围
    let tempArr=[]


    for (let val of arr) {
        tempArr[val]=1+tempArr[val]??0
    }
    let j=0;

    for (let i = 0; i <tempArr.length ; i++) {
        while (tempArr[i]>0){
            arr[j++]= tempArr[i]-=1;
        }
    }

}


/*
/计数排序；值作为key，value为值的数量；
 */

 function countSort(arr) {
    //取值范围
    let tempArr=[]


    for (let val of arr) {
        tempArr[val]=tempArr[val]?tempArr[val]+1:1
    }
    let j=0;

     for (let [index,value] of tempArr.entries()) {
         while (value>0){
             arr[j++]=index
             value--
         }
     }
    return arr
}

console.log(countSort([4, 5, 2, 2, 4]));

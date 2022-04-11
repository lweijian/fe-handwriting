function myReduce(arr,fn,init) {
    // 判断是否有初始值
    if(init){
        let result = init;
        for(let i = 0;i<arr.length;i++){
            result = fn(result,arr[i],i,arr);
        }
        return result;
    }else{
        let result = arr[0];
        for(let i = 1;i<arr.length;i++){
            result = fn(result,arr[i],i,arr);
        }
        return result;
    }


}

console.log([1, 2, 3, 4].reduce(function (prev, curr, index, arr) {
    return prev + curr;
}, 0));
console.log(myReduce([1, 2, 3, 4], function (prev, curr, index, arr) {
    return prev + curr;
}, 0));

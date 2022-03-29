//数组扁平化

//es6 Api
function flatter1(arr) {
    return arr.flat(Infinity)
}
//toString 扁平化
function flatter2(arr) {
    return arr.toString().split(',').map(Number)
}
//递归
function flatter3(arr) {
    let res=[]
    for (const item of arr) {
        if(Array.isArray(item)){
            res=[...res,...flatter3(item)]
        }else {
            res.push(item)
        }
    }
    return res
}
//迭代
function flatter4(arr) {
    if (!arr.length) return;
    while (arr.some((item) => Array.isArray(item))) {
         arr=[].concat(...arr);
    }
    return arr;
}
const arr=[1, 2, [1, [2, 3, [4, 5, [6]]]]];
console.log(flatter1(arr));
console.log(flatter2(arr));
console.log(flatter3(arr));
console.log(flatter4(arr));

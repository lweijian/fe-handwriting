// 数组去重
function uniqueArr1(arr) {
    return [...new Set(arr)]
}
function uniqueArr2(arr) {
    let res=[]
    arr.forEach((item)=>{
        if(res.indexOf(item)===-1){
            res.push(item)
        }
    })
    return res
}
function uniqueArr3(arr) {
    let res=[]
    arr.forEach((item)=>{
        if(!res.includes(item)){
            res.push(item)
        }
    })
    return res
}
let arr=[1,3,1,'','',4,' ',' ']
console.log(uniqueArr1(arr));
console.log(uniqueArr2(arr));
console.log(uniqueArr3(arr));

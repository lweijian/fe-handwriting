function map(arr,fn) {
return arr.reduce((pre,cur)=>{
    return [...pre,fn(cur)]
},[])
}
console.log(map([1, 2, 3], (item) => {
    return item * 2
}));

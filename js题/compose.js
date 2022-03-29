//组合函数，前一个的值传入作为后一个函数的参数传入
// 用法如下:
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11


function compose(...fns) {
  return (x)=>{
    return fns.reduce((pre,cur)=>{
      return cur(pre)
    },x)
  }
}

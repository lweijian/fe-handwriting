Function.prototype.myBind=function (thisArgs,...args1) {
    const callback=this
    function apply(thisArgs,args) {
        const tag=Symbol('myBind')
        thisArgs[tag]=callback;
      const  res=thisArgs[tag](...args)
        delete  thisArgs[tag]
        return res
    }
    return function (...args2) {
        return apply(thisArgs,[...args1,...args2])
    }
}


 let test1=function (...args){
    this.name='111'
     console.log(args)
 }
 let obj={
    name:'obj'
 }
 test1.myBind(obj,'1')('2')
console.log(obj)

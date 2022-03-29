//  setTimeout 模拟 setInterval
function mySetInterval(fn,time) {
    let timer=null
    function interval() {
        setTimeout(()=>{
            fn()
            interval()
        },time)
    }
    interval()

}
mySetInterval(()=>{
    console.log(11)
},2000)

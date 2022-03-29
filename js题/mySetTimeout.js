 // setInterval模拟setTimeout
function mySetTimeout(fn,time) {
    let timer=null
    timer=setInterval(()=>{
        fn()
        clearInterval(timer)
    },time)
}
 mySetTimeout(()=>{
    console.log(11)
},2000)

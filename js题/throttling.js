//节流1

export function throttling1(callback, time) {
    let lastTime = 0;
    let nowTime = 0;
 return function (...args) {
      nowTime = new Date().getTime();
     if (nowTime - lastTime > time) {
         callback.apply(this,args);
         lastTime = nowTime;
     }
 }
}


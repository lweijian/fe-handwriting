//事件发布订阅
class EventBus {
    constructor(){
        this.event={}
    }
    on(eventName,callback){
    if(this.event.hasOwnProperty(eventName)){
        this.event[eventName].push(callback)
    }else {
        this.event[eventName]=[callback]
    }
    }
    off(eventName,callback){
        if(!this.event.hasOwnProperty(eventName)){
            return true;
        }else {
            this.event[eventName]=this.event[eventName].filter(fn=>{
                return fn!==callback
            })
        }
    }
    emit(eventName,...args){
   const fns= this.event[eventName]??[]
        for (const fn of fns) {
            Reflect.apply(fn,this,args)
        }
    }
    once(eventName,callback){
        const fn=()=>{
            callback()
            this.off(eventName,fn)
        }
        this.on(eventName,fn)
    }

}
// 使用如下
const event = new EventBus();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);
//
event.off("click", handle);
//
event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");


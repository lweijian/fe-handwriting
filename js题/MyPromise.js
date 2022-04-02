const Pending = "pending";
const Fulfilled = "fulfilled";
const Rejected = "rejected";

function isFunction(params) {
    return Object.prototype.toString.call(params) === '[object Function]';
}

class MyPromise {
    constructor(callback) {
        this._successCallback = [];
        this._failureCallback = [];
        this._state = Pending;
        this._value = undefined;
        this._reason = undefined;
        let resolve = (value) => {
            if (this._state === Pending) {

                setTimeout(() => {
                    this._state = Fulfilled;
                    this._value = value;
                    let cb;
                    while (cb = this._successCallback.shift()) {
                        cb(value)
                    }
                }, 0)
            }
        }
        let reject = (reason) => {
            if (this._state === Pending) {

                setTimeout(() => {
                    this._state = Rejected;
                    this._reason = reason;
                    let cb;
                    while (cb = this._failureCallback.shift()) {
                        cb(reason)
                    }
                }, 0)

            }
        }

        try {
            if (isFunction(callback)) {
                callback(resolve, reject)
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    }

    then(fulfilledCallback, rejectedCallback) {
        const {_state, _value, _reason} = this
        return new MyPromise((resolve, reject) => {

            //状态为fulfilled的处理方法
            let handlerFulfilled = (value) => {

                //回调不是个函数，则直接传递值
                if (!isFunction(fulfilledCallback)) {
                    resolve(value);
                    return;
                }
                try {
                    //执行回调，拿到返回结果
                    let result = fulfilledCallback(value);
                    if (result instanceof MyPromise) {
                        //依赖返回的MyPromise对象状态，返回的MyPromise对象状态改变，则当前新的promise对象状态改变
                        result.then(resolve, reject);
                        return;
                    }
                    //将结果传递出去
                    resolve(result);

                } catch (e) {
                    //将异常传递
                    reject(e);
                }
            }

            //状态为rejected的处理方法
            let handlerRejected = (error) => {
                try {
                    if (!isFunction(rejectedCallback)) {
                        reject(error);
                        return;
                    }
                    let result = rejectedCallback(error);
                    if (result instanceof MyPromise) {
                        //依赖返回的MyPromise对象状态，返回的MyPromise对象状态改变，则当前新的promise对象状态改变
                        result.then(resolve, reject);
                        return;
                    }
                    reject(result);

                } catch (e) {
                    reject(e);
                }
            }

            switch (_state) {
                case Pending:
                    //将要执行的方法放进队列中缓存
                    this._successCallback.push(handlerFulfilled);
                    this._failureCallback.push(handlerRejected);
                    break;
                case Fulfilled:
                    //直接执行
                    handlerFulfilled(_value);
                    break;
                case Rejected:
                    //直接执行
                    handlerRejected(_reason);
                    break;
            }

        });
    }
    catch(rejectedCallback) {
        return this.then(null, rejectedCallback);
    }

    finally(finallyCallback) {
        return this.then(finallyCallback, finallyCallback)
    }

    static resolve(params) {
        //1.如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。
        if (params instanceof MyPromise) {
            return params;
        }
        return new MyPromise((resolve, reject) => {
            //1.如果参数是 thenable对象，那么将resolve和rejected参数将执行thenable对象的then方法，并返回一个新的MyPromise对象。
            if (typeof params==='object'&&Reflect.has(params, 'then') && isFunction(params.then)) {
                params.then(resolve, reject)
            } else {
                //其他情况则将值传递出去，并返回一个状态为fulfilled的MyPromise对象
                resolve(params)
            }
        })
    }

    static reject(params) {

        //1.如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。
        if (params instanceof MyPromise) {
            return params;
        }
        return new MyPromise((resolve, reject) => {
            //1.如果参数是 thenable对象，那么将resolve和rejected参数将执行thenable对象的then方法，并返回一个新的MyPromise对象
            if (Reflect.has(params, 'then') && isFunction(params.then)) {
                params.then(resolve, reject)
            } else {
                //其他情况则将值传递出去，并返回一个状态为rejected的MyPromise对象
                reject(params)
            }
        })
    }

    static all(arr = []) {
        //代表代表fulfilled状态的promise实例数量状态的MyPromise实例数量
        let resolveNum = 0;
        //将fulfilled状态的传递的值用数组保存
        let valueArr=[]
        //表示fulfilled状态的MyPromise实例的数量需要达到这个值才能把这个all方法的MyPromise 的状态改为fulfilled
        let needResolveNum = arr.length
        return new MyPromise((resolve, reject) => {
            for (const item of arr) {
                //将参数数组中的每一项都变成MyPromise对象，如果本身就是MyPromise对象，则直接返回这个MyPromise对象
                let promise = MyPromise.resolve(item)
                promise.then((value) => {
                    resolveNum++
                    valueArr.push(value)
                    if (resolveNum === needResolveNum) {
                        //当参数数组中所有的MyPromise实例状态都为fulfilled，则把这个all方法的MyPromise 的状态改为fulfilled
                        resolve(valueArr)
                    }
                },(err) => {
                    //当一个MyPromise实例的状态为rejected，则直接把这个all方法返回的MyPromise实例状态改为rejected
                    reject(err)

                })
            }

        })
    }
    static race(arr = []) {
        return new MyPromise((resolve, reject) => {
            for (const item of arr) {
                //将参数数组中的每一项都变成MyPromise对象，如果本身就是MyPromise对象，则直接返回这个MyPromise对象
                let promise = MyPromise.resolve(item)
                promise.then((value) => {
                    //当一个MyPromise实例的状态为fulfilled，则直接把这个all方法返回的MyPromise实例状态改为fulfilled
                    resolve(value)
                },(err) => {
                    //当一个MyPromise实例的状态为rejected，则直接把这个all方法返回的MyPromise实例状态改为rejected
                    reject(err)
                })
            }
        })
    }

    }

const promise1 = Promise.resolve("First");
const promise2 = Promise.resolve("Second");
const promise3 = Promise.reject("Third");
const promise4 = Promise.resolve("Fourth");
const runPromises = async () => {
    const res1 = await Promise.all([promise1, promise2]); //res1=[First,Second]
    const res2 = await Promise.all([promise3, promise4]);//Third
    return [res1, res2];
};
runPromises()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));


export class PubSub {
    constructor() {
        this.callbacks = {
            id: 1,
        }
    }
    // 订阅
    subscribe(channel, callback) {
        let token = `token_${this.callbacks.id++}`;

        if (!this.callbacks[channel]) {
            this.callbacks[channel] = {};
            this.callbacks[channel][token] = callback;
        } else {
            this.callbacks[channel][token] = callback;

        }
        return token;
    }
   //发布
    publish(channel, data) {
        Object.values(this.callbacks[channel]).forEach(callback => {
            callback(data)
        })
    }
    // 取消订阅
    unsubscribe(channel, token) {
        if (!this.callbacks[channel][token]) {
            console.log("订阅已经取消");
        } else {
            delete this.callbacks[channel][token]
        }
    }

}

//防抖

export function debounce(callback, time) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback();
        }, time);
    }
}
